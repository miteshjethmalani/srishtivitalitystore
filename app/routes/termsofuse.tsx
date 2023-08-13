import { MetaFunction } from "@remix-run/server-runtime";
import { Accordion, Container, ListGroup, Row } from "react-bootstrap";
import { APP_META_TITLE } from "~/constants";

export const meta: MetaFunction = () => {
    return {
        title: `Terms And Conditions - ${APP_META_TITLE}`
    };
};

export default function TermsOfUse() {
    return (
        <Container className="mt-4">
            <h2 className="text-center">Terms And Conditions</h2>
            <div className="row justify-content-center mt-5">
                <div className="col-lg-10 col-md-12 col-12">
                    <Row >
                        Welcome to our Srishtivitality Ecommerce Website.
                        The following Terms of Use ("Terms") govern your access to and use of the Website.
                        By accessing or using the Website, you agree to be bound by these Terms.
                        If you do not agree with these Terms, please do not use the Website.
                    </Row>
                    <Row className="mt-2">
                        <Accordion defaultActiveKey={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']} alwaysOpen>
                            <Accordion.Item eventKey="0" >
                                <Accordion.Header>Product Information</Accordion.Header>
                                <Accordion.Body >
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">The Website provides information about crystals, including their properties, origins, and appearance. However, please note that the information provided is for general purposes only and does not constitute professional advice.</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Ordering and Purchasing</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">You may place orders for crystals through the Website, subject to availability and our acceptance</ListGroup.Item>
                                        <ListGroup.Item as="li">Prices are displayed on the Website and are subject to change without notice.</ListGroup.Item>
                                        <ListGroup.Item as="li">You are responsible for providing accurate and complete information during the ordering process.</ListGroup.Item>
                                        <ListGroup.Item as="li">We reserve the right to refuse or cancel any order at our discretion.</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Shipping and Delivery</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">We will make reasonable efforts to ship the ordered crystals within the specified timeframe.</ListGroup.Item>
                                        <ListGroup.Item as="li">Shipping costs, methods, and estimated delivery times will be provided during the checkout process.</ListGroup.Item>
                                        <ListGroup.Item as="li">We are not responsible for any delays, losses, or damages that occur during shipping.</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Returns and Refunds</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">We do not accept returns of crystals in accordance with our Return and Refund Policy</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Product Disclaimers and Use</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">Crystals are natural products, and their properties and effects may vary.</ListGroup.Item>
                                        <ListGroup.Item as="li">The use of crystals is not a substitute for professional medical or psychological advice.</ListGroup.Item>
                                        <ListGroup.Item as="li">We do not make any claims about the effectiveness or healing properties of the crystals.</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>Intellectual Property Rights</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">All content on the Website, including images, text, and logos, is protected by intellectual property laws and belongs to us.</ListGroup.Item>
                                        <ListGroup.Item as="li">You may not reproduce, distribute, or use any content from the Website without our explicit permission.</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="6">
                                <Accordion.Header>User Conduct and Responsibilities</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">You agree not to engage in any unauthorized or unlawful activities on the Website.</ListGroup.Item>
                                        <ListGroup.Item as="li">You are responsible for maintaining the confidentiality of your account information, including your login credentials.</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="7">
                                <Accordion.Header>Limitation of Liability</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">To the fullest extent permitted by law, we are not liable for any damages, losses, or liabilities arising from the use of the Website or the purchase of crystals.</ListGroup.Item>
                                        <ListGroup.Item as="li">We are not responsible for any inaccuracies or errors in the content provided on the Website.</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="8">
                                <Accordion.Header>Termination</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">We may terminate or suspend your access to the Website without prior notice if you violate these Terms or engage in any fraudulent or harmful activities.</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="9">
                                <Accordion.Header>Changes to the Terms of Use</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">We reserve the right to modify or update these Terms at any time. Any changes will be effective upon posting the revised Terms on the Website. Your continued use of the Website after the changes will constitute your acceptance of the modified Terms.</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Row>
                </div>
            </div>
        </Container>
    )
}