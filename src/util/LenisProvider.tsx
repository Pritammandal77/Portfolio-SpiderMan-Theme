"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.4,
        orientation: "vertical",
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}