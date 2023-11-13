import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { sessionStorage } from '~/sessions';

export async function loader({ params, request }: DataFunctionArgs) {
  // const formData = await request.formData();
  console.log("IN--------", params.orderCode)
  // console.log("metadata: "+formData.get("udf1"))

  // console.log("activeOrder",await getActiveOrder({ request }))
  // const order = await getOrderByCode(`${params.orderCode}`, { request });
  return json({ abc: true });
}

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  let headers: ResponseInit['headers'] = {};
  if (formData.get("udf1")) {

    const session = await sessionStorage.getSession(
      formData.get("udf1"),
    );
    if (session) {
      headers['Set-Cookie'] = formData.get("udf1") + "";
    }

    const description: string = formData.get("description") + "";

    const orderCode = description?.split(":")[1].trim();
    return redirect(`/checkout/validatepayment/${orderCode}`, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }
  return json({});
}

export default function CheckoutPaymentResponse() {

  return (
    <div className="flex flex-col items-center divide-gray-200 divide-y">
      Please wait while we are fetching the data.
    </div>
  );
}
