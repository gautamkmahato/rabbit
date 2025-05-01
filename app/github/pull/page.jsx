'use client'

import { useState } from 'react';
import { fetchFullPRData } from '@/utils/fetchFullPRData';
import generateReview from '@/utils/gemini/llm';
import MarkdownPreview from '@uiw/react-markdown-preview';




export default function page() {

    const owner = "gautamkmahato";
    const repo = "rag-projects";
    const pull_number = 2;

    const [loading, setLoading] = useState(false);
    const [commitData, setCommitData] = useState([]);
    const [reviews, setReviews] = useState([]);


    const getDiffCommitData = async () => {
        try {
            setLoading(true);

            const fullPR = await fetchFullPRData(owner, repo, pull_number);
            console.log(fullPR);
            setCommitData(fullPR?.filesChanged);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const getReview = async () => {
        const allReviews = [];

        for (let i = 0; i < commitData.length; i++) {
            const patch = commitData[i]?.patch;

            if (!patch) {
                console.warn(`No patch found for commit ${i}, skipping...`);
                continue;
            }

            try {
                const result = await generateReview(patch);
                console.log(`Review ${i}:`, result);
                allReviews.push(result);
            } catch (error) {
                console.error(`Error generating review for commit ${i}:`, error);
            }
        }

        setReviews(allReviews); // set once after loop
    };


    if (loading) {
        return (
            <>
                <h1>loading...</h1>
            </>
        )
    }

    return (
        <>
            <div className="max-w-4xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">Pull Request Data</h1>

                <button
                    onClick={getDiffCommitData}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Load Commit Diff
                </button>
                <button
                    onClick={getReview}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >generate</button>

                <div>
                {commitData && commitData.length > 0 && (
  <div className="mt-6 space-y-6">
    {commitData.map((data, index) => (
      <div key={index} className="grid md:grid-cols-2 gap-4 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
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
          <pre className="overflow-x-auto text-sm bg-gray-100 p-3 rounded text-gray-800 max-h-96">
            {data?.patch}
          </pre>
        </div>

        {/* AI Review */}
        <div className="border-l border-gray-200 pl-4">
          <h3 className="text-md font-bold text-gray-800 mb-2">AI Review</h3>
          {reviews?.[index] ? (
            <MarkdownPreview source={reviews[index]} />
          ) : (
            <p className="text-gray-500 italic">No review generated yet.</p>
          )}
        </div> 
      </div>
    ))}
  </div>
)}

                </div>

                <div className="w-full max-w-3xl mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">AI Code Review</h2>

                    {reviews && reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="mb-6">
                            <MarkdownPreview source={review} />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No review generated yet.</p>
                    )}
                </div>

            </div>
        </>

    )
}
