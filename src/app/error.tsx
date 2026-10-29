
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-200/50 p-8 text-center shadow-lg sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-error/10 text-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 4h.01M10.3 3.9 1.9 18.4A1.8 1.8 0 0 0 3.5 21h17a1.8 1.8 0 0 0 1.6-2.6L13.7 3.9a2 2 0 0 0-3.4 0Z"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-base-content sm:text-3xl">
          কিছু একটা সমস্যা হয়েছে!
        </h1>

        <p className="mt-3 text-sm leading-6 text-base-content/60 sm:text-base">
          দুঃখিত, পেজটি লোড করার সময় একটি সমস্যা হয়েছে।
          অনুগ্রহ করে আবার চেষ্টা করুন।
        </p>

        <button
          onClick={() => reset()}
          className="btn btn-error mt-7 w-full text-white"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    </main>
  );
}
