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

const MostReadNewsCard = async() => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
    const data = await res.json();
    const mostNews = data.data;
    // console.log(mostNews);

    return (
        <div className="p-4">
  <h4 className="font-bold">{mostNews[0]?.category}</h4>

  <ol className="list-decimal space-y-3 pl-6">
   {mostNews.map((most:MostNews) => (
  <li key={most.id} className="text-base font-medium">
    <Link
      href={most.link}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors hover:text-red-700"
    >
      {most.title}
    </Link>
  </li>
))}
  </ol>
</div>
    );
};

export default MostReadNewsCard;