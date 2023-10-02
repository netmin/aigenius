import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb"
import {SubscriptionStatus} from '@prisma/client';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.event || !body.object || !body.object.id) {
            console.error("Invalid notification body", body);
            return new NextResponse(null, {status: 400});
        }

        const {event, object} = body;

        if (!object.metadata || !object.metadata.userId) {
            console.error("metadata or userId is undefined in the received object", object);
            return new NextResponse(null, {status: 400}); // Bad Request
        }

        // @ts-ignore
        let userSubscription = await prismadb.userSubscription.findUnique({
            where: {paymentMethodId: object.payment_method.id},
        });

        switch (event) {
            case "payment.succeeded":
                const createdDate = new Date(object.created_at);
                const expirationDate = new Date(createdDate);
                expirationDate.setDate(createdDate.getDate() + 30);

                const newData = {
                    status: SubscriptionStatus.ACTIVE,
                    lastPaymentDate: new Date(object.created_at),
                    expirationDate: expirationDate,
                    price: object.amount.value,
                    currency: object.amount.currency,
                    description: object.description,
                };

                if (userSubscription) {
                    await prismadb.userSubscription.update({
                        where: {id: userSubscription.id},
                        data: newData,
                    });
                } else {
                    await prismadb.userSubscription.create({
                        data: {
                            ...newData,
                            userId: object.metadata.userId,
                            paymentMethodId: object.payment_method.id,
                        },
                    });
                }
                break;
            case "payment.canceled":
                if (userSubscription) {
                    await prismadb.userSubscription.update({
                        where: {id: userSubscription.id},
                        data: {status: SubscriptionStatus.CANCELED},
                    });
                }
                break;
            default:
                console.log("Unhandled event type", event);
        }
        return new NextResponse(null, {status: 200});
    } catch (error) {
        console.error("Error handling YooKassa notification", error);
        return new NextResponse(null, {status: 500});
    }
}
