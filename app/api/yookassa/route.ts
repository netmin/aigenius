import {auth, currentUser} from "@clerk/nextjs";
import {NextResponse} from "next/server";

import prismadb from "@/lib/prismadb";
import {checkout} from "@/lib/yookassa";
import {absoluteUrl} from "@/lib/utils";
import useSWRSubscription from "swr/subscription";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
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

        if (userSubscription && userSubscription.paymentMethodId) {
            const payment = await checkout.createPayment({
                "amount": {
                    "value": "2.00",
                    "currency": "RUB"
                },
                "capture": true,
                "payment_method_id": userSubscription.paymentMethodId,
                "description": "AIGenius PRO",
            })

            return new NextResponse(JSON.stringify({url: payment.confirmation.confirmation_url}))
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
            "save_payment_method": true
        })

        return new NextResponse(JSON.stringify({url: payment.confirmation.confirmation_url}))
    } catch (error) {
        console.log("[YOOKASSA_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
};