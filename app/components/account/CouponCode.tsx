import { Button, Chip, Input } from "@material-tailwind/react";
import { Form } from "@remix-run/react";
import { map } from "lodash";
import { FormEvent, useState } from "react";

type CouponCodeProps = {
    activeOrder?: any
    className?: string
    activeOrderFetcher: any
};


export default function CouponCode({
    activeOrder,
    activeOrderFetcher,
}: CouponCodeProps) {
    const [couponCodeString, setCouponCodeString] = useState("")
    const removeCouponCode = (couponCode: string) => {

        activeOrderFetcher.submit({ action: "removeCouponCode", couponCode }, {
            method: 'post',
            action: '/api/active-order',
        });
    }

    if (activeOrder?.couponCodes?.length) {
        const couponChip: Array<any> = map(activeOrder?.couponCodes, (couponCode) => {
            return <Chip color="gray" value={couponCode} onClose={() => removeCouponCode(couponCode)} />
        })

        return (
            <>
                <div className="mt-10 border-t border-gray-200 pt-10">Coupon Applied</div>
                <div className="flex items-end gap-2 mt-5">
                    {couponChip}
                </div>
            </>
        )
    }

    return (
        <>
            <Form onSubmit={(event: FormEvent) => {
                // We don't want to let default form submission happen here,
                // which would refresh the page.
                event.preventDefault();
                activeOrderFetcher.submit({ action: "addCouponCode", couponCode: couponCodeString }, {
                    method: 'post',
                    action: '/api/active-order',
                });

            }} method="post"
                action="/api/active-order">
                <div className="mt-10 border-t border-gray-200 pt-10">Add Coupon</div>
                <div className="mt-5">
                    <Input label="Coupon Code" onChange={(event) => setCouponCodeString(event.target.value)} name='couponCode'></Input>
                    <Button type='submit' color="purple" className="mt-5">Apply</Button>
                </div>
            </Form>
        </>
    )
}

