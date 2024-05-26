type Props = {
  repoName: string;
  description?: string;
  type: string;
  repoUrl: string;
  views?: string;
};

export default function ProjectCard({
  repoName,
  description,
  type,
  repoUrl,
  views,
}: Props) {
  return (
    <a
      href={repoUrl}
      className="mx-auto w-full"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="group mx-auto my-2 w-full cursor-pointer space-y-4 rounded-lg bg-zinc-800 p-8 duration-75 hover:outline hover:outline-purple-700">
        <div className="mb-6 w-full border-b pb-1">
          <span className="text-sm font-light uppercase tracking-[4px] text-gray-200">
            {type}
          </span>

          {views && (
            <span className="float-right text-sm text-gray-300">{views}</span>
          )}
        </div>

        <span className="my-2 w-fit rounded-lg bg-zinc-700 px-4 py-2 text-lg text-zinc-100 transition-colors group-hover:bg-purple-900">
          {repoName}
        </span>

        {description && <p className="text-gray-300">{description}</p>}
      </div>
    </a>
  );
}
