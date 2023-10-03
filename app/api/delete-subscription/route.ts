import prismadb from "@/lib/prismadb";
import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";

export async function GET() {
    const {userId} = auth()

    if (!userId) {
        return new NextResponse("Unauthorized", {status: 401})
    }

    try {
        await prismadb.userSubscription.delete({
            where: {userId: userId},
        });

        return new NextResponse(null, {status: 200});
    } catch (error) {
        console.error('Error deleting subscription:', error);
        return new NextResponse(null, {status: 500});
    }
}
