"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/TabComponents"
import PrDescription from "./PrDescription"
import PrHeader from "./PrHeader"
import CommentsFeed from "./CommentsFeed"
import DiffViewer from "./DiffViewer"
// import AiReview from "./AiReview"



export default function PrDetailPage({ prData, repo }) {
  const [diffViewMode, setDiffViewMode] = useState("inline")

  return (
    <div className="container mx-auto py-6 max-w-7xl" style={{ fontFamily: "var(--font-roboto)" }}>
      <PrHeader prData={prData} repo={repo} />

      <Tabs defaultValue="info" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 px-1.5 py-1.5 rounded-md shadow shadow-neutral-300 bg-neutral-100">
          <TabsTrigger value="info">PR Info</TabsTrigger>
          <TabsTrigger value="files">Files Changed</TabsTrigger>
          <TabsTrigger value="ai-review">AI Review</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <PrDescription prData={prData} />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <CommentsFeed comments={prData.comments} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="files" className="mt-4">
          <div className="flex justify-end mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">View mode:</span>
              <select
                className="border border-neutral-300 rounded px-2 py-1 text-sm"
                value={diffViewMode}
                onChange={(e) => setDiffViewMode(e.target.value)}
              >
                <option value="inline">Inline</option>
                <option value="split">Side-by-side</option>
              </select>
            </div>
          </div>
          <DiffViewer files={prData.changedFiles} viewMode={diffViewMode} />
        </TabsContent>

        {/* <TabsContent value="ai-review" className="mt-4 ">
          <AiReview reviewData={prData.aiReview} />
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
