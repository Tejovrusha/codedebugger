const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(express.json());
app.use(express.static("public"));

const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

app.post("/debug", (req, res)=>{
    const { code, language } = req.body;
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `You are a code debugging assistant specializing in ${language}.`
                },
                {
                    role: 'user',
                    content: `Please debug the following ${language} code:\n\n${code}`
                }
            ]
        });
        const result = response.choices[0].message.content;
        res.json({ result });
    } catch (err) {
        console.error(err);
        res.statusCode(500).json({
            error: "Something went wrong"
        })
    }
})

app.listen(8000, () => console.log("server starting on port 8000"));
