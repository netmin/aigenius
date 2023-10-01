import {auth} from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
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