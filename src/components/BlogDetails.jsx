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
} from "lucide-react";

import { client, urlFor } from "../sanity";
import { PortableText } from "next-sanity";
import Loading from "@/app/loading";

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
    <h2 className="text-2xl font-bold text-slate-800 mb-2">
      Unable to load article
    </h2>
    <p className="mb-6 text-slate-500">
      We're having trouble retrieving this content. Please try again later.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm shadow-indigo-200"
    >
      Retry
    </button>
  </div>
);

// --- Main Component ---
const BlogDetails = ({ slug, initialData }) => {
  const router = useRouter();

  const [blog, setBlog] = useState(initialData || null);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (!slug || initialData) return;

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
  }, [slug]);

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
    if (
      typeof blog.estimatedReadTime === "number" &&
      blog.estimatedReadTime > 0
    ) {
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
        navigator.clipboard
          .writeText(currentUrl)
          .then(() => setCopySuccess(true))
          .catch((err) => console.error("Failed to copy URL: ", err));
        return;
      default:
        return;
    }
    window.open(shareUrl, "_blank", "width=600,height=450");
  };

  if (isLoading) return <Loading />;
  if (error || !blog) return <ErrorDisplay />;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="fixed top-24 left-4 xl:left-[max(1rem,calc(50%-48rem))] z-20 flex items-center gap-2 text-slate-500 hover:text-indigo-600 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm border border-slate-200 transition-all hover:pr-5 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden md:inline font-medium text-sm">Back</span>
        </button>

        {/* Article Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 mt-10 overflow-hidden">
          {/* Hero Image */}
          <div className="relative aspect-21/9 w-full bg-slate-100">
            {blog.mainImage && (
              <Image
                src={urlFor(blog.mainImage).width(1200).height(600).url()}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          </div>

          <div className="px-6 md:px-12 py-10">
            {/* Header Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {formattedDate}
              </span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {readingTime} min read
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              {blog.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-4 py-6 border-y border-slate-100 mb-10">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 ring-2 ring-white shadow-sm">
                {blog.author?.image ? (
                  <Image
                    src={urlFor(blog.author.image).width(100).url()}
                    alt={blog.author.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400" />
                )}
              </div>
              <div>
                <p className="text-base font-semibold text-slate-900">
                  {blog.author?.name || "NextCV Team"}
                </p>
                <p className="text-sm text-slate-500">Author</p>
              </div>

              {/* Share Buttons (Inline for mobile/Desktop) */}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => handleShare("twitter")}
                  className="p-2 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-full transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors relative"
                >
                  {copySuccess ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <LinkIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Content */}
            <article
              className="prose prose-lg prose-slate max-w-none 
                    prose-headings:font-bold prose-headings:text-slate-900 
                    prose-p:text-slate-600 prose-p:leading-relaxed
                    prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-xl prose-img:shadow-md 
                    prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
                    prose-li:text-slate-600"
            >
              <Suspense
                fallback={
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  </div>
                }
              >
                <PortableText value={blog.body} />
              </Suspense>
            </article>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 border-t border-slate-200 p-8 flex justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
            >
              <ArrowUp className="w-4 h-4" /> Back to Top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
