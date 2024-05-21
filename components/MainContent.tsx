import Footer from "./Footer";
import MusingCard from "./MusingCard";
import ProjectCard from "./ProjectCard";

type Props = {
    hashnodeData: TransformedPost[];
};

export default function MainContent({ hashnodeData }: Props) {
    const projects = [
        {
            repoName: "DaKheera47/mumtaz-urdu",
            description:
                "A full stack education portal for students of O'Level Urdu",
            type: "Nextjs | Full Stack",
            repoUrl: "https://mumtazurdu.com",
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
            repoName: "PM/high-income-consultancy",
            description:
                "Landing page for High Income Consultancy, a income consultancy firm",
            type: "Nextjs | Landing Page",
            repoUrl: "https://www.hiccoaching.com/",
        },
        {
            repoName: "PM/threegency",
            description:
                "Landing page with complete Strapi integration for Threegency, a web3 agency",
            type: "Nextjs | Landing Page",
            repoUrl: "https://threegency.promirage.com/",
        },
        {
            repoName: "PM/atoro",
            description:
                "Landing page with complete Strapi integration for Atoro, a cyber security firm based in Ireland",
            type: "Nextjs | Landing Page",
            repoUrl: "https://atoro.promirage.com/",
        },
        {
            repoName: "PM/indus-marine-services",
            description:
                "Full Stack web app for Indus Marine Services, a marine services firm based in UAE",
            type: "Nodejs | Full Stack",
            repoUrl: "https://ims-auh.com/",
        },
        {
            repoName: "PM/stellar-consultancy",
            description:
                "Landing page for Stellar Consultancy, a design consultancy firm",
            type: "WordPress | Landing Page",
            repoUrl: "https://www.stellarconsultancy.ca/",
        },
        {
            repoName: "PM/ProjectMirageWebsite",
            description: "Landing page for Project Mirage",
            type: "Nextjs | Showcase",
            repoUrl: "https://www.promirage.com",
        },
    ];

    return (
        <div className="pt-4 lg:px-20 lg:absolute lg:right-0 lg:top-0 lg:h-screen bg-zinc-900 w-4/5 lg:w-3/5 lg:overflow-y-scroll mx-auto flex flex-wrap">
            <h1 className="mt-6 mb-4 lg:mb-2 font-bold text-4xl">
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

            <h1 className="mt-6 mb-4 lg:mb-2 font-bold text-4xl">Musings</h1>
            {hashnodeData.map((item) => (
                <MusingCard
                    key={item.slug}
                    {...item}
                />
            ))}

            <Footer />
        </div>
    );
}
