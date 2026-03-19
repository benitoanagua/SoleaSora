import LegalPage from "../[slug]/legal-page";

export default function PrivacidadPage() {
  return <LegalPage params={Promise.resolve({ slug: "privacidad" })} />;
}
