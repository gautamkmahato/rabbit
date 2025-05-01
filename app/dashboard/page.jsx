'use client'

// pages/dashboard.tsx
import { useEffect, useState } from "react";
import { useGitHub } from "../context/githubContext";

export default function Dashboard() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setUsername } = useGitHub();



  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("/api/auth/github/repository");
        const data = await res.json();
        console.log(data)
        setRepos(data);
        console.log(data[0]?.owner?.login)
        setUsername(data[0]?.owner?.login);
      } catch (err) {
        console.error("Error fetching repos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);



  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your GitHub Repositories</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : repos.length > 0 ? (
        <ul className="space-y-4">
          {repos.map((repo) => (
            <li key={repo.id} className="p-4 border rounded-xl hover:shadow transition">
              <a
                href={`/github/${repo?.name}`}
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold text-lg"
              >
                {repo.full_name}
              </a>
              <p className="text-gray-600 text-sm">{repo.description || "No description"}</p>
              <div className="mt-2 text-xs text-gray-500">
                ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No repositories found.</p>
      )}
    </div>
    </>
  );
}
