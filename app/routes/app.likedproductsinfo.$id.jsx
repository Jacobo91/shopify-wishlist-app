import { json, useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";

export async function loader({ request, params }) {
    const auth = await authenticate.admin(request);
    const productId = params.id;
    const allIds = productId.split(',')
    const { admin } = await authenticate.admin(request);

    return json(allIds);
};

export default function LikedProductsInfo() {

    const params = useLoaderData();
    console.log('params:', params);
    


    return (
        <p>This is the likes info page</p>
    );
}