const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
app.post("/generate", async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
            return res.status(400).json({ error: "Prompt is required" });
        }
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        res.json({ response: text });
    } catch (error) {
        console.error("Generation error:", error);
        res.status(500).json({ error: error.message });
    }
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});