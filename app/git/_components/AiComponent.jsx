'use client';

import generateSummary from '@/utils/gemini/generateSummary';
import generateReview from '@/utils/gemini/llm';
import { useEffect, useState, useCallback } from 'react';
import Tabs from '@/app/components/Tabs';
import React from 'react';

function AiComponent({ files }) {
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewSummary, setReviewSummary] = useState('');

  const getAllReviews = useCallback(async (reviews) => {
    try {
      if (!reviews || reviews.length === 0) {
        console.warn('No reviews found for summary generation.');
        return;
      }

      const fullReview = reviews.map((review, i) => ({
        id: i,
        title: `Review ${i + 1}`,
        content: review.aiReview,
      }));

      const jsonString = JSON.stringify(fullReview);
      const result = await generateSummary(jsonString);
      setReviewSummary(result);
    } catch (error) {
      console.error('❌ Error generating summary from reviews:', error);
      alert('An error occurred while generating the review summary.');
    }
  }, []);

  const getReviews = useCallback(async () => {
    if (!files || files.length === 0) {
      alert('Please load commit diffs first.');
      return;
    }

    setLoadingReviews(true);
    const allReviews = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const patch = file?.patch;

        if (!patch) {
          console.warn(`⚠️ No patch found for file "${file.filename}", skipping...`);
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
          console.error(`❌ Error generating review for file "${file.filename}":`, error);
          allReviews.push({
            filename: file.filename,
            aiReview: '❌ Error generating review.',
          });
        }
      }

      setReviews(allReviews);
      await getAllReviews(allReviews);
    } catch (e) {
      console.error('Unexpected error during review generation:', e);
      alert('An error occurred while generating reviews.');
    } finally {
      setLoadingReviews(false);
    }
  }, [files, getAllReviews]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  return (
    <>
      <h1>AI Review</h1>
      <div>
        <Tabs files={files} reviews={reviews} finalReview={reviewSummary} />
      </div>
    </>
  );
}

const Ai = React.memo(AiComponent, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.files) === JSON.stringify(nextProps.files);
});

export default Ai;
