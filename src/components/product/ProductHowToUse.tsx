import type { HowToUseStep } from "@/types";

interface Props {
  steps: HowToUseStep[];
}

export default function ProductHowToUse({ steps }: Props) {
  if (!steps.length) return null;

  return (
    <section className="py-24 px-6 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16 space-y-3">
          <p className="text-xs tracking-widest uppercase text-[#6B6560]">
            Aplicación
          </p>
          <h2
            className="text-4xl md:text-5xl font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Modo de uso
          </h2>
        </div>

        <ol className="space-y-0">
          {steps.map((step, i) => (
            <li
              key={step.step}
              className="flex gap-8 py-8 border-b border-[#EDE8DF] last:border-0"
            >
              <span
                className="text-4xl font-light text-[#EDE8DF] shrink-0 w-12 text-right"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[#1A1814] leading-relaxed self-center">
                {step.instruction}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
