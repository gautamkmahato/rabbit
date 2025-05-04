"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownViewer({ markdownText }) {
  return (
    <div className="prose prose-sm md:prose lg:prose-lg prose-headings:font-semibold prose-headings:text-gray-800 max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ node, ...props }) => (
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2" {...props} />
          ),
          table: ({ children }) => (
            <table className="w-full border-collapse border border-gray-300">
              {children}
            </table>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-2 py-2 text-left bg-gray-100 font-medium">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-2 py-2 text-left">
              {children}
            </td>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm leading-relaxed">
              {children}
            </pre>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 rounded px-1 py-0.5 text-sm">{children}</code>
          ),
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </div>

  );
}
