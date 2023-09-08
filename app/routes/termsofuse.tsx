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
            <div className="block w-full mx-auto max-w-screen-xl p-2  text-gray-900 mt-4">

                <Typography variant="h2" className="text-center">Terms And Conditions</Typography>
                <Typography variant="h6" className="text-gray-500 mt-4">
                    Last updated on Aug 31st 2023
                </Typography>
                <Typography variant="paragraph" className="mt-2">
                    The Website Owner, including subsidiaries and affiliates (“Website” or
                    “Website Owner” or “we” or “us” or “our”) provides the information contained
                    on the website or any of the pages comprising the website (“website”) to
                    visitors (“visitors”) (cumulatively referred to as “you” or “your”
                    hereinafter) subject to the terms and conditions set out in these website
                    terms and conditions, the privacy policy and any other relevant terms and
                    conditions, policies and notices which may be applicable to a specific
                    section or module of the website.
                </Typography>
                <Typography variant="paragraph" className="mt-2">
                    Welcome to our website. If you continue to browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Srishti Jethmalani''s relationship with you in relation to this website.
                </Typography>
                <Typography variant="paragraph" className="mt-2">
                    The term 'Srishti Jethmalani' or 'us' or 'we' refers to the owner of the website whose registered/operational office is B-2103, Skylon Spaces, Road No. 4, Hemu Kalani Marg, Irani Wadi, Kandivali West. Mumbai MAHARASHTRA 400067. The term 'you' refers to the user or viewer of our website.
                </Typography>
                <Typography variant="lead" className="mt-2">
                    The use of this website is subject to the following terms of use:
                </Typography>
                <List className="mt-2">
                    <ListItem>
                        The content of the pages of this website is for your general information and use only. It is subject to change without notice.
                    </ListItem>
                    <ListItem>
                        Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                    </ListItem>
                    <ListItem>
                        Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.
                    </ListItem>
                    <ListItem>
                        This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
                    </ListItem>
                    <ListItem>
                        All trademarks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.
                    </ListItem>
                    <ListItem>
                        Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
                    </ListItem>
                    <ListItem>
                        From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information.
                    </ListItem>
                    <ListItem>
                        You may not create a link to this website from another website or document without Srishti Jethmalani’s prior written consent.
                    </ListItem>
                    <ListItem>
                        Your use of this website and any dispute arising out of such use of the website is subject to the laws of India or other regulatory authority.
                    </ListItem>
                </List>
                <Typography variant="paragraph" className="mt-2">
                    We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time
                </Typography>

                {/* <div className="row justify-content-center mt-5">
                    <div className="">
                        Welcome to our Srishtivitality Ecommerce Website.
                        The following Terms of Use ("Terms") govern your access to and use of the Website.
                        By accessing or using the Website, you agree to be bound by these Terms.
                        If you do not agree with these Terms, please do not use the Website.
                    </div>*/}
                    <div className="mt-2">
                        <Accordion open={open === 0}>
                            <AccordionHeader onClick={() => handleOpen(0)}>Product Information</AccordionHeader>
                            <AccordionBody>
                                <List>
                                    <ListItem className="p-2">
                                        The Website provides information about crystals, including their properties and appearance. However, please note that the information provided is for general purposes only and does not constitute professional advice.
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
            {/* </div> */}
        </>
    )
}