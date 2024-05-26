type Props = TransformedPost;

export default function MusingCard({
  brief,
  coverImage,
  slug,
  title,
  readTime,
  updatedAt,
  url,
  views,
}: Props) {
  return (
    <a
      href={url}
      className="mx-auto w-full"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="group mx-auto my-2 w-full cursor-pointer rounded-lg bg-zinc-800 p-8 duration-75 hover:outline hover:outline-purple-700">
        <div className="mb-6 w-full border-b pb-1">
          <span className="text-sm font-light uppercase tracking-[4px] text-gray-200">
            Musing
          </span>

          {views && (
            <span className="float-right text-sm text-gray-300">
              {readTime} min read | {views} views
            </span>
          )}
        </div>

        <h3 className="my-2 w-fit rounded-lg bg-zinc-700 px-5 py-2 text-lg text-zinc-100 transition-colors group-hover:bg-purple-900">
          {title || "Untitled"}
        </h3>

        {brief && <p className="text-gray-300">{brief}</p>}
      </div>
    </a>
  );
}
