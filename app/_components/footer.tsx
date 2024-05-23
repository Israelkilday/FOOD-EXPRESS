"use client";

import Link from "next/link";
import { ArrowUp, Headset, Phone, Soup } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = () => {
  return (
    <footer className="flex flex-col">
      <div className="flex w-full flex-col justify-between bg-primary px-5 pb-5 pt-6 lg:flex-row lg:px-24 lg:pb-9 lg:pt-5">
        <div className="flex flex-col items-start justify-center gap-5 pb-1 md:justify-start lg:pt-5">
          <Link href="/">
            <h2 className="mr-2 flex items-center justify-center  font-shadows-into-light text-xl font-semibold text-white duration-150 hover:text-yellow-400 lg:text-2xl">
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
        </div>

        <div className="flex flex-col gap-5 pt-5 lg:flex-row lg:gap-10 lg:px-0">
          <div className="flex flex-col">
            <h3 className="text-white md:pl-5">DEPARTAMENTOS</h3>
            <div className="group flex items-center gap-1">
              <Soup className="size-4 font-bold text-yellow-400 opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-white">Meus Pedidos</p>
            </div>

            <div className="group flex items-center gap-1">
              <Soup className="size-4 font-bold text-yellow-400 opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-white">Pedidos Recomendados </p>
            </div>

            <div className="group flex items-center gap-1">
              <Soup className="size-4 font-bold text-yellow-400 opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-white">Restaurantes Recomendados</p>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-white md:pl-5">INSTITUCIONAL</h3>
            <div className="group flex items-center gap-1">
              <Soup className="size-4 font-bold text-yellow-400 opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-white">Sobre a Food Express</p>
            </div>

            <div className="group flex items-center gap-1">
              <Soup className="size-4 font-bold text-yellow-400 opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-white">Termos e condições</p>
            </div>

            <div className="group flex items-center gap-1">
              <Soup className="size-4 font-bold text-yellow-400 opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-white">Política de segurança e privacidade</p>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-white md:pl-5">CONTATO</h3>
            <div className="flex items-center gap-1">
              <Phone className="size-4 font-bold text-yellow-400" />
              <p className="text-white">(85) 91234 5678</p>
            </div>

            <div className="flex items-center gap-1">
              <Headset className="size-4 font-bold text-yellow-400" />
              <p className="text-white">SAC - 0800 1234 5678</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 bg-primary px-5 py-5 lg:px-24">
        <p className="text-sm text-white md:text-base">
          © 2024 ISRAEL KILDAY
          <br className="md:hidden" /> - Todos os direitos reservados
        </p>

        <button
          onClick={scrollToTop}
          className="animate-bounce rounded-full border border-white p-2 outline-none"
        >
          <ArrowUp className="text-white" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
