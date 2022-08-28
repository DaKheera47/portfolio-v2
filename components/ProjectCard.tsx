import React from "react";

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
            className="w-full md:w-4/5 mx-auto"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="w-full bg-zinc-800 mx-auto p-8 my-6 hover:scale-105 transition-transform cursor-pointer rounded-lg">
                <div className="w-full border-b border-cyan-500 mb-6 pb-1">
                    <span className="text-gray-50 font-light text-sm uppercase tracking-[4px]">
                        {type}
                    </span>
                </div>
                <h3 className="font-medium text-xl tracking-tight md:tracking-normal md:text-2xl md:font-bold my-2">
                    {repoName}
                </h3>
                <p className="text-gray-300">{description}</p>
            </div>
        </a>
    );
}
