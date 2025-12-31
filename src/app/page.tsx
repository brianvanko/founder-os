export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6">
              Your Private
              <br />
              <span className="text-slate-600">Operating System</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-slate-600 mb-12">
              A personal productivity system for founders who want clarity without complexity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </a>
              <a
                href="/login"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-lg font-medium border-2 border-slate-200 hover:border-slate-300 transition-all"
              >
                Sign In
              </a>
            </div>
            <p className="text-sm text-slate-500 mt-6">
              No credit card required • Start in 60 seconds
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Building a company is hard enough.
          </h2>
          <p className="text-xl text-slate-300 mb-4">
            You don't need another productivity app with badges, streaks, and gamification.
          </p>
          <p className="text-xl text-slate-300">
            You need a private system to think clearly, track what matters, and avoid regret.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything you need. Nothing you don't.
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A complete operating system for founders, designed for clarity and action.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl border-2 border-slate-100 hover:border-slate-200 transition-colors">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Daily Check-ins
              </h3>
              <p className="text-slate-600">
                5 questions. Less than 60 seconds. Track energy, wins, and what drained you.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl border-2 border-slate-100 hover:border-slate-200 transition-colors">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Weekly Reviews
              </h3>
              <p className="text-slate-600">
                Reflect on progress, energy patterns, and goal alignment every week.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl border-2 border-slate-100 hover:border-slate-200 transition-colors">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Goal Tracking
              </h3>
              <p className="text-slate-600">
                1-year, 3-year, and 10-year goals with progress tracking and status updates.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl border-2 border-slate-100 hover:border-slate-200 transition-colors">
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                AI Insights
              </h3>
              <p className="text-slate-600">
                Pattern recognition across your reviews. Identify contradictions and recurring themes.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-xl border-2 border-slate-100 hover:border-slate-200 transition-colors">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Frameworks
              </h3>
              <p className="text-slate-600">
                Annual reviews, vivid vision, life map, and more proven frameworks.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-xl border-2 border-slate-100 hover:border-slate-200 transition-colors">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Private & Secure
              </h3>
              <p className="text-slate-600">
                Your data is yours. Encrypted, private, and never shared. Export anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Simple by design
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              No learning curve. No setup complexity. Just start.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Sign Up
              </h3>
              <p className="text-slate-600">
                Create your account in 60 seconds. No credit card required.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Complete Your First Check-in
              </h3>
              <p className="text-slate-600">
                Answer 5 questions about your day. Takes less than a minute.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Build Clarity Over Time
              </h3>
              <p className="text-slate-600">
                Watch patterns emerge. Adjust course. Act deliberately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Philosophy */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Built on principles, not productivity theater
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">
                ✓ Simplicity over complexity
              </h3>
              <p className="text-slate-600">
                No badges, points, or gamification. Just clarity.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">
                ✓ Reflection over action
              </h3>
              <p className="text-slate-600">
                Thinking prevents regret. Clarity drives better decisions.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">
                ✓ Privacy first
              </h3>
              <p className="text-slate-600">
                Your deepest thoughts deserve security. Always private.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">
                ✓ Speed where it matters
              </h3>
              <p className="text-slate-600">
                Daily check-ins under 60 seconds. Deep work when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Start free. Stay focused.
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            All features available during development. No payment required to test.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-all shadow-xl"
            >
              Get Started Now
            </a>
            <a
              href="/login"
              className="px-8 py-4 bg-transparent text-white rounded-lg font-medium border-2 border-white hover:bg-white hover:text-slate-900 transition-all"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              © 2025 Founder Personal OS. Built for clarity, not complexity.
            </p>
            <p className="text-xs mt-2">
              Daily check-ins • Weekly reviews • Pattern recognition • AI insights
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
