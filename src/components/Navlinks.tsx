
import Link from "next/link";

interface NavsCategory {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

interface CategoriesResponse {
  data: NavsCategory[];
}

const Navlinks = async () => {
  let categories: NavsCategory[] = [];

  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/categories"
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const result: CategoriesResponse = await res.json();

    categories = result.data;
  } catch (error) {
    console.error("Categories fetch error:", error);
  }

  const filteredNavs = categories.filter(
    (category) => category.scrapable
  );

  return (
    <nav
      aria-label="প্রধান নেভিগেশন"
      className="w-full border-b border-gray-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 overflow-x-auto py-3">
          <Link
            href="/"
            className="shrink-0 rounded-md px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
          >
            হোম
          </Link>

          {filteredNavs.map((category) => (
            <Link
              key={category.slug}
              href={category.slug}
              className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-red-700"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navlinks;
