'use client'

import { useEffect, useState } from "react";
import { fetchFileContent } from "@/utils/fetchFileContent";
import { fetchAllFilePaths } from "@/utils/fetchRepoTree";
import { getGitHubUserInfo } from "@/app/action/getGitHubUserInfo";
import ExpandableContentBox from "./ExpandableContentBox"; 
    

export default function RepoContent({ repo }) {

    const [loading, setLoading] = useState(false);
    const [repoFiles, setRepoFiles] = useState([])

    // const owner = "gautamkmahato";  
    // const repo = "rag-projects";    

    useEffect(() =>{
        async function fetchRepoContents(owner, repo) {

            // const paths = await fetchAllFilePaths(owner, repo);
            const files = [];
    
            // Validate inputs
            if (!owner || !repo || typeof owner !== 'string' || typeof repo !== 'string') {
                throw new Error("Invalid 'owner' or 'repo' provided to fetchRepoContents");
            }
    
            let paths = [];
    
            try {
                paths = await fetchAllFilePaths(owner, repo);

                console.log(paths)
    
                if (!Array.isArray(paths) || paths.length === 0) {
                    console.warn(`No file paths found in ${owner}/${repo}`);
                    return [];
                }
            } catch (error) {
                console.error(`Failed to fetch file paths for ${owner}/${repo}:`, error.message || error);
                throw new Error("Could not fetch file paths. Please check if the repository is accessible.");
            }
    
            for (const path of paths) {
                try {
                    const content = await fetchFileContent(owner, repo, path);
                    files.push(content);
                } catch (e) {
                    console.error(`Error reading ${path}:`, e.message);
                }
            }
    
            return files;
        }
    
        const getAllRepoContents = async () => {
            try {
              setLoading(true);
          
              // Step 1: Get GitHub user info
              const userInfo = await getGitHubUserInfo();
              if (!userInfo || !userInfo.username) {
                console.error("GitHub username not found.");
                throw new Error("GitHub user not authenticated or username missing.");
              }
          
              const username = userInfo.username;
          
              // Step 2: Validate repo value
              if (!repo || typeof repo !== "string") {
                console.error("Repository name is invalid.");
                throw new Error("Repository name is missing or invalid.");
              }
          
              // Step 3: Fetch repo contents
              const files = await fetchRepoContents(username, repo);
          
              if (!Array.isArray(files)) {
                console.error("Expected files array but got:", files);
                throw new Error("Unexpected response structure from fetchRepoContents.");
              }
          
              console.log("Fetched files:", files);
          
              // Optionally, update UI or state here
              setRepoFiles(files);
              
          
            } catch (error) {
              console.error("Error fetching repo contents:", error.message || error);
          
              // Optional: Set an error message in state for the UI
              // setError("Failed to fetch repository contents. Please try again.");
            } finally {
              setLoading(false);
            }
        };
        getAllRepoContents();
    }, [repo]);
      

    if(loading){
        return(
            <>
                <h1>loading...</h1>
            </>
        )
    }


    return (
        <>
            <h1>Github content</h1>
            {/* <button onClick={getAllRepoContents}>Click</button> */}
            {repoFiles && repoFiles.map((files, index) =>(
                <div key={index}>
                    <ExpandableContentBox files={files} />
                </div>
            ))}
        </>
    )
}


