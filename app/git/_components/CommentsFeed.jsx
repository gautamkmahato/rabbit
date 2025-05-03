"use client"

import { useState } from "react"
import { Brain } from "lucide-react"
import { formatDistanceToNow } from "@/lib/utils"
import MarkdownRenderer from "./MarkdownRenderer"

export function CommentCard({ comment }) {
  if (!comment || !comment.author) return null // 🛡️ Guard clause for missing data

  const avatarUrl = comment.author?.avatarUrl || "/placeholder.svg"
  const authorName = comment.author?.name || "Unknown"
  const createdAt = comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt)) : "some time"

  return (
    <div className="rounded-lg dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-3 shadow shadow-neutral-400">
      <div className="flex items-center gap-2">
        {/* Avatar */}
        <div className="h-6 w-6 rounded-full bg-zinc-200 overflow-hidden">
          <img
            src={avatarUrl}
            alt={authorName}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Author Name + AI Badge */}
        <div className="flex items-center">
          <span className="font-semibold text-sm text-neutral-600">{authorName}</span>
          {comment.isAi && (
            <span className="ml-2 inline-flex items-center bg-purple-200 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              <Brain className="h-3 w-3 mr-1" />
              AI
            </span>
          )}
        </div>

        {/* Timestamp */}
        <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-auto">
          {createdAt} ago
        </span>
      </div>

      {/* File Path Info */}
      {comment.filePath && comment.lineNumber && (
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-medium">{comment.filePath}</span>
          <span className="font-bold ml-2 mr-2">|</span>
          <span>line {comment.lineNumber}</span>
        </div>
      )}

      {/* Comment Content */}
      <div className="text-sm prose-sm max-w-none dark:prose-invert">
        <MarkdownRenderer content={comment.content || "No comment provided."} />
      </div>
    </div>
  )
}

export default function CommentsFeed({ comments }) {
  const [filter, setFilter] = useState("all")

  // 🛡️ Fallback for undefined/null/non-array props
  const safeComments = Array.isArray(comments) ? comments : []

  const filteredComments = safeComments.filter((comment) => {
    if (filter === "all") return true
    if (filter === "human") return !comment.isAi
    if (filter === "ai") return comment.isAi
    return true
  })

  return (
    <div className="space-y-4 shadow-md rounded-md p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Comments</h2>
        <div className="grid grid-cols-3 h-8 rounded-md border border-zinc-200 dark:border-zinc-700 overflow-hidden text-xs">
          {["all", "human", "ai"].map((val) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`px-3 flex items-center justify-center cursor-pointer text-xs font-medium transition-colors ${
                filter === val
                  ? "bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              {val.charAt(0).toUpperCase() + val.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredComments.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No comments found
          </div>
        ) : (
          filteredComments.map((comment) =>
            comment?.id ? (
              <CommentCard key={comment.id} comment={comment} />
            ) : null // 🛡️ skip if comment has no ID
          )
        )}
      </div>
    </div>
  )
}
