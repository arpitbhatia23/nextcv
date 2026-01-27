export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 via-gray-900 to-black text-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20">
        {/* Animated linear orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-linear-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-semibold mb-6">
            Built by Students, For Students
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            We make résumés that freshers can afford
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
            As BCA students, we've felt the struggle. Expensive resume builders,
            monthly subscriptions, and designs that don't work for freshers. So
            we built NextCV — just ₹100, one time, no BS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105">
              Start Your Resume — ₹100
            </button>
            <button className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
              Talk to Us
            </button>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-6 py-20 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-orange-600/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-semibold mb-6">
              Our Story
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why we built this
            </h2>
          </div>

          <div className="relative bg-linear-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />

            <div className="relative space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                We're both BCA students. When we started looking for
                internships, we realized something frustrating: every
                "professional" resume builder wanted monthly subscriptions.
                ₹500, ₹800, sometimes ₹1200 — every month.
              </p>
              <p>
                As students, we couldn't justify that. We just needed one good
                resume. Not a subscription. Not fancy templates we'd never use.
                Just one clean, ATS-friendly resume that worked.
              </p>
              <p className="text-white font-semibold">
                So we built NextCV. Pay once. Get a professional resume. That's
                it.
              </p>
              <p>
                No hidden costs. No premium tiers. No "unlock this feature"
                nonsense. Just ₹100 for a resume that actually helps you get
                interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose & Values */}
      <section className="px-6 py-20 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Purpose */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Making job search fair for students
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                Getting your first job is hard enough. You shouldn't have to pay
                monthly fees just to make a resume. We're fixing that.
              </p>
              <p className="text-gray-400 leading-relaxed text-lg">
                Built by Indian students, for Indian students and freshers.
                Priced at what we'd actually pay ourselves.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold">
                What We Believe
              </div>
              <div className="space-y-8">
                <div className="group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-linear-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">💸</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Fair Pricing
                      </h3>
                      <p className="text-gray-400">
                        One-time ₹100. No subscriptions, no hidden fees.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Fresher-Focused
                      </h3>
                      <p className="text-gray-400">
                        Designed for students with limited experience.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-linear-to-br from-cyan-600/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">✨</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Simple & Clean
                      </h3>
                      <p className="text-gray-400">
                        No clutter. Just clean, ATS-friendly designs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Team */}
      <section className="px-6 py-20 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-pink-600/20 border border-pink-500/30 rounded-full text-pink-400 text-sm font-semibold mb-6">
              The Team
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Two BCA Students
            </h2>
            <p className="text-gray-400 text-lg">
              Building tools we wish existed when we started job hunting
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Aurpit */}
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/30 to-blue-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center text-3xl font-bold mb-6 shadow-lg shadow-purple-500/50">
                  A
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Aurpit</h3>
                <p className="text-purple-400 font-semibold mb-2">Co-Founder</p>
                <p className="text-gray-500 text-sm mb-4">
                  BCA Student · Full-Stack Developer
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Builds the frontend, backend, and everything in between.
                  Believes good design shouldn't cost a month's pocket money.
                </p>
              </div>
            </div>

            {/* Tamanna */}
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/30 to-cyan-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-3xl font-bold mb-6 shadow-lg shadow-blue-500/50">
                  T
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Tamanna</h3>
                <p className="text-blue-400 font-semibold mb-2">Co-Founder</p>
                <p className="text-gray-500 text-sm mb-4">
                  BCA Student · Full-Stack Developer
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Handles infrastructure, security, and making sure everything
                  actually works. Obsessed with reliability and user privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="px-6 py-20 pb-32 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full text-green-400 text-sm font-semibold mb-6">
              Why NextCV?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What makes us different
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-cyan-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
                <div className="text-4xl mb-4">🚫</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  No Subscriptions
                </h3>
                <p className="text-gray-400">
                  Other platforms charge ₹500-1200/month. We charge ₹100 once.
                  That's it.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-pink-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Built for Freshers
                </h3>
                <p className="text-gray-400">
                  Templates designed specifically for students and entry-level
                  candidates.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-green-600/20 to-emerald-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Actually Works
                </h3>
                <p className="text-gray-400">
                  ATS-compatible, recruiter-approved, tested with real job
                  applications.
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 text-center">
            <p className="text-2xl text-gray-300 mb-6">
              We're just students trying to help other students.
            </p>
            <p className="text-gray-400 mb-8">
              If this helps you land an interview, that's all the success we
              need.
            </p>
            <button className="px-10 py-5 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-bold text-xl transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105">
              Create Your Resume — ₹100
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
