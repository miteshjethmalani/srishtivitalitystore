import { Typography } from '@material-tailwind/react';

export default function SignInPage() {
    return (
        <div className="block w-full mx-auto max-w-screen-xl p-2 lg:pl-6 text-gray-900 mt-4">
            <Typography variant="h2" className="text-center">
                Shipping & Delivery Policy
            </Typography>
            <Typography variant="h6" className="text-gray-500 mt-4">
                Last updated on Aug 31st 2023
            </Typography>
            <Typography variant="h6" className="mt-4">
                For International buyers, orders are shipped and delivered through registered international courier companies and / or International speed post only.For domestic buyers, orders are shipped through registered domestic courier companies and / or speed post only.Orders are shipped within 3 - 5 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.Srishti Jethmalani is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 3 - 5 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.Delivery of all orders will be to the address provided by the buyer.Delivery of our services will be confirmed on your mail ID as specified during registration.For any issues in utilizing our services you may contact our helpdesk on or
                support@srishtivitality.in
            </Typography>
        </div>
    )
}

