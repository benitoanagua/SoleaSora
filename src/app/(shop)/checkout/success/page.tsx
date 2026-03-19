"use client";

import { Suspense } from "react";
import { SuccessContent } from "./SuccessContent";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="checkout-result"><p>Cargando...</p></div>}>
      <SuccessContent />
    </Suspense>
  );
}
