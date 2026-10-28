
"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে সাইন আউট হয়েছে!");
            router.push("/signin");
          },
        },
      });

      if (error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      }
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-4 py-2 shadow-sm">
        <span className="loading loading-spinner loading-sm text-primary" />
        <span className="text-sm text-base-content/60">
          অপেক্ষা করুন...
        </span>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center sm:w-auto sm:justify-end">
      {user ? (
        <div className="flex w-full max-w-sm items-center gap-3 rounded-2xl bg-base-100 p-3 shadow-md transition-all duration-300 hover:shadow-lg sm:w-auto sm:min-w-64">
          <div className="avatar shrink-0">
            <div className="w-12 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100 sm:w-14">
              <Image
                width={56}
                height={56}
                alt={`${user.name ?? "ব্যবহারকারী"}-এর প্রোফাইল ছবি`}
                src={user.image ?? "/default-avatar.png"}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-base-content sm:text-base">
              {user.name ?? "ব্যবহারকারী"}
            </p>
            <p className="truncate text-xs text-base-content/60 sm:text-sm">
              {user.email}
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-success" />
              <span className="text-xs text-success">
                লগইন করা আছে
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="btn bg-red-700 btn-sm shrink-0 rounded-xl px-3 text-white transition-transform hover:scale-105"
          >
            সাইন আউট
          </button>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-end sm:gap-3">
          <Link
            href="/signin"
            className="btn btn-sm min-w-24 rounded-xl px-4 sm:btn-md"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="btn bg-red-700 text-white btn-sm min-w-24 rounded-xl px-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:btn-md"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
