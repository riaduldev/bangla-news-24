'use client'
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-slate-50 px-4 py-16 text-slate-900 sm:px-6">
      {/* Background Decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-100/70 blur-3xl sm:h-80 sm:w-80"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-slate-200/70 blur-3xl sm:h-80 sm:w-80"
      />

      <section className="relative w-full max-w-2xl text-center">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-100 bg-white shadow-lg shadow-red-100/50 sm:h-20 sm:w-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-8 w-8 text-red-600 sm:h-10 sm:w-10"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <path d="M8.5 8.5 13.5 13.5M13.5 8.5 8.5 13.5" />
          </svg>
        </div>

        {/* 404 Number */}
        <div className="relative mb-2">
          <h1
            aria-label="Error 404"
            className="select-none text-[7rem] font-black leading-none tracking-tighter text-slate-200 sm:text-[10rem] md:text-[12rem]"
          >
            404
          </h1>

          <span className="absolute inset-0 flex items-center justify-center pt-2 text-xl font-bold tracking-[0.2em] text-red-600 sm:text-2xl">
            NOT FOUND
          </span>
        </div>

        {/* Message */}
        <div className="mx-auto mt-6 max-w-lg">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
            Oops! Page Not Found
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
            The page you're looking for may have been removed,
            had its name changed, or is temporarily unavailable.
            Let's get you back to the latest news.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="m3 10 9-7 9 7" />
              <path d="M5 9v11h14V9" />
              <path d="M9 20v-7h6v7" />
            </svg>
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Go Back
          </button>
        </div>

        {/* Footer Note */}
        <div className="mx-auto mt-12 flex max-w-sm items-center justify-center gap-3">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Stay informed
          </span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
      </section>
    </main>
  );
}
