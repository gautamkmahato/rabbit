// components/RepoList.tsx
import { RepoItem } from "./RepoItem";

export function RepoList({ repos }) {
  return (
    <div className="grid gap-4">
      {repos.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
