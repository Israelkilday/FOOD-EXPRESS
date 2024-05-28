import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { auhtOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import OrderItem from "./_components/order-item";
import { Separator } from "../_components/ui/separator";
import { Card } from "../_components/ui/card";
import { Soup } from "lucide-react";

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
          {orders.length > 0 ? (
            orders.map((order) => <OrderItem key={order.id} order={order} />)
          ) : (
            <Card className="flex flex-col items-center gap-5 p-4 text-center shadow-lg md:min-w-96 md:flex-row-reverse md:text-left lg:min-w-[500px]">
              <h3 className="font-medium">
                Voçê ainda não realizou nenhum pedido.
              </h3>

              <Soup className="size-32 text-primary" />
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
