'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function FinalReviewTab({ markdown }) {
  return (
    <div className="prose max-w-none prose-sm md:prose lg:prose-lg prose-headings:font-semibold prose-headings:text-gray-800">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
