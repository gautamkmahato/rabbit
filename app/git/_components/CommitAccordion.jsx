'use client';

import { useState } from 'react';
import { ChevronDown, FileText, Code2 } from 'lucide-react';
import MarkdownViewer from './aiReview/MarkdownViewer';



export default function CommitAccordion({ filename, additions, deletions, changes, status, patch, author_of_the_commit, commit_id, message, comments_url, reviews }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');

  console.log("reviews:", reviews)

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm mb-4">
      {/* Accordion Header */}
      <button
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-left">{filename}</span>
        <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''} `} />
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="px-4 py-4 bg-white border-t">
          {/* Tabs */}
          <div className="flex space-x-4 mb-4 border-b pb-2">
            <button
              onClick={() => setActiveTab('summary')}
              className={`
                'flex items-center gap-1 text-sm px-3 py-1 rounded-md',
                ${activeTab} === 'summary' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              `}
            >
              <FileText size={16} /> Summary
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`
                'flex items-center gap-1 text-sm px-3 py-1 rounded-md',
                ${activeTab} === 'code' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              `}
            >
              <Code2 size={16} /> Code
            </button>
          </div>

          {/* Tab Content */}
          <div className="prose max-w-none text-sm">
            {activeTab === 'summary' ? (
              <MarkdownViewer markdownText={reviews.find((review) => review.filename === filename).aiReview} />
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
