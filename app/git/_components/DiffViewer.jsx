"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, FileCode } from "lucide-react"
import { Card, CardContent } from "@/app/components/CardComponents"

function InlineDiff({ hunks }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-mono">
        <tbody>
          {hunks && hunks.length > 0 && hunks.map((hunk, hunkIndex) => (
            <HunkRows key={hunkIndex} hunk={hunk} viewMode="inline" hunkIndex={hunkIndex} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SplitDiff({ hunks }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-mono">
        <tbody>
          {hunks && hunks.length > 0 && hunks.map((hunk, hunkIndex) => (
            <HunkRows key={hunkIndex} hunk={hunk} viewMode="split" hunkIndex={hunkIndex} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function HunkRows({ hunk, viewMode, hunkIndex }) {
  return (
    <>
      <tr className="bg-blue-50 dark:bg-blue-950">
        <td colSpan={viewMode === "inline" ? 3 : 5} className="px-4 py-1 text-blue-700 dark:text-blue-300">
          @@ -{hunk.oldStart},{hunk.oldLines} +{hunk.newStart},{hunk.newLines} @@ {hunk.header}
        </td>
      </tr>

      {hunk?.changes && hunk?.changes.length > 0 && hunk.changes.map((change, changeIndex) => (
        <DiffRow key={`${hunkIndex}-${changeIndex}`} change={change} viewMode={viewMode} />
      ))}
    </>
  )
}

function DiffRow({ change, viewMode }) {
  const getChangeClass = (type) => {
    switch (type) {
      case "add":
        return "bg-green-50 dark:bg-green-950"
      case "del":
        return "bg-red-50 dark:bg-red-950"
      default:
        return ""
    }
  }

  const getLineNumberClass = (type) => {
    switch (type) {
      case "add":
        return "bg-green-100 dark:bg-green-900"
      case "del":
        return "bg-red-100 dark:bg-red-900"
      default:
        return "bg-gray-100 dark:bg-gray-800"
    }
  }

  if (viewMode === "inline") {
    return (
      <tr className={getChangeClass(change.type)}>
        <td className={`${getLineNumberClass(change.type)} w-12 text-right px-2 select-none text-gray-500`}>
          {change.type !== "add" ? change.oldLine : " "}
        </td>
        <td className={`${getLineNumberClass(change.type)} w-12 text-right px-2 select-none text-gray-500`}>
          {change.type !== "del" ? change.newLine : " "}
        </td>
        <td className="px-4 py-0.5 whitespace-pre">
          {change.type === "add" && <span className="text-green-700 dark:text-green-400">+</span>}
          {change.type === "del" && <span className="text-red-700 dark:text-red-400">-</span>}
          {change.type === "normal" && <span className="text-gray-500"> </span>}
          {change.content}
        </td>
      </tr>
    )
  } else {
    // Split view
    if (change.type === "normal") {
      return (
        <tr>
          <td className={`${getLineNumberClass("normal")} w-12 text-right px-2 select-none text-gray-500`}>
            {change.oldLine}
          </td>
          <td className="px-4 py-0.5 whitespace-pre border-r">{change.content}</td>
          <td className={`${getLineNumberClass("normal")} w-12 text-right px-2 select-none text-gray-500`}>
            {change.newLine}
          </td>
          <td className="px-4 py-0.5 whitespace-pre">{change.content}</td>
        </tr>
      )
    } else if (change.type === "del") {
      return (
        <tr>
          <td className={`${getLineNumberClass("del")} w-12 text-right px-2 select-none text-gray-500`}>
            {change.oldLine}
          </td>
          <td className="px-4 py-0.5 whitespace-pre bg-red-50 dark:bg-red-950 border-r">
            <span className="text-red-700 dark:text-red-400">-</span>
            {change.content}
          </td>
          <td className="w-12"></td>
          <td></td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td className="w-12"></td>
          <td className="border-r"></td>
          <td className={`${getLineNumberClass("add")} w-12 text-right px-2 select-none text-gray-500`}>
            {change.newLine}
          </td>
          <td className="px-4 py-0.5 whitespace-pre bg-green-50 dark:bg-green-950">
            <span className="text-green-700 dark:text-green-400">+</span>
            {change.content}
          </td>
        </tr>
      )
    }
  }
}

export default function DiffViewer({ files, viewMode }) {
  const safeFiles = Array.isArray(files) ? files : []

  console.log("safefiles", safeFiles)

  const [expandedFiles, setExpandedFiles] = useState(
    safeFiles.reduce((acc, file) => ({ ...acc, [file.path]: true }), {}),
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
      {safeFiles && safeFiles.length > 0 && safeFiles.map((file, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="flex items-center p-3 bg-muted cursor-pointer" onClick={() => toggleFile(file.filename)}>
            {expandedFiles[file.filename] ? (
              <ChevronDown className="h-4 w-4 mr-2" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-2" />
            )}
            <FileCode className="h-4 w-4 mr-2 font-semibold" />
            <span className="font-semibold">{file.filename}</span>
            <span className="ml-auto text-sm text-muted-foreground">
              {file.additions >= 0 && <span className="text-green-600 mr-4">{file.additions} additions</span>}
              {file.deletions >= 0 && <span className="text-red-600">{file.deletions} deletions</span>}
            </span>
          </div>

          {expandedFiles[file.filename] && (
            <CardContent className="p-0">
              {viewMode === "inline" ? <InlineDiff hunks={file.patch} /> : <SplitDiff hunks={file.patch} />}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}
