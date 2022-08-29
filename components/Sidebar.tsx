import Image from "next/image";
import me from "../public/favicon.png";

type Props = {};

export default function Sidebar({}: Props) {
    return (
        <div className="lg:pl-20 pt-12 w-4/5 mx-auto lg:absolute lg:left-0 lg:overflow-y-auto lg:top-0 bg-zinc-900 lg:w-2/5 lg:h-screen">
            <div className="w-full border-b border-gray-200 mb-12 pb-5">
                <h1 className="font-bold text-4xl lg:text-5xl">
                    Shaheer Sarfaraz
                </h1>
                <p className="font-base text-lg lg:text-xl">
                    Full Stack Developer at{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.pro-mirage.com"
                        className="link"
                    >
                        Project Mirage
                    </a>
                </p>
            </div>
            <div className="w-full border-b border-gray-200 pb-12">
                <p className="text-gray-200">
                    I am a self-taught developer from Pakistan and am always
                    looking to learn new web development technologies. Lately,
                    I&apos;ve discovered that I enjoy working with React,
                    Typescript and particularly Next.js.
                </p>

                <p className="text-gray-200">
                    In the future, I hope to work on projects with new
                    technologies like Svelte on the frontend, or Deno on the
                    backend that will help me improve my skills and knowledge.
                </p>
            </div>

            <div className="my-12 flex justify-between">
                <div className="w-1/5 mt-2">
                    <Image
                        src={me}
                        alt="Picture of Shaheer Sarfaraz"
                        placeholder="blur"
                    />
                </div>
                <p className="text-gray-200 w-4/5 ml-5">
                    You can find me on{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/in/shaheer-sarfaraz-3965861b6/"
                        className="link"
                    >
                        LinkedIn
                    </a>
                    , look at all my repos on
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/DaKheera47"
                        className="link ml-1"
                    >
                        Github
                    </a>
                    , or just shoot me an email at{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="mailto:shaheer30sarfaraz@gmail.com"
                        className="link"
                    >
                        shaheer30sarfaraz@gmail.com
                    </a>
                    . <br />
                    I&apos;d love to hear from you!
                </p>
            </div>
        </div>
    );
}
