import LegalPage from "../[slug]/legal-page";

export default function EnviosPage() {
  return <LegalPage params={Promise.resolve({ slug: "envios" })} />;
}
