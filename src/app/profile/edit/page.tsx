"use client";

import { updateUser, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";

const ProfileForm = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [isSaving, setIsSaving] = useState(false);
  const [showImageHint, setShowImageHint] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const trimmedName = String(formData.get("name") ?? "").trim();
    const trimmedImage = String(formData.get("image") ?? "").trim();

    if (!trimmedName) {
      toast.error("নাম খালি রাখা যাবে না।");
      return;
    }

    if (trimmedImage && !/^https?:\/\//i.test(trimmedImage)) {
      toast.error("ছবির লিংক সঠিক হতে হবে (http বা https দিয়ে শুরু)।");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await updateUser({
        name: trimmedName,
        image: trimmedImage || undefined,
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      toast.success("প্রোফাইল আপডেট হয়েছে!");
      router.refresh();
      router.push("/profile");
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-red-700" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
      <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-lg">
        {/* Header */}
        <div className="border-b border-base-300 px-5 py-6 sm:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">
            প্রোফাইল আপডেট করুন
          </h2>
          <p className="mt-2 text-sm text-base-content/60">
            আপনার নাম ও প্রোফাইল ছবির তথ্য পরিবর্তন করুন।
          </p>
        </div>

        {/* Form — remounted when the session arrives so the fields are prefilled */}
        <form
          key={user?.id ?? "anonymous"}
          onSubmit={handleSubmit}
          className="space-y-6 p-5 sm:p-8"
        >
          {/* Name */}
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
              defaultValue={user?.name ?? ""}
              required
              className="input input-bordered w-full rounded-xl bg-base-100 transition focus:border-red-700 focus:outline-red-700"
            />
          </div>

          {/* Profile Image */}
          <div className="space-y-2">
            <label
              htmlFor="image"
              className="text-sm font-semibold text-base-content"
            >
              প্রোফাইল ছবির লিংক
            </label>

            <input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/photo.jpg"
              autoComplete="url"
              defaultValue={user?.image ?? ""}
              className="input input-bordered w-full rounded-xl bg-base-100 transition focus:border-red-700 focus:outline-red-700"
            />

            <button
              type="button"
              onClick={() => setShowImageHint((prev) => !prev)}
              className="text-xs font-semibold text-red-700 underline-offset-4 hover:underline"
            >
              {showImageHint ? "লুকান" : "ছবির লিংক সম্পর্কে তথ্য"}
            </button>

            {showImageHint ? (
              <p className="text-xs text-base-content/50">
                শুধু https লিংক ব্যবহার করুন, নয়তো ছবিটি দেখা যাবে না। লিংক
                খালি রাখলে আগের ছবিই থাকবে।
              </p>
            ) : null}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-base-300 pt-5 sm:flex-row sm:justify-end">
            <button
              type="reset"
              disabled={isSaving}
              className="btn btn-outline w-full rounded-xl sm:w-auto"
            >
              বাতিল করুন
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="btn w-full rounded-xl border-red-700 bg-red-700 text-white hover:border-red-800 hover:bg-red-800 sm:w-auto"
            >
              {isSaving ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  সংরক্ষণ হচ্ছে...
                </>
              ) : (
                "সংরক্ষণ করুন"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
