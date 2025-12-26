import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import ThingCard from "../../components/ThingCard";
import { getAllThings, type ThingPostMeta } from "../../lib/things";

export const getStaticProps: GetStaticProps<{
    posts: ThingPostMeta[];
}> = async () => {
    const posts = getAllThings();

    return {
        props: {
            posts,
        },
    };
};

export default function ThingsPage({
    posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const featuredPosts = posts.filter((p) => p.featured);
    const otherPosts = posts.filter((p) => !p.featured);

    return (
        <>
            <Head>
                <title>Things I've Built | Shaheer Sarfaraz</title>
                <meta
                    name="description"
                    content="Deep dives into my GitHub repositories - what they are, why I built them, and the stories behind the code."
                />
                <link rel="icon" href="/me.png" />
            </Head>

            <div className="min-h-screen bg-zinc-900">
                {/* Header */}
                <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
                        <Link
                            href="/"
                            className="flex items-center text-gray-400 transition-colors hover:text-white"
                        >
                            <svg
                                className="mr-2 h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Portfolio
                        </Link>
                    </div>
                </header>

                {/* Hero */}
                <div className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-br from-zinc-900 via-purple-950/20 to-zinc-900 px-6 py-16 sm:py-24">
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />
                        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-pink-600/10 blur-3xl" />
                    </div>

                    <div className="relative mx-auto max-w-4xl text-center">
                        {/* Icon */}
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-900/50">
                            <svg
                                className="h-8 w-8 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                />
                            </svg>
                        </div>

                        <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
                            Things I've Built
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-gray-400">
                            Deep dives into my repositories. Each entry tells the story of
                            what I built, why I built it, and what I learned along the way.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <main className="mx-auto max-w-4xl px-6 py-12">
                    {/* Featured section */}
                    {featuredPosts.length > 0 && (
                        <section className="mb-12">
                            <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-purple-400">
                                Featured
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {featuredPosts.map((post) => (
                                    <ThingCard key={post.slug} {...post} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* All projects */}
                    {otherPosts.length > 0 && (
                        <section>
                            <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-gray-500">
                                All
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {otherPosts.map((post) => (
                                    <ThingCard key={post.slug} {...post} />
                                ))}
                            </div>
                        </section>
                    )}

                    {posts.length === 0 && (
                        <div className="py-12 text-center">
                            <p className="text-gray-500">
                                No projects yet. Check back soon!
                            </p>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className="border-t border-zinc-800 px-6 py-8">
                    <div className="mx-auto max-w-4xl text-center text-sm text-gray-500">
                        <p>
                            Want to see more?{" "}
                            <a
                                href="https://github.com/DaKheera47"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 transition-colors hover:text-purple-300"
                            >
                                Check out my GitHub →
                            </a>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
