import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 via-gray-900 to-black text-gray-100 antialiased">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-16">
        {/* Animated background elements */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-700" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold mb-6">
              Get in Touch
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Let's build something useful
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Tell us about your team, hiring goals, or how we can improve. We
              reply within 24–48 hours.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/30 to-cyan-600/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all duration-300">
                <div className="text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  24h
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  Typical reply time
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/30 to-pink-600/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300">
                <div className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  ₹100
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  Resume price
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <main className="px-6 py-12 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form - Left Side (2/3) */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-10">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Write to us
                  </h3>
                  <p className="text-gray-400 mb-8">
                    For product feedback, partnerships or press inquiries, drop
                    a message below or email us at{" "}
                    <a
                      href="mailto:support@nextcv.in"
                      className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                    >
                      support@nextcv.in
                    </a>
                    .
                  </p>

                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Info Sidebar - Right Side (1/3) */}
            <aside className="space-y-6">
              {/* Location Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-600/20 to-blue-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
                      <span className="text-xl">📍</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Visit us</h4>
                      <p className="text-gray-400 text-sm">
                        India · Remote-first
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal & Policies Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-pink-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 flex items-center justify-center">
                      <span className="text-xl">⚖️</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      Legal & Policies
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="/privacy-policy"
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors group/link"
                      >
                        <span className="group-hover/link:translate-x-1 transition-transform">
                          →
                        </span>
                        Privacy policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="/terms"
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors group/link"
                      >
                        <span className="group-hover/link:translate-x-1 transition-transform">
                          →
                        </span>
                        Terms & Conditions
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Press Kit Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-br from-pink-600/20 to-orange-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-pink-500/50 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-pink-600/20 to-orange-600/20 border border-pink-500/30 flex items-center justify-center">
                      <span className="text-xl">📰</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">
                        Press kit
                      </h4>
                      <a
                        href="/press"
                        className="text-pink-400 hover:text-pink-300 flex items-center gap-2 transition-colors group/link"
                      >
                        <span className="group-hover/link:translate-x-1 transition-transform">
                          →
                        </span>
                        Download
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Quick Contact Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-br from-green-600/20 to-emerald-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 flex items-center justify-center">
                      <span className="text-xl">✉️</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">
                        Direct email
                      </h4>
                      <a
                        href="mailto:support@nextcv.in"
                        className="text-green-400 hover:text-green-300 text-sm transition-colors"
                      >
                        help@nextcv.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
