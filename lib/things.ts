import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ThingPost = {
    slug: string;
    title: string;
    description: string;
    githubUrl: string;
    techStack: string[];
    coverImage: string | null;
    createdAt: string;
    featured: boolean;
    content: string;
};

export type ThingPostMeta = Omit<ThingPost, "content">;

const thingsDirectory = path.join(process.cwd(), "content/things");

export function getAllThingsSlugs(): string[] {
    const files = fs.readdirSync(thingsDirectory);
    return files
        .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
        .map((file) => file.replace(/\.mdx$/, ""));
}

export function getThingBySlug(slug: string): ThingPost {
    const fullPath = path.join(thingsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title,
        description: data.description,
        githubUrl: data.githubUrl,
        techStack: data.techStack || [],
        coverImage: data.coverImage || null,
        createdAt: data.createdAt,
        featured: data.featured || false,
        content,
    };
}

export function getAllThings(): ThingPostMeta[] {
    const slugs = getAllThingsSlugs();
    const posts = slugs
        .map((slug) => {
            const post = getThingBySlug(slug);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { content, ...meta } = post;
            return meta;
        })
        .sort((a, b) => {
            // Featured posts first, then by date
            if (a.featured !== b.featured) {
                return a.featured ? -1 : 1;
            }
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

    return posts;
}
