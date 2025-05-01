import { Octokit } from "@octokit/rest";

export function createUserOctokit(token) {
  if (!token || typeof token !== "string") {
    throw new Error("Invalid GitHub token provided to Octokit");
  }

  return new Octokit({ auth: token });
}
 