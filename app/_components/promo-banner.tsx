/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image";

const Promobanner = (props: ImageProps) => {
  return (
    <Image
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
