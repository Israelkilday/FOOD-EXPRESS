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
  MenuIcon,
  Pizza,
  Salad,
  ScrollText,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
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
      <Sheet>
        <SheetTrigger className="lg:hidden">
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3 ">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                    />
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
              <Link href="/categories/e4497aae-fe75-4119-bfc9-a26bc1ad062c/products">
                <IceCreamCone size={16} />
                <span className="block">Sobremesas</span>
              </Link>
            </Button>

            <Button
              className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/categories/63cfd83e-89b1-424e-a776-82e7c5d8a9ea/products">
                <Donut size={16} />
                <span className="block">Hambúrgueres</span>
              </Link>
            </Button>
            <Button
              className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/categories/a9fdde66-2464-411a-b711-3ea4bd47816a/products">
                <Fish size={16} />
                <span className="block">Japonesa</span>
              </Link>
            </Button>

            <Button
              className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/categories/2f18dd53-e1cd-4abf-82a1-e24814806734/products">
                <CupSoda size={16} />
                <span className="block">Sucos</span>
              </Link>
            </Button>

            <Button
              className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/categories/df818735-ffb5-494d-bdb8-5640d7ae5721/products">
                <Pizza size={16} />
                <span className="block">Pizzas</span>
              </Link>
            </Button>

            <Button
              className="w-full justify-start space-x-3 rounded-full bg-transparent text-sm text-foreground hover:bg-primary hover:text-white"
              asChild
            >
              <Link
                href="/categories/d754303a-50fe-4ad3-b787-0aae10455c65/products"
                className=""
              >
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
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SideMenu;
