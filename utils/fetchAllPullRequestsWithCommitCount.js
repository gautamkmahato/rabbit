import { getGithubTokenFromRequest } from "@/app/action/getGithubTokenFromRequest";
import { createUserOctokit } from "@/lib/octokitClient";


/**
 * Get all pull requests with commit count
 * @param owner Repository owner
 * @param repo Repository name
 */
export async function fetchAllPullRequestsWithCommitCount(owner, repo) {
  const pullRequestsWithCommitCount = []
  let page = 1
  const perPage = 50 // reduce for better rate limit handling

  const token = await getGithubTokenFromRequest();
        
      console.log("============== Token get from headers: ", token)
      
      if (!token) {
      throw new Error({ error: 'Not authenticated' }, { status: 401 });
      }
      
      const octokit = createUserOctokit(token);

  while (true) {
    const { data: pullRequests } = await octokit.pulls.list({
      owner,
      repo,
      state: "all",
      per_page: perPage,
      page,
    })

    // For each PR, fetch its commit count
    for (const pr of pullRequests) {
      const { data: commits } = await octokit.request(pr.commits_url, {
        headers: {
          accept: "application/vnd.github+json",
        },
      })

      pullRequestsWithCommitCount.push({
        number: pr.number,
        title: pr.title,
        state: pr.state,
        commitCount: commits.length,
        user: pr.user?.login,
        branch: pr.head.ref,
        updatedAt: pr.updated_at,
      })
      
    }

    if (pullRequests.length < perPage) break
    page++
  }

  return pullRequestsWithCommitCount
}
