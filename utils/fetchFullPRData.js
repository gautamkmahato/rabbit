// github/fetchFullPRData.js
import { createUserOctokit } from "@/lib/octokitClient.js";
import { octokit } from "./octokitClient.js";
import { getGithubTokenFromRequest } from "@/app/action/getGithubTokenFromRequest.js";

export async function fetchFullPRData(owner, repo, pull_number) {

  const token = await getGithubTokenFromRequest();
  
  console.log("============== Token get from headers: ", token)
  
  if (!token) {
    throw new Error({ error: 'Not authenticated' }, { status: 401 });
  }
  
  const octokit = createUserOctokit(token); 

  const [pr, reviewComments, commitList, files] = await Promise.all([
    octokit.pulls.get({ owner, repo, pull_number }),
    octokit.pulls.listReviewComments({ owner, repo, pull_number }),
    octokit.pulls.listCommits({ owner, repo, pull_number }),
    octokit.pulls.listFiles({ owner, repo, pull_number })
  ]);

  // Fetch commit diffs
  const commitDiffs = [];
  for (const commit of commitList.data) {
    const sha = commit.sha;
    const commitData = await octokit.repos.getCommit({
      owner,
      repo,
      ref: sha
    });

    const diffs = commitData.data.files
      .filter(f => f.patch)
      .map(f => ({ sha, path: f.filename, patch: f.patch }));

    commitDiffs.push(...diffs);
  }

  return {
    pr: pr.data,
    reviewComments: reviewComments.data,
    commits: commitList.data,
    filesChanged: files.data,
    commitDiffs
  };
}
