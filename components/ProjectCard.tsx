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
        <a href={repoUrl} target="_blank" rel="noopener noreferrer">
            <div className="w-4/5 bg-zinc-800 mx-auto p-8 my-8 hover:scale-105 transition-transform cursor-pointer">
                <div className="w-full border-b border-green-600 mb-6 pb-1">
                    <span className="text-gray-50 font-mono font-thin text-sm uppercase tracking-[4px]">
                        {type}
                    </span>
                </div>
                <h3 className="whitespace-nowrap font-medium text-xl tracking-tight md:tracking-normal md:text-2xl md:font-bold my-2">
                    {repoName}
                </h3>
                <p className="text-gray-300">{description}</p>
            </div>
        </a>
    );
}
