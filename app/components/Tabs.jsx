'use client';

import { useState } from 'react';
import { FileText, ClipboardList } from 'lucide-react';
import CommitReviewTab from '../git/_components/aiReview/CommitReviewTab';
import MarkdownViewer from '../git/_components/aiReview/MarkdownViewer';
import CommitAccordion from '../git/_components/CommitAccordion';



export default function Tabs({ files, reviews, finalReview }) {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 mt-12">
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 cursor-pointer ${
            activeTab === 'summary'
              ? 'border-gray-700 text-gray-700 font-medium'
              : 'border-transparent text-gray-500 hover:text-blue-500'
          }`}
        >
          <ClipboardList className='w-4 h-4' />
          <span className='font-semibold text-sm'>AI Review</span>
        </button>
        <button
          onClick={() => setActiveTab('commits')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 cursor-pointer ${
            activeTab === 'commits'
              ? 'border-gray-700 text-gray-700 font-medium'
              : 'border-transparent text-gray-500 hover:text-blue-500'
          }`}
        >
          <FileText className='w-4 h-4' />
          <span className='font-semibold text-sm'>Commit Reviews</span>
          
        </button>
      </div>

      <div>
      {/* <CommitReviewTab commits={commits} /> */}
        {activeTab === 'commits' ? (
            (files && files.length > 0 && files.map((file, index) => (
                <div key={index} className="max-w-3xl mx-auto mt-6">
                    <CommitAccordion
                        key={file.commit_id}
                        filename={file.filename}
                        additions={file.additions}
                        deletions={file.deletions}
                        changes={file.changes}
                        status={file.status}
                        patch={file.patch}
                        author_of_the_commit={file.author_of_the_commit}
                        commit_id={file.commit_id}
                        message={file.message}
                        comments_url={file.comments_url}
                        reviews={reviews}
                    />
                </div>
            )))
        ) : (
          <MarkdownViewer markdownText={finalReview} />
        )}
      </div>
    </div>
  );
}
