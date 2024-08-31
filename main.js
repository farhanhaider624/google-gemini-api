const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(express.json());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Write a story about a magic backpack.";

const generateResult = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  // console.log("hello");
  res.send("hello");
});
// generateResult();
app.get("/api/content", async (req, res) => {
  try {
    const prompt = req.body.question;
    const result = await generateResult(prompt);
    res.json({
        "result":result
    });
  } catch (error) {
    console.log(error);
  }
});

PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
