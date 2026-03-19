"use client";

import { useState, useMemo } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";
import "./CatalogFilters.css";

interface Props {
  categories: Category[];
  priceRange: { min: number; max: number };
  sticky?: boolean;
  mobile?: boolean;
}

export default function CatalogFilters({
  categories,
  priceRange,
  sticky = false,
  mobile = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRangeLocal, setPriceRangeLocal] = useState<[number, number]>([
    priceRange.min,
    priceRange.max,
  ]);

  // Mobile: Drawer toggle
  if (mobile) {
    return (
      <>
        {/* Botón de filtros */}
        <button
          onClick={() => setIsOpen(true)}
          className="catalog-filters-mobile__trigger"
        >
          <span className="catalog-filters-mobile__trigger-text">
            <Filter size={16} strokeWidth={1.5} />
            Filtros
          </span>
          {selectedCategory && (
            <span className="catalog-filters-mobile__count">
              1 seleccionado
            </span>
          )}
        </button>

        {/* Drawer de filtros */}
        <div
          className={cn(
            "catalog-filters-drawer md:hidden",
            isOpen ? "catalog-filters-drawer--open" : "catalog-filters-drawer--closed"
          )}
        >
          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className="catalog-filters-drawer__overlay"
          />

          {/* Panel */}
          <div
            className="catalog-filters-drawer__panel"
          >
            {/* Header */}
            <div className="catalog-filters-drawer__header">
              <h2 className="catalog-filters-drawer__title">
                Filtros
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar filtros"
                className="catalog-filters-drawer__close"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Contenido */}
            <div className="catalog-filters-drawer__content">
              {/* Categorías */}
              <FilterSection title="Categorías">
                <div className="category-options">
                  <label className="category-option">
                    <input
                      type="radio"
                      name="category"
                      checked={!selectedCategory}
                      onChange={() => setSelectedCategory(null)}
                      className="category-option__input"
                    />
                    <span className="category-option__label">
                      Todas
                    </span>
                  </label>
                  {categories.map((cat) => (
                    <label
                      key={cat._id}
                      className="category-option"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.value}
                        onChange={() => setSelectedCategory(cat.value)}
                        className="category-option__input"
                      />
                      <span className="category-option__label capitalize">
                        {cat.name || CATEGORY_LABELS[cat.value] || cat.value}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Rango de precio */}
              <FilterSection title="Precio">
                <div className="price-range">
                  <div className="price-range__row">
                    <div className="price-range__input-group">
                      <label className="input-label">
                        Mínimo
                      </label>
                      <input
                        type="number"
                        value={priceRangeLocal[0]}
                        onChange={(e) =>
                          setPriceRangeLocal([
                            Number(e.target.value),
                            priceRangeLocal[1],
                          ])
                        }
                        className="input-field"
                      />
                    </div>
                    <div className="price-range__input-group">
                      <label className="input-label">
                        Máximo
                      </label>
                      <input
                        type="number"
                        value={priceRangeLocal[1]}
                        onChange={(e) =>
                          setPriceRangeLocal([
                            priceRangeLocal[0],
                            Number(e.target.value),
                          ])
                        }
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              </FilterSection>
            </div>

            {/* Footer con acciones */}
            <div className="catalog-filters-drawer__footer">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setPriceRangeLocal([priceRange.min, priceRange.max]);
                }}
                className="catalog-filters-drawer__clear"
              >
                Limpiar
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="catalog-filters-drawer__apply"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop: Sidebar vertical
  return (
    <div
      className={cn(
        "catalog-filters",
        sticky && "catalog-filters--sticky"
      )}
    >
      <div className="catalog-filters__header">
        <Filter size={16} strokeWidth={1.5} className="text-[#6B6560]" />
        <h2 className="catalog-filters__title">
          Filtros
        </h2>
      </div>

      {/* Categorías */}
      <FilterSection title="Categorías" defaultOpen>
        <div className="category-options">
          <label className="category-option">
            <input
              type="radio"
              name="category-desktop"
              checked={!selectedCategory}
              onChange={() => setSelectedCategory(null)}
              className="category-option__input"
            />
            <span className="category-option__label">
              Todas
            </span>
          </label>
          {categories.map((cat) => (
            <label
              key={cat._id}
              className="category-option"
            >
              <input
                type="radio"
                name="category-desktop"
                checked={selectedCategory === cat.value}
                onChange={() => setSelectedCategory(cat.value)}
                className="category-option__input"
              />
              <span className="category-option__label capitalize">
                {cat.name || CATEGORY_LABELS[cat.value] || cat.value}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rango de precio */}
      <FilterSection title="Precio">
        <div className="price-range">
          <div className="price-range__display">
            <span>${priceRangeLocal[0]}</span>
            <span>${priceRangeLocal[1]}</span>
          </div>
          {/* Slider de precio (visual) */}
          <div className="price-range__slider-container">
            <div
              className="price-range__slider-fill"
              style={{
                left: "0%",
                right: "0%",
              }}
            />
            <div
              className="price-range__handle"
              style={{ left: "0%" }}
            />
            <div
              className="price-range__handle"
              style={{ right: "0%" }}
            />
          </div>
        </div>
      </FilterSection>
    </div>
  );
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="filter-section">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="filter-section__button"
      >
        <h3 className="filter-section__title">
          {title}
        </h3>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={cn(
            "filter-section__icon",
            isOpen ? "filter-section__icon--open" : ""
          )}
        />
      </button>
      <div
        className={cn(
          "filter-section__content",
          isOpen ? "filter-section__content--open" : "filter-section__content--closed"
        )}
      >
        {children}
      </div>
    </div>
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  serum: "Sérum",
  cream: "Crema",
  cleanser: "Limpiador",
  sunscreen: "Protector solar",
  mask: "Mascarilla",
  "eye-cream": "Contorno de ojos",
  toner: "Tónico",
  oil: "Aceite",
  moisturizer: "Hidratante",
};
