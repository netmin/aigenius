import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body);

        if (!body.event || !body.object || !body.object.id) {
            console.error("Invalid notification body", body);
            return new NextResponse(null, {status: 400});
        }

        const {event, object} = body;

        let userSubscription = await prismadb.userSubscription.findUnique({
            where: {paymentId: object.id},
        });

        switch (event) {
            case "payment.succeeded":
                const newData = {
                    status: "ACTIVE",
                    lastPaymentDate: new Date(object.created_at),
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
                            payment_method_id: object.payment_method.id,
                        },
                    });
                }
                break;
            case "payment.canceled":
                if (userSubscription) {
                    await prismadb.userSubscription.update({
                        where: {id: userSubscription.id},
                        data: {status: "CANCELED"},
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
