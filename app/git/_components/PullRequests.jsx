'use client'

import { useEffect, useState } from "react";
import { fetchAllPullRequests } from "@/utils/fetchAllPullRequests";
import { Book, GitPullRequest, MessageCircle, Timer, User } from "lucide-react";
import Link from "next/link";
import { fetchAllPullRequestsWithCommitCount } from "@/utils/fetchAllPullRequestsWithCommitCount";




const pullRequests = [
    {
      id: 1234,
      title: "Add support for NextAuth.js v5",
      author: "Sarah Johnson",
      timeAgo: "2 years ago",
      comments: 8,
      status: "open",
    },
    {
      id: 1233,
      title: "Improve TypeScript types for session handling",
      author: "Michael Chen",
      timeAgo: "2 years ago",
      comments: 12,
      status: "merged",
    },
    {
      id: 1232,
      title: "Fix OAuth callback URL handling",
      author: "Alex Rodriguez",
      timeAgo: "2 years ago",
      comments: 3,
      status: "closed",
    },
    {
      id: 1231,
      title: "Add documentation for custom providers",
      author: "Emily Wilson",
      timeAgo: "2 years ago",
      comments: 5,
      status: "merged",
    },
];

export default function PullRequests({ repo }) {
    const [prFilter, setPrFilter] = useState("all");
    const [pullRequests, setPullRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    


    const filteredPRs = pullRequests.filter(
        (pr) => prFilter === "all" || pr.status === prFilter
    );

    useEffect(() => {
        async function getAllPullRequests() {
            try {
                setLoading(true);
                const result = await fetchAllPullRequestsWithCommitCount("gautamkmahato", repo);
                console.log(result)
                setPullRequests(result); 
            } catch (err) {
                console.error("Error fetching repos:", err);
            } finally {
                setLoading(false);
            }
        }
    
        getAllPullRequests();
    }, []);

    

    const get = async() =>{
        const result = await fetchAllPullRequests("gautamkmahato", "rag-projects");
        //console.log(result)
        const prData = await getDetailedPullRequests("gautamkmahato", "rag-projects")
        console.log(prData)
    }

    return (
        <>
            <div>
                <div className="flex gap-2 mb-4">
                    {["All", "Open", "Closed", "Merged"].map((status) => {
                    const key = status.toLowerCase();
                    return (
                        <button
                        key={status}
                        className={`px-6 py-1 shadow rounded-md text-sm border ${
                            prFilter === key
                            ? "bg-blue-100 text-blue-700 border-blue-300"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                        onClick={() => setPrFilter(key)}
                        >
                        {status}
                        </button>
                    );
                    })}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {!loading ? (filteredPRs && filteredPRs.length > 0 && filteredPRs.map((pr, index) => (
                    <div
                        key={index}
                        className="p-4 border border-zinc-200 shadow-md rounded-md bg-white flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2 text-sm">
                                <GitPullRequest size={18} className="text-gray-700" />
                                <span
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                    pr.state === "open"
                                    ? "bg-green-100 text-green-700"
                                    : pr.state === "closed"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-purple-100 text-purple-700"
                                }`}
                                >
                                {pr.state}
                                </span>
                                <span
                                className={`text-xs bg-zinc-200 font-semibold px-2 py-0.5 rounded-full`}
                                >
                                {pr.branch}
                                </span>
                            </div>
                            {/** pull request number */}
                            <h1 className="text-sm font-bold text-gray-600">#{pr.number}</h1>
                        </div>

                        <h3 className="text-gray-800 font-medium text-sm mt-2">{pr.title}</h3>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                            <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span>{pr.user}</span>
                            </span> 
                            <span className="flex items-center gap-1">
                                <Timer className="w-3 h-3" />
                                <span>{pr.updatedAt}</span>
                            </span> 
                            <span className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                <span>{pr.commitCount} Commit</span>
                            </span> 
                        </div>
                        <Link href={`/git/${repo}/${pr.number}`} className="flex items-center gap-1 mt-6 px-3 py-2 text-sm bg-zinc-800 hover:bg-zinc-950 text-zinc-50 rounded-md  w-max">
                            <Book className="h-4 w-4" />
                            <span>View Files Changed</span>
                        </Link>
                    </div>
                    ))): <div>Loading...</div>}
                </div>
            </div>
            <button onClick={get}>click</button>

        </>
    )
}
