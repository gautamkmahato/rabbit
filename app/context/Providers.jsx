// app/providers.jsx
'use client';

import GitHubContextProvider from "./githubContext";



export function Providers({ children }) {
  return <GitHubContextProvider>{children}</GitHubContextProvider>;
}
