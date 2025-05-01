// github/fetchRepoTree.js
import { createUserOctokit } from "@/lib/octokitClient.js";
import { octokit } from "./octokitClient.js";
import { getGithubTokenFromRequest } from "@/app/action/getGithubTokenFromRequest.js";

/**
 * Recursively fetch all file paths in a repository
 * @param {string} owner 
 * @param {string} repo 
 * @param {string} path 
 * @returns {Promise<string[]>} file paths
*/
export async function fetchAllFilePaths(owner, repo, path = "") {
  const token = await getGithubTokenFromRequest();
  
  console.log("============== Token get from headers: ", token)
  
  if (!token) {
    throw new Error({ error: 'Not authenticated' }, { status: 401 });
  }
  
  const octokit = createUserOctokit(token); 
  
  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path
  });

  let paths = [];

  for (const item of data) {
    if (item.type === "file") {
      paths.push(item.path);
    } else if (item.type === "dir") {
      const nested = await fetchAllFilePaths(owner, repo, item.path);
      paths.push(...nested);
    }
  }

  return paths;
}
