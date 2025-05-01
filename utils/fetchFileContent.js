// github/fetchFileContent.js
import { createUserOctokit } from "@/lib/octokitClient.js";
import { octokit } from "./octokitClient.js";
import { getGithubTokenFromRequest } from "@/app/action/getGithubTokenFromRequest.js";

/**
 * Fetch and decode file content
 * @param {string} owner 
 * @param {string} repo 
 * @param {string} path 
 * @returns {Promise<{ path: string, content: string }>}
 */
export async function fetchFileContent(owner, repo, path) {

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

  const decoded = Buffer.from(data.content, 'base64').toString('utf-8');

  return { path, content: decoded };
}
