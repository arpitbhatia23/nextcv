// components/Blog.jsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "../sanity";
import Loading from "@/app/loading";
import { Search, ChevronDown, Calendar, Clock, ArrowRight, User } from "lucide-react";

// --- Helper Functions ---
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// --- Component Definition ---
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(["All"]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Initial Data Fetch
  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc){
        _id, title, slug, excerpt, body, _createdAt, categories[]->{title}, author->{name, image}, mainImage
    }`;

    setIsLoading(true);

    client.fetch(query).then((data) => {
        const processedData = data.map((post) => {
          let finalExcerpt = post.excerpt;
          if (!finalExcerpt && post.body) {
            const firstBlock = Array.isArray(post.body)
              ? post.body.find((block) => block._type === "block")
              : null;
            if (firstBlock && firstBlock.children) {
              finalExcerpt = firstBlock.children.map((child) => child.text).join(" ").substring(0, 150) + "...";
            } else {
              finalExcerpt = "Read this article to learn more about our career insights.";
            }
          } else if (!finalExcerpt) {
            finalExcerpt = "Read this article to learn more about our career insights.";
          }
          return { ...post, excerpt: finalExcerpt };
        });

        setBlogs(processedData);
        setFilteredBlogs(processedData);

        const allCats = new Set();
        processedData.forEach((post) => {
          post.categories?.forEach((cat) => allCats.add(cat.title));
        });
        setCategories(["All", ...Array.from(allCats)]);
        setIsLoading(false);
      }).catch((error) => {
        console.error("Failed to fetch Sanity posts:", error);
        setIsLoading(false);
      });

    const updateVisibleCount = () => {
      if (window.innerWidth < 768) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(3);
      else setVisibleCount(5);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // 2. Filtering Logic
  useEffect(() => {
    let updated = [...blogs];
    if (category !== "All") {
      updated = updated.filter((post) =>
        post.categories?.some((catObj) => catObj.title === category),
      );
    }
    if (searchTerm.trim()) {
      updated = updated.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredBlogs(updated);
  }, [category, searchTerm, blogs]);

  const visibleCategories = categories.slice(0, visibleCount);
  const extraCategories = categories.slice(visibleCount);

  const featuredPost = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const remainingPosts = filteredBlogs.length > 0 ? filteredBlogs.slice(1) : [];

  const handleCategoryClick = (cat) => setCategory(cat);

  if (isLoading) return <Loading />;

  return (
    <section id="blog" className="py-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Latest Insights & News
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Expert tips on resume writing, career development, and job market trends to help you land your dream job.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          {/* Search */}
          <div className="w-full md:w-96 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {visibleCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  cat === category
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}

            {extraCategories.length > 0 && (
              <div className="relative">
                <select
                  onChange={(e) => handleCategoryClick(e.target.value)}
                  value={extraCategories.includes(category) ? category : ""}
                  className={`appearance-none pl-4 pr-10 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                     extraCategories.includes(category) 
                     ? "bg-indigo-50 text-indigo-700 border-indigo-200" 
                     : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <option value="" disabled>More</option>
                  {extraCategories.map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            )}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Link href={`/blogs/${featuredPost.slug.current}`} className="group block mb-16">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  {featuredPost.mainImage ? (
                    <Image
                      src={urlFor(featuredPost.mainImage).width(1200).height(800).url()}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                      Feature Image
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 shadow-sm">
                    Featured
                  </div>
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                     <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {formatDate(featuredPost._createdAt)}</span>
                     <span className="w-1 h-1 bg-slate-300 rounded-full" />
                     <span className="text-indigo-600 font-medium">
                        {featuredPost.categories?.[0]?.title || "General"}
                     </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                         <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                            {featuredPost.author?.image ? (
                                <Image src={urlFor(featuredPost.author.image).width(100).url()} alt={featuredPost.author.name} fill className="object-cover" />
                            ) : (
                                <User className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400" />
                            )}
                         </div>
                         <div>
                            <p className="text-sm font-semibold text-slate-900">{featuredPost.author?.name || "NextCV Team"}</p>
                            <p className="text-xs text-slate-500">{Math.ceil(featuredPost.excerpt.split(" ").length / 200)} min read</p>
                         </div>
                    </div>
                    <span className="inline-flex items-center text-sm font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingPosts.map((post) => (
            <Link key={post._id} href={`/blogs/${post.slug.current}`} className="group h-full">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                  )}
                  {post.categories?.[0] && (
                     <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-semibold text-slate-700 shadow-sm">
                        {post.categories[0].title}
                     </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                     <Calendar className="w-3 h-3" />
                     {formatDate(post._createdAt)}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                     <div className="flex items-center gap-2">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden bg-slate-200">
                            {post.author?.image ? (
                                <Image src={urlFor(post.author.image).width(64).url()} alt={post.author.name} fill className="object-cover" />
                            ) : (
                                <User className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400" />
                            )}
                        </div>
                        <span className="text-xs font-medium text-slate-700">{post.author?.name || "Team"}</span>
                     </div>
                     <span className="text-xs font-semibold text-indigo-600 flex items-center group-hover:underline">
                        Read <ArrowRight className="ml-1 w-3 h-3" />
                     </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && !isLoading && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No articles found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              We couldn't find any articles matching your search. Try different keywords or categories.
            </p>
            <button 
                onClick={() => {setSearchTerm(""); setCategory("All");}}
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
                Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
