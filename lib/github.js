
const gkm = '/gkm.jpg'

// This is a mock function that would normally fetch data from the GitHub API
export async function getPullRequestData(owner, repo, pullNumber) {
  // In a real app, you would fetch this data from the GitHub API
  // For demo purposes, we'll return mock data
  return {
    title: "Add new dashboard components",
    number: Number.parseInt(pullNumber),
    author: {
      name: "Jane Developer",
      avatarUrl: gkm,
    },
    createdAt: "2023-05-15T10:30:00Z",
    status: "open",
    baseBranch: "main",
    headBranch: "feature/dashboard",
    commits: 5,
    additions: 342,
    deletions: 121,
    repoOwner: owner,
    repoName: repo,
    description: `This is the description of the PR`,
    linkedIssues: [
      {
        id: "issue-1",
        number: 42,
        title: "Implement dashboard analytics",
        url: `https://github.com/${owner}/${repo}/issues/42`,
      },
      {
        id: "issue-2",
        number: 45,
        title: "Fix responsive layout in dashboard",
        url: `https://github.com/${owner}/${repo}/issues/45`,
      },
    ],
    labels: [
      {
        id: "label-1",
        name: "enhancement",
        color: "0E8A16",
      },
      {
        id: "label-2",
        name: "frontend",
        color: "1D76DB",
      },
      {
        id: "label-3",
        name: "priority: medium",
        color: "FFA500",
      },
    ],
    mentions: [
      {
        id: "user-1",
        username: "tech-lead",
      },
      {
        id: "user-2",
        username: "design-team",
      },
    ],
    comments: [
      {
        id: "comment-1",
        author: {
          name: "John Reviewer",
          avatarUrl: gkm,
        },
        content: "The chart component looks great! Could you add some documentation for the API?",
        createdAt: "2023-05-16T09:15:00Z",
        filePath: "components/charts/BarChart.tsx",
        lineNumber: 42,
        isAi: false,
      },
      {
        id: "comment-2",
        author: {
          name: "AI Assistant",
          avatarUrl: gkm,
        },
        content:
          "I noticed that you're not handling the loading state in the `useEffect` hook. This could lead to memory leaks if the component unmounts before the data is fetched.",
        createdAt: "2023-05-16T09:20:00Z",
        filePath: "components/Dashboard.tsx",
        lineNumber: 78,
        isAi: true,
      },
      {
        id: "comment-3",
        author: {
          name: "Jane Developer",
          avatarUrl: gkm,
        },
        content: "Good catch! I'll fix that in the next commit.",
        createdAt: "2023-05-16T10:05:00Z",
        filePath: "components/Dashboard.tsx",
        lineNumber: 78,
        isAi: false,
      },
    ],
    changedFiles: [
      {
        path: "components/Dashboard.tsx",
        additions: 120,
        deletions: 45,
        hunks: [
          {
            oldStart: 1,
            oldLines: 10,
            newStart: 1,
            newLines: 15,
            header: "Dashboard component",
            changes: [
              {
                type: "normal",
                oldLine: 1,
                newLine: 1,
                content: "import React, { useEffect, useState } from 'react';",
              },
              {
                type: "normal",
                oldLine: 2,
                newLine: 2,
                content: "import { Card } from './ui/card';",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 3,
                content: "import { BarChart } from './charts/BarChart';",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 4,
                content: "import { LineChart } from './charts/LineChart';",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 5,
                content: "import { PieChart } from './charts/PieChart';",
              },
              {
                type: "normal",
                oldLine: 3,
                newLine: 6,
                content: "",
              },
              {
                type: "del",
                oldLine: 4,
                newLine: null,
                content: "export function Dashboard() {",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 7,
                content: "export function Dashboard({ userId }) {",
              },
              {
                type: "normal",
                oldLine: 5,
                newLine: 8,
                content: "  const [data, setData] = useState(null);",
              },
              {
                type: "normal",
                oldLine: 6,
                newLine: 9,
                content: "",
              },
              {
                type: "del",
                oldLine: 7,
                newLine: null,
                content: "  useEffect(() => {",
              },
              {
                type: "del",
                oldLine: 8,
                newLine: null,
                content: "    // Fetch dashboard data",
              },
              {
                type: "del",
                oldLine: 9,
                newLine: null,
                content: "    fetch('/api/dashboard')",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 10,
                content: "  useEffect(() => {",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 11,
                content: "    // Fetch dashboard data for specific user",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 12,
                content: "    fetch(`/api/dashboard?userId=${userId}`)",
              },
              {
                type: "normal",
                oldLine: 10,
                newLine: 13,
                content: "      .then(res => res.json())",
              },
              {
                type: "normal",
                oldLine: 11,
                newLine: 14,
                content: "      .then(data => setData(data));",
              },
              {
                type: "normal",
                oldLine: 12,
                newLine: 15,
                content: "  }, []);",
              },
            ],
          },
          {
            oldStart: 20,
            oldLines: 8,
            newStart: 23,
            newLines: 15,
            header: "Render section",
            changes: [
              {
                type: "normal",
                oldLine: 20,
                newLine: 23,
                content: "  return (",
              },
              {
                type: "normal",
                oldLine: 21,
                newLine: 24,
                content: '    <div className="grid gap-4">',
              },
              {
                type: "del",
                oldLine: 22,
                newLine: null,
                content: "      <Card>",
              },
              {
                type: "del",
                oldLine: 23,
                newLine: null,
                content: "        <h2>Dashboard</h2>",
              },
              {
                type: "del",
                oldLine: 24,
                newLine: null,
                content: "        {data ? (",
              },
              {
                type: "del",
                oldLine: 25,
                newLine: null,
                content: "          <p>Data loaded</p>",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 25,
                content: '      <Card className="p-4">',
              },
              {
                type: "add",
                oldLine: null,
                newLine: 26,
                content: '        <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>',
              },
              {
                type: "add",
                oldLine: null,
                newLine: 27,
                content: "        {data ? (",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 28,
                content: '          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">',
              },
              {
                type: "add",
                oldLine: null,
                newLine: 29,
                content: "            <BarChart data={data.barData} />",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 30,
                content: "            <LineChart data={data.lineData} />",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 31,
                content: "            <PieChart data={data.pieData} />",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 32,
                content: "          </div>",
              },
              {
                type: "normal",
                oldLine: 26,
                newLine: 33,
                content: "        ) : (",
              },
              {
                type: "normal",
                oldLine: 27,
                newLine: 34,
                content: "          <p>Loading...</p>",
              },
              {
                type: "normal",
                oldLine: 28,
                newLine: 35,
                content: "        )}",
              },
            ],
          },
        ],
      },
      {
        path: "components/charts/BarChart.tsx",
        additions: 75,
        deletions: 0,
        hunks: [
          {
            oldStart: 0,
            oldLines: 0,
            newStart: 1,
            newLines: 10,
            header: "New file",
            changes: [
              {
                type: "add",
                oldLine: null,
                newLine: 1,
                content: "import React from 'react';",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 2,
                content: "import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 3,
                content: "",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 4,
                content: "export function BarChart({ data }) {",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 5,
                content: "  // Implementation of bar chart",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 6,
                content: "  return (",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 7,
                content: "    <Card>",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 8,
                content: "      <CardHeader>",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 9,
                content: "        <CardTitle>Bar Chart</CardTitle>",
              },
              {
                type: "add",
                oldLine: null,
                newLine: 10,
                content: "      </CardHeader>",
              },
            ],
          },
        ],
      },
    ],
    aiReview: {
      summary:
        "This PR adds new dashboard components with analytics charts. The code is generally well-structured, but there are a few issues to address regarding performance, error handling, and TypeScript types.",
      criticalIssuesCount: 1,
      suggestionsCount: 3,
      feedbackByFile: {
        "components/Dashboard.tsx": [
          {
            id: "feedback-1",
            title: "Missing dependency in useEffect",
            description: "The useEffect hook depends on userId but it's not included in the dependency array.",
            type: "bug",
            severity: "high",
            filePath: "components/Dashboard.tsx",
            lineNumber: 15,
            codeSnippet:
              "  useEffect(() => {\n    // Fetch dashboard data for specific user\n    fetch(`/api/dashboard?userId=${userId}`)\n      .then(res => res.json())\n      .then(data => setData(data));\n  }, []);",
            suggestion:
              "  useEffect(() => {\n    // Fetch dashboard data for specific user\n    fetch(`/api/dashboard?userId=${userId}`)\n      .then(res => res.json())\n      .then(data => setData(data));\n  }, [userId]);",
            explanation:
              "When you use variables from the component scope in an effect, you should include them in the dependency array. Otherwise, the effect will use stale values from the initial render. In this case, if userId changes, the effect won't run again with the new value, which could lead to incorrect data being displayed.",
            hasSuggestion: true,
          },
          {
            id: "feedback-2",
            title: "Missing error handling",
            description:
              "The fetch call doesn't have error handling, which could lead to unhandled promise rejections.",
            type: "bug",
            severity: "medium",
            filePath: "components/Dashboard.tsx",
            lineNumber: 12,
            codeSnippet:
              "    fetch(`/api/dashboard?userId=${userId}`)\n      .then(res => res.json())\n      .then(data => setData(data));",
            suggestion:
              "    fetch(`/api/dashboard?userId=${userId}`)\n      .then(res => res.json())\n      .then(data => setData(data))\n      .catch(error => {\n        console.error('Failed to fetch dashboard data:', error);\n        // Handle error state\n      });",
            explanation:
              "Always handle potential errors in fetch calls to prevent unhandled promise rejections. This also gives you the opportunity to show an error state to the user instead of an indefinite loading state if the request fails.",
            hasSuggestion: true,
          },
        ],
        "components/charts/BarChart.tsx": [
          {
            id: "feedback-3",
            title: "Missing TypeScript types",
            description: "The component is using implicit any types for its props.",
            type: "style",
            severity: "low",
            filePath: "components/charts/BarChart.tsx",
            lineNumber: 4,
            codeSnippet: "export function BarChart({ data }) {",
            suggestion:
              "interface BarChartProps {\n  data: {\n    labels: string[];\n    values: number[];\n    // Add other required properties\n  };\n}\n\nexport function BarChart({ data }: BarChartProps) {",
            explanation:
              "Using TypeScript types for component props improves code quality by making the expected data structure explicit. This helps catch errors during development and provides better IDE support.",
            hasSuggestion: true,
          },
          {
            id: "feedback-4",
            title: "Incomplete implementation",
            description: "The chart implementation is incomplete and only contains placeholder comments.",
            type: "refactor",
            severity: "medium",
            filePath: "components/charts/BarChart.tsx",
            lineNumber: 5,
            codeSnippet: "  // Implementation of bar chart",
            suggestion: null,
            explanation:
              "The component needs actual implementation for rendering the bar chart. Consider using a charting library like Chart.js, Recharts, or D3.js to implement the visualization.",
            hasSuggestion: false,
          },
        ],
      },
    },
    aiReviewStatus: "issues",
  }
}
