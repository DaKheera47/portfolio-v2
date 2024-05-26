type Props = {};

export default function Footer({}: Props) {
  return (
    <p className="my-4 w-full text-center text-xs text-gray-400">
      Made with{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://tailwindcss.com"
        className="text-white underline"
      >
        Tailwind CSS
      </a>{" "}
      and{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://nextjs.org"
        className="text-white underline"
      >
        Next.js
      </a>
    </p>
  );
}
