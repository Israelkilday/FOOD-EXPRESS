import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { auhtOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import OrderItem from "./_components/order-item";
import { Separator } from "../_components/ui/separator";

const MyOrdersPage = async () => {
  const session = await getServerSession(auhtOptions);

  if (!session) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <Separator />

      <div className="px-5 py-6 md:px-24">
        <h2 className="pb-6 text-lg font-semibold">Meus Pedidos</h2>

        <div className="flex grid-cols-2 flex-col gap-3 md:grid lg:grid-cols-3 lg:gap-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
