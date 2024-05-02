import Image, { ImageProps } from "next/image";

const Promobanner = (props: ImageProps) => {
  return (
    <Image
      src="/promo-banner-01.png"
      alt="Até 30% de desconto em pizzas"
      width={0}
      height={0}
      className="h-auto w-full object-contain"
      sizes="100vw"
      quality={100}
      {...props}
    />
  );
};

export default Promobanner;
