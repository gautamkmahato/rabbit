"use client"

import { useState } from "react"
import {
  AlertTriangle,
  CheckCircle,
  FileCode,
  RefreshCw,
  HelpCircle,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import Badge from "@/app/components/Badge"

function AiReviewSummary({ reviewData }) {
  const { summary, criticalIssuesCount, suggestionsCount } = reviewData

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-700 pb-2">
        <h3 className="text-lg font-semibold">AI Review Summary</h3>
      </div>
      <div className="px-6 py-4 space-y-4">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{summary}</p>

        <div className="flex flex-wrap gap-4">
          {criticalIssuesCount > 0 ? (
            <div className="flex items-center">
              <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full mr-2">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Critical
              </span>
              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                {criticalIssuesCount} critical issues found
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full mr-2">
                <CheckCircle className="h-3 w-3 mr-1" />
                No Critical Issues
              </span>
            </div>
          )}

          {suggestionsCount > 0 && (
            <div className="flex items-center">
              <span className="inline-flex items-center bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full mr-2">
                <HelpCircle className="h-3 w-3 mr-1" />
                Suggestions
              </span>
              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                {suggestionsCount} suggestions
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FeedbackCard({ feedback, isExplanationExpanded, onToggleExplanation }) {
  
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "low":
        return "bg-blue-100 text-blue-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      case "high":
        return "bg-red-100 text-red-800"
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "low":
        return <CheckCircle className="h-4 w-4" />
      case "medium":
      case "high":
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getFeedbackTypeColor = (type) => {
    switch (type) {
      case "bug":
        return "bg-red-100 text-red-800"
      case "refactor":
        return "bg-purple-100 text-purple-800"
      case "test":
        return "bg-green-100 text-green-800"
      case "security":
        return "bg-amber-100 text-amber-800"
      case "style":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-4 border-t border-gray-300">
      <div className="mb-4">
        <h3 className="font-semibold mt-6">{feedback.title}</h3>
        <p className="text-sm text-neutral-600">{feedback.description}</p>
      </div>

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center border border-gray-300 dark:border-zinc-700 px-4 py-2 rounded-md text-sm divide-x divide-gray-300 dark:divide-zinc-600">
            <div className="flex items-center gap-2 pr-4">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${getSeverityColor(feedback.severity)}`}>
                {getSeverityIcon(feedback.severity)}
                <span className="ml-1 capitalize">{feedback.severity}</span>
              </span>
            </div>

            <div className="flex items-center px-4">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${getFeedbackTypeColor(feedback.type)}`}>
                {feedback.type}
              </span>
            </div>

            <div className="pl-4">
              {feedback.lineNumber && (
                <span className="inline-block text-xs font-semibold px-2.5 py-1 bg-gray-200 text-gray-800 rounded-md">
                  Line {feedback.lineNumber}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4">
          <button className="flex gap-1 items-center text-sm border border-neutral-400 rounded-md px-3 py-1.5 hover:bg-neutral-100 cursor-pointer" onClick={onToggleExplanation}>
            <HelpCircle className="h-4 w-4 mr-1" />
            Explain
          </button>

          {feedback.hasSuggestion && (
            <button className="flex items-center text-sm border border-neutral-400 rounded-md px-3 py-1.5 hover:bg-neutral-190 cursor-pointer">
              Apply Suggestion
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          )}
        </div>
      </div>

      {feedback.codeSnippet && (
        <div className="bg-zinc-100 dark:bg-green-950 mb-4 border border-green-200 dark:border-green-800 rounded-md p-3 shadow mt-2">
          <div className="text-sm font-semibold text-gray-800 dark:text-green-400 mb-1">Code Snippet:</div>
          <div className="text-sm font-mono whitespace-pre overflow-x-auto">{feedback.codeSnippet}</div>
        </div>
      )}

      {feedback.suggestion && (
        <div className="bg-green-50 dark:bg-green-950 mb-4 border border-green-200 dark:border-green-800 rounded-md p-3 shadow mt-2">
          <div className="text-sm font-semibold text-green-800 dark:text-green-400 mb-1">Suggested Fix:</div>
          <div className="text-sm font-mono whitespace-pre overflow-x-auto">{feedback.suggestion}</div>
        </div>
      )}

      {isExplanationExpanded && (
        <div className="bg-blue-50 dark:bg-blue-950 mb-4 border border-blue-200 dark:border-blue-800 rounded-md p-3 mt-2 shadow">
          <div className="text-sm font-semibold text-blue-800 dark:text-blue-400 mb-1">Explanation:</div>
          <div className="text-sm">{feedback.explanation}</div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <button className="flex items-center gap-2 h-7 px-2 hover:bg-gray-100 rounded-md cursor-pointer">
          <ThumbsUp className="h-4 w-4" />
          <span className="text-sm">Helpful</span>
        </button>
        <button className="flex items-center gap-1 h-7 px-2 hover:bg-gray-100 rounded-md cursor-pointer">
          <ThumbsDown className="h-4 w-4 mr-1" />
          <span className="text-sm">Not Helpful</span>
        </button>
      </div>
    </div>
  )
}

export default function AiReview({ reviewData }) {
  const [expandedFiles, setExpandedFiles] = useState({})
  const [expandedFeedback, setExpandedFeedback] = useState({})

  const toggleFile = (filePath) => {
    setExpandedFiles((prev) => ({
      ...prev,
      [filePath]: !prev[filePath],
    }))
  }

  const toggleExplanation = (id) => {
    setExpandedFeedback((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="space-y-6">
      <AiReviewSummary reviewData={reviewData} />

      <div className="space-y-4">
        <h2 className="text-lg font-bold">Detailed Feedback</h2>

        {Object.entries(reviewData.feedbackByFile).map(([filePath, feedbacks]) => (
          <div key={filePath} className="rounded-lg">
            <div
              onClick={() => toggleFile(filePath)}
              className="flex items-center justify-between px-4 py-3 cursor-pointer bg-neutral-100 border border-gray-200 rounded-lg shadow hover:bg-neutral-200 transition"
            >
              <div className="flex items-center">
                <FileCode className="h-4 w-4 mr-2" />
                <span className="text-neutral-800 font-semibold">{filePath}</span>
                <Badge className="ml-3 bg-gray-100 text-gray-800">
                  {feedbacks.length} {feedbacks.length === 1 ? "issue" : "issues"}
                </Badge>
              </div>
              <span className="text-xs text-neutral-500">
                {expandedFiles[filePath] ? "Hide" : "Show"}
              </span>
            </div>

            {expandedFiles[filePath] && (
              <div className="bg-gray-50 border-t border-neutral-100 divide-y divide-neutral-100">
                {feedbacks.map((feedback) => (
                  <FeedbackCard
                    key={feedback.id}
                    feedback={feedback}
                    isExplanationExpanded={!!expandedFeedback[feedback.id]}
                    onToggleExplanation={() => toggleExplanation(feedback.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button className="flex items-center">
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate Review
        </button>
      </div>
    </div>
  )
}
