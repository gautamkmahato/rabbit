// githubService.ts

import {
  getPullRequestByNumber,
  getCommitsForPR,
  getChangedFilesForPR,
  getCommentsForPR,
  getLinkedIssues,
  getCommitDetails, // New function to fetch commit details
} from "./githubService";

/**
 * Get detailed data for a single PR by number
 */
export default async function getDetailedPullRequest(owner, repo, prNumber) {
  const pr = await getPullRequestByNumber(owner, repo, prNumber);

  const [commits, files, comments, linkedIssues] = await Promise.all([
    getCommitsForPR(owner, repo, pr.number),
    getChangedFilesForPR(owner, repo, pr.number),
    getCommentsForPR(owner, repo, pr.number),
    getLinkedIssues(pr.body || ""),
  ]);

  // === AI Review Status Logic ===
  const isMerged = pr.merged_at !== null;
  const labels = pr.labels?.map((label) => label.name.toLowerCase()) || [];

  const reviewApprovedByLabel = labels.some((label) =>
    ["reviewed", "approved", "lgtm"].includes(label)
  );

  const reviewApprovedByComments = comments.some((c) =>
    /lgtm|looks good|approved/i.test(c.body)
  );

  let aiReviewStatus;
  if (isMerged || reviewApprovedByLabel || reviewApprovedByComments) {
    aiReviewStatus = "approved";
  }

  // === Build a map of files to their commit metadata ===
  const fileMetadataMap = {};

  for (const commit of commits) {
    const commitDetails = await getCommitDetails(owner, repo, commit.sha);
    const { sha, commit: commitData, author, files: commitFiles } = commitDetails;

    if (!commitFiles) continue;

    for (const file of commitFiles) {
      const key = file.filename;
      if (!fileMetadataMap[key]) {
        fileMetadataMap[key] = {
          commit_id: sha,
          comments_url: commitDetails.comments_url || "",
          author_of_the_commit: commitData?.author?.name || author?.login || "",
          message: commitData?.message || "",
        };
      }
    }
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
    mentions: (pr.body?.match(/@\w+/g) || []).map((m) => m.replace("@", "")),
    linked_issues: linkedIssues,
    comments: comments.map((c) => ({
      user: c.user?.login,
      avatar_url: c.user?.avatar_url,
      created_at: c.created_at,
      path: c.path,
      position: c.position,
      body: c.body,
    })),
    changedFiles: files.map((file) => {
      const meta = fileMetadataMap[file.filename] || {};
      return {
        filename: file.filename,
        status: file.status,
        additions: file.additions,
        deletions: file.deletions,
        changes: file.changes,
        patch: file.patch,
        comments_url: meta.comments_url || "",
        author_of_the_commit: meta.author_of_the_commit || "",
        message: meta.message || "",
        commit_id: meta.commit_id || "",
      };
    }),
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
