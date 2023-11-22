import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@material-tailwind/react"
import { Order, OrderLine } from "~/generated/graphql";

export function QuantityChange({
    adjustOrderLine,
    activeOrder,
    selectedVariantId,
    disabled,
}: {
    adjustOrderLine?: (lineId: string, quantity: number) => void;
    activeOrder?: any;
    selectedVariantId: string;
    disabled: boolean;
}) {
    const qtyLine = activeOrder?.lines.find((l: OrderLine) => l.productVariant.id === selectedVariantId)
    const qtyInCart = qtyLine?.quantity ?? 0;

    return (
        <div className="flex">
            <div className='flex'>
                <Button onClick={() => {
                    !disabled && 
                     adjustOrderLine &&
                        adjustOrderLine(qtyLine?.id + "", +qtyInCart - 1)
                }} className="rounded-full rounded-r-none bg-purple-600 h-10 py-1 px-2">
                    <span className=" grid  w-5 bg-purple-600">
                        <MinusCircleIcon />
                    </span>
                </Button>
            </div>
            <Input
                type="number"
                placeholder=""
                variant='outlined'
                disabled={disabled}
                onChange={(e) =>
                    adjustOrderLine &&
                    adjustOrderLine(qtyLine?.id + "", +e.target.value)
                }
                className="min-w-0 rounded-l-none rounded-r-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
                containerProps={{
                    className: "min-w-0",
                }}
                value={qtyInCart}
            />
            <div className='flex'>
                <Button onClick={() => {
                    !disabled &&
                    adjustOrderLine &&
                        adjustOrderLine(qtyLine?.id + "", +qtyInCart + 1)
                }} className="rounded-full rounded-l-none bg-purple-600 h-10 py-1 px-2">
                    <span className="  grid  w-5 bg-purple-600">
                        <PlusCircleIcon />
                    </span>
                </Button>
            </div>
        </div>
    )
}