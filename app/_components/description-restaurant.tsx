"use client";

import { Button } from "@/app/_components/ui/button";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Copy, Phone } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";

const DescriptionRestaurant = () => {
  // eslint-disable-next-line no-unused-vars
  const [copied, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard("(85) 1234 5678");
    toast.success("Número de Telefone copiado com sucesso!");
  };
  return (
    <Card className="mx-5 mt-7 px-5 shadow-md md:mx-24 lg:ml-10">
      <div className="">
        <div className="mt-4 pb-5">
          <h3 className="pb-[6px] font-semibold">Sobre</h3>

          <Separator />

          <p className="pt-4 text-sm text-muted-foreground">
            Saboreie o melhor da gastronomia local sem sair de casa! O Food
            Express reúne uma seleção impecável de restaurantes para atender a
            todos os paladares e ocasiões.
          </p>
        </div>

        {/* <div className="pb-5">
          <Separator />
        </div> */}

        <div className="mb-5 flex justify-between">
          <p className="flex items-center gap-2">
            <Phone className="size-4 font-bold text-primary" />
            (85) 1234 5678
          </p>

          <Button
            onClick={handleCopy}
            className="MenuIcon, Soup } flex h-8 gap-1 bg-primary px-3"
          >
            <Copy className="size-4" />
            Copiar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DescriptionRestaurant;
