import { json, useLoaderData, useNavigate } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { Page, Text, Box, Card, Button } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export async function loader({ request, params }) {
    const auth = await authenticate.admin(request);
    const { admin } = await authenticate.admin(request);
    const productId = params.id;
    const appUrl = "https://coming-cologne-arm-issues.trycloudflare.com";

    async function getProductInfo(id) {
        try {
            const response = await fetch(`${appUrl}/api/wishlist?productId=${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product info');
            }
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return null; // Return a fallback value in case of error
        }
    }

    const data = await getProductInfo(productId);

    const response = await admin.graphql(
        `#graphql
            {
                product(id: "gid://shopify/Product/${productId}") {
                    title
                }
            }
        `
    );

    const responseJson = await response.json();
    const productTitle = responseJson.data?.product?.title;

    return {productTitle, data};
};

export default function LikedProductsInfo() {

    const rawData = useLoaderData();
    const { productTitle, data } = rawData;
    const creationDates = data.data.map(item => item.createdAt);
    console.log('liked product data:', creationDates);

    const navigate = useNavigate();
    
    return (
        <Page>
            <TitleBar title={productTitle}>
                <button onClick={() => navigate(-1)}>Go back</button>
            </TitleBar>
            <Box>
                <Card>
                    <Text as="h2" variant="headingSm">Total likes: {data.data.length}</Text>
                </Card>
            </Box>
        </Page>
    );
}