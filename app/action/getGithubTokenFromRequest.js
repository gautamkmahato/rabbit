// app/actions/getGithubTokenFromRequest.js

'use server';

import { cookies } from 'next/headers';

export async function getGithubTokenFromRequest() {
  const cookieStore = await cookies(); // ✅ await it
  const githubToken = cookieStore.get('github_token');

  console.log("===================================");
  console.log(githubToken);

  return githubToken ? githubToken.value : null;
}
