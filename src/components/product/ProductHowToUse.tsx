import type { HowToUseStep } from "@/types";
import "./ProductHowToUse.css";

interface Props {
  steps: HowToUseStep[];
}

export default function ProductHowToUse({ steps }: Props) {
  if (!steps.length) return null;

  return (
    <section className="product-how-to-use">
      <div className="container product-how-to-use__container">
        <div className="product-how-to-use__header">
          <p className="product-how-to-use__tagline">
            Aplicación
          </p>
          <h2 className="product-how-to-use__title">
            Modo de uso
          </h2>
        </div>

        <ol className="product-how-to-use__list">
          {steps.map((step, i) => (
            <li
              key={step.step}
              className="product-how-to-use__item"
            >
              <span className="product-how-to-use__step-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="product-how-to-use__instruction">
                {step.instruction}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
