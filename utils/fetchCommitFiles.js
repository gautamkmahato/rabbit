// github/fetchCommitFiles.js
import { getGithubTokenFromRequest } from "@/app/action/getGithubTokenFromRequest";
import { createUserOctokit } from "@/lib/octokitClient.js";


/**
 * Get the list of files changed in a commit
 * @param {string} owner 
 * @param {string} repo 
 * @param {string} commitSha 
 * @returns {Promise<string[]>} array of file paths
 */
export async function fetchFilesChangedInCommit(owner, repo, commitSha) {

  const token = await getGithubTokenFromRequest();
  
  console.log("============== Token get from headers: ", token)
  
  if (!token) {
    throw new Error({ error: 'Not authenticated' }, { status: 401 });
  }
  
  const octokit = createUserOctokit(token); 

  const { data } = await octokit.repos.getCommit({
    owner,
    repo,
    ref: commitSha
  });

  const changedFiles = data.files.map(file => file.filename);
  return changedFiles;
}


/**
 * Get diffs (patches) for all files changed in a commit
 * @param {string} owner 
 * @param {string} repo 
 * @param {string} commitSha 
 * @returns {Promise<Array<{ path: string, patch: string }>>}
 */
export async function fetchFileDiffsInCommit(owner, repo, commitSha) {
  const { data } = await octokit.repos.getCommit({
    owner,
    repo,
    ref: commitSha
  });

  const diffs = data.files
    .filter(file => file.patch) // skip removed files with no patch
    .map(file => ({
      path: file.filename,
      patch: file.patch
    }));

  return diffs;
}
