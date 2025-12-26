import Link from "next/link";
import type { ThingPostMeta } from "../lib/things";

type Props = ThingPostMeta;

export default function ThingCard({
    slug,
    title,
    description,
    techStack,
    featured,
}: Props) {
    return (
        <Link href={`/things/${slug}`} className="block w-full">
            <div className="group relative mx-auto my-3 w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-900/20">
                {/* Featured badge */}
                {featured && (
                    <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                            Featured
                        </span>
                    </div>
                )}

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/0 to-pink-600/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

                <div className="relative z-10">
                    {/* Title */}
                    <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-purple-300">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 text-sm leading-relaxed text-gray-400">
                        {description}
                    </p>

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-2">
                        {techStack.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="rounded-md bg-zinc-700/50 px-2 py-1 text-xs font-medium text-gray-300 transition-colors group-hover:bg-purple-900/30 group-hover:text-purple-200"
                            >
                                {tech}
                            </span>
                        ))}
                        {techStack.length > 4 && (
                            <span className="rounded-md bg-zinc-700/50 px-2 py-1 text-xs font-medium text-gray-400">
                                +{techStack.length - 4} more
                            </span>
                        )}
                    </div>

                    {/* Read more indicator */}
                    <div className="mt-4 flex items-center text-sm text-purple-400 opacity-0 transition-opacity group-hover:opacity-100">
                        <span>Read the story</span>
                        <svg
                            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}
