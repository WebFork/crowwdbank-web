import { getAuth } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await getAuth(req);
    const datas = await req.json();

    const knowledge_base = `
        Name of the Company: ${datas.startupData.name}
        Company Category: ${datas.startupData.category}
        Company Description: ${datas.startupData.description}
        valuation: ${datas.startupData.valuation}
        target_amount: ${datas.startupData.target}
        raised_amount: ${datas.startupData.raised}
    `;

    const data = {
        ext_id: user.userId,
        project_id: datas.startupData.project_id,
        prompt: datas.message,
        knowledge_base,
    }

    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/responder/getresponse`, data);
    return NextResponse.json({ message: res.data.response });
}
