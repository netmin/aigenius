import OpenAI from "openai";
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import {checkApiLimit, incrementApiLimit} from "@/lib/api-limit";



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: Request) {
    try {
        const {userId} = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const body = await req.json()
        const {messages} = body

        if (!messages) {
            return new NextResponse("Message are required", {status: 400})
        }

        const freeTrial = await checkApiLimit()

        if (!freeTrial) {
            return new NextResponse("Free trial has expired", {status: 403})
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        })
        await incrementApiLimit()
        return NextResponse.json(response.choices[0].message)
    } catch (error) {
         console.log("[CONVERSATION_ERROR", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}