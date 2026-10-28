import Image from "next/image";
import Navlinks from "./Navlinks";
import UserInfo from "./UserInfo";


const Header = () => {
    const date = new Date().toLocaleString('bn-BD', {
        dateStyle:'full'
    })
    // console.log(date);
    return (
  
<header className="w-full border-b border-gray-200 bg-white shadow-sm">
  <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

    {/* Logo & Website Info */}
    <div className="flex min-w-0 items-center gap-3">
      <Image
        src="/logo.webp"
        width={50}
        height={50}
        alt="Bangla News 24 Logo"
        className="h-10 w-10 shrink-0 rounded-lg object-contain sm:h-12 sm:w-12"
      />

      <div className="min-w-0">
        <h1 className="truncate text-lg font-bold tracking-tight text-gray-900 sm:text-2xl">
          Bangla News 24
        </h1>

        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          {date}
        </p>
      </div>
    </div>

    {/* Auth Buttons */}
    <UserInfo></UserInfo>

  </div>
  <Navlinks></Navlinks>
</header>

    );
};

export default Header;