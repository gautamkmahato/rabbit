'use client'

import { useEffect, useState } from "react";
import { fetchAllCommits } from "@/utils/fetchAllCommits";
import { Search, User } from "lucide-react";




const commits = [
    {
        id: "1",
        message: "Fix authentication flow and improve error handling",
        author: "Sarah Johnson",
        hash: "a1b2c3d",
        timeAgo: "2 years ago",
    },
    {
        id: "2",
        message: "Add support for OAuth 2.0 refresh tokens",
        author: "Michael Chen",
        hash: "b2c3d4e",
        timeAgo: "2 years ago",
    },
];

export default function Commits({ repo }) {

    const [commits, setCommits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getAllCommits() {
          try {
            setLoading(true);
            const result = await fetchAllCommits("gautamkmahato", repo);
            console.log(result)
            setCommits(result); 
          } catch (err) {
            console.error("Error fetching repos:", err);
          } finally {
            setLoading(false);
          }
        }
    
        getAllCommits();
    }, []);
    
    const get = async() =>{
        const result = await fetchAllCommits("gautamkmahato", repo);
        console.log(result)
    }

    return (
        <>
            <div>
                <div className="relative mb-6">
                    <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search commits by message or author"
                        className="w-full border border-zinc-300 rounded-md pl-10 pr-4 py-2 text-sm"
                    />
                </div>

                <div className="space-y-4">
                    {!loading ? (commits && commits.length > 0 && commits.map((commit, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-start p-4 border border-zinc-300 rounded-md bg-white shadow-sm"
                        >
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{commit?.commit.message}</p>
                                <p className="flex gap-1 items-center text-xs text-gray-500 mt-1">
                                <User className="w-3 h-3" />
                                    <span>{commit?.commit.author.name}</span>
                                </p>
                            </div>
                            <div className="flex flex-col text-right text-xs text-gray-500">
                                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded mb-2">
                                    {commit.sha}
                                </span>
                                <span>{commit.commit?.committer?.date}</span>
                            </div>
                        </div>
                    ))) : <div>Loading...</div>}
                </div>
                <button onClick={get}>click</button>
            </div>
        </>
    )
}
