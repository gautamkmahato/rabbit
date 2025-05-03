// components/RepoItem.tsx
import { Star, GitBranch, Lock, Unlock } from "lucide-react";

export function RepoItem({ repo }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <img
          src={repo.owner.avatar_url}
          alt="owner avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">{repo.name}</h2>
          <p className="text-sm text-gray-500">{repo.full_name}</p>
        </div>
        <div className="ml-auto">
          {repo.private ? (
            <Lock className="w-4 h-4 text-gray-500" />
          ) : (
            <Unlock className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-700">{repo.description}</p>
      <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          {repo.stargazers_count}
        </div>
        <div className="flex items-center gap-1">
          <GitBranch className="w-4 h-4" />
          {repo.forks_count}
        </div>
        <div className="ml-auto">{repo.language}</div>
      </div>
    </div>
  );
}
