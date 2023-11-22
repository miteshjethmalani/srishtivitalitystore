import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { sessionStorage } from "~/sessions";


export const action = async ({ request }: ActionArgs) => {
    const session = await sessionStorage.getSession(
        request?.headers.get('Cookie'),
    );
    session.set("cookie-consent", true);
    console.log("data",session.data);
    return redirect(
        "/",{
        headers: {
            "Set-Cookie": await sessionStorage.commitSession(session),
          }}
    );

};
