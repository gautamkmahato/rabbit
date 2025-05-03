import { getGithubTokenFromRequest } from "@/app/action/getGithubTokenFromRequest";
import { createUserOctokit } from "@/lib/octokitClient";



/**
 * Get all pull requests from a GitHub repository
 * @param owner The repository owner (e.g. "vercel")
 * @param repo The repository name (e.g. "next.js")
 */
export async function fetchAllPullRequests(owner, repo) {
  const pullRequests = []
  let page = 1
  const perPage = 100

  const token = await getGithubTokenFromRequest();
      
    console.log("============== Token get from headers: ", token)
    
    if (!token) {
    throw new Error({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const octokit = createUserOctokit(token);

  while (true) {
    const response = await octokit.pulls.list({
      owner,
      repo,
      state: "all", // open, closed, or all
      per_page: perPage,
      page,
    })

    pullRequests.push(...response.data)

    if (response.data.length < perPage) {
      break // no more PRs
    }

    page++
  }

  return pullRequests
}
