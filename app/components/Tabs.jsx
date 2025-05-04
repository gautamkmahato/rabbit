'use client';

import { useState, useMemo } from 'react';
import { FileText, ClipboardList } from 'lucide-react';
import CommitAccordion from '../git/_components/CommitAccordion';
import MarkdownViewer from '../git/_components/aiReview/MarkdownViewer';

function TabsComponent({ files, reviews, finalReview }) {
  const [activeTab, setActiveTab] = useState<'summary' | 'commits'>('summary');

  const renderedTabContent = useMemo(() => {
    if (activeTab === 'commits') {
      return (
        files?.length > 0 &&
        files.map((file, index) => (
          <div key={index} className="max-w-3xl mx-auto mt-10">
            <CommitAccordion
              key={file.commit_id || index}
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
        ))
      );
    } else {
      return <MarkdownViewer markdownText={finalReview} />;
    }
  }, [activeTab, files, reviews, finalReview]);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
            activeTab === 'summary'
              ? 'border-blue-500 text-blue-600 font-medium'
              : 'border-transparent text-gray-500 hover:text-blue-500'
          }`}
        >
          <ClipboardList size={16} />
          Final Summary
        </button>
        <button
          onClick={() => setActiveTab('commits')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
            activeTab === 'commits'
              ? 'border-blue-500 text-blue-600 font-medium'
              : 'border-transparent text-gray-500 hover:text-blue-500'
          }`}
        >
          <FileText size={16} />
          Commit Reviews
        </button>
      </div>

      <div>{renderedTabContent}</div>
    </div>
  );
}

const Tabs = React.memo(TabsComponent, (prev, next) => {
  return (
    JSON.stringify(prev.files) === JSON.stringify(next.files) &&
    JSON.stringify(prev.reviews) === JSON.stringify(next.reviews) &&
    prev.finalReview === next.finalReview
  );
});

export default Tabs;
