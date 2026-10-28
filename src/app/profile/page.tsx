"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-red-700"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold">প্রোফাইল দেখতে লগইন করুন</h2>
        <p className="mt-2 text-base-content/60">
          আপনার প্রোফাইল দেখতে অ্যাকাউন্টে সাইন ইন করুন।
        </p>
        <Link href="/signin" className="btn mt-5 bg-red-700 text-white hover:bg-red-800">
          লগইন করুন
        </Link>
      </div>
    );
  }

  const formatDate = (date?: Date | string) => {
    if (!date) return "তথ্য পাওয়া যায়নি";

    return new Intl.DateTimeFormat("bn-BD", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(date));
  };

  return (
    <main className="min-h-screen bg-base-200 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-700">
            Account
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-2 text-sm text-base-content/60 sm:text-base">
            আপনার ব্যক্তিগত তথ্য এবং অ্যাকাউন্টের বিবরণ।
          </p>
        </div>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
          <div className="h-28 bg-red-700 sm:h-36" />

          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="avatar">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-base-100 bg-base-200 sm:h-28 sm:w-28">
                  <Image
                    width={112}
                    height={112}
                    alt={`${user.name ?? "ব্যবহারকারী"}-এর প্রোফাইল ছবি`}
                    src={user.image || "/default-avatar.jpg"}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`badge badge-lg ${
                    user.emailVerified
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {user.emailVerified
                    ? "ইমেইল ভেরিফাইড"
                    : "ইমেইল ভেরিফাই করা হয়নি"}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <h2 className="break-words text-2xl font-bold sm:text-3xl">
                {user.name || "নাম দেওয়া হয়নি"}
              </h2>
              <p className="mt-1 break-all text-sm text-base-content/60 sm:text-base">
                {user.email}
              </p>
            </div>

            {/* User Information */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-bold">ব্যক্তিগত তথ্য</h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-base-200 p-4">
                  <p className="text-sm text-base-content/60">পুরো নাম</p>
                  <p className="mt-2 break-words font-semibold">
                    {user.name || "নাম দেওয়া হয়নি"}
                  </p>
                </div>

                <div className="rounded-xl bg-base-200 p-4">
                  <p className="text-sm text-base-content/60">ইমেইল ঠিকানা</p>
                  <p className="mt-2 break-all font-semibold">
                    {user.email}
                  </p>
                </div>

                <div className="rounded-xl bg-base-200 p-4 sm:col-span-2">
                  <p className="text-sm text-base-content/60">ইউজার আইডি</p>
                  <p className="mt-2 break-all font-mono text-sm font-medium">
                    {user.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-bold">অ্যাকাউন্টের তথ্য</h3>

              <div className="space-y-4">
                <div className="flex flex-col gap-1 border-b border-base-300 pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-base-content/60">
                    অ্যাকাউন্ট তৈরি হয়েছে
                  </span>
                  <span className="text-sm font-medium sm:text-right">
                    {formatDate(user.createdAt)}
                  </span>
                </div>

                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-base-content/60">
                    সর্বশেষ আপডেট
                  </span>
                  <span className="text-sm font-medium sm:text-right">
                    {formatDate(user.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/profile/edit"
                className="btn w-full border-red-700 bg-red-700 text-white hover:border-red-800 hover:bg-red-800 sm:w-auto"
              >
                প্রোফাইল এডিট করুন
              </Link>

              <Link
                href="/"
                className="btn btn-outline w-full sm:w-auto"
              >
                হোম পেজে ফিরে যান
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;





// Before Ai 

// "use client"

// import { useSession } from "@/lib/auth-client";
// import Image from "next/image";
// import Link from "next/link";



// const ProfilePage = () => {
//     const { data: session } = useSession();
//       const user = session?.user;
//     //   console.log(user, 'form profile page');
//     return (
//         <div>
//             <Link href={"/profile"}>
//             <div className="avatar shrink-0">
//               <div className="w-12 overflow-hidden rounded-full sm:w-14">
//                 <Image
//                   width={56}
//                   height={56}
//                   alt={`${user?.name ?? "ব্যবহারকারী"}-এর প্রোফাইল ছবি`}
//                   src={user?.image ?? "/default-avatar.jpg"}
//                   className="h-full w-full object-cover"
//                 />
//                 <p className="truncate text-xs text-base-content/60 sm:text-sm">
//               {user?.email}
//             </p>
//               </div>
//             </div>
//           </Link>
//         </div>
//     );
// };

// export default ProfilePage;