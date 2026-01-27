"use client";
// This directive is required because this component uses state, effects,
// and browser-specific APIs (window, navigator).

import React, { useEffect, useState, useMemo, Suspense } from "react";
// Import hooks from Next.js navigation (assuming App Router)
import { useRouter } from "next/navigation";
// Import Image component for optimization
import Image from "next/image";

import {
  AiOutlineArrowLeft,
  AiOutlineClockCircle,
  AiOutlineCalendar,
  AiFillLinkedin,
  AiFillFacebook,
  AiOutlineLink,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";

// Assuming LoadingAnimation component is accessible
// Imports client and urlFor from the sanity.js Canvas document
import { client, urlFor } from "../sanity";
import { PortableText } from "next-sanity";
import Loading from "@/app/loading";

// --- Helper Functions ---

/**
 * Estimate reading time based on content length of Portable Text array.
 * @param {Array} text - The PortableText body array from Sanity.
 * @returns {number} Estimated reading time in minutes (minimum 1).
 */
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
  // Return a number
  return Math.max(1, Math.round(wordCount / wordsPerMinute));
};

/**
 * Renders a standard error message display.
 */
const ErrorDisplay = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    <h2 className="text-2xl font-bold text-red-600 mb-4">
      Unable to load article
    </h2>
    <p className="mb-6">
      We're having trouble retrieving this content. Please try again later.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      Retry
    </button>
  </div>
);

// --- Main Component ---

const BlogDetails = ({ slug }) => {
  // Access the slug from the URL parameters (App Router)

  console.log("this my slug", slug);

  const router = useRouter(); // Initialize Next.js router for navigation

  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    console.log("oage mounted");
    if (!slug) return; // Ensure slug exists before fetching

    setIsLoading(true);
    setError(null);

    console.log(slug);
    // Sanity query updated to use $slug and fetch necessary fields
    const query = `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      _createdAt,
      author->{name, image, bio},
      mainImage { asset->{url} },
      // Simplified read time calculation in GROQ for demonstration
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

  // Reset copy success message after 2 seconds
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  // Memoize formatted date to prevent recalculations
  const formattedDate = useMemo(() => {
    if (!blog?._createdAt) return "";
    return new Date(blog._createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [blog?._createdAt]);

  // Calculate reading time
  const readingTime = useMemo(() => {
    if (!blog) return "0";
    // Use the Sanity estimatedReadTime if available and valid
    if (
      typeof blog.estimatedReadTime === "number" &&
      blog.estimatedReadTime > 0
    ) {
      return Math.max(1, Math.round(blog.estimatedReadTime));
    }
    // Fallback to client-side calculation (note: GROQ calculation is preferred)
    return Math.max(1, Math.round(estimateReadingTime(blog.body)));
  }, [blog]);

  // Share functionality
  const handleShare = (platform) => {
    const currentUrl = window.location.href;
    const title = blog?.title || "Great logistics article";
    const hashtags = "resume";

    let shareUrl;

    switch (platform) {
      case "twitter":
        shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(
          currentUrl,
        )}&text=${encodeURIComponent(title)}&hashtags=${encodeURIComponent(
          hashtags,
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          currentUrl,
        )}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl,
        )}`;
        break;
      case "copy":
        // Fallback implementation for navigator.clipboard due to iFrame restrictions
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        textArea.style.position = "fixed"; // Prevents scrolling to bottom of page
        textArea.style.opacity = 0;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
          setCopySuccess(true);
        } catch (err) {
          console.error("Fallback: Failed to copy URL: ", err);
        }
        document.body.removeChild(textArea);

        // Original modern clipboard API (kept for context, but fallback above is safer in iframes)
        // navigator.clipboard
        //   .writeText(currentUrl)
        //   .then(() => setCopySuccess(true))
        //   .catch((err) => console.error("Failed to copy URL: ", err));
        return; // Exit early for copy
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=450");
  };

  if (isLoading) return <Loading />;
  if (error || !blog) return <ErrorDisplay />;

  return (
    <div className="bg-white min-h-screen">
      {/* SEO Meta Tags (Next.js handles these best via the metadata API in the app directory, 
          but they are included here as a fallback/reminder) */}
      <title>{blog.title}</title>
      <meta
        name="description"
        content={`${blog.title} - Explore this in-depth logistics article, covering insights, strategies, and tips from industry experts.`}
      />
      {/* ... other meta tags ... */}

      {/* Blog Details */}
      <section className="text-gray-800 py-10 px-3 md:px-5 relative">
        {/* Back Button - Uses router.back() for Next.js */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-700 absolute left-3 top-20 md:left-5 transition-colors duration-200 
                     bg-white/80 backdrop-blur-sm py-2 px-3 rounded-full shadow-sm z-10 mt-9"
          aria-label="Go back"
        >
          <AiOutlineArrowLeft className="w-5 h-5" />
          <span className="hidden md:inline font-medium">Back</span>
        </button>

        <div className="max-w-5xl mx-auto space-y-6 pt-12 sm:pt-16 transition-all">
          {/* Category Tag */}

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center leading-tight px-2">
            {blog.title}
          </h1>

          {/* Reading Time & Date */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <AiOutlineCalendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <AiOutlineClockCircle className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Author Info */}
          <div className="flex items-center justify-center gap-3 text-sm">
            {blog.author?.image && (
              <Image
                src={urlFor(blog.author.image).width(48).height(48).url()}
                alt={blog.author.name}
                className="w-10 h-10 rounded-full object-cover shadow-md border-2 border-white"
                width={40}
                height={40}
                // Note: Image component requires absolute path/URL, which urlFor provides.
              />
            )}
            <p>
              By{" "}
              <span className="font-semibold text-blue-800">
                {blog.author?.name || "Unknown"}
              </span>
            </p>
          </div>

          {/* Main Image */}
          <div className="overflow-hidden rounded-lg shadow-lg">
            {blog.mainImage && (
              <Image
                // Added explicit dimensions to urlFor for better image optimization
                src={urlFor(blog.mainImage).width(1200).height(600).url()}
                alt={blog.title}
                className="w-full object-cover"
                width={1200} // Set appropriate dimensions for Next/Image
                height={600} // Use layout='responsive' or specific aspect ratio
                priority
              />
            )}
          </div>

          {/* Quick Share Buttons - Floating */}
          <div className="hidden md:flex flex-col fixed left-2 top-1/3 gap-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md">
            <button
              onClick={() => handleShare("twitter")}
              className="p-2 text-gray-700 hover:text-blue-500 transition-colors rounded-full hover:bg-gray-100"
              aria-label="Share on Twitter"
            >
              <FaSquareXTwitter className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="p-2 text-gray-700 hover:text-blue-700 transition-colors rounded-full hover:bg-gray-100"
              aria-label="Share on LinkedIn"
            >
              <AiFillLinkedin className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="p-2 text-gray-700 hover:text-blue-900 transition-colors rounded-full hover:bg-gray-100"
              aria-label="Share on Facebook"
            >
              <AiFillFacebook className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleShare("copy")}
              className="p-2 text-gray-700 hover:text-green-600 transition-colors rounded-full hover:bg-gray-100 relative"
              aria-label="Copy link"
            >
              <AiOutlineLink className="w-6 h-6" />
              {copySuccess && (
                <span className="absolute -right-16 bg-green-100 text-green-800 text-xs py-1 px-2 rounded whitespace-nowrap animate-fadeInOut">
                  Copied!
                </span>
              )}
            </button>
          </div>

          {/* Blog Body */}
          <article
            className="prose prose-lg max-w-none font-roboto prose-headings:font-bold prose-headings:text-gray-900 
                         prose-p:text-gray-700 prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline
                         prose-img:rounded-lg prose-img:shadow-md prose-blockquote:border-blue-500 
                         prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4"
          >
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-200 h-40 w-full rounded"></div>
              }
            >
              <PortableText value={blog.body} />
            </Suspense>
          </article>

          {/* Article Footer */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Mobile Share Buttons */}
              <div className="md:hidden">
                <h3 className="text-lg font-semibold mb-2">
                  Share this article
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-500 rounded-full transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <FaSquareXTwitter className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <AiFillLinkedin className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-900 rounded-full transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <AiFillFacebook className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleShare("copy")}
                    className="p-2 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-600 rounded-full transition-colors relative"
                    aria-label="Copy link"
                  >
                    <AiOutlineLink className="w-6 h-6" />
                    {copySuccess && (
                      <span className="absolute -right-16 bg-green-100 text-green-800 text-xs py-1 px-2 rounded whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 py-2 px-4 rounded-md transition-colors self-end"
                aria-label="Back to top"
              >
                <AiOutlineArrowUp className="w-4 h-4" />
                Back to top
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;
