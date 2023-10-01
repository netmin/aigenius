import prismadb from "@/lib/prismadb";
import {SubscriptionStatus} from "@prisma/client";
import {checkout} from "@/lib/yookassa";
import {NextResponse} from "next/server";

export async function GET() {
    console.log('START CRON')
    const currentDate = new Date();
    const subscriptions = await prismadb.userSubscription.findMany({
        where: {
            status: SubscriptionStatus.ACTIVE,
            expirationDate: {
                lte: currentDate // less than or equal to current date
            }
        }
    });

    for (const subscription of subscriptions) {
        if (!subscription.paymentMethodId) {
            console.error(`Subscription ${subscription.id} does not have a valid paymentMethodId`);
            continue;
        }
        try {
           await checkout.createPayment({
                "amount": {
                    "value": subscription.price.toString(),
                    "currency": subscription.currency
                },
                "capture": true,
                "payment_method_id": subscription.paymentMethodId,
                "description": "AIGenius PRO",
            })
            return NextResponse.json({ ok: true });

        } catch (error) {
            console.error("Error handling subscription", subscription.id, error);
            return new NextResponse("Internal Error", {status: 500});
        }
    }
}