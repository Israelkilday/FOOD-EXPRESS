"use client";

import { Button } from "@/app/_components/ui/button";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Copy, Phone } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "./ui/separator";

const DescriptionRestaurant = () => {
  // eslint-disable-next-line no-unused-vars
  const [copied, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard("(85) 1234 5678");
    toast.success("Número de Telefone copiado com sucesso!");
  };
  return (
    <div className="px-5 md:px-24 lg:pl-10">
      <div className="mt-4 pb-5">
        <h3 className="pb-[6px] font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">
          Saboreie o melhor da gastronomia local sem sair de casa! O Food
          Express reúne uma seleção impecável de restaurantes para atender a
          todos os paladares e ocasiões.
        </p>
      </div>

      <div className="pb-5">
        <Separator />
      </div>

      <div className="mb-5 flex justify-between">
        <p className="flex items-center gap-2">
          <Phone className="size-4 font-bold text-primary" />
          (85) 1234 5678
        </p>

        <Button
          onClick={handleCopy}
          className="MenuIcon, Soup } flex h-8 gap-1 bg-primary px-3"
        >
          Copiar
          <Copy className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default DescriptionRestaurant;
