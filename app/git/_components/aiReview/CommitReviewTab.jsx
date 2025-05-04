import { MessageSquare } from 'lucide-react';

export default function CommitReviewTab({ commits }) {
  return (
    <div className="space-y-4">
      {commits?.length > 0 ? (
        commits.map((commit, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md p-4 bg-white shadow-sm"
          >
            <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
              Commit: <span className="ml-2 text-gray-900">{commit.sha}</span>
            </div>
            <p className="text-sm text-gray-800 whitespace-pre-line">
              {commit.review}
            </p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No commit reviews found.</p>
      )}
    </div>
  );
}
