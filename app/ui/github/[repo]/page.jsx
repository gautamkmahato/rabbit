// app/github/[repo]/page.tsx
'use client';

import { dummyPRFiles } from '@/data/pullRequests';
import { useParams } from 'next/navigation';
import { PullRequestReview } from '../../_components/PullRequestReview';


export default function RepoDetailPage() {
  const { repo } = useParams();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Repo: {repo}</h1>
      <h2 className="text-xl font-semibold mb-4">Pull Requests</h2>
      <div className="space-y-6">
        {dummyPRFiles.map((pr, index) => (
          <PullRequestReview key={index} pr={pr} />
        ))}
      </div>
    </div>
  );
}
