"use client";

import Link from "next/link";
import { ArrowUp, Headset, Phone, Soup } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { Separator } from "./ui/separator";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = () => {
  return (
    <footer className="flex flex-col pt-6 lg:pt-8">
      <div className="flex w-full flex-col justify-between bg-primary px-5 pt-6 md:px-24 lg:flex-row lg:px-24 lg:pb-9 lg:pt-5">
        <div className="flex flex-col items-start justify-center gap-5 pb-1 md:justify-start lg:pt-5">
          <Link href="/">
            <h2 className="mr-2 flex items-center justify-center font-shadows-into-light text-[22px] font-semibold text-white duration-150 hover:text-yellow-400 lg:text-2xl">
              Food
              <Soup className="lg:size-7" size={20} />
              Express
            </h2>
          </Link>

          <div className="flex gap-3">
            <Link href="https://www.linkedin.com/in/israeldevfrontend">
              <FaLinkedin className="size-6 text-white duration-150 hover:font-bold hover:text-yellow-400 lg:size-7" />
            </Link>

            <Link href="https://github.com/Israelkilday">
              <FaGithub className="size-6 text-white duration-150 hover:font-bold hover:text-yellow-400 lg:size-7" />
            </Link>

            <Link href="https://www.instagram.com/israelkilday/">
              <FaInstagram className="size-6 text-white duration-150 hover:font-bold hover:text-yellow-400 lg:size-7" />
            </Link>

            <a href="mailto:israel.kilday@yahoo.com.br">
              <MdEmail className="size-6 text-white duration-150 hover:font-bold hover:text-yellow-400 lg:size-7" />
            </a>
          </div>

          <div className="flex gap-3">
            <Link href="https://www.apple.com/br/store">
              <Image
                src="/lojaapple.png"
                alt="Logo_Apple"
                width={110}
                height={0}
                style={{
                  objectFit: "contain",
                }}
              />
            </Link>

            <Link href="https://play.google.com/store/games?hl=pt">
              <Image
                src="/playstore.png"
                alt="Logo_Playstore"
                width={119}
                height={0}
                style={{
                  objectFit: "contain",
                }}
              />
            </Link>
          </div>
        </div>
        <Separator className="mt-6 lg:hidden" />

        <div className="flex flex-col gap-5 pb-6 pt-5 lg:flex-row lg:gap-20">
          <div className="flex flex-col">
            <h3 className="text-sm text-white lg:pl-5 lg:text-base">
              DEPARTAMENTOS
            </h3>
            <div className="group flex items-center gap-1">
              <Soup className="size-4 font-bold text-yellow-400 opacity-0 duration-200 group-hover:opacity-100" />

              <p className="text-sm text-white lg:text-base">
                Trabalhe Conosco
              </p>
            </div>

            <div className="group flex items-center gap-1">
              <Soup className="size-4 font-bold text-yellow-400 opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-sm text-white lg:text-base">
                Promoções e Ofertas
              </p>
            </div>

            <div className="group flex items-center gap-1">
              <Soup className="size-4 font-bold text-yellow-400 opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-sm text-white lg:text-base">
                Programa de Fidelidade
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-sm text-white lg:pl-5 lg:text-base">
              INSTITUCIONAL
            </h3>
            <div className="group flex items-center gap-1">
              <Soup className="size-4 font-bold text-yellow-400 opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-sm text-white lg:text-base">
                Sobre a Food Express
              </p>
            </div>

            <div className="group flex items-center gap-1">
              <Soup className="size-4 font-bold text-yellow-400 opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-sm text-white lg:text-base">
                Termos e condições
              </p>
            </div>

            <div className="group flex items-center gap-1">
              <Soup className="size-4 font-bold text-yellow-400 opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-sm text-white lg:text-base">
                Política de segurança e privacidade
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-sm text-white lg:pl-5 lg:text-base">CONTATO</h3>
            <div className="flex items-center gap-1">
              <Phone className="size-4 font-bold text-yellow-400" />
              <p className="text-sm text-white lg:text-base">(85) 91234 5678</p>
            </div>

            <div className="flex items-center gap-1">
              <Headset className="size-4 font-bold text-yellow-400" />
              <p className="text-sm text-white lg:text-base">
                SAC - 0800 1234 5678
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-primary px-5 pb-5 pt-0 md:px-24">
        <Separator className="mb-6" />
        <div className="flex justify-between lg:flex-row">
          <div className="flex flex-col text-start text-sm text-white md:flex-row lg:flex-row lg:text-base">
            <span className="mr-1">© 2024 ISRAEL KILDAY</span>
            <p>- Todos os direitos reservados </p>
          </div>

          <button
            onClick={scrollToTop}
            className="animate-bounce rounded-full border border-white p-2 outline-none"
          >
            <ArrowUp className="text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
