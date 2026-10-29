import Image from "next/image";
import { cn } from "@/lib/cn";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Portraits are shown in greyscale and lift to colour on card hover. */
  portrait?: boolean;
};

/** A cropped photograph filling a sized, rounded box. */
export function Photo({ src, alt, sizes, className, imgClassName, priority, portrait }: PhotoProps) {
  return (
    <div className={cn("relative overflow-hidden bg-tile", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover transition-[filter,transform] duration-500 ease-out",
          portrait && "grayscale group-hover:scale-[1.04] group-hover:grayscale-0",
          imgClassName,
        )}
      />
    </div>
  );
}
