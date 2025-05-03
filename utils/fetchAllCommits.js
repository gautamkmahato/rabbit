import { getGithubTokenFromRequest } from "@/app/action/getGithubTokenFromRequest"
import { createUserOctokit } from "@/lib/octokitClient"


/**
 * Get all commits from a GitHub repository
 * @param owner The repo owner (e.g. "vercel")
 * @param repo The repository name (e.g. "next.js")
 */
export async function fetchAllCommits(owner, repo) {
  const commits = []
  let page = 1
  const perPage = 100

  const token = await getGithubTokenFromRequest();
    
    console.log("============== Token get from headers: ", token)
    
    if (!token) {
      throw new Error({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const octokit = createUserOctokit(token);

  while (true) {
    const response = await octokit.repos.listCommits({
      owner,
      repo,
      per_page: perPage,
      page,
    })

    commits.push(...response.data)

    if (response.data.length < perPage) {
      break // No more commits
    }

    page++
  }

  return commits
}
