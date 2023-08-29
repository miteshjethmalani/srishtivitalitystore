import { Link } from "@remix-run/react";
import { MetaFunction } from "@remix-run/server-runtime";
import { useState } from "react";
import { APP_META_TITLE } from "~/constants";
import { Accordion, AccordionHeader, AccordionBody, List, ListItem, Typography } from '@material-tailwind/react';

export const meta: MetaFunction = () => {
    return {
        title: `Privacy Policy - ${APP_META_TITLE}`
    };
};

export default function PrivacyPolicy() {
    const [open, setOpen] = useState(0);
    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);


    return (
        <>
            <div className="block w-full mx-auto max-w-screen-xl p-2 lg:pl-6 text-gray-900 mt-4">
                <Typography variant="h3" className="text-center">PRIVACY POLICY FOR {APP_META_TITLE} ECOMMERCE WEBSITE</Typography>
                <div className="mt-4">
                    We are committed to protecting the privacy of our users.
                    This Privacy Policy ("Policy") explains how we collect, use, disclose, and safeguard your personal information when you use our Website.
                    By accessing or using the Website, you consent to the practices described in this Policy.
                </div>
            </div>
            <div className="mt-4 block w-full rounded-xl shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border border-white/80 bg-white mx-auto max-w-screen-xl p-2 lg:pl-6 text-gray-900">
                <Accordion open={open === 0}>
                    <AccordionHeader onClick={()=> handleOpen(0)}>Information We Collect</AccordionHeader>
                    <AccordionBody>
                        <List>
                            <ListItem className="p-2">Personal Information: We may collect personal information, such as your name, email address, shipping address, and payment information when you place an order or create an account on our Website.</ListItem>
                            <ListItem className="p-2"> Non-Personal Information: We may automatically collect non-personal information, such as your IP address, browser type, device information, and website usage data, through cookies and similar technologies.</ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 1}>
                    <AccordionHeader onClick={() => handleOpen(1)}>
                        Use of Information
                    </AccordionHeader>
                    <AccordionBody>
                        We use the collected information to:
                        <List>
                            <ListItem className="p-2">Process and fulfill your orders</ListItem>
                            <ListItem className="p-2">Communicate with you about your orders and provide customer support</ListItem>
                            <ListItem className="p-2">Improve and personalize your experience on our Website</ListItem>
                            <ListItem className="p-2">Send you promotional offers, newsletters, and updates with your consent</ListItem>
                            <ListItem className="p-2">Monitor and analyze usage trends and enhance the functionality of our Website</ListItem>
                            <ListItem className="p-2">Comply with legal obligations</ListItem>
                        </List>

                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2}>
                    <AccordionHeader onClick={() => handleOpen(2)}>
                        Disclosure of Information
                    </AccordionHeader>
                    <AccordionBody>
                        We may disclose your personal information to:
                        <List >
                            <ListItem className="p-2">
                                Third-party service providers who assist us in operating our business, such as payment processors, shipping partners, and marketing platforms
                            </ListItem>
                            <ListItem className="p-2">
                                Legal authorities, if required by law or in response to a valid legal request
                            </ListItem>
                            <ListItem className="p-2">
                                Other parties with your consent or at your direction
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 3}>
                    <AccordionHeader onClick={() => handleOpen(3)}>
                        Third-Party Links and Services
                    </AccordionHeader>
                    <AccordionBody>
                        <List >
                            <ListItem className="p-2">
                                Our Website may contain links to third-party websites or services. We are not responsible for the privacy practices or the content of such third-party websites. We encourage you to review the privacy policies of those websites before providing any personal information.
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 4}>
                    <AccordionHeader onClick={() => handleOpen(4)}>Data Security</AccordionHeader>
                    <AccordionBody>
                        <List >
                            <ListItem className="p-2">We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 5} >
                    <AccordionHeader onClick={() => handleOpen(5)}>Children's Privacy</AccordionHeader>
                    <AccordionBody>
                        <List >
                            <ListItem className="p-2">Our Website is not intended for individuals under the age of [13 or the age of consent in your jurisdiction]. We do not knowingly collect or solicit personal information from children. If we become aware that we have collected personal information from a child, we will promptly delete it.</ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 6}>
                    <AccordionHeader onClick={() => handleOpen(6)}>Your Choices and Rights</AccordionHeader>
                    <AccordionBody>
                        <List >
                            <ListItem className="p-2">
                                You may update or correct your personal information by accessing your account settings on our Website. You may also unsubscribe from our promotional emails by following the instructions provided in the emails.
                            </ListItem>
                            <ListItem className="p-2">
                                Subject to applicable laws, you may have the right to access, rectify, erase, or restrict the processing of your personal information. You may also have the right to receive a copy of your personal information in a structured, commonly used, and machine-readable format.
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 7}>
                    <AccordionHeader onClick={() => handleOpen(7)}>Changes to this Privacy Policy</AccordionHeader>
                    <AccordionBody>
                        <List >
                            <ListItem className="p-2">We may update this Privacy Policy from time to time by posting the revised version on our Website. The updated Privacy Policy will be effective as of the Last Updated date stated at the top of this Policy.</ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 8}>
                    <AccordionHeader onClick={() => handleOpen(8)}>Contact Us</AccordionHeader>
                    <AccordionBody>
                        <List >
                            <ListItem className="p-2">If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at <Link to={'/contactus'}> Contact Us Page</Link>.</ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
            </div>
        </>
    )
}