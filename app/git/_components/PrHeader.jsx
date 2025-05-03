import { GitPullRequest, GitMerge, GitFork, ExternalLink, Clock, FileCode, Plus, Minus, Brain } from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";
import Link from "next/link";

const fallbackAvatar = "/gkm.jpg"; // Assuming gkm.jpg is in public/

export default function PrHeader({ prData, repo }) {
  const {
    title,
    pr_number,
    developer,
    developer_image_url,
    updated_at,
    state,
    raised_from_branch,
    merged_to_branch,
    number_of_commits,
    number_of_additions,
    number_of_deletions,
    repo_owner,
    aiReviewStatus,
  } = prData;

  return (
    <div className="space-y-4" style={{ fontFamily: "var(--font-roboto)" }}>
      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-neutral-800">
            <GitPullRequest className="h-6 w-6" />
            {title} <span className="text-neutral-600">#{pr_number}</span>
          </h1>

          <div className="flex items-center mt-2 gap-5">
            {/* PR Status Badge */}
            <span className={`px-3 py-1 text-xs rounded-full font-medium flex items-center gap-1 ${
              state === "open"
                ? "bg-green-100 text-green-700"
                : state === "merged"
                ? "bg-purple-100 text-purple-700"
                : "bg-red-100 text-red-700"
            }`}>
              {state === "merged" && <GitMerge className="h-3 w-3" />}
              {state === "open" && <GitPullRequest className="h-3 w-3" />}
              {state.charAt(0).toUpperCase() + state.slice(1)}
            </span>

            {/* Avatar and Author */}
            <div className="flex items-center text-sm text-neutral-500">
              <div className="h-6 w-6 rounded-full overflow-hidden mr-1 bg-gray-200">
                <img
                  src={developer_image_url || fallbackAvatar}
                  alt={developer}
                  className="h-full w-full object-cover"
                  onError={(e) => (e.target.src = fallbackAvatar)}
                />
              </div>
              <span className="font-medium mr-1">{developer}</span>
            </div>

            {/* Time Ago */}
            <div className="flex items-center text-sm text-neutral-500">
              <Clock className="h-4 w-4 mr-1" />
              {formatDistanceToNow(updated_at)} ago
            </div>
          </div>
        </div>

        {/* GitHub Link */}
        <Link
          href={`https://github.com/${repo_owner}/${repo}/pull/${pr_number}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-blue-500 font-semibold hover:underline"
        >
          View on GitHub <ExternalLink className="h-4 w-4 ml-1" />
        </Link>
      </div>

      {/* Meta Info Section */}
      <div className="flex flex-wrap gap-4 items-center font-semibold text-neutral-600 border-b border-neutral-200 pb-4">
        <div className="flex items-center">
          <GitFork className="h-4 w-4 mr-1" />
          <span className="text-md">{merged_to_branch}</span>
          <span className="mx-2">←</span>
          <span className="text-md">{raised_from_branch}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center text-md">
            <FileCode className="h-4 w-4 mr-1" />
            {number_of_commits} {number_of_commits === 1 ? "commit" : "commits"}
          </div>

          <div className="flex items-center text-md">
            <Plus className="h-4 w-4 mr-1 text-green-600" />
            {number_of_additions} {number_of_additions === 1 ? "addition" : "additions"}
          </div>

          <div className="flex items-center text-md">
            <Minus className="h-4 w-4 mr-1 text-red-600" />
            {number_of_deletions} {number_of_deletions === 1 ? "deletion" : "deletions"}
          </div>
        </div>

        {/* AI Review Badge */}
        <div className="ml-auto">
          <span className={`px-3 py-1 text-sm rounded-full font-semibold flex items-center gap-1 ${
            aiReviewStatus === "clean"
              ? "bg-green-100 text-green-800"
              : aiReviewStatus === "suggestions"
              ? "bg-amber-100 text-amber-800"
              : aiReviewStatus === "issues"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}>
            <Brain className="h-3 w-3" />
            {{
              clean: "AI: No Issues",
              suggestions: "AI: Suggestions",
              issues: "AI: Issues Found",
              pending: "AI: Review Pending",
            }[aiReviewStatus]}
          </span>
        </div>
      </div>
    </div>
  );
}
