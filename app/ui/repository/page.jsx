// app/app/repos/page.tsx

import { dummyRepos } from "@/data/repos";
import { RepoList } from "../_components/RepoList";


export default function RepositoryPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Repositories</h1>
      <RepoList repos={dummyRepos} />
    </div>
  );
}
