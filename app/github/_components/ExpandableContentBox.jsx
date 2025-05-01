'use client';

import { useState } from 'react';

export default function ExpandableContentBox({ files, previewLines = 5 }) {
  const [expanded, setExpanded] = useState(false);

  // Limit content for preview
  const { content, path } = files;
  const lines = content.split('\n');
  const previewContent = lines.slice(0, previewLines).join('\n');
  const hasMore = lines.length > previewLines;

  return (
    <div className="border border-gray-300 rounded-lg p-4 mt-8 shadow-sm max-w-2xl mx-auto bg-white transition">
      <div className='border-b border-neutral-400 px-2 py-4'>
        <h1>{path}</h1>
      </div>
      <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono px-2 py-4">
        {expanded ? content : previewContent}
      </pre>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {expanded ? "Collapse" : "Load More"}
        </button>
      )}
    </div>
  );
}
