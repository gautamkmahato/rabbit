'use client'

import { Octokit } from "@octokit/core";
import { useState } from "react";



export default function Projects() {

    const octokit = new Octokit({
        auth: process.env.GITHUB_ACCESS_TOKEN
    })

    const [loading, setLoading] = useState(false)

    const getRepo = async() =>{ 
        
        const result = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: 'gautamkmahato',
            repo: 'rag-projects',
            path: 'rag/rag.py',
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log(result)
        const decodedContent = Buffer.from(result.data.content, 'base64').toString('utf-8');
        console.log(decodedContent);
    }

    async function getAllFiles(owner, repo, path = "") {
        const filePaths = [];
      
        const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
          owner,
          repo,
          path,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28"
          }
        });
      
        for (const item of res.data) {
          if (item.type === "file") {
            filePaths.push(item.path);
          } else if (item.type === "dir") {
            const nestedPaths = await getAllFiles(owner, repo, item.path);
            filePaths.push(...nestedPaths);
          }
        }
      
        return filePaths;
    }
      
    async function getFileContent(owner, repo, path) {
        const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
          owner,
          repo,
          path,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28"
          }
        });
      
        const decodedContent = Buffer.from(res.data.content, 'base64').toString('utf-8');
        return { path, content: decodedContent };
    }
      
    const getAllContents = async () =>{
        // Run the script
        const owner = "gautamkmahato";  // Replace with your GitHub username or org
        const repo = "rag-projects";    // Replace with your repository name
      
        try{
            setLoading(true);

            const filePaths = await getAllFiles(owner, repo);
            const contents = [];
        
            for (const path of filePaths) {
            const file = await getFileContent(owner, repo, path);
            contents.push(file);
            }
        
            console.log(contents); // All file paths and their decoded content
        } catch(err){
            console.log(err);
        } finally{
            setLoading(false)
        }
    }



    if(loading){
        return(
            <>
                <h1>loading...</h1>
            </>
        )
    }

    return (
        <>
            <div>Projects</div>
            <button onClick={getAllContents}>click</button>
        </>
    )
}
