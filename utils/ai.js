const axios = require("axios");

async function askAI(question) {
  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: question }] }]
    }
  );

  const text = res.data.candidates[0].content.parts[0].text;
  return text.split(" ")[0].replace(/[^a-zA-Z]/g, "");
}

module.exports = { askAI };
