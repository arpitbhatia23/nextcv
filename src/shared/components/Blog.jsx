// shared/components/Blog.jsx

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity";
import { Search, ChevronDown, Calendar, ArrowRight, User } from "lucide-react";

// Format Sanity dates
const formatDate = dateString => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Basic reading-time estimate
const calculateReadingTime = excerpt => {
  if (!excerpt) return 1;

  const wordCount = excerpt.trim().split(/\s+/).length;

  return Math.max(1, Math.ceil(wordCount / 200));
};

const Blog = ({ initialBlogs = [] }) => {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  /*
   * Only keep posts that contain a valid slug.
   * This prevents broken /blogs/undefined links.
   */
  const blogs = useMemo(() => {
    return initialBlogs.filter(post => {
      return post?._id && post?.title && post?.slug?.current;
    });
  }, [initialBlogs]);

  /*
   * Build category list from server-provided posts.
   */
  const categories = useMemo(() => {
    const categorySet = new Set();

    blogs.forEach(post => {
      post.categories?.forEach(categoryItem => {
        if (categoryItem?.title) {
          categorySet.add(categoryItem.title);
        }
      });
    });

    return ["All", ...Array.from(categorySet)];
  }, [blogs]);

  /*
   * Filter posts without requesting Sanity again.
   */
  const filteredBlogs = useMemo(() => {
    let updatedBlogs = [...blogs];

    if (category !== "All") {
      updatedBlogs = updatedBlogs.filter(post =>
        post.categories?.some(categoryItem => categoryItem?.title === category)
      );
    }

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (normalizedSearchTerm) {
      updatedBlogs = updatedBlogs.filter(post => {
        const searchableText = [
          post.title,
          post.excerpt,
          post.author?.name,
          ...(post.categories?.map(item => item?.title) || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedSearchTerm);
      });
    }

    return updatedBlogs;
  }, [blogs, category, searchTerm]);

  /*
   * Control how many category buttons are shown before
   * moving the remaining categories into the dropdown.
   */
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(5);
      }
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  const visibleCategories = categories.slice(0, visibleCount);
  const extraCategories = categories.slice(visibleCount);

  const featuredPost = filteredBlogs[0] || null;
  const remainingPosts = filteredBlogs.slice(1);

  const handleCategoryClick = selectedCategory => {
    setCategory(selectedCategory);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("All");
  };

  return (
    <section id="blog" className="min-h-screen bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <header className="mb-16 space-y-4 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Latest Resume and Career Insights
          </h1>

          <p className="mx-auto max-w-2xl text-sm text-slate-600 md:text-base">
            Expert tips on resume writing, career development and job-market trends to help you land
            your dream job.
          </p>
        </header>

        {/* Filters and search */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Search input */}
          <div className="group relative w-full md:w-96">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-indigo-500" />
            </div>

            <input
              type="search"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              aria-label="Search blog articles"
              className="block w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 leading-5 placeholder-slate-400 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {visibleCategories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                aria-pressed={cat === category}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  cat === category
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}

            {extraCategories.length > 0 && (
              <div className="relative">
                <select
                  aria-label="More blog categories"
                  onChange={event => handleCategoryClick(event.target.value)}
                  value={extraCategories.includes(category) ? category : ""}
                  className={`cursor-pointer appearance-none rounded-lg border py-2 pl-4 pr-10 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    extraCategories.includes(category)
                      ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <option value="" disabled>
                    More
                  </option>

                  {extraCategories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            )}
          </div>
        </div>

        {/* Featured post */}
        {featuredPost && (
          <article className="mb-16">
            <Link href={`/blogs/${featuredPost.slug.current}`} className="group block">
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="grid gap-0 lg:grid-cols-2">
                  <div className="relative h-64 overflow-hidden bg-slate-100 lg:min-h-105">
                    {featuredPost.mainImage ? (
                      <Image
                        src={urlFor(featuredPost.mainImage).width(1200).height(800).url()}
                        alt={featuredPost.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        Featured Image
                      </div>
                    )}

                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm backdrop-blur-sm">
                      Featured
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />

                        {formatDate(featuredPost.publishedAt || featuredPost._createdAt)}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-slate-300" />

                      <span className="font-medium text-indigo-600">
                        {featuredPost.categories?.[0]?.title || "General"}
                      </span>
                    </div>

                    <h2 className="mb-4 text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-indigo-600 md:text-3xl">
                      {featuredPost.title}
                    </h2>

                    <p className="mb-6 line-clamp-3 leading-relaxed text-slate-600">
                      {featuredPost.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                          {featuredPost.author?.image ? (
                            <Image
                              src={urlFor(featuredPost.author.image).width(100).height(100).url()}
                              alt={featuredPost.author?.name || "Article author"}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          ) : (
                            <User className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-slate-400" />
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {featuredPost.author?.name || "NextCV Team"}
                          </p>

                          <p className="text-xs text-slate-500">
                            {calculateReadingTime(featuredPost.excerpt)} min read
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center text-sm font-semibold text-indigo-600 transition-transform group-hover:translate-x-1">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        )}

        {/* Remaining blog posts */}
        {remainingPosts.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map(post => (
              <article key={post._id} className="h-full">
                <Link href={`/blogs/${post.slug.current}`} className="group block h-full">
                  <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage).width(600).height(338).url()}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                          No Image
                        </div>
                      )}

                      {post.categories?.[0]?.title && (
                        <div className="absolute right-3 top-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                          {post.categories[0].title}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="h-3 w-3" />

                        {formatDate(post.publishedAt || post._createdAt)}
                      </div>

                      <h2 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                        {post.title}
                      </h2>

                      <p className="mb-4 line-clamp-3 flex-1 text-sm text-slate-600">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-2">
                          <div className="relative h-6 w-6 overflow-hidden rounded-full bg-slate-200">
                            {post.author?.image ? (
                              <Image
                                src={urlFor(post.author.image).width(64).height(64).url()}
                                alt={post.author?.name || "Article author"}
                                fill
                                sizes="24px"
                                className="object-cover"
                              />
                            ) : (
                              <User className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-slate-400" />
                            )}
                          </div>

                          <span className="text-xs font-medium text-slate-700">
                            {post.author?.name || "NextCV Team"}
                          </span>
                        </div>

                        <span className="flex items-center text-xs font-semibold text-indigo-600 group-hover:underline">
                          Read
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredBlogs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Search className="h-8 w-8 text-slate-400" />
            </div>

            <h2 className="mb-2 text-xl font-semibold text-slate-900">No articles found</h2>

            <p className="mx-auto max-w-sm text-slate-500">
              We couldn&apos;t find any articles matching your search. Try different keywords or
              categories.
            </p>

            {(searchTerm || category !== "All") && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
