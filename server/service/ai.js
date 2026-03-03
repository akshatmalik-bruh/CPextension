const grok = require("groq-sdk");
const grokClient = new grok({
    apiKey: process.env.GROK_API_KEY,
});
const zod = require("zod");
const analyseSchema = zod.object({
    timeComplexity: zod.string(),
    spaceComplexity: zod.string(),
    optimalCode: zod.string(),
    explanation: zod.string(),
    isCorrect : zod.boolean()
});
const grokSchema = {
    type : "object",
    properties : {
        timeComplexity : {type : "string"},
        spaceComplexity : {type : "string"},
        optimalCode : {type : "string"},
        explanation : {type : "string"},
        isCorrect : {type : "boolean"},
    },
    required : ["timeComplexity","spaceComplexity","optimalCode","explanation","isCorrect"],
    additionalProperties : false
}
const analyse = async (questions, code) => {
    try {
        const response = await grokClient.chat.completions.create({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
                {
                    role: "system",
                    content: `You are a Codeforces problem analyzer. Analyze the given problem and follow these instructions strictly:
                     - return only json object
                     - strictly follow the keynames
                     - if the code is correct return true in the key isCorrect else return false
                     - if the code is already optimal, return an empty string "" in the key optimalCode
                     - if the code is NOT optimal, return the full optimal code in the key optimalCode (in the same language as the input code)
                   
                    `,
                },
                {
                    role: "user",
                    content: `Problem Title: ${questions.title || questions}\nProblem Description: ${questions.description || ""}\n\nCode:\n${code.solution || code}`,
                },
            ],
            response_format : {type : "json_schema",json_schema : {
                name : "analyseSchema",
                schema : grokSchema,
                strict : true
            }},
        });
        const parsed = JSON.parse(response.choices[0].message.content || "{}");
         const validate = analyseSchema.parse(parsed);
         return validate;
    } catch (error) {
        console.error("Error analyzing problem:", error);
        throw error;
    }
};

module.exports = { analyse };