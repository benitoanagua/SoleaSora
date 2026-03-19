import { sanityFetch } from "@/sanity/lib/live";
import { QUERIES } from "@/sanity/lib/queries";
import {
  ShoppingBag,
  Truck,
  CreditCard,
  Package,
  RefreshCw,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import "./faq.css";

interface FaqPage {
  title: string;
  intro?: string;
  categories?: Array<{
    icon: string;
    title: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  }>;
}

const iconMap: Record<string, any> = {
  ShoppingBag,
  Truck,
  CreditCard,
  Package,
  RefreshCw,
  HelpCircle,
};

export const metadata = {
  title: "FAQ | Solea Sora",
  description: "Preguntas frecuentes sobre productos, envíos, pagos y más.",
};

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="faq-item">
      <summary className="faq-item__question">
        <span>{question}</span>
        <ChevronDown size={18} strokeWidth={1.5} className="faq-item__icon" />
      </summary>
      <div className="faq-item__answer">
        <p>{answer}</p>
      </div>
    </details>
  );
}

export default async function FaqPage() {
  const { data: page } = await sanityFetch({
    query: QUERIES.FAQ_PAGE,
  });

  const faq = page as FaqPage;

  return (
    <div className="faq-page">
      <header className="faq-page__header">
        <div className="container">
          <p className="faq-page__label">Ayuda</p>
          <h1 className="faq-page__title">{faq?.title || "Preguntas frecuentes"}</h1>
          {faq?.intro && <p className="faq-page__intro">{faq.intro}</p>}
        </div>
      </header>

      <main className="faq-page__main">
        <div className="container">
          {faq?.categories?.map((category, i) => {
            const Icon = iconMap[category.icon] || HelpCircle;
            return (
              <section key={i} className="faq-category">
                <div className="faq-category__header">
                  <div className="faq-category__icon">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <h2 className="faq-category__title">{category.title}</h2>
                </div>
                <div className="faq-category__questions">
                  {category.questions.map((q, j) => (
                    <FaqItem key={j} question={q.question} answer={q.answer} />
                  ))}
                </div>
              </section>
            );
          })}

          {(!faq?.categories || faq.categories.length === 0) && (
            <div className="faq-page__empty">
              <p>No hay preguntas frecuentes todavía.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
