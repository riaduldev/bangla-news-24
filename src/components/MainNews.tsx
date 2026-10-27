import Image from 'next/image';

interface NewsArticle {
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


const MainNews = ({news}:{news:NewsArticle[]}) => {
    // console.log(news);
    const [firstNews, ...othersNews] = news;
    
    return (
        <div className='flex gap-2'>
            <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <Image
    width={600}
    height={600}
    src={firstNews.imageUrl}
    alt={firstNews.imageAlt}
    />
  </figure>
  <div className="card-body">
    <p className='text-red-600 font-semibold'>{firstNews.category}</p>
    <h2 className="card-title">{firstNews.title}</h2>
    <p>{firstNews.description}</p>
  </div>
</div>

<div>
    {
        othersNews.slice(0, 4).map((news) => <div key={news.id} className='card bg-base-100 border border-gray-300 p-5'>
            <p className='text-red-600 font-semibold'>{firstNews.category}</p>
            {news.title}
            </div>)
    }
</div>
        </div>
    );
};

export default MainNews;