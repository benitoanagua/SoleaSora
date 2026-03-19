import { sanityFetch } from "@/sanity/lib/live";
import { QUERIES } from "@/sanity/lib/queries";
import Image from "next/image";
import {
  Target,
  Eye,
  Heart,
  Leaf,
  Shield,
  Sparkles,
  Award,
  Users,
  Globe,
  Lightbulb,
  Sunrise,
  Rocket,
  Compass,
} from "lucide-react";
import "./nosotras.css";

interface AboutPage {
  title: string;
  heroImage?: { asset: { url: string } };
  heroText?: string;
  story?: {
    title?: string;
    content?: any[];
    image?: { asset: { url: string } };
  };
  mission?: {
    title?: string;
    content?: string;
    icon?: string;
  };
  vision?: {
    title?: string;
    content?: string;
    icon?: string;
  };
  values?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  team?: Array<{
    name: string;
    role: string;
    photo?: { asset: { url: string } };
    bio?: string;
  }>;
}

const iconMap: Record<string, any> = {
  Target,
  Eye,
  Compass,
  Heart,
  Leaf,
  Shield,
  Sparkles,
  Award,
  Users,
  Globe,
  Lightbulb,
  Sunrise,
  Rocket,
};

export const metadata = {
  title: "Nosotras | Solea Sora",
  description: "Conocé nuestra historia, misión y valores.",
};

export default async function NosotrasPage() {
  const { data: page } = await sanityFetch({
    query: QUERIES.ABOUT_PAGE,
  });

  const about = page as AboutPage;

  return (
    <div className="about-page">
      {/* Hero */}
      <header className="about-page__hero">
        <div className="container">
          <p className="about-page__label">Nosotras</p>
          <h1 className="about-page__title">{about?.title || "Sobre nosotros"}</h1>
          {about?.heroText && (
            <p className="about-page__hero-text">{about.heroText}</p>
          )}
        </div>
      </header>

      {/* Historia */}
      {about?.story && (
        <section className="about-page__story">
          <div className="container">
            <div className="about-page__story-grid">
              <div className="about-page__story-content">
                <h2 className="about-page__section-title">{about.story.title}</h2>
                {about.story.content?.map((block: any, i: number) => {
                  if (block._type === "block") {
                    const text = block.children?.map((c: any) => c.text).join("") || "";
                    return <p key={i}>{text}</p>;
                  }
                  return null;
                })}
              </div>
              {about.story.image?.asset?.url && (
                <div className="about-page__story-image">
                  <Image
                    src={about.story.image.asset.url}
                    alt="Nuestra historia"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Misión y Visión */}
      <section className="about-page__mission-vision">
        <div className="container">
          <div className="about-page__mv-grid">
            {about?.mission && (
              <div className="about-page__mv-item">
                <div className="about-page__mv-icon">
                  {about.mission.icon && iconMap[about.mission.icon] ? (
                    (() => {
                      const Icon = iconMap[about.mission.icon];
                      return <Icon size={24} strokeWidth={1.5} />;
                    })()
                  ) : (
                    <Target size={24} strokeWidth={1.5} />
                  )}
                </div>
                <h3 className="about-page__mv-title">{about.mission.title}</h3>
                <p className="about-page__mv-text">{about.mission.content}</p>
              </div>
            )}
            {about?.vision && (
              <div className="about-page__mv-item">
                <div className="about-page__mv-icon">
                  {about.vision.icon && iconMap[about.vision.icon] ? (
                    (() => {
                      const Icon = iconMap[about.vision.icon];
                      return <Icon size={24} strokeWidth={1.5} />;
                    })()
                  ) : (
                    <Eye size={24} strokeWidth={1.5} />
                  )}
                </div>
                <h3 className="about-page__mv-title">{about.vision.title}</h3>
                <p className="about-page__mv-text">{about.vision.content}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Valores */}
      {about?.values && about.values.length > 0 && (
        <section className="about-page__values">
          <div className="container">
            <h2 className="about-page__section-title">Nuestros valores</h2>
            <div className="about-page__values-grid">
              {about.values.map((value, i) => {
                const Icon = iconMap[value.icon] || Heart;
                return (
                  <div key={i} className="about-page__value-item">
                    <div className="about-page__value-icon">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="about-page__value-title">{value.title}</h3>
                    <p className="about-page__value-text">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Equipo */}
      {about?.team && about.team.length > 0 && (
        <section className="about-page__team">
          <div className="container">
            <h2 className="about-page__section-title">Nuestro equipo</h2>
            <div className="about-page__team-grid">
              {about.team.map((member, i) => (
                <div key={i} className="about-page__team-member">
                  {member.photo?.asset?.url && (
                    <div className="about-page__team-photo">
                      <Image
                        src={member.photo.asset.url}
                        alt={member.name}
                        fill
                        sizes="200px"
                      />
                    </div>
                  )}
                  <h3 className="about-page__team-name">{member.name}</h3>
                  <p className="about-page__team-role">{member.role}</p>
                  {member.bio && (
                    <p className="about-page__team-bio">{member.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
