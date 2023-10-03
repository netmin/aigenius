import prismadb from "@/lib/prismadb";
import {SubscriptionStatus} from "@prisma/client";
import {checkout} from "@/lib/yookassa";
import {NextResponse} from "next/server";

export async function GET() {
    const currentDate = new Date();
    const errors = [];
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
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'message' in error) {
                errors.push(`Error handling subscription ${subscription.id}: ${error.message}`);
            } else {
                errors.push(`Error handling subscription ${subscription.id}: ${String(error)}`);
            }
        }
    }
    if (errors.length > 0) {
        return NextResponse.json({ok: false, errors: errors});
    }

    return NextResponse.json({ok: true});
}