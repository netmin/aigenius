import { v4 as uuidv4 } from 'uuid';
import {auth, currentUser} from "@clerk/nextjs";
import {NextResponse} from "next/server";

import prismadb from "@/lib/prismadb";
import {checkout} from "@/lib/yookassa";
import {absoluteUrl} from "@/lib/utils";



export async function GET() {
    const settingsUrl = absoluteUrl("/settings");
    try {
        const {userId} = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId
            }
        })

        const idempotenceKey = uuidv4()

        if (userSubscription && userSubscription.paymentMethodId) {

            await checkout.createPayment({
                "amount": {
                    "value": "499.00",
                    "currency": "RUB"
                },
                "capture": true,
                "payment_method_id": userSubscription.paymentMethodId,
                "description": "AIGenius PRO",
                "metadata": {
                    "userId": userId
                },
            }, idempotenceKey)

             return NextResponse.json({ok: true});
        }

        const payment = await checkout.createPayment({
            "amount": {
                "value": "499.00",
                "currency": "RUB"
            },
            "confirmation": {
                "type": "redirect",
                "return_url": settingsUrl
            },
            "capture": true,
            "description": "AIGenius PRO",
            "save_payment_method": true,
            "metadata": {
                "userId": userId
            },
        }, idempotenceKey)

        return new NextResponse(JSON.stringify({url: payment.confirmation.confirmation_url}))
    } catch (error) {
        console.log("[YOOKASSA_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}