
"use client";

import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

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

              <input
                id="password"
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর লিখুন"
                autoComplete="new-password"
                minLength={8}
                required
                className="input input-bordered w-full rounded-xl bg-base-100 focus:border-red-700 focus:outline-red-700"
              />

              <p className="text-xs text-base-content/55">
                নিরাপদ পাসওয়ার্ড ব্যবহার করুন।
              </p>
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





//////////
// Before Ai 

// 'use client'

// import { signUp } from "@/lib/auth-client";
// import { redirect } from "next/navigation";
// import React from "react";

// const SignUpPage = () => {
//     const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const user = Object.fromEntries(formData.entries()) as {name:string, email: string , password:string, image:string};

//         // console.log(user);

//         const {data, error} = await signUp.email({
//              ...user,
//              callbackURL: "/"
//         })
//         if(data) {
//             console.log(data);
//             redirect("/")
//         }
//         if(error){
//             console.log(error);
//         }

//     }
//     return (
//         <div className="flex flex-col items-center justify-center mt-5">
//             <h2 className="font-bold text-3xl">Sign-Up Now</h2>
//              <form onSubmit={onSubmit}>
//             <fieldset className="fieldset border-base-300 rounded-box w-xs p-4">

//  <label className="label">Name</label>
//   <input name="name" type="text" className="input" placeholder="Name" />

//  <label className="label">Image URL</label>
//   <input name="image" type="url" className="input" placeholder="URL" />

//   <label className="label">Email</label>
//   <input name="email" type="email" className="input" placeholder="Email" />

//   <label className="label">Password</label>
//   <input name="password" type="password" className="input" placeholder="Password" />

//   <button type="submit" className="btn bg-red-700 text-white mt-4">Sign-Up</button>
// </fieldset>
//            </form>
//         </div>
//     );
// };

// export default SignUpPage;