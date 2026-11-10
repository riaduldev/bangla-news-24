"use client";

import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";

type SocialProvider = "google" | "github";

const SignInPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<SocialProvider | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const { error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocial = async (provider: SocialProvider) => {
    setLoadingProvider(provider);

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "লগইন করা যায়নি। আবার চেষ্টা করুন।");
      }
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-10 sm:min-h-[85vh] sm:px-6">
      <section className="w-full max-w-md overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl">
        {/* Header */}
        <div className="bg-red-700 px-6 py-8 text-center text-white sm:px-8 sm:py-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-3xl">
            <span aria-hidden="true">📰</span>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">স্বাগতম!</h1>

          <p className="mt-2 text-sm text-white/85 sm:text-base">
            আপনার অ্যাকাউন্টে সাইন ইন করুন
          </p>
        </div>

        {/* Form */}
        <div className="p-5 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-base-content"
              >
                ইমেইল ঠিকানা
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="আপনার ইমেইল লিখুন"
                autoComplete="email"
                required
                className="input input-bordered w-full rounded-xl bg-base-100 outline-none transition focus:border-red-700 focus:outline-red-700"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-base-content"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  autoComplete="current-password"
                  required
                  className="input input-bordered w-full rounded-xl bg-base-100 pr-16 outline-none transition focus:border-red-700 focus:outline-red-700"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-base-content/60 transition hover:text-red-700"
                >
                  {showPassword ? "লুকান" : "দেখান"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn mt-2 w-full rounded-xl border-red-700 bg-red-700 text-base font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-red-800 hover:bg-red-800 hover:shadow-lg disabled:translate-y-0 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  সাইন ইন হচ্ছে...
                </>
              ) : (
                "সাইন ইন করুন"
              )}
            </button>

            {/* Social login */}
            <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={() => handleSocial("google")}
                disabled={loadingProvider !== null}
                className="btn w-full min-w-0 bg-white text-sm text-black shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-red-800 hover:bg-red-800 hover:text-white hover:shadow-lg disabled:translate-y-0 disabled:opacity-70 sm:flex-1"
              >
                {loadingProvider === "google" ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : null}
                Google দিয়ে লগইন
              </button>

              <button
                type="button"
                onClick={() => handleSocial("github")}
                disabled={loadingProvider !== null}
                className="btn w-full min-w-0 bg-white text-sm text-black shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-red-800 hover:bg-red-800 hover:text-white hover:shadow-lg disabled:translate-y-0 disabled:opacity-70 sm:flex-1"
              >
                {loadingProvider === "github" ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : null}
                GitHub দিয়ে লগইন
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-xs leading-relaxed text-base-content/60 sm:text-sm">
            আপনার অ্যাকাউন্টের তথ্য দিয়ে প্রবেশ করুন।
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignInPage;
