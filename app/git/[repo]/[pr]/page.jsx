'use client';

import React, { useEffect, useState } from "react";
import getDetailedPullRequest from "@/utils/getDetailedPullRequest";
import PrDetailPage from "../../_components/PrDetails";


export default function PullRequestPage({ params }) {

  const param = React.use(params)
  const prNumber = param.pr
  const repo = param.repo

  const [prData, setPrData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
          async function getPrData() {
              try {
                  setLoading(true);
                  const result = await getDetailedPullRequest("gautamkmahato", repo, prNumber);
                  console.log(result)
                  setPrData(result); 
              } catch (err) {
                  console.error("Error fetching PR data:", err);
              } finally {
                  setLoading(false);
              }
          }
      
          getPrData();
  }, []);

  if(loading){
    return(
      <>
        <h1>Loading...</h1>
      </>
    )
  }

  return (
    <div className="px-12">
      <PrDetailPage prData={prData} repo={repo} />
    </div>
  );
}
