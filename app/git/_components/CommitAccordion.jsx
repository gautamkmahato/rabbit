'use client';

import { useState, memo } from 'react';
import { ChevronDown, FileText, Code2, Brain, Star } from 'lucide-react';
import MarkdownViewer from './aiReview/MarkdownViewer';

function CommitAccordionComponent({
  filename,
  additions,
  deletions,
  changes,
  status,
  patch,
  author_of_the_commit,
  commit_id,
  message,
  comments_url,
  reviews
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');

  const review = reviews?.find((r) => r.filename === filename)?.aiReview || 'No review available.';


  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Accordion Header */}
      <button
        className="w-full flex justify-between cursor-pointer items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-left">{filename}</span>
        <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="px-4 py-4 bg-white border-t border-neutral-300">
          {/* Tabs */}
          <div className="flex space-x-4 mb-4 border-b border-neutral-300 pb-2">
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center gap-1 text-sm px-3 py-1 cursor-pointer rounded-md border border-gray-300 ${
                activeTab === 'summary' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <FileText size={14} />
              <span className='text-sm font-semibold'>AI Summary</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1 text-sm px-3 py-1 cursor-pointer rounded-md border border-gray-300 ${
                activeTab === 'code' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <Code2 size={14} />
              <span className='text-sm font-semibold'>Code</span>
            </button>
            <button
              onClick={() => setActiveTab('suggestion')}
              className={`flex items-center gap-1 text-sm px-3 py-1 cursor-pointer rounded-md border border-gray-300 ${
                activeTab === 'suggestion' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <Star size={14} />
              <span className='text-sm font-semibold'>AI Suggestions</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="prose max-w-none text-sm">
            {activeTab === 'summary' ? (
              <MarkdownViewer markdownText={review} />
            ) : (
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto whitespace-pre-wrap text-xs">
                {patch}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Only re-render if filename, patch, or review content for this file changes
const CommitAccordion = memo(CommitAccordionComponent, (prev, next) => {
  const sameFilename = prev.filename === next.filename;
  const samePatch = prev.patch === next.patch;

  const prevReview = prev.reviews?.find((r) => r.filename === prev.filename)?.aiReview;
  const nextReview = next.reviews?.find((r) => r.filename === next.filename)?.aiReview;
  const sameReview = prevReview === nextReview;

  return sameFilename && samePatch && sameReview;
});

export default CommitAccordion;
