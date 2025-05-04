'use client'

import generateSummary from '@/utils/gemini/generateSummary';
import generateReview from '@/utils/gemini/llm';
import { useEffect, useState } from 'react'
import MarkdownViewer from './aiReview/MarkdownViewer';
import Tabs from '@/app/components/Tabs';


export default function Ai({ files }) {


  const [loading, setLoading] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(''); // ✅ new error state
  const [reviewSummary, setReviewSummary] = useState(''); // ✅ new error state



  useEffect(() => {
    const getReviews = async () => {
      if (files.length === 0) return;
  
      const allReviews = [];
  
      try {
        setLoadingReviews(true);
  
        for (const file of files) {
          const patch = file?.patch;
  
          if (!patch) {
            allReviews.push({
              filename: file.filename,
              aiReview: '⚠️ No patch found. Skipped review.',
            });
            continue;
          }
  
          try {
            const result = await generateReview(patch);
            allReviews.push({
              filename: file.filename,
              changes: file.changes,
              additions: file.additions,
              deletions: file.deletions,
              status: file.status,
              aiReview: result || '⚠️ Empty review returned.',
            });
          } catch (error) {
            allReviews.push({
              filename: file.filename,
              aiReview: '❌ Error generating review.',
            });
          }
        }
  
        // Just update the state; summary generation is handled in another useEffect
        setReviews(allReviews);
      } catch (e) {
        console.error("Unexpected error during review generation:", e);
      } finally {
        setLoadingReviews(false);
      }
    };
  
    getReviews();
  }, [files]);

  
  // Only run this when reviews are fully updated
  useEffect(() => {
    const getAllReviews = async () => {
      try {
        setLoading(true);
        if (!reviews || reviews.length === 0) return;

        const fullReview = reviews.map((review, i) => ({
          title: `Review ${i + 1}`,
          content: review.aiReview,
        }));

        const jsonString = JSON.stringify(fullReview);
        const result = await generateSummary(jsonString);
        console.log("****************** Get All reviews ********************");
        setReviewSummary(result);
      } catch (error) {
        console.error("❌ Error generating summary from reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (reviews.length > 0) getAllReviews();
  }, [reviews]);

    

  if(loadingReviews){
    return(
      <>
        <div className='flex justify-center items-center text-center'>
          <h1>Loading Reviews...</h1>
        </div>
      </>
    )
  }

  if(loading){
    return(
      <>
        <div className='flex justify-center items-center text-center'>
          <h1>Generating Summary...</h1>
        </div>
      </>
    )
  }

  return (
    <>
      {/* <MarkdownViewer markdownText={reviewSummary}/> */}
      <div className="">
        <Tabs files={files} reviews={reviews} finalReview={reviewSummary} />
      </div>

    </>
  )

}

