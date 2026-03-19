"use client";

import { useEffect } from "react";
import "./MainContent.css";

interface Props {
  children: React.ReactNode;
  hasBanner?: boolean;
}

export default function MainContent({ children, hasBanner }: Props) {
  useEffect(() => {
    // Actualizar variable CSS para el padding del main
    const navbarHeight = 64; // 4rem = 64px
    const bannerHeight = hasBanner ? 44 : 0;
    document.documentElement.style.setProperty(
      '--main-padding-top',
      `${navbarHeight + bannerHeight}px`
    );
  }, [hasBanner]);

  return <main className="main-content">{children}</main>;
}
