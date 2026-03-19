"use client";

import { 
  Sparkles, 
  Droplets, 
  Leaf, 
  Heart, 
  Shield, 
  Sun, 
  Moon, 
  Flower2, 
  Star, 
  Award,
  Target,
  Compass,
  Eye,
  Lightbulb,
  Sunrise,
  Rocket,
  Users,
  Globe,
  type LucideIcon
} from "lucide-react";
import "./HomeBenefits.css";

// Mapa de nombres de iconos a componentes
const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Droplets,
  Leaf,
  Heart,
  Shield,
  Sun,
  Moon,
  Flower2,
  Star,
  Award,
  Target,
  Compass,
  Eye,
  Lightbulb,
  Sunrise,
  Rocket,
  Users,
  Globe,
};

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface Props {
  title?: string;
  benefits: Benefit[];
}

export default function HomeBenefits({ title, benefits }: Props) {
  return (
    <section className="home-benefits">
      <div className="container">
        {title && (
          <h2 className="home-benefits__title">{title}</h2>
        )}
        <div className="home-benefits__grid">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || Sparkles;
            return (
              <div key={index} className="home-benefits__item">
                <div className="home-benefits__icon-wrapper">
                  <IconComponent size={24} strokeWidth={1.5} className="home-benefits__icon" />
                </div>
                <h3 className="home-benefits__item-title">{benefit.title}</h3>
                <p className="home-benefits__item-description">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
