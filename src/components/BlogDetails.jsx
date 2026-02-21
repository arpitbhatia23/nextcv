"use client";
import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Linkedin,
  Facebook,
  Link as LinkIcon,
  Twitter,
  ArrowUp,
  User,
  Check,
  ChevronRight,
  Share2,
} from "lucide-react";

import { client, urlFor } from "../sanity";
import { PortableText } from "next-sanity";
import Loading from "@/app/loading";
import Link from "next/link";

// --- Helper Functions ---
const estimateReadingTime = (text) => {
  const wordsPerMinute = 200;
  let wordCount = 0;
  if (text) {
    text.forEach((block) => {
      if (block.children) {
        block.children.forEach((child) => {
          if (child.text) {
            wordCount += child.text.split(/\s+/).length;
          }
        });
      }
    });
  }
  return Math.max(1, Math.round(wordCount / wordsPerMinute));
};

const ErrorDisplay = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-[50vh]">
    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
      <LinkIcon className="w-10 h-10 text-red-500" />
    </div>
    <h2 className="text-2xl font-bold text-slate-800 mb-2">
      Unable to load article
    </h2>
    <p className="mb-8 text-slate-500 max-w-md">
      We're having trouble retrieving this content. The article might have been moved or deleted.
    </p>
    <div className="flex gap-4">
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-medium shadow-lg shadow-indigo-200"
      >
        Try Again
      </button>
      <Link
        href="/blogs"
        className="px-6 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-medium"
      >
        Back to Blog
      </Link>
    </div>
  </div>
);

// --- Custom Portable Text Components ---
const ptComponents = {
  types: {
    image: ({ value }) => (
      <div className="my-10 group">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || "Blog image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {value.caption && (
          <p className="mt-4 text-center text-sm text-slate-500 italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
  block: {
    h2: ({ children }) => {
      const id = children[0]?.toLowerCase().replace(/\s+/g, '-');
      return (
        <h2 id={id} className="text-3xl font-bold text-slate-900 mt-16 mb-6 scroll-mt-24">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const id = children[0]?.toLowerCase().replace(/\s+/g, '-');
      return (
        <h3 id={id} className="text-2xl font-bold text-slate-800 mt-12 mb-4 scroll-mt-24">
          {children}
        </h3>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="my-12 border-l-4 border-indigo-500 bg-linear-to-r from-indigo-50/50 to-transparent p-8 rounded-r-2xl italic text-xl text-slate-700 leading-relaxed shadow-sm">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-slate-600 leading-relaxed mb-6 last:mb-0">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-4 mb-8 list-none">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-4 mb-8 list-decimal list-inside text-lg text-slate-600">
        {children}
      </ol>
    ),
  },
  listItem: ({ children }) => (
    <li className="flex items-start gap-4 text-lg text-slate-600 mb-2 last:mb-0">
      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
      <span>{children}</span>
    </li>
  ),
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-indigo-600 underline underline-offset-4 decoration-indigo-200 hover:decoration-indigo-600 transition-all font-medium"
        >
          {children}
        </a>
      );
    },
  },
};

// --- Main Component ---
const BlogDetails = ({ slug, initialData }) => {
  const router = useRouter();

  const [blog, setBlog] = useState(initialData || null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toc, setToc] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!slug) return;

    if (!initialData) {
      setIsLoading(true);
      setError(null);
      
      const query = `*[_type == "post" && slug.current == $slug][0]{
        title,
        body,
        _createdAt,
        author->{name, image, bio},
        mainImage { asset->{url} },
        "estimatedReadTime": round(length(pt::text(body)) / 5 / 180)
      }`;

      client
        .fetch(query, { slug })
        .then((data) => {
          if (!data) throw new Error("Article not found");
          setBlog(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch blog post:", err);
          setError(err);
          setIsLoading(false);
        });
    }

    // Fetch related posts
    const relatedQuery = `*[_type == "post" && slug.current != $slug][0...3]{
      title,
      slug,
      mainImage { asset->{url} },
      _createdAt,
      author->{name}
    }`;

    client.fetch(relatedQuery, { slug }).then(setRelatedPosts);
  }, [slug, initialData]);

  useEffect(() => {
    if (blog?.body) {
      const headings = blog.body
        .filter((block) => block._type === "block" && (block.style === "h2" || block.style === "h3"))
        .map((block) => ({
          text: block.children[0]?.text,
          id: block.children[0]?.text?.toLowerCase().replace(/\s+/g, '-'),
          level: block.style === "h2" ? 2 : 3,
        }));
      setToc(headings);
    }
  }, [blog]);

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const formattedDate = useMemo(() => {
    if (!blog?._createdAt) return "";
    return new Date(blog._createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [blog?._createdAt]);

  const readingTime = useMemo(() => {
    if (!blog) return "0";
    if (typeof blog.estimatedReadTime === "number" && blog.estimatedReadTime > 0) {
      return Math.max(1, Math.round(blog.estimatedReadTime));
    }
    return Math.max(1, Math.round(estimateReadingTime(blog.body)));
  }, [blog]);

  const handleShare = (platform) => {
    const currentUrl = window.location.href;
    const title = blog?.title || "Great logistics article";
    const hashtags = "resume";
    let shareUrl;

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}&hashtags=${encodeURIComponent(hashtags)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(currentUrl).then(() => setCopySuccess(true));
        return;
      default:
        return;
    }
    window.open(shareUrl, "_blank", "width=600,height=450");
  };

  if (isLoading) return <Loading />;
  if (error || !blog) return <ErrorDisplay />;

  return (
    <div className="bg-white min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 overflow-hidden bg-slate-50">
        <div 
          className="h-full bg-indigo-600 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(79,70,229,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all group"
          >
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="font-medium">Back to Articles</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Career Advice
            </span>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {readingTime} min read
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-10 leading-[1.1] tracking-tight">
            {blog.title}
          </h1>

          <div className="relative w-full min-h-[400px] md:min-h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-indigo-100 mb-16 group">
            {blog.mainImage && (
              <Image
                src={urlFor(blog.mainImage).width(1600).url()}
                alt={blog.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-30" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content Column */}
          <main className="lg:col-span-8">
            <article className="prose prose-indigo prose-lg max-w-none">
              <Suspense fallback={<div className="animate-pulse space-y-8"><div className="h-6 bg-slate-100 rounded w-3/4"></div><div className="h-40 bg-slate-100 rounded"></div></div>}>
                <PortableText value={blog.body} components={ptComponents} />
              </Suspense>
            </article>

            {/* Content Footer / Social Interaction */}
            <div className="mt-20 pt-12 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-medium">Share this article:</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleShare("twitter")} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:text-sky-500 transition-all">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleShare("linkedin")} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:text-blue-700 transition-all">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleShare("copy")} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:text-green-600 transition-all relative">
                      {copySuccess ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl transition-all font-semibold"
                >
                  <ArrowUp className="w-5 h-5" /> Back to Top
                </button>
              </div>
            </div>
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-12">
              {/* Table of Contents */}
              {toc.length > 0 && (
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-indigo-600 rounded-full" />
                    Table of Contents
                  </h4>
                  <nav className="space-y-4">
                    {toc.map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.id}`}
                        className={`block text-sm transition-all hover:text-indigo-600 ${
                          heading.level === 3 ? "ml-4 text-slate-500" : "font-medium text-slate-700"
                        }`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Author Card */}
              <div className="p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-indigo-500/30">
                    {blog.author?.image ? (
                      <Image
                        src={urlFor(blog.author.image).width(128).url()}
                        alt={blog.author.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/20 flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold leading-tight">{blog.author?.name || "NextCV Team"}</h4>
                    <p className="text-indigo-200 text-sm">Author</p>
                  </div>
                </div>
                {blog.author?.bio && (
                  <p className="text-white/80 leading-relaxed text-sm mb-6">
                    {blog.author.bio}
                  </p>
                )}
                <Link
                  href="/blogs"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm"
                >
                  View All Posts <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Newsletter or CTA (Optional) */}
              <div className="p-8 rounded-3xl border-2 border-dashed border-slate-200 text-center">
                <h4 className="font-bold text-slate-900 mb-2">Build Your Expert Resume</h4>
                <p className="text-sm text-slate-500 mb-6">Create a professional resume in minutes with our AI-powered builder.</p>
                <Link
                  href="/dashboard"
                  className="block w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-32 pt-24 border-t border-slate-100">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">You might also like</h2>
                <p className="text-slate-500">More insights and career tips from our experts.</p>
              </div>
              <Link href="/blogs" className="hidden sm:flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
                Read all posts <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Link 
                  key={post.slug.current} 
                  href={`/blogs/${post.slug.current}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                    {post.mainImage && (
                      <Image
                        src={urlFor(post.mainImage).width(600).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">
                    <span>{new Date(post._createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span>{post.author?.name}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
