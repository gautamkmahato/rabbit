// app/api/github/repos/route.ts

import { getGithubTokenFromRequest } from '@/app/action/getGithubTokenFromRequest';
import { createUserOctokit } from '@/lib/octokitClient';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request) {
  const token = await getGithubTokenFromRequest(request);

  console.log("============== Token get from headers: ", token)

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const octokit = createUserOctokit(token); 
  const repos = await octokit.paginate(octokit.repos.listForAuthenticatedUser, {
    per_page: 100, // max allowed
  });

  return NextResponse.json(repos, { status: 200 });
}
