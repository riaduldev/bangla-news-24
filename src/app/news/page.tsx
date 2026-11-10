import Link from "next/link";
import NewsCard, { type NewsArticle } from "@/components/NewsCard";

const PAGE_SIZE = 12;

type NewsListResponse = {
  success?: boolean;
  count?: number;
  total?: number;
  limit?: number;
  offset?: number;
  data?: NewsArticle[];
};

type AllNewsPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const AllNewsPage = async ({ searchParams }: AllNewsPageProps) => {
  const { page } = await searchParams;

  const parsedPage = Number.parseInt(page ?? "1", 10);
  const currentPage =
    Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  let articles: NewsArticle[] = [];
  let total = 0;

  try {
    const res = await fetch(
      `https://news-api-v2.vercel.app/api/news?limit=${PAGE_SIZE}&offset=${
        (currentPage - 1) * PAGE_SIZE
      }`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status}`);
    }

    const result: NewsListResponse = await res.json();
    articles = Array.isArray(result.data) ? result.data : [];
    total = result.total ?? articles.length;
  } catch (error) {
    console.error("All news fetch error:", error);
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="mx-auto my-5 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="mb-5 border-b-2 border-red-700 pb-3 text-2xl font-bold sm:text-3xl">
        সব খবর
      </h1>

      {articles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>

          <nav
            aria-label="পেজিনেশন"
            className="mt-8 flex items-center justify-between gap-3 border-t border-base-300 pt-5"
          >
            {hasPrev ? (
              <Link
                href={`/news?page=${currentPage - 1}`}
                className="rounded-md border border-base-300 px-4 py-2 text-sm font-semibold text-base-content transition hover:border-red-300 hover:text-red-700"
              >
                ← পূর্ববর্তী
              </Link>
            ) : (
              <span className="px-4 py-2 text-sm text-base-content/40">
                ← পূর্ববর্তী
              </span>
            )}

            <span className="text-sm font-medium text-base-content/70">
              পৃষ্ঠা {currentPage} / {totalPages}
            </span>

            {hasNext ? (
              <Link
                href={`/news?page=${currentPage + 1}`}
                className="rounded-md border border-base-300 px-4 py-2 text-sm font-semibold text-base-content transition hover:border-red-300 hover:text-red-700"
              >
                পরবর্তী →
              </Link>
            ) : (
              <span className="px-4 py-2 text-sm text-base-content/40">
                পরবর্তী →
              </span>
            )}
          </nav>
        </>
      ) : (
        <p className="py-10 text-center text-gray-500">
          কোনো খবর পাওয়া যায়নি।
        </p>
      )}
    </div>
  );
};

export default AllNewsPage;
