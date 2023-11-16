import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { getPayAidApiToken } from '~/providers/checkout/checkout';
import { sessionStorage } from '~/sessions';

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  let headers: ResponseInit['headers'] = {};
  const session = await sessionStorage.getSession(
    formData.get("udf1"),
  );
  if (session) {
    headers['Set-Cookie'] = formData.get("udf1") + "";
  }
  if (formData.get("response_code") == "0") {


    const description: string = formData.get("description") + "";
    const transaction_id: string = formData.get("transaction_id") + "";
    const columns = [
      "address_line_1",
      "address_line_2",
      "amount",
      "api_key",
      "city",
      "country",
      "currency",
      "description",
      "email",
      "mode",
      "name",
      "order_id",
      "phone",
      "return_url",
      "state",
      "udf1",
      "zip_code",
    ];
    const reqData: any = {};
    columns.forEach(function (entry) {
      reqData[entry] = formData.get(entry);
    });
    const orderCode = JSON.parse(description).orderCode;
    reqData.code = orderCode;
    reqData.udf1 = decodeURIComponent(reqData["udf1"]);
    reqData.amount = +reqData["amount"];
    reqData.order_id = reqData["order_id"];

    const responseHash: any = await getPayAidApiToken(
      { metadata: reqData, method: "payaidvalidate" },
      {
        request,
      });
    return redirect(`/checkout/validatepayment/${orderCode}/${transaction_id}/${responseHash.generatePayAidClientToken.hash}`, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }else{
    return redirect(`/checkout/paymentfailed`, {
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
