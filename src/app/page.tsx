export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
          CEO Personal OS
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          Your private productivity system.
          <br />
          Clarity without complexity.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/signup"
            className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="px-6 py-3 bg-white text-slate-900 rounded-lg font-medium border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Sign In
          </a>
        </div>
        <p className="text-sm text-slate-500 mt-8">
          Daily check-ins • Weekly reviews • Pattern recognition
          <br />
          Built for CEOs who want to think clearly and act deliberately.
        </p>
      </div>
    </div>
  );
}
