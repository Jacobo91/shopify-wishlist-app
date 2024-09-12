import {
  BlockStack,
  Layout,
  Page,
  Card,
  EmptyState,
  Image,
  Text,
  ResourceItem,
  ResourceList,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { json } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }) {
  const auth = await authenticate.admin(request);
  const { admin } = await authenticate.admin(request);
  const shop = auth.session.shop;

  const wishlistData = await db.wishlist.findMany({
    where: {
      shop: shop,
    },
    orderBy: {
      id: "asc",
    }
  });

  const groupedProducts = wishlistData.reduce((acc, item) => {
    const { productId, customerId } = item;

    if (!acc[productId]) {
        acc[productId] = {
            productId,
            likes: 0,
            customerIds: []
        };
    }

    acc[productId].likes += 1;
    acc[productId].customerIds.push(customerId);

    return acc;
  }, {});

  const groupedProductsArray = Object.values(groupedProducts);
  const productsIds = groupedProductsArray.map(item => item.productId);

  async function getProductsInfo(ids) {
    const responses = await Promise.all(
      ids.map(async productID => {
        const response = await admin.graphql(
          `#graphql
            {
              product(id: "gid://shopify/Product/${productID}") {
                id
                title
                featuredImage {
                  url
                }
              }
            }`
        );
        const responseJson = await response.json();
        const product = responseJson.data?.product;
        return product;
      })
    );
    return responses;
  }

  const fetchedProducts = await getProductsInfo(productsIds);

  const productMap = fetchedProducts.reduce((map, product) => {
    const productId = product.id.split('/').pop();
    map[productId] = {
      title: product.title,
      featuredImage: product.featuredImage.url
    };
    return map;
  }, {});

  const enhancedGroupedProductsArray = groupedProductsArray.map(product => {
    const productDetails = productMap[product.productId] || {};
    return {
      ...product,
      title: productDetails.title || '',
      featuredImage: productDetails.featuredImage || ''
    };
  });

  return json(enhancedGroupedProductsArray);
};

export async function action({ request }) {
  
};

export function RowCard({ imageSrc, title, likes }) {
  return (
    <Card>
      <Card.Section>
        <Image source={imageSrc} alt={title}/>
      </Card.Section>
      <Card.Section>
        <Text>{title}</Text>
        <Text>{likes}</Text>
      </Card.Section>
    </Card>
  );
}

export default function PopularityDashboard() {

  const wishlistData = useLoaderData();
  console.log('Wishlist data is:', wishlistData);

  return (
    <Page>
      <TitleBar title="Popularity dashboard" />
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              {wishlistData.length > 0 ? (
                  <Card>
                    <ResourceList 
                      resourceName={{ singular: 'product', plural: 'products' }}
                      items={wishlistData}
                      renderItem={(item) => {
                        const {featuredImage, title, likes, productId} = item;
                        const media = <Image src={featuredImage} width={80} height={80}/>;

                        return (
                          <ResourceItem
                            id={productId}
                            media={media}
                            url={`/app/likedproductsinfo/${productId}`}
                          >
                            <Text><strong>Title:</strong> {title}</Text>
                            <Text><strong>Likes:</strong> {likes}</Text>
                          </ResourceItem>
                        );
                      }}
                    />
                  </Card>
                ) : (
                <EmptyState>
                  <p>There are no products wishlisted yet.</p>
                </EmptyState>
              )}
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}


