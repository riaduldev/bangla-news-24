import Image from "next/image";
import Link from "next/link";


export interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  firstPublished: string | null;
  lastPublished: string | null;
  imageAlt: string | null;
  imageUrl: string | null;
  isLive: boolean;
  link: string;
  source: string;
  category: string;
  type: string;
}


const NewsCard = ({news}:{news:NewsArticle}) => {
    // console.log(news, "form newsCard page");
  return (
    <div className="w-full min-w-0">
  <article className="group h-full w-full min-w-0 overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-lg sm:rounded-2xl">
    <Link
      href={`/news/${news.id}`}
      rel="noopener noreferrer"
      className="flex h-full min-w-0 flex-col"
    >
      {/* News Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-base-200">
        {news.imageUrl ? (
          <Image
            src={news.imageUrl}
            alt={news.imageAlt ?? news.title}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-base-content/50">
            ছবি পাওয়া যায়নি
          </div>
        )}

        {/* Category */}
        <span className="absolute left-2 top-2 max-w-[80%] truncate rounded-md bg-red-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1.5">
          {news.category}
        </span>

        {/* Live Badge */}
        {news.isLive && (
          <span className="absolute right-2 top-2 rounded-md bg-red-600 px-2 py-1 text-[10px] font-bold text-white sm:right-3 sm:top-3 sm:text-xs">
            LIVE
          </span>
        )}
      </div>

      {/* News Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4 lg:p-5">
        <h2 className="line-clamp-3 text-base font-extrabold leading-6 text-base-content transition-colors group-hover:text-red-600 sm:text-lg sm:leading-7 lg:text-xl">
          {news.title}
        </h2>

        {news.description && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-base-content/70 sm:mt-3">
            {news.description}
          </p>
        )}

        {/* Source */}
        <div className="mt-auto pt-4">
          {/* Read More */}
          <div className="mt-3 flex items-center justify-between border-t border-base-300 pt-3">
            <span className="text-xs font-bold text-red-600 sm:text-sm">
              বিস্তারিত পড়ুন
            </span>

            <span
              aria-hidden="true"
              className="text-sm text-red-600 transition-transform duration-200 group-hover:translate-x-1 sm:text-base"
            >
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  </article>
</div>
  );
};

export default NewsCard;
