
import Image from "next/image";
import Link from "next/link";

interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string | null;
  imageAlt: string | null;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string | null;
  lastPublished: string | null;
  source: string;
}

interface MainNewsProps {
  news: NewsArticle[];
}

const MainNews = ({ news }: MainNewsProps) => {
  if (!news || news.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-base-content/60">
          কোনো সংবাদ পাওয়া যায়নি।
        </p>
      </section>
    );
  }

  const [firstNews, ...otherNews] = news;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      {/* Section Heading */}
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-base-300 pb-4">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1.5 rounded-full bg-red-600" />
          <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
            প্রধান সংবাদ
          </h2>
        </div>

        <span className="text-xs font-medium text-base-content/50 sm:text-sm">
          সর্বশেষ খবর
        </span>
      </div>

      {/* News Layout */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6">
        {/* Featured News */}
        <Link
          href={firstNews.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:col-span-7"
        >
          {/* Featured Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-base-200 sm:aspect-[16/9]">
            {firstNews.imageUrl ? (
              <Image
                src={firstNews.imageUrl}
                alt={firstNews.imageAlt ?? firstNews.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-base-content/40">
                  ছবিটি পাওয়া যায়নি
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

            <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
              প্রধান খবর
            </span>
          </div>

          {/* Featured Content */}
          <div className="p-5 sm:p-7">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-base-content/50">
                {firstNews.source}
              </span>
            </div>

            <h3 className="text-xl font-extrabold leading-snug text-base-content transition-colors duration-200 group-hover:text-red-600 sm:text-2xl lg:text-3xl">
              {firstNews.title}
            </h3>

            {firstNews.description && (
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-base-content/65 sm:text-base">
                {firstNews.description}
              </p>
            )}

            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-red-600">
              বিস্তারিত পড়ুন
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </div>
        </Link>

        {/* Other News */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-base-content">আরও খবর</h3>
            <span className="text-xs text-base-content/50">
              {Math.min(otherNews.length, 4)}টি সংবাদ
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {otherNews.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-base-300 bg-base-100 p-3 transition-colors hover:border-red-300 hover:bg-base-200/50 sm:p-4"
              >
                {/* Category */}
                <p className="mb-1.5 text-xs font-semibold text-red-600 sm:text-sm">
                  {item.category}
                </p>

                {/* News Title */}
                <h4 className="text-sm font-bold leading-6 text-base-content transition-colors group-hover:text-red-600 sm:text-base">
                  {item.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainNews;
