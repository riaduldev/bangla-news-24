import Image from "next/image";
import Link from "next/link";


type NewsBodyBlock = {
  type: string;
  text?: string;
  url?: string;
  caption?: string;
  altText?: string;
  width?: number;
  height?: number;
};

type NewsDetails = {
  id: string;
  title: string;
  text?: string;
  description?: {
    text?: string;
  };
  imageUrl?: string;
  firstPublished?: string;
  lastPublished?: string;
  source?: string;
  sourceUrl?: string;
  link?: string;
  byline?: {
    name: string;
    role?: string;
  }[];
  topics?: {
    id: string;
    name: string;
  }[];
  tags?: string[];
  body?: NewsBodyBlock[];
  wordCount?: number;
};

type NewsDetailsPageProps = {
  params: Promise<{
    newsId: string;
  }>;
};

const NewsDetailsPage = async ({ params }: NewsDetailsPageProps) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${encodeURIComponent(newsId)}`,
  );
  

  if (!res.ok) {
    throw new Error("Failed to fetch news article");
  }

  const result: { data?: NewsDetails } = await res.json();
  const newsData = result.data;

  if (!newsData) {
    throw new Error("News article not found");
  }

  const leadImage =
    newsData.body?.[0]?.type === "image" ? newsData.body[0] : undefined;

  const heroImage = newsData.imageUrl || leadImage?.url;

  const publishedTimestamp = newsData.firstPublished
    ? new Date(newsData.firstPublished)
    : null;

  const publishedDate =
    publishedTimestamp && !Number.isNaN(publishedTimestamp.getTime())
      ? new Intl.DateTimeFormat("bn-BD", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(publishedTimestamp)
      : null;

  const topics = newsData.topics?.length
    ? newsData.topics.map((topic) => topic.name)
    : (newsData.tags ?? []);

  const sourceUrl = newsData.sourceUrl || newsData.link;
  const bodyBlocks = newsData.body ?? [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500"
        >
          <Link href="/" className="transition-colors hover:text-red-600">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">News Details</span>
        </nav>

        {/* Article Header */}
        <header className="mx-auto mb-8 max-w-5xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {newsData.source && (
              <span className="rounded-full bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700">
                {newsData.source}
              </span>
            )}

            <span className="text-sm text-slate-500">News Article</span>
          </div>

          <h1 className="text-3xl font-extrabold leading-snug tracking-tight text-slate-950 sm:text-4xl sm:leading-tight lg:text-5xl">
            {newsData.title}
          </h1>

          {newsData.description?.text && (
            <p className="mt-5 border-l-4 border-red-600 pl-4 text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
              {newsData.description.text}
            </p>
          )}

          {/* Author and Date */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-slate-200 py-4 text-sm text-slate-600">
            {newsData.byline?.length ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 font-bold text-red-700">
                  {newsData.byline[0].name.charAt(0)}
                </span>

                <div>
                  <p className="font-semibold text-slate-900">
                    {newsData.byline.map((author) => author.name).join(", ")}
                  </p>
                  {newsData.byline[0].role && (
                    <p className="text-xs text-slate-500">
                      {newsData.byline[0].role}
                    </p>
                  )}
                </div>
              </div>
            ) : null}

            {publishedDate && (
              <div className="flex items-center gap-2">
                <span aria-hidden="true">◷</span>
                <time dateTime={newsData.firstPublished}>{publishedDate}</time>
              </div>
            )}

            {typeof newsData.wordCount === "number" && (
              <span>{newsData.wordCount.toLocaleString("bn-BD")} শব্দ</span>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {heroImage && (
          <figure className="mx-auto mb-10 max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image
  src={heroImage}
  width={leadImage?.width ?? 1200}
  height={leadImage?.height ?? 675}
  alt={leadImage?.altText || newsData.title}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
  className="h-auto max-h-[560px] w-full object-contain"
  fetchPriority="high"
/>

            {leadImage?.caption && (
              <figcaption className="px-4 py-3 text-sm leading-6 text-slate-500 sm:px-6">
                {leadImage.caption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Article Content + Sidebar */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10">
          {/* Main Article */}
          <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-8 w-1.5 rounded-full bg-red-600" />
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                বিস্তারিত খবর
              </h2>
            </div>

            <div className="space-y-0 break-words text-base leading-8 text-slate-700 sm:text-lg sm:leading-9">
              {bodyBlocks.length > 0
                ? bodyBlocks.map((block, index) => {
                    // Skip the first image because it is already
                    // displayed as the featured image above.
                    if (index === 0 && block.type === "image" && heroImage) {
                      return null;
                    }

                    // Article subheadings
                    if (block.type === "subheading" && block.text) {
                      return (
                        <h2
                          key={`heading-${index}`}
                          className="mb-4 mt-10 border-l-4 border-red-600 pl-4 text-xl font-bold leading-snug text-slate-950 sm:text-2xl"
                        >
                          {block.text}
                        </h2>
                      );
                    }

                    // Article images
                    if (block.type === "image" && block.url) {
                      return (
                        <figure
                          key={`image-${index}`}
                          className="my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <Image
                            src={block.url}
                            alt={
                              block.altText || block.caption || newsData.title
                            }
                            loading="lazy"
                            className="h-auto max-h-[650px] w-full object-contain"
                            width={block.width}
                            height={block.height}
                          />

                          {block.caption && (
                            <figcaption className="border-t border-slate-200 px-4 py-3 text-sm leading-6 text-slate-500 sm:px-5">
                              {block.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    }

                    // Article paragraphs
                    if (block.type === "text" && block.text) {
                      const paragraphs = block.text
                        .split(/\n\s*\n/)
                        .map((paragraph) => paragraph.trim())
                        .filter(Boolean);

                      return (
                        <div key={`text-${index}`}>
                          {paragraphs.map((paragraph, paragraphIndex) => (
                            <p
                              key={`${index}-${paragraphIndex}`}
                              className="mb-6 whitespace-pre-line"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      );
                    }

                    return null;
                  })
                : // Fallback when the API has no structured body
                  (newsData.text ?? "")
                    .split(/\n\s*\n/)
                    .map((paragraph) => paragraph.trim())
                    .filter(Boolean)
                    .map((paragraph, index) => (
                      <p key={index} className="mb-6 whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
            </div>

            {/* Topics */}
            {topics.length > 0 && (
              <div className="mt-10 border-t border-slate-200 pt-6">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-900">
                  Topics
                </h3>

                <div className="flex flex-wrap gap-2">
                  {topics.map((topic, index) => (
                    <span
                      key={`${topic}-${index}`}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-6">
            {/* About this article */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-5 text-lg font-bold text-slate-900">
                Article Information
              </h2>

              <div className="space-y-4 text-sm">
                {newsData.source && (
                  <div>
                    <p className="mb-1 text-slate-500">Published by</p>
                    <p className="font-semibold text-slate-900">
                      {newsData.source}
                    </p>
                  </div>
                )}

                {publishedDate && (
                  <div>
                    <p className="mb-1 text-slate-500">Publication Date</p>
                    <p className="font-semibold text-slate-900">
                      {publishedDate}
                    </p>
                  </div>
                )}

                {typeof newsData.wordCount === "number" && (
                  <div>
                    <p className="mb-1 text-slate-500">Article Length</p>
                    <p className="font-semibold text-slate-900">
                      {newsData.wordCount.toLocaleString("bn-BD")} শব্দ
                    </p>
                  </div>
                )}
              </div>

              {sourceUrl && (
                <Link
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Read Original Article
                  <span aria-hidden="true">↗</span>
                </Link>
              )}
            </section>

            {/* Topics in Sidebar */}
            {topics.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                  Explore Topics
                </h2>

                <div className="flex flex-wrap gap-2">
                  {topics.map((topic, index) => (
                    <span
                      key={`${topic}-sidebar-${index}`}
                      className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>

        {/* Back to Home */}
        <div className="mx-auto mt-10 max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-red-300 hover:text-red-700"
          >
            <span aria-hidden="true">←</span>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NewsDetailsPage;
