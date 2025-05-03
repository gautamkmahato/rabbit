// githubService.ts

import { getPullRequestByNumber, getCommitsForPR, getChangedFilesForPR, getCommentsForPR, getLinkedIssues, } from "./githubService";


/**
 * Get detailed data for a single PR by number
 */
export default async function getDetailedPullRequest(owner, repo, prNumber) {
  const pr = await getPullRequestByNumber(owner, repo, prNumber);

  const [commits, files, comments, linkedIssues] = await Promise.all([
    getCommitsForPR(owner, repo, pr.number),
    getChangedFilesForPR(owner, repo, pr.number),
    getCommentsForPR(owner, repo, pr.number),
    getLinkedIssues(pr.body || ''),
  ]);

  // === AI Review Status Logic ===
  const isMerged = pr.merged_at !== null;
  const labels = pr.labels?.map((label) => label.name.toLowerCase()) || [];

  const reviewApprovedByLabel = labels.some(label =>
    ['reviewed', 'approved', 'lgtm'].includes(label)
  );

  const reviewApprovedByComments = comments.some(c =>
    /lgtm|looks good|approved/i.test(c.body)
  );

  let aiReviewStatus;
  if (isMerged || reviewApprovedByLabel || reviewApprovedByComments) {
    aiReviewStatus = 'approved';
  }

  return {
    pr_number: pr.number,
    title: pr.title,
    state: pr.state,
    developer: pr.user?.login,
    developer_image_url: pr.user?.avatar_url,
    repo_owner: owner,
    aiReviewStatus,

    updated_at: pr.updated_at,
    merged_to_branch: pr.base.ref,
    raised_from_branch: pr.head.ref,
    description: pr.body,
    commits,
    number_of_commits: commits.length,
    number_of_additions: pr.additions,
    number_of_deletions: pr.deletions,
    labels,
    mentions: (pr.body?.match(/@\w+/g) || []).map((m) => m.replace('@', '')),
    linked_issues: linkedIssues,
    comments: comments.map((c) => ({
      user: c.user?.login,
      avatar_url: c.user?.avatar_url,
      created_at: c.created_at,
      path: c.path,
      position: c.position,
      body: c.body,
    })),
    changedFiles: files.map((file) => ({
      filename: file.filename,
      status: file.status,
      additions: file.additions,
      deletions: file.deletions,
      changes: file.changes,
      patch: file.patch,
    })),
    assignees: pr.assignees?.map((a) => ({
      login: a.login,
      avatar_url: a.avatar_url,
    })),
    diff_url: pr.diff_url,
    html_url: pr.html_url,
    review_comments: pr.review_comments,
    review_comment_url: pr.review_comment_url,
    mergeable_state: pr.mergeable_state,
  };
}

