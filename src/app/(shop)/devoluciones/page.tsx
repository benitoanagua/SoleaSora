import LegalPage from "../[slug]/legal-page";

export default function DevolucionesPage() {
  return <LegalPage params={Promise.resolve({ slug: "devoluciones" })} />;
}
