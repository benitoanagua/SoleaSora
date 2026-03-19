import { sanityFetch } from "@/sanity/lib/live";
import { QUERIES } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import "./legal.css";

export const revalidate = 3600; // Revalidate every hour

interface LegalPage {
  _id: string;
  title: string;
  type: string;
  content?: any[];
  lastUpdated?: string;
}

const legalPages = [
  { slug: "privacidad", title: "Política de privacidad" },
  { slug: "terminos", title: "Términos y condiciones" },
  { slug: "devoluciones", title: "Política de devoluciones" },
  { slug: "envios", title: "Política de envíos" },
];

export async function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: page } = await sanityFetch({
    query: QUERIES.LEGAL_PAGE_BY_SLUG,
    params: { slug },
  });

  if (!page) notFound();

  const legal = page as LegalPage;

  return (
    <div className="legal-page">
      <header className="legal-page__header">
        <div className="container">
          <Link href="/" className="legal-page__back">
            <ChevronLeft size={16} strokeWidth={1.5} />
            Volver
          </Link>
          <h1 className="legal-page__title">{legal.title}</h1>
          {legal.lastUpdated && (
            <p className="legal-page__updated">
              Última actualización: {new Date(legal.lastUpdated).toLocaleDateString("es-AR")}
            </p>
          )}
        </div>
      </header>

      <main className="legal-page__main">
        <div className="container">
          <div className="legal-page__content">
            {legal.content?.map((block: any, i: number) => {
              if (block._type === "block") {
                const text = block.children?.map((c: any) => c.text).join("") || "";
                if (block.style === "h2") {
                  return <h2 key={i}>{text}</h2>;
                }
                if (block.style === "h3") {
                  return <h3 key={i}>{text}</h3>;
                }
                return <p key={i}>{text}</p>;
              }
              return null;
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
