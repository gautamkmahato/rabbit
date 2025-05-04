import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: "AIzaSyAixwGhiW4U6hJ1Wi-Zs0G2lBXiPzGrqn4"
});


export default async function generateSummary(input) {

    const model = 'gemini-2.0-flash-lite';

    const contents = [
        {
            role: 'model',
            parts: [
                {
                    text: `
                        You are an expert AI assistant skilled in code analysis and summarization.

                        You will be given a set of code review summaries, each corresponding to a commit within a pull request (PR). 
                        
                        Your tasks are:

                        ### 1. **High-Level Summary**: Provide a concise, high-level summary of all the changes made across the commits in the PR.
                        ### 2. **Purpose & Impact**: Briefly state the overall purpose and the impact of the PR.
                        ### 3. **Issues or Concerns**: Mention any recurring concerns, issues, or potential risks found in the code reviews.
                        ### 4. **Suggested Improvements**: Suggest any improvements that can be made across the reviewed commits.
                        ### 5. **Final Review Table**: Create a Markdown table with the following columns:

                           | Affected File(s) | Type of Change | Impact | Comments or Suggestions | Security Risk or Issues |
                           |------------------|----------------|--------|--------------------------|--------------------------|


                        **Format your response entirely in GitHub-Flavored Markdown.**  
                        Use clear headers (##), bold where necessary, and bullet points or tables for clarity.

                        Ensure your Markdown renders well in web interfaces using "react-markdown + remark-gfm".

                    `,
                },
            ],
        },
        {
            role: 'user',
            parts: [
                {
                    text: input,
                },
            ],
        },
    ];

    const response = await ai.models.generateContent({
        model,
        contents,
    });

    const answer = response.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(answer);

    return answer;
}






