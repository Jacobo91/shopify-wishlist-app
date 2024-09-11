import { TitleBar } from "@shopify/app-bridge-react";
import { BlockStack, Box, Card, Layout, Page, Text, Grid, List, Bleed, Divider } from "@shopify/polaris";
import { Link } from "@remix-run/react";
export default function InfoPage() {
    return(
        <Page>
            <TitleBar title="About this app" />
            <BlockStack gap="500">

                <Card>
                    <Text as="h2" variant="headingSm">
                        Description
                    </Text>
                    <Divider />
                    <Box paddingBlockStart="200">
                        <Text as="p" variant="bodyMd">
                            Wishlist Insights & Personalization is a powerful app designed to enhance the shopping experience and boost sales through personalized wishlist management and actionable insights.
                        </Text>
                    </Box>
                </Card>

                <Card>
                    <Text as="h2" variant="headingSm">
                        Key Features:
                    </Text>
                    <Divider />
                    <Grid>
                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                            <Box paddingBlockStart="200">
                                <Text as="h2" variant="headingSm">Popularity Dashboard:</Text>
                                <Text as="p" variant="bodyMd">
                                    Gain valuable insights into your store’s most-liked products with our intuitive dashboard. 
                                    The app tracks and displays products with the highest number of likes, allowing merchants to 
                                    identify trends and plan targeted marketing campaigns to drive sales.
                                    <Link to="/app/additional">Go to</Link>
                                </Text>
                            </Box>
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                            <Box paddingBlockStart="200">
                                <Text as="h2" variant="headingSm">Personalized Wishlist Section:</Text>
                                <Text as="p" variant="bodyMd">
                                    Provide your customers with a unique, personalized experience by showcasing their wishlist directly on their homepage. Each user can easily view and manage their saved products, making it simpler for them to track and purchase their favorite items.
                                </Text>
                            </Box>
                        </Grid.Cell>
                    </Grid>
                </Card>

                <Card>
                    <Text as="h2" variant="headingSm">
                        Benefits
                    </Text>
                    <Divider />
                    <Grid>
                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                            <Box paddingBlockStart="200">
                                <Text as="h2" variant="headingSm">Boost Engagement:</Text>
                                <Text as="p" variant="bodyMd">
                                    By displaying popular products, you can create targeted campaigns that appeal to customer interests and drive higher sales.
                                </Text>
                            </Box>
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                            <Box paddingBlockStart="200">
                                <Text as="h2" variant="headingSm">Enhance Customer Experience:</Text>
                                <Text as="p" variant="bodyMd">
                                    Personalized wishlists improve user satisfaction and increase the likelihood of repeat purchases.
                                </Text>
                            </Box>
                        </Grid.Cell>
                    </Grid>
                </Card>

                <Card>
                    <Text as="h2" variant="headingSm">
                        Why Choose Us?
                    </Text>
                    <Divider />
                    <Box paddingBlockStart="200">
                        <Text as="p" variant="bodyMd">
                            Our app integrates seamlessly with Shopify, offering a user-friendly interface and robust functionality that helps you leverage customer preferences to maximize your store’s potential. Whether you’re looking to boost your marketing efforts or enhance the shopping experience, Wishlist Insights & Personalization has you covered.
                        </Text>
                    </Box>
                </Card>

            </BlockStack>
        </Page>
    );
};