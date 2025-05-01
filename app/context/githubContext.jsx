// app/context/githubContext.js
'use client';

import React, { createContext, useState, useContext } from "react";

const GitHubContext = createContext();

export default function GitHubContextProvider({ children }) {
  const [username, setUsername] = useState('');
  const [repoName, setRepoName] = useState('rag');

  return (
    <GitHubContext.Provider value={{ username, setUsername, repoName, setRepoName }}>
      {children}
    </GitHubContext.Provider>
  );
}

export function useGitHub() {
  return useContext(GitHubContext);
}
