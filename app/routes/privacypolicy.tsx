import { Link } from "@remix-run/react";
import { MetaFunction } from "@remix-run/server-runtime";
import { Accordion, Container, ListGroup, Row } from "react-bootstrap";
import { APP_META_TITLE } from "~/constants";

export const meta: MetaFunction = () => {
    return {
        title: `Privacy Policy - ${APP_META_TITLE}`
    };
};

export default function PrivacyPolicy() {
    return (
        <Container className="mt-4">
            <h2 className="text-center">PRIVACY POLICY FOR {APP_META_TITLE} ECOMMERCE WEBSITE</h2>
            <div className="row justify-content-center mt-5">
                <div className="col-lg-10 col-md-12 col-12">
                    <Row >
                        We are committed to protecting the privacy of our users.
                        This Privacy Policy ("Policy") explains how we collect, use, disclose, and safeguard your personal information when you use our Website.
                        By accessing or using the Website, you consent to the practices described in this Policy.
                    </Row>
                    <Row className="mt-2">
                        <Accordion defaultActiveKey={['0', '1', '2', '3', '4', '5', '6', '7', '8']} alwaysOpen>
                            <Accordion.Item eventKey="0" >
                                <Accordion.Header>Information We Collect</Accordion.Header>
                                <Accordion.Body >
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">Personal Information: We may collect personal information, such as your name, email address, shipping address, and payment information when you place an order or create an account on our Website.</ListGroup.Item>
                                        <ListGroup.Item as="li">Non-Personal Information: We may automatically collect non-personal information, such as your IP address, browser type, device information, and website usage data, through cookies and similar technologies.</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Use of Information</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">We use the collected information to:
                                            <ListGroup as="ol" numbered>
                                                <ListGroup.Item as="li">
                                                    Process and fulfill your orders
                                                </ListGroup.Item>
                                                <ListGroup.Item as="li">
                                                    Communicate with you about your orders and provide customer support
                                                </ListGroup.Item>
                                                <ListGroup.Item as="li">
                                                    Improve and personalize your experience on our Website
                                                </ListGroup.Item>
                                                <ListGroup.Item as="li">
                                                    Send you promotional offers, newsletters, and updates with your consent
                                                </ListGroup.Item>
                                                <ListGroup.Item as="li">
                                                    Monitor and analyze usage trends and enhance the functionality of our Website
                                                </ListGroup.Item>
                                                <ListGroup.Item as="li">
                                                    Comply with legal obligations
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Disclosure of Information</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">We may disclose your personal information to:
                                            <ListGroup as="ol" numbered>
                                                <ListGroup.Item as="li">
                                                    Third-party service providers who assist us in operating our business, such as payment processors, shipping partners, and marketing platforms
                                                </ListGroup.Item>
                                                <ListGroup.Item as="li">
                                                    Legal authorities, if required by law or in response to a valid legal request
                                                </ListGroup.Item>
                                                <ListGroup.Item as="li">
                                                    Other parties with your consent or at your direction
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Third-Party Links and Services</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">Our Website may contain links to third-party websites or services. We are not responsible for the privacy practices or the content of such third-party websites. We encourage you to review the privacy policies of those websites before providing any personal information.</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Data Security</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>Children's Privacy</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">Our Website is not intended for individuals under the age of [13 or the age of consent in your jurisdiction]. We do not knowingly collect or solicit personal information from children. If we become aware that we have collected personal information from a child, we will promptly delete it.</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="6">
                                <Accordion.Header>Your Choices and Rights</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">
                                            You may update or correct your personal information by accessing your account settings on our Website. You may also unsubscribe from our promotional emails by following the instructions provided in the emails.
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li">
                                            Subject to applicable laws, you may have the right to access, rectify, erase, or restrict the processing of your personal information. You may also have the right to receive a copy of your personal information in a structured, commonly used, and machine-readable format.
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="7">
                                <Accordion.Header>Changes to this Privacy Policy</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">We may update this Privacy Policy from time to time by posting the revised version on our Website. The updated Privacy Policy will be effective as of the Last Updated date stated at the top of this Policy.</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="8">
                                <Accordion.Header>Contact Us</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li">If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at <Link to={'/contactus'}> Contact Us Page</Link>.</ListGroup.Item>
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