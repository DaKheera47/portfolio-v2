type Props = {
    repoName: string;
    description?: string;
    type: string;
    repoUrl: string;
    views?: string;
};

export default function ProjectCard({
    repoName,
    description,
    type,
    repoUrl,
    views,
}: Props) {
    return (
        <a
            href={repoUrl}
            className="w-full mx-auto"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="w-full bg-zinc-800 mx-auto p-8 my-2 hover:outline hover:outline-gray-400 duration-150 transition-all lg:hover:scale-[99%] cursor-pointer rounded-lg space-y-4">
                <div className="w-full border-b mb-6 pb-1">
                    <span className="text-gray-200 font-light text-sm uppercase tracking-[4px]">
                        {type}
                    </span>

                    {views && (
                        <span className="text-gray-300 text-sm float-right">
                            {views}
                        </span>
                    )}
                </div>

                <span className="text-base tracking-tight lg:tracking-normal lg:text-xl my-2 font-mono px-5 py-2 font-semibold bg-zinc-700 text-zinc-100 rounded-lg">
                    {repoName}
                </span>

                {description && <p className="text-gray-300">{description}</p>}
            </div>
        </a>
    );
}
