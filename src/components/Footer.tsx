
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-8 w-full border-t border-red-200 bg-white">
      {/* Red Accent */}
      <div className="h-1 w-full bg-red-600" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:justify-between md:gap-5 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-lg font-extrabold tracking-tight text-slate-900 transition-colors hover:text-red-600"
        >
          Bangla <span className="text-red-600">News 24</span>
        </Link>

        {/* Description */}
        <p className="text-sm leading-6 text-slate-500">
          দেশ-বিদেশের খবর, সবসময় আপনার সঙ্গে।
        </p>

        {/* Copyright */}
        <p className="text-xs text-slate-500 sm:text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-red-600">Bangla News 24</span>
          . সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
