"use client"

import { useEffect, useState } from "react"
import { fetchAllCommits } from "@/utils/fetchAllCommits"
import { Search, User } from "lucide-react"

export default function Commits({ repo }) {
  const [commits, setCommits] = useState([])
  const [filteredCommits, setFilteredCommits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!repo) {
      setError("Repository name is required.")
      setLoading(false)
      return
    }

    async function getAllCommits() {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchAllCommits("gautamkmahato", repo)

        if (!Array.isArray(result)) {
          throw new Error("Unexpected response format.")
        }

        setCommits(result)
        setFilteredCommits(result)
      } catch (err) {
        console.error("Error fetching commits:", err)
        setError("Failed to fetch commits. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    getAllCommits()
  }, [repo])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchQuery(value)

    if (!value.trim()) {
      setFilteredCommits(commits)
      return
    }

    const filtered = commits.filter((commit) => {
      const message = commit?.commit?.message || ""
      const author = commit?.commit?.author?.name || ""
      return (
        message.toLowerCase().includes(value.toLowerCase()) ||
        author.toLowerCase().includes(value.toLowerCase())
      )
    })

    setFilteredCommits(filtered)
  }

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search commits by message or author"
          className="w-full border border-zinc-300 rounded-md pl-10 pr-4 py-2 text-sm"
        />
      </div>

      <div className="space-y-4">
        {loading && (
          <div className="text-sm text-gray-500">Fetching commits...</div>
        )}

        {!loading && error && (
          <div className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">
            {error}
          </div>
        )}

        {!loading && !error && filteredCommits.length === 0 && (
          <div className="text-sm text-gray-500">
            No commits found for the current search.
          </div>
        )}

        {!loading &&
          !error &&
          filteredCommits.length > 0 &&
          filteredCommits.map((commit, index) => {
            const message = commit?.commit?.message
            const author = commit?.commit?.author?.name
            const sha = commit?.sha
            const date = commit?.commit?.committer?.date

            if (!message || !author || !sha) return null // Skip invalid

            return (
              <div
                key={index}
                className="flex justify-between items-start p-4 border border-zinc-300 rounded-md bg-white shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {message}
                  </p>
                  <p className="flex gap-1 items-center text-xs text-gray-500 mt-1">
                    <User className="w-3 h-3" />
                    <span>{author}</span>
                  </p>
                </div>
                <div className="flex flex-col text-right text-xs text-gray-500">
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded mb-2 break-all">
                    {sha.slice(0, 7)}
                  </span>
                  {date && (
                    <span>{new Date(date).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })}</span>
                  )}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
