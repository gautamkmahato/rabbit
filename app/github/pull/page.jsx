'use client';

import { useState } from 'react';
import { fetchFullPRData } from '@/utils/fetchFullPRData';
import generateReview from '@/utils/gemini/llm';
import MarkdownPreview from '@uiw/react-markdown-preview';

export default function Page() {
  const owner = 'gautamkmahato';
  const repo = 'Portfolio';
  const pull_number = 2;

  const [loadingDiffs, setLoadingDiffs] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [commitData, setCommitData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(''); // ✅ new error state

  const getDiffCommitData = async () => {
    try {
      setError('');
      setLoadingDiffs(true);
      const fullPR = await fetchFullPRData(owner, repo, pull_number);
      const files = fullPR?.filesChanged || [];
      setCommitData(files);
      setReviews(new Array(files.length).fill(null)); // Reset reviews
    } catch (err) {
      console.error('Failed to fetch commit data:', err);
      const message = err?.message || 'Unknown error occurred while fetching PR data.';
      setError(message); // ✅ display message from thrown error
      setCommitData([]);
      setReviews([]);
    } finally {
      setLoadingDiffs(false);
    }
  };

  const getReviews = async () => {
    if (commitData.length === 0) {
      alert('Please load commit diffs first.');
      return;
    }

    setLoadingReviews(true);
    const allReviews = [];

    for (let i = 0; i < commitData.length; i++) {
      const patch = commitData[i]?.patch;
      if (!patch) {
        console.warn(`No patch found for commit ${i}, skipping...`);
        allReviews.push('⚠️ No patch found. Skipped review.');
        continue;
      }

      try {
        const result = await generateReview(patch);
        allReviews.push(result || '⚠️ Empty review returned.');
      } catch (error) {
        console.error(`Error generating review for commit ${i}:`, error);
        allReviews.push('❌ Error generating review.');
      }
    }

    setReviews(allReviews);
    setLoadingReviews(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Pull Request Code Review</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={getDiffCommitData}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loadingDiffs || loadingReviews}
        >
          {loadingDiffs ? 'Loading Diffs...' : 'Load Commit Diff'}
        </button>
        <button
          onClick={getReviews}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
          disabled={loadingDiffs || loadingReviews || commitData.length === 0}
        >
          {loadingReviews ? 'Generating Reviews...' : 'Generate Reviews'}
        </button>
      </div>

      {/* ✅ Error Message */}
      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4 border border-red-300">
          ⚠️ {error}
        </div>
      )}

      {commitData.length > 0 ? (
        <div className="space-y-10">
          {commitData.map((data, index) => (
            <div
              key={index}
              className="grid md:grid-cols-2 gap-6 border border-gray-200 rounded-lg shadow-sm bg-white p-4"
            >
              {/* Code Diff */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {data?.filename}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  Total <strong>{data?.changes}</strong> changes:{" "}
                  <span className="text-green-600 font-medium">
                    {data?.additions} additions
                  </span>{" "}
                  &{" "}
                  <span className="text-red-600 font-medium">
                    {data?.deletions} deletions
                  </span>
                </p>
                <pre className="overflow-x-auto text-sm bg-gray-100 p-3 rounded text-gray-800 max-h-96 whitespace-pre-wrap">
                  {data?.patch || '⚠️ No patch available.'}
                </pre>
              </div>

              {/* AI Review */}
              <div className="border-l border-gray-200 pl-4">
                <h3 className="text-md font-bold text-gray-800 mb-2">AI Review</h3>
                {loadingReviews ? (
                  <p className="text-gray-500 italic">Generating review...</p>
                ) : reviews?.[index] ? (
                  <MarkdownPreview source={reviews[index]} />
                ) : (
                  <p className="text-gray-500 italic">No review generated yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : !error && (
        <p className="text-gray-500 mt-4">No commit diffs loaded yet.</p>
      )}
    </div>
  );
}
