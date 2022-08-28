import React from "react";
import ProjectCard from "./ProjectCard";

type Props = {};

export default function MainContent({}: Props) {
    const projects = [
        {
            repoName: "DaKheera47/mumtaz-urdu",
            description:
                "A full stack education portal for students of O'Level Urdu",
            type: "Nextjs | Full Stack",
            repoUrl: "https://mumtazurdu.com",
        },
        {
            repoName: "DaKheera47/signiifyhr",
            description: "Landing page for Signiify, an online career coach",
            type: "Nextjs | Showcase",
            repoUrl: "http://signiify.co.uk/",
        },
        {
            repoName: "DaKheera47/autoclass",
            description: "Open Zoom meetings automatically on time, every time",
            type: "Python | Automation",
            repoUrl: "https://github.com/DaKheera47/autoclass",
        },
        {
            repoName: "DaKheera47/meet-link-generator",
            description:
                "Create thousands of Google Meet Links to find links with english words in them",
            type: "Python | Automation",
            repoUrl: "https://github.com/DaKheera47/meet-link-generator",
        },
        {
            repoName: "PM/ProjectMirageWebsite",
            description: "Landing page for Project Mirage",
            type: "HTML | Showcase",
            repoUrl: "https://www.pro-mirage.com",
        },
    ];

    return (
        <div className="pt-4 md:px-20 md:absolute md:right-0 md:top-0 md:h-screen bg-zinc-900 w-4/5 md:w-3/5 md:overflow-y-scroll mx-auto flex flex-wrap">
            <h1 className="mt-6 mb-4 md:my-6 font-bold text-4xl md:text-5xl">
                My Projects
            </h1>
            {projects.map((project) => (
                <ProjectCard
                    key={project.repoName}
                    repoName={project.repoName}
                    description={project.description}
                    type={project.type}
                    repoUrl={project.repoUrl}
                />
            ))}

            <p className="my-4 text-gray-400 text-center w-full text-xs">
                Made with{" "}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://tailwindcss.com"
                    className="underline text-white"
                >
                    Tailwind CSS
                </a>{" "}
                and{" "}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://nextjs.org"
                    className="underline text-white"
                >
                    Next.js
                </a>
            </p>
        </div>
    );
}
