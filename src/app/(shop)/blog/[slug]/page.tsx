import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { QUERIES } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import "./post.css";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  featuredImage?: { asset: { url: string }; alt?: string };
  content?: any[];
  author?: string;
  publishedAt: string;
  categories?: string[];
}

export async function generateStaticParams() {
  const posts = await client.fetch(QUERIES.BLOG_POSTS);
  return (posts as BlogPost[])?.map((post) => ({
    slug: post.slug.current,
  })) || [];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post } = await sanityFetch({
    query: QUERIES.BLOG_POST_BY_SLUG,
    params: { slug },
  });

  if (!post) notFound();

  const typedPost = post as BlogPost;

  return (
    <article className="blog-post">
      <header className="blog-post__header">
        <div className="container">
          <Link href="/blog" className="blog-post__back">
            <ChevronLeft size={16} strokeWidth={1.5} />
            Volver al blog
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="blog-post__hero">
        <div className="container">
          <div className="blog-post__categories">
            {typedPost.categories?.map((cat) => (
              <span key={cat} className="blog-post__category">
                {cat}
              </span>
            ))}
          </div>
          <h1 className="blog-post__title">{typedPost.title}</h1>
          {typedPost.excerpt && (
            <p className="blog-post__excerpt">{typedPost.excerpt}</p>
          )}
          <div className="blog-post__meta">
            {typedPost.author && <span>{typedPost.author}</span>}
            <span>
              {new Date(typedPost.publishedAt).toLocaleDateString("es-AR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Imagen destacada */}
      {typedPost.featuredImage?.asset?.url && (
        <div className="blog-post__image">
          <div className="container">
            <Image
              src={typedPost.featuredImage.asset.url}
              alt={typedPost.featuredImage.alt || typedPost.title}
              width={1200}
              height={600}
              className="blog-post__image-img"
            />
          </div>
        </div>
      )}

      {/* Contenido */}
      <div className="blog-post__content">
        <div className="container">
          <div className="blog-post__body">
            {typedPost.content?.map((block: any, i: number) => {
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
      </div>
    </article>
  );
}
