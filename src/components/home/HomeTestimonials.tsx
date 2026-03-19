"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import "./HomeTestimonials.css";

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  avatar?: { asset: { url: string } };
  rating?: number;
}

interface Props {
  testimonials: Testimonial[];
}

export default function HomeTestimonials({ testimonials }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="home-testimonials">
      <div className="container">
        <div className="home-testimonials__header">
          <p className="home-testimonials__label">Testimonios</p>
          <h2 className="home-testimonials__title">Lo que dicen nuestras clientas</h2>
        </div>

        <div className="home-testimonials__content">
          {/* Quote */}
          <blockquote className="home-testimonials__quote">
            "{activeTestimonial.quote}"
          </blockquote>

          {/* Rating */}
          {activeTestimonial.rating && (
            <div className="home-testimonials__rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  strokeWidth={1.5}
                  className={`home-testimonials__star ${
                    i < activeTestimonial.rating! ? "home-testimonials__star--filled" : ""
                  }`}
                />
              ))}
            </div>
          )}

          {/* Author */}
          <div className="home-testimonials__author">
            {activeTestimonial.avatar?.asset?.url && (
              <div className="home-testimonials__avatar">
                <Image
                  src={activeTestimonial.avatar.asset.url}
                  alt={activeTestimonial.author}
                  width={48}
                  height={48}
                  className="home-testimonials__avatar-image"
                />
              </div>
            )}
            <div className="home-testimonials__author-info">
              <p className="home-testimonials__author-name">{activeTestimonial.author}</p>
              {activeTestimonial.role && (
                <p className="home-testimonials__author-role">{activeTestimonial.role}</p>
              )}
            </div>
          </div>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="home-testimonials__nav">
              <button
                onClick={prev}
                aria-label="Testimonio anterior"
                className="home-testimonials__nav-btn"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <div className="home-testimonials__dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Ir a testimonio ${i + 1}`}
                    className={`home-testimonials__dot ${
                      i === activeIndex ? "home-testimonials__dot--active" : ""
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                aria-label="Siguiente testimonio"
                className="home-testimonials__nav-btn"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
