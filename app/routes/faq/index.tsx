import { MetaFunction } from "@remix-run/server-runtime";
import { Accordion, Container } from "react-bootstrap";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import { APP_META_TITLE } from "~/constants";

export const meta: MetaFunction = () => {
    return {
        title: `FAQ - ${APP_META_TITLE}`
    };
};

export default function FAQ() {
    return (
        <Container className="mt-4">
            <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>How do I make a purchase ?</Accordion.Header>
                    <Accordion.Body>
                        Once you've found the crystal you'd like to purchase,
                        click on its image to view more details.
                        Select the desired quantity and click the "Add to Cart" button.
                        To complete your purchase, go to the shopping cart icon at the top of the app and click "Checkout."
                        Follow the prompts to enter your shipping and payment information.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>How to Clean and Care for Your Crystals?</Accordion.Header>
                    <Accordion.Body>
                        Start by gently rinsing the crystal under lukewarm water.
                        Use a soft cloth or brush to remove any dirt or dust.
                        You can also cleanse the crystal using methods like smudging or placing it under moonlight.
                        Avoid exposing delicate crystals to direct sunlight or harsh chemicals.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>How to Choose the Right Crystal for Your Needs?</Accordion.Header>
                    <Accordion.Body>
                        Research the properties and benefits of different crystals.
                        Consider your intentions or the specific energies you're seeking.
                        Trust your intuition and choose a crystal that resonates with you.
                        You can also consult our Crystal Guide for more information.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>    If you encounter any technical issues or have trouble accessing your account, please try the following steps</Accordion.Header>
                    <Accordion.Body>
                        Ensure you have a stable internet connection.
                        Update your app to the latest version available.
                        Clear the cache and data of the app or restart your device.
                        If the issue persists, please contact our customer support for further assistance.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}