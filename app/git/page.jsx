'use client';

import { useEffect, useState } from 'react';
import { Star, GitFork, Clock, ViewIcon, View } from 'lucide-react';
import { useGitHub } from '../context/githubContext';
import Link from 'next/link';

const repositories = [
  {
    name: 'next-auth',
    description: 'Authentication for Next.js – flexible, secure, with many providers and databases support',
    stars: 18923,
    forks: 2145,
    updated: 717,
    visibility: 'public',
  },
  {
    name: 'shadcn-ui',
    description: 'Beautifully designed components built with Radix UI and Tailwind CSS',
    stars: 32567,
    forks: 4321,
    updated: 712,
    visibility: 'public',
  },
  {
    name: 'private-project',
    description: 'A private project with confidential code and documentation',
    stars: 0,
    forks: 0,
    updated: 714,
    visibility: 'private',
  },
  {
    name: 'react-hooks',
    description: 'A collection of useful React hooks for common UI patterns and state management',
    stars: 8765,
    forks: 1234,
    updated: 721,
    visibility: 'public',
  },
];

export default function RepositoryList() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setUsername } = useGitHub();

  const filteredRepos = repositories.filter((repo) => {
    const matchesSearch = repo.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || repo.visibility === filter;
    return matchesSearch && matchesFilter;
  });

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
    <div className="p-6 max-w-5xl mx-auto" style={{ fontFamily: "var(--font-roboto)" }}>
      <h1 className="text-2xl font-bold mb-1">Repositoriesss</h1>
      <p className="text-gray-500 mb-6">Manage and explore your GitHub repositories</p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search repositories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 rounded-md px-4 py-2"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="all">All repositories</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {!loading ? (repos && repos.length && repos.map((repo, idx) => (
          <div key={idx} className="bg-zinc-50 border border-zinc-200 shadow rounded-xl p-4 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">{repo?.full_name}</h2>
              <span
                className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                  repo?.visibility === 'public'
                    ? 'border border-zinc-900 text-zinc-900'
                    : 'border border-red-700 text-red-700'
                }`}
              >
                {repo?.visibility}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{repo.description}</p>

            <div className="flex gap-6 items-center text-sm text-gray-500 mt-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" /> {repo.stargazers_count}
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-4 h-4" /> {repo.forks_count}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {repo.updated_at}
              </div>
            </div>

            <div className="flex gap-6 items-center text-sm text-gray-500 mt-4">
            <Link href={`/git/${repo.full_name.split('/')[1]}`} className="flex items-center gap-1 mt-4 bg-zinc-800 text-zinc-50 shadow-md shadow-zinc-600 rounded-md px-4 py-2 hover:bg-zinc-950 cursor-pointer transition text-sm font-medium">
                  <View className="w-4 h-4" />
                  <span>View PRs</span>
                </Link>
                <Link href="/" className="flex items-center gap-1 mt-4 bg-zinc-800 text-zinc-50 shadow-md shadow-zinc-600 rounded-md px-4 py-2 hover:bg-zinc-950 cursor-pointer transition text-sm font-medium">
                  <Star className="w-4 h-4" />
                  <span>AI review</span>
                </Link>
            </div>

            
          </div>
        ))): <div>Loading...</div>}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        <button className="border rounded-md px-3 py-1 hover:bg-gray-100">&lt;</button>
        <button className="bg-black text-white rounded-md px-3 py-1">1</button>
        <button className="border rounded-md px-3 py-1 hover:bg-gray-100">2</button>
        <button className="border rounded-md px-3 py-1 hover:bg-gray-100">&gt;</button>
      </div>
    </div>
  );
}
