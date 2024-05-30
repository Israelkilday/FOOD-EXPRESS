"use client";

import { Button } from "./ui/button";
import { CircleUserRound, LogOutIcon, MenuIcon, Soup } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SideMenu from "./sideMenu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Search from "./search";

interface HeaderProps {
  haveSearchBar: boolean;
}

const Header = ({ haveSearchBar }: HeaderProps) => {
  const { data } = useSession();

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

  return (
    <header className="flex justify-between p-5 md:px-24 ">
      <div className="flex items-center">
        <div>
          <Link href="/">
            <h2 className="mr-5 flex items-center justify-center font-shadows-into-light text-[22px] font-semibold text-primary duration-150 hover:text-yellow-400 lg:text-2xl">
              Food
              <Soup className="lg:size-7" size={20} />
              Express
            </h2>
          </Link>
        </div>

        {data?.user && (
          <div className="hidden items-center lg:flex">
            <Button
              className="hidden justify-start bg-transparent hover:bg-transparent lg:flex lg:pr-2"
              asChild
            >
              <Link href="/my-favorite-restaurants">
                <span className="text-base text-slate-600 duration-100 hover:text-primary">
                  Restaurantes Favoritos
                </span>
              </Link>
            </Button>

            <Button
              className="hidden justify-start bg-transparent hover:bg-transparent lg:flex lg:pr-1"
              asChild
            >
              <Link href="/my-orders" className="md:text-lg">
                <span className="text-base text-slate-600 duration-100 hover:text-primary">
                  Meus Pedidos
                </span>
              </Link>
            </Button>
          </div>
        )}
      </div>

      {haveSearchBar && (
        <div className="hidden lg:flex">
          <Search />
        </div>
      )}

      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SideMenu />
        </SheetContent>
      </Sheet>

      {data?.user ? (
        <div className="hidden items-center justify-between px-5 lg:flex lg:px-0">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user?.image ?? ""} />
              <AvatarFallback>
                {data?.user?.name?.split(" ")[0][0]}
                {data?.user?.name?.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>

            <h2 className="mr-3 font-semibold text-slate-600 md:text-lg">
              {data.user.name}
            </h2>

            <Button
              variant="secondary"
              size="icon"
              className="hidden text-slate-600 hover:bg-yellow-400 lg:flex"
            >
              <LogOutIcon onClick={handleSignOutClick} />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={handleSignInClick}
          className="hidden duration-150 hover:bg-yellow-400 md:text-lg lg:flex"
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
