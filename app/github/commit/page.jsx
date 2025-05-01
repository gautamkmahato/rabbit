'use client'

import { fetchFileDiffsInCommit, fetchFilesChangedInCommit } from "@/utils/fetchCommitFiles";
import { fetchFileContent } from "@/utils/fetchFileContent";
import { useState } from "react";

export default function page() {

    const owner = "gautamkmahato";           
    const repo = "rag-projects";             
    const commitSha = "733d839534f089b8863160f9bc6efdfa08e12e40";  // e.g., "a1b2c3..."

    const [loading, setLoading] = useState(false);

    async function fetchChangedFileContents(owner, repo, commitSha) {
        const paths = await fetchFilesChangedInCommit(owner, repo, commitSha);
        const files = [];

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

    const getCommitData = async() =>{
        try{
            setLoading(true);

            const files = await fetchChangedFileContents(owner, repo, commitSha);
            console.log(files);
        } catch(error){
            console.log(error); 
        } finally{
            setLoading(false)
        }
    }

    const getDiffCommitData = async() =>{
        try{
            setLoading(true);

            const diffs = await fetchFileDiffsInCommit(owner, repo, commitSha);
            console.log(diffs);
        } catch(error){
            console.log(error); 
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
            <h1>Commit Data</h1>
            <button onClick={getDiffCommitData}>click</button>
        </>
    )
}
