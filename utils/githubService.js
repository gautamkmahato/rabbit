// lib/github.ts

import { getGithubTokenFromRequest } from '@/app/action/getGithubTokenFromRequest';
import { createUserOctokit } from '@/lib/octokitClient';

async function getOctokit() {
  const token = await getGithubTokenFromRequest();

  if (!token) {
    throw new Error('Not authenticated');
  }

  return createUserOctokit(token);
}

export async function getPullRequests(owner, repo) {
  const octokit = await getOctokit();

  const { data: pullRequests } = await octokit.pulls.list({
    owner,
    repo,
    per_page: 100,
    state: 'all',
  });

  return pullRequests;
}

export async function getCommitsForPR(owner, repo, pull_number) {
  const octokit = await getOctokit();

  const { data: commits } = await octokit.pulls.listCommits({
    owner,
    repo,
    pull_number,
  });

  return commits;
}

export async function getChangedFilesForPR(owner, repo, pull_number) {
  const octokit = await getOctokit();

  const { data: files } = await octokit.pulls.listFiles({
    owner,
    repo,
    pull_number,
  });

  return files;
}

export async function getCommentsForPR(owner, repo, pull_number) {
  const octokit = await getOctokit();

  const { data: comments } = await octokit.pulls.listReviewComments({
    owner,
    repo,
    pull_number,
  });

  return comments;
}

export function getLinkedIssues(prBody){
  const issueUrls = [
    ...prBody.matchAll(/https:\/\/github\.com\/[^\/]+\/[^\/]+\/issues\/\d+/g),
  ].map((match) => match[0]);

  return issueUrls;
}

export async function getPullRequestByNumber(owner, repo, pull_number) {
  const octokit = await getOctokit();

  const { data: pr } = await octokit.pulls.get({
    owner,
    repo,
    pull_number,
  });

  return pr;
}
