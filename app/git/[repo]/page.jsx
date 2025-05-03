"use client";

import React, { useState } from "react";
import { Box, Clock, Command, Eye, Files, GitPullRequest, GitPullRequestArrow, Search, Star,} from "lucide-react";
import Commits from "../_components/Commits";
import PullRequests from "../_components/PullRequests";


const tabs = [
  { name: "Commits", icon: Command },
  { name: "Pull Requests", icon: GitPullRequestArrow },
  { name: "Changed Files", icon: Files },
];

export default function RepoActivity({ params }) {
  const [activeTab, setActiveTab] = useState("commits");
  
  const param = React.use(params)
  const repo = param.repo;
  console.log(repo)

  return (
    <div className="max-w-5xl mx-auto p-4" style={{ fontFamily: "var(--font-roboto)" }}>
      <div className="flex gap-4">
        <h2 className="text-2xl font-bold mb-2">{repo}</h2>
      </div>

      <div className="text-sm text-gray-600 mb-4 flex items-center gap-4">
        <span className="flex items-center gap-1">
        <Star className="w-4 h-4" /> 18,432
        </span>
        <span className="flex items-center gap-1">
        <Box className="w-4 h-4" /> 2,145
        </span>
        <span className="flex items-center gap-1">
        <Clock className="w-4 h-4" /> Updated 2 years ago
        </span>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-zinc-200 mt-8 mb-4">
        {tabs.map((tab) => {
          const key = tab.name.toLowerCase().replace(/\s/g, "");
          const Icon = tab.icon;
          return (
            <button
              key={key}
              className={`flex gap-2 items-center justify-center text-center px-4 py-2 text-sm font-medium border-b-2 transition ${
                activeTab === key
                  ? "border-zinc-600 text-zinc-800 font-semibold cursor-pointer"
                  : "border-transparent text-gray-600 hover:text-zinc-950 hover:font-bold"
              }`}
              onClick={() => setActiveTab(key)}
            >
              <Icon size={16} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Commits Tab */}
      {activeTab === "commits" && (
        <Commits repo={repo} />
      )}

      {/* Pull Requests Tab */}
      {activeTab === "pullrequests" && (
        <PullRequests repo={repo} />
      )}
    </div>
  );
}
