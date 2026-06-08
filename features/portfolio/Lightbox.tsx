"use client";

import LightboxPrimitive from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type LightboxProps = {
  slides: Array<{ src: string; width: number; height: number; alt: string }>;
  index: number;
  open: boolean;
  onClose: () => void;
};

export function Lightbox({ slides, index, open, onClose }: LightboxProps) {
  return (
    <LightboxPrimitive
      open={open}
      close={onClose}
      index={index < 0 ? 0 : index}
      slides={slides}
    />
  );
}
