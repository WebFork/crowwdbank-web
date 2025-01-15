import { stripe } from "@/lib/stripe";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export async function POST(req: NextRequest) {
    const user = await getAuth(req);
    const data = await req.json();

    if (!user) {
        return NextResponse.json(
            {
                message: "Unauthorized",
            },
            { status: 401 }
        );
    }

    const transactionid = v4();

    try {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: data.startupData.name,
                        images: [data.startupData.logo_url],
                    },
                    unit_amount: data.amount * 100,
                },
                quantity: 1,
            },
            ],
            metadata: {
                startup_id: data.startupData.project_id,
                investment_amount: data.amount,
                transaction_id: transactionid,
                userId: user.userId,
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/transaction/${transactionid}/success`
        });

        return NextResponse.json({ url: session.url });
    }
    catch (error) {
        console.error("Stripe session creation failed:", error);
        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}
