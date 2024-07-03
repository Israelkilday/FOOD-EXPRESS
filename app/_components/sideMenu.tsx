"use client";

import {
  CupSoda,
  Donut,
  Fish,
  HeartIcon,
  HomeIcon,
  IceCreamCone,
  LogInIcon,
  LogOutIcon,
  Pizza,
  Salad,
  ScrollText,
} from "lucide-react";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { signIn, signOut, useSession } from "next-auth/react";

const SideMenu = () => {
  const { data } = useSession();

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();
  return (
    <>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <>
          <div className="flex justify-between pt-6">
            <div className="flex items-center gap-3 ">
              <Avatar>
                <AvatarImage src={data?.user?.image as string | undefined} />
                <AvatarFallback>
                  {data?.user?.name?.split(" ")[0][0]}
                  {data?.user?.name?.split(" ")[1][0]}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold">{data?.user?.name}</h3>
                <span className="block text-xs text-muted-foreground">
                  {data?.user?.email}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between pt-10">
            <h2 className="font-semibold">Olá, Faça seu Login!</h2>
            <Button size="icon" onClick={handleSignInClick}>
              <LogInIcon />
            </Button>
          </div>
        </>
      )}

      <div className="py-6">
        <Separator />
      </div>

      <div className="space-y-1">
        <Button
          className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white"
          asChild
        >
          <Link href="/">
            <HomeIcon size={16} />
            <span className="block">Início</span>
          </Link>
        </Button>

        {data?.user && (
          <>
            <Button
              className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/my-orders">
                <ScrollText size={16} />
                <span className="block">Meus Pedidos</span>
              </Link>
            </Button>

            <Button
              className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/my-favorite-restaurants">
                <HeartIcon size={16} />
                <span className="block">Retaurantes Favoritos</span>
              </Link>
            </Button>
          </>
        )}
      </div>

      <div className="py-6">
        <Separator />
      </div>

      <div className="space-y-1">
        <Button
          className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white"
          asChild
        >
          {/* <Link href="/categories/e4497aae-fe75-4119-bfc9-a26bc1ad062c/products"> */}
          <Link href="/categories/cd2c9e1e-43ff-47a9-88a4-5e7a005d9cb8/products">
            <IceCreamCone size={16} />
            <span className="block">Sobremesas</span>
          </Link>
        </Button>

        <Button
          className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white"
          asChild
        >
          {/* <Link href="/categories/63cfd83e-89b1-424e-a776-82e7c5d8a9ea/products"> */}
          <Link href="/categories/068528d4-95c4-4df2-8018-25092ea818cb/products">
            <Donut size={16} />
            <span className="block">Hambúrgueres</span>
          </Link>
        </Button>
        <Button
          className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white"
          asChild
        >
          {/* <Link href="/categories/a9fdde66-2464-411a-b711-3ea4bd47816a/products"> */}
          <Link href="/categories/1eac715b-64a0-495a-a2c2-91ab5ce162c6/products">
            <Fish size={16} />
            <span className="block">Japonesa</span>
          </Link>
        </Button>

        <Button
          className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white"
          asChild
        >
          {/* <Link href="/categories/2f18dd53-e1cd-4abf-82a1-e24814806734/products"> */}
          <Link href="/categories/e6d5d58d-5a4b-44b3-a420-96c1e14afb95/products">
            <CupSoda size={16} />
            <span className="block">Sucos</span>
          </Link>
        </Button>

        <Button
          className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white"
          asChild
        >
          <Link href="/categories/e78fdd67-163c-4d3c-a9de-57f402eaeff7/products">
            <Pizza size={16} />
            <span className="block">Pizzas</span>
          </Link>
        </Button>

        <Button
          className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white"
          asChild
        >
          <Link href="/categories/03894850-dc3c-4682-a55c-44188fae1751/products">
            <Salad size={16} />
            <span className="block">Brasileira</span>
          </Link>
        </Button>
      </div>

      <div className="py-6">
        <Separator />
      </div>

      {data?.user && (
        <Button className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white">
          <LogOutIcon size={16} onClick={handleSignOutClick} />
          <span className="block">Sair da Conta</span>
        </Button>
      )}
    </>
  );
};

export default SideMenu;
