"use client";

import { updateUser } from "@/lib/auth-client";
import { useState} from "react";

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
     const formData = new FormData(e.target);
     const newUserData = Object.fromEntries(formData.entries());
    //  console.log(newUserData);
    const {data, error} = await updateUser({
        ...newUserData
    })
  };

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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-8">
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input input-bordered w-full rounded-xl bg-base-100 transition focus:border-red-700 focus:outline-red-700"
            />

            <p className="text-xs text-base-content/50">
              একটি বৈধ ছবির URL দিন। এই ফিল্ডটি ঐচ্ছিক।
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-base-300 pt-5 sm:flex-row sm:justify-end">
            <button
              type="reset"
              onClick={() => {
                setName("");
                setImage("");
              }}
              className="btn btn-outline w-full rounded-xl sm:w-auto"
            >
              বাতিল করুন
            </button>

            <button
              type="submit"
              className="btn w-full rounded-xl border-red-700 bg-red-700 text-white hover:border-red-800 hover:bg-red-800 sm:w-auto"
            >
              সংরক্ষণ করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;




