
import NewsCard, { type NewsArticle } from "@/components/NewsCard";

type CategoryDetailsPageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

type CategoryApiResponse = {
  title: string;
  data: NewsArticle[];
};

const CategoryDetailsPage = async ({
  params,
}: CategoryDetailsPageProps) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category news");
  }

  const data: CategoryApiResponse = await res.json();
  const newsData = data.data;

  return (
    <div className="mx-auto my-5 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="mb-5 border-b-2 border-red-700 pb-3 text-2xl font-bold sm:text-3xl">
        {data.title}
      </h1>

      {newsData.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newsData.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-gray-500">
          No news found in this category.
        </p>
      )}
    </div>
  );
};

export default CategoryDetailsPage;
