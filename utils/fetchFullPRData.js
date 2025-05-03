// github/fetchFullPRData.js
import { createUserOctokit } from "@/lib/octokitClient.js";
import { getGithubTokenFromRequest } from "@/app/action/getGithubTokenFromRequest.js";

export async function fetchFullPRData(owner, repo, pull_number) {
  const token = await getGithubTokenFromRequest();

  if (!token) {
    throw new Error("Not authenticated. Please log in with GitHub.");
  }

  const octokit = createUserOctokit(token);

  try {
    // Check if the PR exists first
    const prResponse = await octokit.pulls.get({ owner, repo, pull_number });

    if (!prResponse?.data) {
      throw new Error(`No pull request found with number #${pull_number}`);
    }

    const [reviewComments, commitList, files] = await Promise.all([
      octokit.pulls.listReviewComments({ owner, repo, pull_number }),
      octokit.pulls.listCommits({ owner, repo, pull_number }),
      octokit.pulls.listFiles({ owner, repo, pull_number }),
    ]);

    // Handle empty commits
    if (!commitList.data?.length) {
      return {
        pr: prResponse.data,
        reviewComments: reviewComments.data,
        commits: [],
        filesChanged: files.data || [],
        commitDiffs: [],
      };
    }

    // Fetch commit diffs (with patch)
    const commitDiffs = [];

    for (const commit of commitList.data) {
      const sha = commit.sha;

      const commitData = await octokit.repos.getCommit({
        owner,
        repo,
        ref: sha,
      });

      const diffs = commitData.data.files
        .filter(f => f.patch)
        .map(f => ({ sha, path: f.filename, patch: f.patch }));

      commitDiffs.push(...diffs);
    }

    return {
      pr: prResponse.data,
      reviewComments: reviewComments.data,
      commits: commitList.data,
      filesChanged: files.data,
      commitDiffs,
    };
  } catch (error) {
    // Friendly errors
    if (error.status === 404) {
      throw new Error(`Pull request #${pull_number} not found in ${owner}/${repo}.`);
    } else if (error.status === 403) {
      throw new Error("GitHub rate limit exceeded. Try again later.");
    } else {
      console.error("GitHub API error:", error);
      throw new Error("An error occurred while fetching PR data.");
    }
  }
}
