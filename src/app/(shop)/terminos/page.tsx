import LegalPage from "../[slug]/legal-page";

export default function TerminosPage() {
  return <LegalPage params={Promise.resolve({ slug: "terminos" })} />;
}
