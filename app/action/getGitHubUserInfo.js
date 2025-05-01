'use server';

import { createUserOctokit } from "@/lib/octokitClient";
import { getGithubTokenFromRequest } from "./getGithubTokenFromRequest";

export async function getGitHubUserInfo() {
    const token = await getGithubTokenFromRequest();

    if (!token) {
        return { error: 'Not authenticated' }, { status: 401 };
    }
    
    const octokit = createUserOctokit(token); 

    const { data: user } = await octokit.users.getAuthenticated();
    return {
        username: user.login,
        name: user.name,
        avatar: user.avatar_url,
        email: user.email,
    };
}
