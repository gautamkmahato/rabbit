import { Link, Tag, MessageSquare } from "lucide-react"
import MarkdownRenderer from "./MarkdownRenderer"

export default function PrDescription({ prData }) {
  const { description, linkedIssues, labels, mentions } = prData

  return (
    <div className="rounded-xl shadow-md shadow-neutral-300 bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
      <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-200">
        <h2 className="text-lg text-zinc-800 font-semibold">Description</h2>
      </div>
      <div className="px-6 py-6 space-y-6">
        <div className="prose max-w-none dark:prose-invert">
          <MarkdownRenderer content={description} />
        </div>

        {linkedIssues && linkedIssues.length > 0 && (
          <div className="space-y-2"> 
            <h3 className="flex items-center">
              <Link className="h-4 w-4 mr-1" />
              <span className="font-semibold text-md text-neutral-600">Linked Issues</span>
            </h3>
            <div className="">
              {linkedIssues.map((issue) => (
                <a
                  key={issue.id}
                  href={issue.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-700 mt-1 hover:underline flex items-center"
                >
                  #{issue.number} {issue.title}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-8">
          {labels && labels.length > 0 && (
            <div className="space-y-2"> 
              <h3 className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <span className="font-semibold text-md text-neutral-600">Labels</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {labels.map((label) => (
                  <span
                    key={label.id}
                    style={{
                      backgroundColor: `#${label.color}20`,
                      color: `#${label.color}`,
                      borderColor: `#${label.color}40`,
                    }}
                    className="text-sm px-3 py-1 rounded-full border font-medium"
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {mentions && mentions.length > 0 && (
            <div className="space-y-2">
              <h3 className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span className="font-semibold text-neutral-600 text-md">Mentions</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {mentions.map((user) => (
                  <a
                    key={user.id}
                    href={`https://github.com/${user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm py-1 font-semibold text-blue-600 hover:underline"
                  >
                    @{user.username}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
