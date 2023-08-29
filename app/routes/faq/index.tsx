import { MetaFunction } from "@remix-run/server-runtime";
import { Accordion, AccordionHeader, AccordionBody, List, ListItem } from "@material-tailwind/react";
import { APP_META_TITLE } from "~/constants";
import { useState } from "react";

export const meta: MetaFunction = () => {
    return {
        title: `FAQ - ${APP_META_TITLE}`
    };
};

export default function FAQ() {
    const [open, setOpen] = useState(0);
    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

    return (
        <>
            <div className="block w-full mx-auto max-w-screen-xl p-2 lg:pl-6 text-gray-900 mt-4">
                <Accordion open={open === 0}>
                    <AccordionHeader onClick={() => handleOpen(0)}>How do I make a purchase ?</AccordionHeader>
                    <AccordionBody>
                        <List>
                            <ListItem className="p-2">Once you've found the crystal you'd like to purchase,
                                click on its image to view more details.
                                Select the desired quantity and click the "Add to Cart" button.
                                To complete your purchase, go to the shopping cart icon at the top of the app and click "Checkout."
                                Follow the prompts to enter your shipping and payment information.
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 1}>
                    <AccordionHeader onClick={() => handleOpen(1)}>How to Clean and Care for Your Crystals?</AccordionHeader>
                    <AccordionBody>
                        <List>
                            <ListItem className="p-2">
                                Start by gently rinsing the crystal under lukewarm water.
                                Use a soft cloth or brush to remove any dirt or dust.
                                You can also cleanse the crystal using methods like smudging or placing it under moonlight.
                                Avoid exposing delicate crystals to direct sunlight or harsh chemicals.
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2}>
                    <AccordionHeader onClick={() => handleOpen(2)}>How to Choose the Right Crystal for Your Needs?</AccordionHeader>
                    <AccordionBody>
                        <List>
                            <ListItem className="p-2">
                                Research the properties and benefits of different crystals.
                                Consider your intentions or the specific energies you're seeking.
                                Trust your intuition and choose a crystal that resonates with you.
                                You can also consult our Crystal Guide for more information.
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>


                <Accordion open={open === 3}>
                    <AccordionHeader onClick={() => handleOpen(3)}>If you encounter any technical issues or have trouble accessing your account, please try the following steps</AccordionHeader>

                    <AccordionBody>
                        <List>
                            <ListItem className="p-2">
                                Ensure you have a stable internet connection.
                                Update your app to the latest version available.
                                Clear the cache and data of the app or restart your device.
                                If the issue persists, please contact our customer support for further assistance.
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>

            </div>
        </>
    )
}