import {
    S3Client,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getAuth } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT as string,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
    },
});

const BUCKET = process.env.R2_BUCKET as string;

async function uploadToS3(file: File, fileKey: string): Promise<string> {
    try {
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        const uniqueId = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        const fileName = `${fileKey}-${uniqueId}`;

        // Convert file to buffer
        const fileBuffer = Buffer.from(await file.arrayBuffer());

        const uploadParams = {
            Bucket: BUCKET,
            Key: `uploads/${fileName}`,
            Body: fileBuffer,
            ContentType: file.type,
        };

        await s3.send(new PutObjectCommand(uploadParams));

        // Return the S3 URL
        return `https://cdn.envi.wfrk.live/uploads/${fileName}`;
    } catch (Error) {
        console.error("Error uploading file to S3:", Error);
        return "";
    }
}

export async function POST(req: NextRequest) {
    const user = await getAuth(req);

    try {
        // Verify content type
        const contentType = req.headers.get('content-type');
        if (!contentType?.includes('multipart/form-data')) {
            return NextResponse.json(
                { error: "Content type must be multipart/form-data" },
                { status: 400 }
            );
        }

        const formData = await req.formData();

        // Extract text fields
        const companyName = formData.get("companyName") as string;
        const description = formData.get("description") as string;
        const address = formData.get("address") as string;
        const tan = formData.get("tan") as string;
        const registrationId = formData.get("registrationId") as string;
        const category = formData.get("category") as string;
        const target = formData.get("target") as string;

        // Validate required fields
        if (!companyName || !description || !address || !tan || !registrationId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Handle file uploads
        const files = ["logo", "incorporationCertificate", "pitchDeck"];
        const uploadedFiles: Record<string, string> = {};

        for (const fileKey of files) {
            const file = formData.get(fileKey) as File;
            if (!file || !(file instanceof File)) {
                return NextResponse.json(
                    { error: `Missing or invalid file: ${fileKey}` },
                    { status: 400 }
                );
            }

            // Validate file size (e.g., 10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                return NextResponse.json(
                    { error: `File ${fileKey} exceeds 10MB limit` },
                    { status: 400 }
                );
            }

            // Upload file to S3 and store the URL
            uploadedFiles[fileKey] = await uploadToS3(file, fileKey);
        }

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/register_startup`, {
            ext_id: user.userId,
            category,
            name: companyName,
            tan,
            reg_no: registrationId,
            address,
            description,
            logo_url: uploadedFiles.logo,
            incoperate_cert: uploadedFiles.incorporationCertificate,
            pitch_deck: uploadedFiles.pitchDeck,
            target: parseFloat(target),
            status: "approved",
        });

        return NextResponse.json(
            {
                message: "Startup registered successfully"
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error processing startup registration:", error);
        return NextResponse.json(
            { error: "Failed to process startup registration" },
            { status: 500 }
        );
    }
}

export const runtime = "nodejs";
