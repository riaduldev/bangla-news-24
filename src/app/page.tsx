import MainNews from "@/components/MainNews";

import MostReadNewsCard from "@/components/MostReadNewsCard";
import NewsCard, { NewsArticle } from "@/components/NewsCard";


interface NewsSection {
  articles: NewsArticle[];
  count: number;
  curationId: string;
  curationType: string;
  link: string | null;
  title: string;
}

export default async function Home() {
  const res = await fetch('https://news-api-v2.vercel.app/api/news/sections');
  const data = await res.json();
  const sections = data.data;
  const mainNews = sections[0].articles;
  // console.log(mainNews);
  const othersSections:NewsSection[] = sections.slice(1);
  // console.log(othersSections);

  return (
    
    <div className="w-full">
  {/* Breaking News Marquee */}
 

  {/* Main Content */}
  <main className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
  <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8">
    {/* Main News Section */}
    <section className="min-w-0 space-y-6 lg:col-span-2">
      <MainNews news={mainNews} />

      {/* Other News Sections */}
      <div className="space-y-6 sm:space-y-8">
        {othersSections.map((section) => (
          <section
            key={section.curationId}
            className="min-w-0 border-b-2 border-red-700 pb-4"
          >
            {/* Section Heading */}
            <div className="border-b border-base-300 pb-3">
              <h2 className="border-l-4 border-red-600 pl-3 text-lg font-extrabold leading-snug text-base-content sm:text-xl">
                {section.title}
              </h2>
            </div>

            {/* Responsive News Cards */}
            <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-5">
              {section.articles.map((news) => (
                <div key={news.id} className="min-w-0">
                  <NewsCard news={news} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>

    {/* Most Read News Sidebar */}
    <aside className="min-w-0 lg:col-span-1">
      <MostReadNewsCard />
    </aside>
  </div>
</main>
</div>
  );
}
