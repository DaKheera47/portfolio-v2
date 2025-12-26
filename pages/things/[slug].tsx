import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {
    getAllThingsSlugs,
    getThingBySlug,
    type ThingPost,
} from "../../lib/things";

type Props = {
    post: Omit<ThingPost, "content">;
    mdxSource: MDXRemoteSerializeResult;
};

// Custom components for MDX
const components = {
    // Enhanced image component with Next/Image
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <span className="my-6 block overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                {...props}
                alt={props.alt || ""}
                className="w-full rounded-lg border border-zinc-700"
            />
        </span>
    ),
    // Styled code blocks
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            {...props}
            className="my-4 overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-800/50 p-4"
        />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
        <code {...props} className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm" />
    ),
    // Styled blockquotes
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            {...props}
            className="my-4 border-l-4 border-purple-500 bg-purple-950/20 py-2 pl-4 italic text-gray-300"
        />
    ),
    // Styled tables
    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
        <div className="my-4 overflow-x-auto">
            <table {...props} className="w-full border-collapse text-left" />
        </div>
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
        <th
            {...props}
            className="border-b border-zinc-700 bg-zinc-800/50 px-4 py-2 font-semibold"
        />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
        <td {...props} className="border-b border-zinc-800 px-4 py-2" />
    ),
    // Styled links
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            {...props}
            className="text-purple-400 underline decoration-purple-400/30 underline-offset-2 transition-colors hover:text-purple-300 hover:decoration-purple-300"
            target={props.href?.startsWith("http") ? "_blank" : undefined}
            rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        />
    ),
    // Styled headings
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            {...props}
            className="mb-4 mt-8 text-2xl font-bold text-white first:mt-0"
        />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 {...props} className="mb-3 mt-6 text-xl font-semibold text-white" />
    ),
    // Lists
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul {...props} className="my-4 list-inside list-disc space-y-2" />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol {...props} className="my-4 list-inside list-decimal space-y-2" />
    ),
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
        <li {...props} className="text-gray-300" />
    ),
    // Horizontal rule
    hr: () => <hr className="my-8 border-zinc-700" />,
    // Paragraphs
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p {...props} className="my-4 leading-relaxed text-gray-300" />
    ),
};

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = getAllThingsSlugs();

    return {
        paths: slugs.map((slug) => ({
            params: { slug },
        })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = params?.slug as string;
    const post = getThingBySlug(slug);

    const mdxSource = await serialize(post.content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...postMeta } = post;

    return {
        props: {
            post: postMeta,
            mdxSource,
        },
    };
};

export default function ThingPage({
    post,
    mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <>
            <Head>
                <title>{post.title} | Things I've Built | Shaheer Sarfaraz</title>
                <meta name="description" content={post.description} />
                <link rel="icon" href="/me.png" />
            </Head>

            <div className="min-h-screen bg-zinc-900 text-gray-100">
                {/* Header */}
                <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
                        <Link
                            href="/things"
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
                            Things I've Built
                        </Link>

                        <a
                            href={post.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
                        >
                            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            View on GitHub
                        </a>
                    </div>
                </header>

                {/* Cover image */}
                {post.coverImage && (
                    <div className="relative h-64 w-full overflow-hidden bg-zinc-800 sm:h-80">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                    </div>
                )}

                {/* Article */}
                <article className="mx-auto max-w-3xl px-6 py-12">
                    {/* Meta info */}
                    <div className="mb-8">
                        {post.featured && (
                            <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                                Featured
                            </span>
                        )}
                        <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                            {post.title}
                        </h1>
                        <p className="mb-4 text-lg text-gray-400">{post.description}</p>

                        {/* Tech stack */}
                        <div className="mb-4 flex flex-wrap gap-2">
                            {post.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-md bg-purple-900/30 px-3 py-1 text-sm font-medium text-purple-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <p className="text-sm text-gray-500">
                            Created {formattedDate}
                        </p>
                    </div>

                    {/* MDX Content */}
                    <div className="prose prose-invert prose-purple max-w-none">
                        <MDXRemote {...mdxSource} components={components} />
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-12 rounded-xl border border-zinc-700 bg-zinc-800/50 p-6 text-center">
                        <h3 className="mb-2 text-lg font-semibold text-white">
                            Interested in this project?
                        </h3>
                        <p className="mb-4 text-gray-400">
                            Check out the source code on GitHub or explore more projects.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href={post.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-lg bg-white px-4 py-2 font-medium text-zinc-900 transition-colors hover:bg-gray-200"
                            >
                                <svg
                                    className="mr-2 h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                View Repository
                            </a>
                            <Link
                                href="/things"
                                className="inline-flex items-center rounded-lg border border-zinc-600 px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-700"
                            >
                                ← Browse All
                            </Link>
                        </div>
                    </div>
                </article>
            </div>
        </>
    );
}
