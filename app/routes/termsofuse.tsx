import { MetaFunction } from "@remix-run/server-runtime";
import { Accordion, Typography, AccordionHeader, AccordionBody, List, ListItem } from "@material-tailwind/react";
import { APP_META_TITLE } from "~/constants";
import { useState } from "react";

export const meta: MetaFunction = () => {
    return {
        title: `Terms And Conditions - ${APP_META_TITLE}`
    };
};

export default function TermsOfUse() {
    const [open, setOpen] = useState(0);
    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

    return (
        <>
            <div className="block w-full mx-auto max-w-screen-xl p-2 lg:pl-6 text-gray-900 mt-4">

                <Typography variant="h2" className="text-center">Terms And Conditions</Typography>
                <div className="row justify-content-center mt-5">
                    <div className="">
                        Welcome to our Srishtivitality Ecommerce Website.
                        The following Terms of Use ("Terms") govern your access to and use of the Website.
                        By accessing or using the Website, you agree to be bound by these Terms.
                        If you do not agree with these Terms, please do not use the Website.
                    </div>
                    <div className="mt-2">
                        <Accordion open={open === 0}>
                            <AccordionHeader onClick={() => handleOpen(0)}>Product Information</AccordionHeader>
                            <AccordionBody>
                                <List>
                                    <ListItem className="p-2">
                                        The Website provides information about crystals, including their properties, origins, and appearance. However, please note that the information provided is for general purposes only and does not constitute professional advice.
                                    </ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 1}>
                            <AccordionHeader onClick={() => handleOpen(1)}>Ordering and Purchasing</AccordionHeader>
                            <AccordionBody>
                                <List>
                                    <ListItem className="p-2">You may place orders for crystals through the Website, subject to availability and our acceptance</ListItem>
                                    <ListItem className="p-2">Prices are displayed on the Website and are subject to change without notice.</ListItem>
                                    <ListItem className="p-2">You are responsible for providing accurate and complete information during the ordering process.</ListItem>
                                    <ListItem className="p-2">We reserve the right to refuse or cancel any order at our discretion.</ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 2}>
                            <AccordionHeader onClick={() => handleOpen(2)}>Shipping and Delivery</AccordionHeader>
                            <AccordionBody>
                                <List>
                                    <ListItem className="p-2">We will make reasonable efforts to ship the ordered crystals within the specified timeframe.</ListItem>
                                    <ListItem className="p-2">Shipping costs, methods, and estimated delivery times will be provided during the checkout process.</ListItem>
                                    <ListItem className="p-2">We are not responsible for any delays, losses, or damages that occur during shipping.</ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 3}>
                            <AccordionHeader onClick={() => handleOpen(3)}>Returns and Refunds</AccordionHeader>
                            <AccordionBody>
                                <List>
                                    <ListItem className="p-2">We do not accept returns of crystals in accordance with our Return and Refund Policy</ListItem>

                                </List>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 4}>
                            <AccordionHeader onClick={() => handleOpen(4)}>Product Disclaimers and Use</AccordionHeader>
                            <AccordionBody>
                                <List>
                                    <ListItem className="p-2">Crystals are natural products, and their properties and effects may vary.</ListItem>
                                    <ListItem className="p-2">The use of crystals is not a substitute for professional medical or psychological advice.</ListItem>
                                    <ListItem className="p-2">We do not make any claims about the effectiveness or healing properties of the crystals.</ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 5}>
                            <AccordionHeader onClick={() => handleOpen(5)}>Intellectual Property Rights</AccordionHeader>
                            <AccordionBody>
                                <List>
                                    <ListItem className="p-2">Crystals are natural products, and their properties and effects may vary.</ListItem>

                                    <ListItem className="p-2">All content on the Website, including images, text, and logos, is protected by intellectual property laws and belongs to us.</ListItem>
                                    <ListItem className="p-2">You may not reproduce, distribute, or use any content from the Website without our explicit permission.</ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 6}>
                            <AccordionHeader onClick={() => handleOpen(6)}>User Conduct and Responsibilities</AccordionHeader>
                            <AccordionBody>
                                <List>
                                    <ListItem className="p-2">You agree not to engage in any unauthorized or unlawful activities on the Website.</ListItem>
                                    <ListItem className="p-2">You are responsible for maintaining the confidentiality of your account information, including your login credentials.</ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 7}>
                            <AccordionHeader onClick={() => handleOpen(7)}>Limitation of Liability</AccordionHeader>
                            <AccordionBody>
                                <List>
                                    <ListItem className="p-2">To the fullest extent permitted by law, we are not liable for any damages, losses, or liabilities arising from the use of the Website or the purchase of crystals.</ListItem>
                                    <ListItem className="p-2">We are not responsible for any inaccuracies or errors in the content provided on the Website.</ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 8}>
                            <AccordionHeader onClick={() => handleOpen(8)}>Termination</AccordionHeader>
                            <AccordionBody>
                                <List>
                                    <ListItem className="p-2">We may terminate or suspend your access to the Website without prior notice if you violate these Terms or engage in any fraudulent or harmful activities.</ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 9}>
                            <AccordionHeader onClick={() => handleOpen(9)}>Changes to the Terms of Use</AccordionHeader>
                            <AccordionBody>
                                <List>
                                    <ListItem className="p-2">We reserve the right to modify or update these Terms at any time. Any changes will be effective upon posting the revised Terms on the Website. Your continued use of the Website after the changes will constitute your acceptance of the modified Terms.</ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                    </div>
                </div >
            </div>
        </>
    )
}