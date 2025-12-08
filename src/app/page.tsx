import Link from "next/link";
import { Sparkles, FileText, Upload, Wand2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="border-b border-white/50 backdrop-blur-sm bg-white/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                PresentAI
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/pricing"
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                Pricing
              </Link>
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/50"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Create Presentations with AI
          </h1>
          <p className="text-lg text-slate-600">
            How would you like to get started?
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Generate Card */}
          <Link
            href="/auth/signup"
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-indigo-300"
          >
            <div className="mb-4 aspect-video rounded-xl bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 flex items-center justify-center overflow-hidden">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Generate</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Create from a one-line prompt in a few seconds
            </p>
            <div className="mt-4 inline-flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              🕐 LAST USED
            </div>
          </Link>

          {/* Paste in text Card */}
          <Link
            href="/auth/signup"
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-purple-300"
          >
            <div className="mb-4 aspect-video rounded-xl bg-gradient-to-br from-slate-800 via-purple-600 to-pink-500 flex items-center justify-center overflow-hidden">
              <FileText className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Paste in text</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Create from notes, an outline, or existing content
            </p>
          </Link>

          {/* Import file or URL Card */}
          <Link
            href="/auth/signup"
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-300"
          >
            <div className="mb-4 aspect-video rounded-xl bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 flex items-center justify-center overflow-hidden relative">
              <Upload className="h-12 w-12 text-white" />
              <div className="absolute top-2 right-2 bg-white rounded-lg p-2 shadow-lg">
                <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-orange-400 rounded" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Import file or URL</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Enhance existing docs, presentations, or webpages
            </p>
          </Link>

          {/* Remix a template Card */}
          <Link
            href="/auth/signup"
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-green-300"
          >
            <div className="mb-4 aspect-video rounded-xl bg-gradient-to-br from-purple-500 via-pink-400 to-orange-400 flex items-center justify-center overflow-hidden relative">
              <Wand2 className="h-12 w-12 text-white" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-400/30 to-transparent" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Remix a template</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Fill in and customize a structured template
            </p>
            <div className="mt-4 inline-flex items-center text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
              ✨ NEW
            </div>
          </Link>
        </div>
      </section>

      {/* What You Can Create Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Presentations Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 flex items-center justify-center shadow-lg">
                  <div className="text-white text-center">
                    <div className="text-xs font-bold mb-1">Unlock your</div>
                    <div className="text-xs font-bold">startup's full</div>
                    <div className="text-xs font-bold">potential</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Presentations</h3>
                <p className="text-slate-600 leading-relaxed">
                  Stunning slides with consistent branding in minutes. Export to PPT, Google Slides, and more.
                </p>
              </div>
            </div>
          </div>

          {/* Documents Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 p-4 flex items-center justify-center shadow-lg">
                  <div className="text-indigo-900 text-center">
                    <div className="text-sm font-bold">Q3 Marketing</div>
                    <div className="text-sm font-bold">Goals</div>
                    <div className="mt-2 text-xs">📊 📈</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Documents</h3>
                <p className="text-slate-600 leading-relaxed">
                  Show-stopping proposals, PDFs, visual aids and more, lightning-fast on any topic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                PresentAI
              </span>
            </div>
            <p className="text-sm text-slate-600">
              © 2025 PresentAI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/pricing"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
