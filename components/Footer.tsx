type Props = {};

export default function Footer({}: Props) {
    return (
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
    );
}
