"use client";

// import Image from "next/image";
import { Button } from "./ui/button";
import {
  CircleUserRound,
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollText,
  Soup,
} from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

  return (
    <header className="flex justify-between px-5 pt-6 md:px-24">
      <div className="flex items-center gap-3">
        <div>
          <Link href="/">
            <h2 className="mr-2 flex items-center justify-center  font-shadows-into-light font-semibold text-primary duration-150 hover:text-primary/85 lg:text-xl">
              Food
              <Soup size={20} />
              Express
            </h2>

            {/* <Image
              src="/Logo.png"
              alt="FSW Foods"
              fill
              className="object-cover"
            /> */}
          </Link>
        </div>

        {data?.user && (
          <div className="hidden items-center lg:flex">
            <Button
              asChild
              className="hidden justify-start bg-transparent hover:bg-transparent lg:flex"
            >
              <Link href="/my-favorite-restaurants">
                <span className="text-[16px] text-slate-600 duration-100 hover:text-primary">
                  Restaurantes Favoritos
                </span>
              </Link>
            </Button>

            <Button
              asChild
              className="hidden justify-start bg-transparent hover:bg-transparent lg:flex"
            >
              <Link href="/my-orders" className="md:text-lg">
                <span className="text-[16px] text-slate-600 duration-100 hover:text-primary">
                  Meus Pedidos
                </span>
              </Link>
            </Button>
          </div>
        )}
      </div>

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

          <div space-y-2>
            <Button
              variant="ghost"
              className="font- w-full justify-start space-x-3 rounded-full text-sm"
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
                  variant="ghost"
                  className="font- w-full justify-start space-x-3 rounded-full text-sm"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollText size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="font- w-full justify-start space-x-3 rounded-full text-sm"
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

          {data?.user && (
            <Button
              variant="ghost"
              className="font- w-full justify-start space-x-3 rounded-full text-sm"
            >
              <LogOutIcon size={16} onClick={handleSignOutClick} />
              <span className="block">Sair da Conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>

      {data?.user ? (
        <div className="hidden items-center justify-between px-5 lg:flex lg:px-0">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user?.image ?? ""} />
            </Avatar>

            <h2 className="mr-3 font-semibold text-slate-600 md:text-lg">
              {data.user.name}
            </h2>

            <Button
              variant="secondary"
              size="icon"
              className="hidden text-slate-600 lg:flex"
            >
              <LogOutIcon onClick={handleSignOutClick} />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={handleSignInClick}
          className="hidden  md:text-lg lg:flex"
          variant="secondary"
        >
          <CircleUserRound className="mr-2 text-slate-600" size={24} />
          <span className="text-slate-600">Login</span>
        </Button>
      )}
    </header>
  );
};

export default Header;
