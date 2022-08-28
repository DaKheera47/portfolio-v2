type Props = {
    repoName: string;
    description: string;
    type: string;
    repoUrl: string;
};

export default function ProjectCard({
    repoName,
    description,
    type,
    repoUrl,
}: Props) {
    return (
        <a
            href={repoUrl}
            className="w-full mx-auto"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="w-full bg-zinc-800 mx-auto p-8 my-2 hover:scale-105 transition-transform cursor-pointer rounded-lg">
                <div className="w-full border-b mb-6 pb-1">
                    <span className="text-gray-200 font-light text-sm uppercase tracking-[4px]">
                        {type}
                    </span>
                </div>
                <h3 className="text-base tracking-tight md:tracking-normal md:text-xl my-2 font-mono px-5 py-2 font-semibold bg-zinc-700 text-zinc-100 rounded-lg w-fit">
                    {repoName}
                </h3>
                <p className="text-gray-300">{description}</p>
            </div>
        </a>
    );
}
