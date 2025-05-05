import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: ""
});


export default async function generateReview(input) {

    const model = 'gemini-2.0-flash-lite';

    const contents = [
        {
            role: 'model',
            parts: [
                {
                    text: `
                    You are an expert AI assistant that gives concise and accurate answers. 
                    Based on the diff and actual code, summarize what are the changes has been done, 
                    provide the summary and then provide the review in a tabular form, 
                    also provide the suggested/better/scaleable code. 
                    **Note**: Provide all the data in json format.
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






