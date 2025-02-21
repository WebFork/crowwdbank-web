import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
        );
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", {
            status: 400,
        });
    }

    // Get the ID and type
    const eventType = evt.type;

    if (eventType === "user.created") {
        const { id, email_addresses, image_url, first_name, last_name } = evt.data;

        const user = {
            ext_id: id,
            email: email_addresses[0].email_address,
            first: first_name,
            last: last_name,
            pic_url: image_url,
            onboarding_complete: false,
        };

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/webhook/clerk`, user);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }

        return NextResponse.json({ message: "OK"});
    }

    // if (eventType === "user.updated") {
    //     const { id, image_url, first_name, last_name, username } = evt.data;

    //     const user = {
    //         name: first_name + " " + last_name,
    //         username: username!,
    //         photo: image_url,
    //     };

    //     const updatedUser = await updateUser(id, user);

    //     return NextResponse.json({ message: "OK", user: updatedUser });
    // }

    // if (eventType === "user.deleted") {
    //     const { id } = evt.data;

    //     const deletedUser = await deleteUser(id!);

    //     return NextResponse.json({ message: "OK", user: deletedUser });
    // }

    // return new Response("", { status: 200 });
}
