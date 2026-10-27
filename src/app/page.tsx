import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee";
import MostReadNewsCard from "@/components/MostReadNewsCard";


export default async function Home() {
  const res = await fetch('https://news-api-v2.vercel.app/api/news/sections');
  const data = await res.json();
  const sections = data.data;
  const mainNews = sections[0].articles;
  // console.log(mainNews);
  const othersSections = sections.slice(1);
  // console.log(othersSections);

  return (
    // <div>
    //   <Marquee></Marquee>
      
    //   <div className="grid grid-cols-3 max-w-7xl mx-0 p-10">
    //     {/* news section */}
    //     <div className="col-span-2">
    //       <MainNews news={mainNews} key={mainNews.id}></MainNews>
    //     </div>
    //     {/* most read section */}
    //     <div className="col-span-1">
    //       <MostReadNewsCard></MostReadNewsCard>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full">
  {/* Breaking News Marquee */}
  <Marquee />

  {/* Main Content */}
  <main className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
    <div className="grid grid-cols-1 items-start gap-5 md:gap-6 lg:grid-cols-3 lg:gap-8">
      {/* Main News Section */}
      <section className="min-w-0 lg:col-span-2">
        <MainNews news={mainNews} />
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
