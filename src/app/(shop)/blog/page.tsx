import { sanityFetch } from "@/sanity/lib/live";
import { QUERIES } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import "./blog.css";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  featuredImage?: { asset: { url: string }; alt?: string };
  author?: string;
  publishedAt: string;
  categories?: string[];
  featured?: boolean;
}

export const metadata = {
  title: "Blog | Solea Sora",
  description: "Consejos de skincare, ingredientes y rutinas para cuidar tu piel.",
};

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({
    query: QUERIES.BLOG_POSTS,
  });

  const typedPosts = posts as BlogPost[];

  const featuredPost = typedPosts?.find((p) => p.featured);
  const otherPosts = typedPosts?.filter((p) => !p.featured) || [];

  return (
    <div className="blog-page">
      <header className="blog-page__header">
        <div className="container">
          <p className="blog-page__label">Blog</p>
          <h1 className="blog-page__title">Consejos de skincare</h1>
          <p className="blog-page__description">
            Descubrí tips, rutinas e ingredientes para cuidar tu piel.
          </p>
        </div>
      </header>

      <main className="blog-page__main">
        <div className="container">
          {/* Artículo destacado */}
          {featuredPost && (
            <Link
              href={`/blog/${featuredPost.slug.current}`}
              className="blog-page__featured"
            >
              {featuredPost.featuredImage?.asset?.url && (
                <div className="blog-page__featured-image">
                  <Image
                    src={featuredPost.featuredImage.asset.url}
                    alt={featuredPost.featuredImage.alt || featuredPost.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              )}
              <div className="blog-page__featured-content">
                <span className="blog-page__featured-badge">Destacado</span>
                <h2 className="blog-page__featured-title">{featuredPost.title}</h2>
                {featuredPost.excerpt && (
                  <p className="blog-page__featured-excerpt">{featuredPost.excerpt}</p>
                )}
                <div className="blog-page__featured-meta">
                  {featuredPost.author && <span>{featuredPost.author}</span>}
                  <span>
                    {new Date(featuredPost.publishedAt).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Grid de artículos */}
          {otherPosts.length > 0 && (
            <div className="blog-page__grid">
              {otherPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="blog-page__card"
                >
                  {post.featuredImage?.asset?.url && (
                    <div className="blog-page__card-image">
                      <Image
                        src={post.featuredImage.asset.url}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  )}
                  <div className="blog-page__card-content">
                    <h3 className="blog-page__card-title">{post.title}</h3>
                    {post.excerpt && (
                      <p className="blog-page__card-excerpt">{post.excerpt}</p>
                    )}
                    <time className="blog-page__card-date">
                      {new Date(post.publishedAt).toLocaleDateString("es-AR", {
                        day: "numeric",
                        month: "short",
                      })}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {(!typedPosts || typedPosts.length === 0) && (
            <div className="blog-page__empty">
              <p>No hay artículos todavía.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
