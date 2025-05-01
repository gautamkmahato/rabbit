
import RepoContent from '../_components/RepoContent'

export default async function page({ params }) {
    const param = await params;
    const repo = param.repo; 
    console.log(repo);

    
    return (
        <>
            <RepoContent repo={repo} />
        </>
    )
}
