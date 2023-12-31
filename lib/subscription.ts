import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { SubscriptionStatus } from "@prisma/client";
import {checkout} from "@/lib/yookassa";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async (): Promise<boolean> => {
    const { userId } = auth();
    if (!userId) {
        return false;
    }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      paymentMethodId: true,
      expirationDate: true,
      status: true,
      price: true,
    },
  })

  if (!userSubscription) {
    return false;
  }

  return Boolean(userSubscription.paymentMethodId &&
      (userSubscription.expirationDate?.getTime()! + DAY_IN_MS > Date.now()));
};

export async function handleSubscriptions() {
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

        } catch (error) {
            console.error("Error handling subscription", subscription.id, error);
        }
    }
}