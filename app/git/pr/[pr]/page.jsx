import { getPullRequestData } from "@/lib/github"
import PrDetailPage from "../../_components/PrDetails"


export default async function PullRequestPage({ params }) {
  const { owner, repo, pullNumber } = params

  // In a real app, you would fetch this data from GitHub API
  // For demo purposes, we'll use mock data
  const prData = await getPullRequestData(owner, repo, pullNumber)

  return(
    <>
      <div className="px-12">
        <PrDetailPage prData={prData} />
      </div>
    </>
  )
}
