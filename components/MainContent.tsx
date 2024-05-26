import Footer from "./Footer";
import MusingCard from "./MusingCard";
import ProjectCard from "./ProjectCard";

type Props = {
    hashnodeData: TransformedPost[];
};

export default function MainContent({ hashnodeData }: Props) {
    const projects = [
        {
            repoName: "mumtaz-urdu",
            description:
                "A full stack education portal for students of O'Level Urdu. Gets thousands of monthly views in peak exam season",
            type: "Nextjs | Full Stack",
            repoUrl: "https://mumtazurdu.com",
        },
        {
            repoName: "autoclass",
            description:
                "Open Zoom meetings automatically on time, every time. Also has an associated Musing post, so you know it has a special place in my heart",
            type: "Python | Automation",
            repoUrl: "https://github.com/DaKheera47/autoclass",
        },
        {
            repoName: "meet-link-generator",
            description:
                "Create thousands of Google Meet Links to find links with english words in them. Also has a Musing post!",
            type: "Python | Automation",
            repoUrl: "https://github.com/DaKheera47/meet-link-generator",
        },
        {
            repoName: "atoro",
            description:
                "Landing page with complete Strapi integration for Atoro, a cyber security firm based in Ireland",
            type: "Nextjs | Landing Page",
            repoUrl: "https://atoro.promirage.com/",
        },
        {
            repoName: "indus-marine-services",
            description:
                "Full Stack web app for Indus Marine Services, a marine services firm based in UAE. My first big project for a client!",
            type: "Nodejs | Full Stack",
            repoUrl: "https://ims-auh.com/",
        },
        // {
        //     repoName: "project-mirage",
        //     description: "Landing page for Project Mirage",
        //     type: "Nextjs | Showcase",
        //     repoUrl: "https://www.promirage.com",
        // },
    ];

    return (
        <div className="mt-4 lg:px-12 lg:absolute lg:right-0 lg:top-0 lg:h-[calc(100vh-1rem)] bg-zinc-900 w-4/5 lg:w-3/5 lg:overflow-y-scroll mx-auto flex flex-wrap">
            <div className="relative w-full">
                <h1
                    id="projects"
                    className="pt-6 pb-4 scale-x-[101%] bg-zinc-900 font-bold text-4xl sticky top-0 z-10"
                >
                    Projects
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
            </div>

            <div className="relative w-full">
                <h1
                    id="musings"
                    className="pt-6 pb-4 scale-x-[101%] bg-zinc-900 font-bold text-4xl sticky top-0 z-10"
                >
                    Musings
                </h1>
                {hashnodeData.map((item) => (
                    <MusingCard
                        key={item.slug}
                        {...item}
                    />
                ))}
            </div>

            <Footer />
        </div>
    );
}
