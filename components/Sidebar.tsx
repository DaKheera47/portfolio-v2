import React from "react";

type Props = {};

export default function Sidebar({}: Props) {
    return (
        <div className="md:pl-20 pt-12 w-4/5 mx-auto md:absolute md:left-0 md:top-0 bg-zinc-900 md:w-2/5 md:h-screen md:overflow-y-hidden">
            <div className="w-full border-b border-gray-200 mb-6 pb-5">
                <h1 className="font-bold text-4xl md:text-5xl">
                    Shaheer Sarfaraz
                </h1>
                <p className="font-base text-lg md:text-xl">
                    Full Stack Developer at{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.pro-mirage.com"
                        className="underline"
                    >
                        Project Mirage
                    </a>
                </p>
            </div>

            <p className="text-gray-200">
                I am a self-taught developer from Pakistan and am always looking
                to learn new web development technologies. Lately, I&apos;ve
                discovered that I enjoy working with React, Typescript and
                particularly Next.js.
            </p>

            <p className="text-gray-200">
                In the future, I hope to work on projects with new technologies
                like Svelte on the frontend, or Deno on the backend that will
                help me improve my skills and knowledge.
            </p>
        </div>
    );
}
