import type Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import axios from "axios";

export async function POST(req: Request) {
    const body = await req.text();
    const sig = (await headers()).get("Stripe-Signature") ?? "";

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SIGNING_SECRET || '');
    } catch (err) {
        return new Response(
            `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'
            }`,
            { status: 400 }
        );
    }

    try {

        const session = event.data.object as Stripe.Checkout.Session;

        if (event.type === "checkout.session.completed") {
            if (!session.metadata?.transaction_id || !session.metadata?.startup_id || !session.metadata?.userId || !session.metadata?.investment_amount) {
                return new Response(
                    null,
                    { status: 200 }
                );
            }

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/webhook/transact`, {
                transaction_id: session.metadata.transaction_id,
                project_id: session.metadata.startup_id,
                ext_id: session.metadata.userId,
                amount: session.metadata.investment_amount,
                status: "success"
            })
        }
    } catch (err) {
        console.error(err);
    }

    return new Response(null, { status: 200 });
}
