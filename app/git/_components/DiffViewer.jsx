"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, FileCode } from "lucide-react"
import { Card, CardContent } from "@/app/components/CardComponents"
import parse from 'parse-diff'

function renderDiffLines(hunks) {
  return hunks.flatMap((chunk, i) =>
    chunk.changes.map((change, j) => {
      let bgColor = ''
      if (change.type === 'add') bgColor = 'bg-green-100 text-green-800'
      else if (change.type === 'del') bgColor = 'bg-red-100 text-red-800'
      else bgColor = 'bg-white'

      return (
        <tr key={`change-${i}-${j}`} className={`${bgColor}`}>
          <td className="px-2 text-right w-12 text-muted-foreground">
            {change.oldLine ?? ''}
          </td>
          <td className="px-2 text-right w-12 text-muted-foreground">
            {change.newLine ?? ''}
          </td>
          <td className="px-2 whitespace-pre-wrap">
            {change.type === 'add' ? '+' : change.type === 'del' ? '-' : ' '}
            {change.content}
          </td>
        </tr>
      )
    })
  )
}

function InlineDiff({ hunks }) {
  const parsedFiles = parse(hunks)
  const file = parsedFiles[0] // Only handle first file here
  if (!file) return null

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-mono">
        <tbody>{renderDiffLines(file.chunks)}</tbody>
      </table>
    </div>
  )
}

function SplitDiff({ hunks }) {
  const parsedFiles = parse(hunks)
  const file = parsedFiles[0]
  if (!file) return null

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-mono">
        <tbody>{renderDiffLines(file.chunks)}</tbody>
      </table>
    </div>
  )
}

export default function DiffViewer({ files, viewMode }) {
  const safeFiles = Array.isArray(files) ? files : []

  const [expandedFiles, setExpandedFiles] = useState(
    safeFiles.reduce((acc, file) => ({ ...acc, [file.filename]: true }), {}),
  )

  const toggleFile = (path) => {
    setExpandedFiles((prev) => ({
      ...prev,
      [path]: !prev[path],
    }))
  }

  if (safeFiles.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground p-4 border rounded-md">
        No file changes to display.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {safeFiles.map((file, index) => (
        <Card key={index} className="overflow-hidden">
          <div
            className="flex items-center p-3 bg-muted cursor-pointer"
            onClick={() => toggleFile(file.filename)}
          >
            {expandedFiles[file.filename] ? (
              <ChevronDown className="h-4 w-4 mr-2" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-2" />
            )}
            <FileCode className="h-4 w-4 mr-2 font-semibold" />
            <span className="font-semibold">{file.filename}</span>
            <span className="ml-auto text-sm text-muted-foreground">
              {file.additions >= 0 && (
                <span className="text-green-600 mr-4">{file.additions} additions</span>
              )}
              {file.deletions >= 0 && (
                <span className="text-red-600">{file.deletions} deletions</span>
              )}
            </span>
          </div>

          {expandedFiles[file.filename] && (
            <CardContent className="p-0">
              {viewMode === "inline" ? (
                <InlineDiff hunks={file.patch} />
              ) : (
                <SplitDiff hunks={file.patch} />
              )}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}
