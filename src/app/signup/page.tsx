"use client";

import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মেলেনি। আবার চেষ্টা করুন।");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp.email({
        name,
        image: image || undefined,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      toast.success("আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-8 sm:min-h-[85vh] sm:px-6 sm:py-12">
      <section className="w-full max-w-md overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl">
        {/* Header */}
        <div className="bg-red-700 px-5 py-7 text-center text-white sm:px-8 sm:py-9">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-3xl">
            <span aria-hidden="true">📰</span>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
            আপনার তথ্য দিয়ে সহজেই যোগ দিন
          </p>
        </div>

        {/* Form */}
        <div className="p-5 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-base-content"
              >
                আপনার নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="আপনার পুরো নাম লিখুন"
                autoComplete="name"
                required
                className="input input-bordered w-full rounded-xl bg-base-100 focus:border-red-700 focus:outline-red-700"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="image"
                className="text-sm font-semibold text-base-content"
              >
                প্রোফাইল ছবির লিংক
                <span className="ml-1 font-normal text-base-content/50">
                  (ঐচ্ছিক)
                </span>
              </label>

              <input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                autoComplete="url"
                className="input input-bordered w-full rounded-xl bg-base-100 focus:border-red-700 focus:outline-red-700"
              />

              <p className="text-xs leading-relaxed text-base-content/55">
                ছবি না দিলেও অ্যাকাউন্ট তৈরি করতে পারবেন।
              </p>
            </div>

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
                className="input input-bordered w-full rounded-xl bg-base-100 focus:border-red-700 focus:outline-red-700"
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
                  placeholder="কমপক্ষে ৮ অক্ষর লিখুন"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="input input-bordered w-full rounded-xl bg-base-100 pr-16 focus:border-red-700 focus:outline-red-700"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-base-content/60 transition hover:text-red-700"
                >
                  {showPassword ? "লুকান" : "দেখান"}
                </button>
              </div>

              <p className="text-xs text-base-content/55">
                নিরাপদ পাসওয়ার্ড ব্যবহার করুন।
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-base-content"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="আবার পাসওয়ার্ড লিখুন"
                autoComplete="new-password"
                minLength={8}
                required
                className="input input-bordered w-full rounded-xl bg-base-100 focus:border-red-700 focus:outline-red-700"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn mt-2 w-full rounded-xl border-red-700 bg-red-700 text-base font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-red-800 hover:bg-red-800 hover:shadow-lg disabled:translate-y-0 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  অ্যাকাউন্ট তৈরি হচ্ছে...
                </>
              ) : (
                "অ্যাকাউন্ট তৈরি করুন"
              )}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-base-300" />
            <span className="text-xs text-base-content/50">অথবা</span>
            <div className="h-px flex-1 bg-base-300" />
          </div>

          <p className="text-center text-sm text-base-content/70">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-bold text-red-700 underline-offset-4 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
