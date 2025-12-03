// components/Blog.jsx

"use client";
import React, { useEffect, useState } from "react";
// Since this is a Next.js environment, we should try to use 'next/image'
import Image from "next/image";
// Using 'next/link' for internal routing links
import Link from "next/link";
// Assuming client and urlFor are imported from Sanity utility files
import { client, urlFor } from "../sanity";
import Loading from "@/app/loading";

// NOTE: Type Definitions (Interfaces) are removed for the JS conversion.

// --- Helper Functions ---

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// --- Component Definition ---

const Blog = () => {
  // All state initializations now use standard JS initial values
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(["All"]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Initial Data Fetch and Category Processing (on mount)
  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc){
_id,
title,
slug,
excerpt,
body,
_createdAt,
categories[]->{title},
author->{name, image},
mainImage
 }`;

    setIsLoading(true);

    client
      .fetch(query)
      .then((data) => {
        // Process posts to extract preview text if no excerpt exists
        const processedData = data.map((post) => {
          let finalExcerpt = post.excerpt;

          if (!finalExcerpt && post.body) {
            // Attempt to extract text from the first block of the Portable Text body
            const firstBlock = Array.isArray(post.body)
              ? post.body.find((block) => block._type === "block")
              : null;

            if (firstBlock && firstBlock.children) {
              finalExcerpt =
                firstBlock.children
                  .map((child) => child.text)
                  .join(" ")
                  .substring(0, 150) + "...";
            } else {
              finalExcerpt =
                "Read this article to learn more about our logistics solutions and industry insights.";
            }
          } else if (!finalExcerpt) {
            finalExcerpt =
              "Read this article to learn more about our logistics solutions and industry insights.";
          }

          return { ...post, excerpt: finalExcerpt };
        });

        setBlogs(processedData);
        setFilteredBlogs(processedData);

        // Extract unique categories
        const allCats = new Set();
        processedData.forEach((post) => {
          post.categories?.forEach((cat) => allCats.add(cat.title));
        });
        setCategories(["All", ...Array.from(allCats)]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch Sanity posts:", error);
        setIsLoading(false);
      });

    // Setup responsive button count
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(2); // Mobile/Small
      } else if (window.innerWidth < 1024) {
        setVisibleCount(3); // Tablet/Medium
      } else {
        setVisibleCount(4); // Desktop/Large
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []); // Run only on mount

  // 2. Filtering Logic (runs when category, search term, or blogs change)
  useEffect(() => {
    let updated = [...blogs];

    // Filter by Category
    if (category !== "All") {
      updated = updated.filter((post) =>
        post.categories?.some((catObj) => catObj.title === category)
      );
    }

    // Filter by Search Term
    if (searchTerm.trim()) {
      updated = updated.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBlogs(updated);
  }, [category, searchTerm, blogs]);

  // 3. Derived State
  // useMemo is removed, but the logic remains the same for simple variables.
  const visibleCategories = categories.slice(0, visibleCount);
  const extraCategories = categories.slice(visibleCount);

  // Separate featured post (first post) from the rest
  const featuredPost = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const remainingPosts = filteredBlogs.length > 0 ? filteredBlogs.slice(1) : [];

  // Handler for category buttons
  const handleCategoryClick = (cat) => {
    setCategory(cat);
  };

  if (isLoading) return <Loading />; // NOTE: Assuming LoadingAnimation is a component defined elsewhere

  return (
    <section id="blog" className="py-20 min-h-screen bg-white">
      <div className=" mt-10 mx-auto px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-barlow">
            Blog
          </h2>
          <div className="h-1 w-20 bg-yellow-400 mx-auto" />
          <p className="mt-4 text-gray-700 max-w-3xl mx-auto font-roboto">
            Stay updated with the latest insights, trends, and news from the
            logistics industry.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col 2xl:flex-row justify-between items-center mb-12 gap-4">
          {/* Search Input */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
                aria-label="search button"
              >
                <svg
                  className=" w-6 md:w-8 h-6 md:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Category Buttons & Dropdown */}
          <div className="flex flex-wrap gap-2 justify-center">
            {visibleCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(cat)}
                aria-label={`Filter by ${cat}`}
                className={`px-4 py-2 rounded-md font-barlow transition-colors duration-300 ${
                  cat === category
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}

            {extraCategories.length > 0 && (
              <select
                onChange={(e) => handleCategoryClick(e.target.value)}
                className={`px-4 py-2 rounded-md border text-gray-700 transition-colors duration-300 ${
                  extraCategories.includes(category)
                    ? "bg-yellow-100"
                    : "bg-white"
                }`}
                // Set value to the selected category, or an empty string if it's not in the dropdown
                value={extraCategories.includes(category) ? category : ""}
                aria-label="category dropdown"
              >
                <option value="" disabled className="text-gray-400 italic">
                  — More Categories —
                </option>
                {extraCategories.map((cat, i) => (
                  <option key={i} value={cat} className="text-black">
                    {cat}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Featured Blog Post (Landscape) */}
        {featuredPost && (
          <Link
            href={`/blogs/${featuredPost.slug.current}`}
            className="block"
            aria-label={`View featured article: ${featuredPost.title}`}
          >
            <div className="mb-16 overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:shadow-xl bg-neutral-100">
              <div className="flex flex-col lg:flex-row">
                {/* Featured Image */}
                <div className="w-full lg:w-1/2 h-56 lg:h-auto relative group">
                  {featuredPost.mainImage ? (
                    // Use Image component for the featured image
                    <Image
                      src={urlFor(featuredPost.mainImage)
                        .width(1200)
                        .height(800)
                        .url()}
                      alt={featuredPost.title}
                      fill // Use fill to make it cover the parent container
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw" // Define sizes for responsiveness
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
                      <span className="text-lg font-semibold">
                        Featured Article
                      </span>
                    </div>
                  )}

                  {/* Publication Date Overlay */}
                  <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-80 text-white px-3 py-2 rounded-md text-sm font-barlow">
                    {formatDate(featuredPost._createdAt)}
                  </div>
                </div>

                {/* Featured Content */}
                <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    {/* Featured Badge & Categories */}
                    <div className="flex flex-wrap gap-2 mb-4 items-center">
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-md font-barlow text-sm font-bold">
                        Featured
                      </span>
                      {(featuredPost.categories || []).map((cat, index) => (
                        <span
                          key={index}
                          className="text-xs bg-black text-white px-2 py-1 rounded-md font-barlow"
                        >
                          {cat.title}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-bold text-black mb-4 font-barlow leading-tight">
                      {featuredPost.title}
                    </h3>

                    {/* Excerpt with styled first letter */}
                    <div className="prose prose-lg text-gray-700 font-roboto mb-6">
                      <p>
                        <span className="float-left text-4xl font-bold mr-2 mt-1 text-black font-barlow">
                          {featuredPost.excerpt.charAt(0)}
                        </span>
                        {featuredPost.excerpt.substring(1)}
                      </p>
                    </div>
                  </div>

                  <div>
                    {/* Author */}
                    <div className="flex items-center mb-5">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-black mr-3 relative">
                        {featuredPost.author?.image ? (
                          <Image
                            src={urlFor(featuredPost.author.image)
                              .width(100)
                              .url()}
                            alt={featuredPost.author.name}
                            fill
                            className="object-cover"
                            sizes="100px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-xs">
                            No Img
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-black font-barlow">
                          {featuredPost.author.name}
                        </p>
                        <p className="text-xs text-gray-900 font-roboto ">
                          {Math.ceil(
                            featuredPost.excerpt.split(" ").length / 200
                          )}{" "}
                          min read
                        </p>
                      </div>
                    </div>

                    {/* Read More Button - Removed, link wraps the whole card */}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingPosts.map((post) => (
            <div
              key={post._id}
              className=" rounded-xl overflow-hidden shadow transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
            >
              <Link
                href={`/blogs/${post.slug.current}`}
                aria-label={`View article: ${post.title}`}
              >
                {/* Image with Date Overlay */}
                <div className="relative overflow-hidden">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).url()}
                      alt={post.title}
                      width={600}
                      height={350} // Set a fixed height for consistency in the grid
                      className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-300 flex items-center justify-center text-gray-600">
                      No Image
                    </div>
                  )}

                  {/* Date Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent text-white p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-barlow">
                        {formatDate(post._createdAt)}
                      </span>
                      <span className="text-xs font-roboto">
                        {Math.ceil(post.excerpt.split(" ").length / 200)} min
                        read
                      </span>
                    </div>
                  </div>

                  {/* Category Label */}
                  {post.categories && post.categories.length > 0 && (
                    <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs px-2 py-1 rounded-md font-barlow">
                      {post.categories[0].title}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-black mb-3 font-barlow line-clamp-2 hover:text-yellow-600 transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Article Excerpt */}
                  <div className="mb-4">
                    <p className="text-gray-700 text-sm font-roboto line-clamp-4">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer with author and read more */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-black mr-2 relative">
                        {post.author?.image ? (
                          <Image
                            src={urlFor(post.author.image).width(100).url()}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                            sizes="100px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-xs">
                            No Img
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-barlow">{post.author.name}</p>
                    </div>

                    {/* Read More Link */}
                    <span className="text-sm text-black font-semibold hover:text-yellow-600 transition-colors duration-300 font-barlow flex items-center">
                      Read Article
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredBlogs.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <h3 className="text-xl font-barlow mb-2">No articles found 😔</h3>
            <p className="text-gray-600 font-roboto">
              Try adjusting your search or category filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
