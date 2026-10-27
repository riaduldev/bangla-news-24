
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface NewsHeadLine {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string;
  lastPublished: string;
  source: string;
}

const Marquee = async () => {
  let headlines: NewsHeadLine[] = [];

  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/news?limit=10"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch latest news");
    }

    const data = await res.json();
    headlines = data.data ?? [];
  } catch (error) {
    console.error("Marquee news error:", error);
  }

  if (headlines.length === 0) {
    return null;
  }

  return (
    <section className="w-full border-y border-red-800 bg-red-700 text-white">
      <div className="mx-auto flex max-w-7xl items-stretch px-0 sm:px-6 lg:px-8">

        {/* Latest News Label */}
        <div className="relative z-10 flex shrink-0 items-center gap-2 bg-red-900 px-3 py-1 sm:px-5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-300 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>

          <span className="whitespace-nowrap text-xs font-bold sm:text-sm">
            সর্বশেষ
          </span>
        </div>

        {/* Scrolling Headlines */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <MarqueeText
            className="flex items-center py-1 text-sm font-medium sm:text-base"
            duration={10}
            pauseOnHover={true}
            direction="right"
          >
            {headlines.map((h) => (
              <span
                key={h.id}
                className="inline-flex items-center"
              >
                <Link
                  href={h.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-3 whitespace-nowrap transition-colors hover:text-red-200 sm:mx-5"
                >
                  {h.title}
                </Link>

                <span
                  aria-hidden="true"
                  className="text-red-300"
                >
                  ◆
                </span>
              </span>
            ))}
          </MarqueeText>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
