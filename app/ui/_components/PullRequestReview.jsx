
// import { ChevronRight } from 'lucide-react';
// import { CodeDiff } from './CodeDiff';
// import { AIReview } from './Ask';

// export function PullRequestReview({ pr }) {
//   return (
//     <div className="border p-4 rounded-xl bg-white shadow-sm">
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-lg font-bold">PR title</h3>
//           <p className="text-sm text-gray-600">#PR 2 opened by Gautam</p>
//         </div>
//         <ChevronRight className="w-5 h-5 text-gray-400" />
//       </div>

//       <div className="mt-4 space-y-6">
//         {pr.diffs.map((diff, index) => (
//           <div key={index} className="grid md:grid-cols-2 gap-6">
//             <CodeDiff filename={diff.filename} patch={diff.patch} />
//             <AIReview reviewText={diff.review} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// // ✅ View commits, PRs, and changed files

// // ✅ LLM-based code review on PR diffs

// // ✅ UI for displaying code + AI feedback