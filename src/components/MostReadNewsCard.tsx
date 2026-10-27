// import Link from "next/link";

// interface MostNews {
//   id: string;
//   title: string;
//   description: string | null;
//   link: string;
//   imageUrl: string | null;
//   imageAlt: string | null;
//   category: string;
//   type: string;
//   isLive: boolean;
//   firstPublished: string | null;
//   lastPublished: string | null;
//   source: string;
//   rank: number;
// }

// const MostReadNewsCard = async() => {
//     const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
//     const data = await res.json();
//     const mostNews = data.data;
//     // console.log(mostNews);

//     return (
//         <div className="p-4">
//   <h4 className="font-bold">{mostNews[0]?.category}</h4>

//   <ol className="list-decimal space-y-3 pl-6">
//    {mostNews.map((most:MostNews) => (
//   <li key={most.id} className="text-base font-medium">
//     <Link
//       href={most.link}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="transition-colors hover:text-red-700"
//     >
//       {most.title}
//     </Link>
//   </li>
// ))}
//   </ol>
// </div>
//     );
// };

// export default MostReadNewsCard;





import Link from "next/link";

interface MostNews {
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
  rank: number;
}

const MostReadNewsCard = async () => {
  let mostNews: MostNews[] = [];

  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/news/most-read"
    );

    if (!res.ok) throw new Error("Failed to fetch news");

    const data = await res.json();
    mostNews = Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="w-full min-w-0 rounded-lg border border-base-300 bg-base-100">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-base-300 px-3 py-2.5">
        <span className="h-5 w-1 rounded-full bg-red-600" />
        <h2 className="text-base font-bold">সর্বাধিক পঠিত</h2>
      </div>

      {/* News List */}
      {mostNews.length > 0 ? (
        <ol className="divide-y divide-base-300/70">
          {mostNews.map((item, index) => (
            <li key={item.id}>
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 px-3 py-3 transition-colors hover:bg-base-200/60"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                    index === 0
                      ? "bg-red-600 text-white"
                      : "bg-base-200 text-base-content/70 group-hover:bg-red-600 group-hover:text-white"
                  }`}
                >
                  {item.rank ?? index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-base-content transition-colors group-hover:text-red-600">
                    {item.title}
                  </h3>

                </div>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="p-4 text-center text-sm text-base-content/60">
          কোনো খবর পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};

export default MostReadNewsCard;