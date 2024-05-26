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
            className="w-full mx-auto"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="w-full bg-zinc-800 mx-auto group p-8 my-2 hover:outline hover:outline-purple-700 duration-75 cursor-pointer rounded-lg">
                <div className="w-full border-b mb-6 pb-1">
                    <span className="text-gray-200 font-light text-sm uppercase tracking-[4px]">
                        Musing
                    </span>

                    {views && (
                        <span className="text-gray-300 text-sm float-right">
                            {readTime} min read | {views} views
                        </span>
                    )}
                </div>

                <h3 className="text-lg my-2 px-5 py-2 bg-zinc-700 text-zinc-100 rounded-lg w-fit group-hover:bg-purple-900 transition-colors">
                    {title || "Untitled"}
                </h3>

                {brief && <p className="text-gray-300">{brief}</p>}
            </div>
        </a>
    );
}
