import Image from "next/image";
import me from "../public/me.png";

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <div className="mx-auto w-4/5 bg-zinc-900 pt-12 lg:h-screen lg:w-2/5 lg:overflow-y-auto lg:pl-20 lg:pr-8">
      <div className="mb-12 w-full border-b border-gray-200 pb-5">
        <h1 className="text-4xl font-bold lg:text-5xl">Shaheer Sarfaraz</h1>
        <div className="mt-2 space-y-0">
          <p className="font-base text-lg lg:text-xl">
            Frontend Software Engineering Intern at{"  "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.autodesk.co.uk/"
              className="link"
            >
              Autodesk
            </a>
          </p>

          <p className="font-base text-lg lg:text-xl">
            Co-founder, Full Stack Developer at{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.promirage.com"
              className="link"
            >
              Project Mirage
            </a>
          </p>
        </div>
      </div>

      <div className="w-full space-y-4 border-b border-gray-200 pb-12">
        <p>
          My name is Shaheer, I also go by DaKheera47 often. I co-founded{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.promirage.com"
            className="link"
          >
            Project Mirage
          </a>
          . I&#39;m primarily a web developer, these days working with tech like
          Next JS, Astro, Tailwind and so much more because of the JS ecosystem.
          I&#39;ve worked with Node.js and Express on the backend when the
          requirements call for a web app than website. These days, however. I
          find Nextjs&#39;s API routes do the job well enough to cover most
          situations.
        </p>
        <p>
          This website isn&#39;t a comprehensive list of my skills, those can be
          viewed{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            href="https://rxresu.me/shaheer30sarfaraz/shaheer"
          >
            here
          </a>
          . At it&#39;s core, this website is meant to be me talking about
          projects I&#39;m proud of.
        </p>
        <p>
          I often write about things I&#39;m learning about, or stuff I want to
          share with the world on my blog, listed{" "}
          <a className="link" href="#musings">
            further down this page
          </a>
          , or directly on{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            href="https://dakheera47.hashnode.dev/"
          >
            Hashnode
          </a>
          .
        </p>
        <p>
          These days I&#39;m learning Rust to expand my knowledge to different
          areas of software development, because Rust and high level web
          development don&#39;t have much overlap. I want to figure out why Rust
          consistently tops the StackOverflow Developer Surveys (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            href="https://survey.stackoverflow.co/2023/#section-admired-and-desired-programming-scripting-and-markup-languages"
          >
            see 2023
          </a>
          ), and at first glance, whoo boy I&#39;m impressed.
        </p>
      </div>

      <div className="my-12 flex justify-between">
        <div className="mt-2 w-1/5">
          <Image
            src={me}
            alt="Picture of Shaheer Sarfaraz"
            placeholder="blur"
            className="aspect-square rounded-full"
          />
        </div>

        <p className="my-auto ml-5 w-4/5 text-gray-200">
          Unsurprisingly, I&apos;m on{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/shaheer-sarfaraz-3965861b6/"
            className="link"
          >
            LinkedIn
          </a>
          . You can view my
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/DaKheera47"
            className="link ml-1"
          >
            Github Repositories
          </a>
          , or just fire an email at{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:shaheer30sarfaraz@gmail.com"
            className="link"
          >
            shaheer30sarfaraz@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
