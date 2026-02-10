const express = require("express");
const dotenv = require("dotenv");
const { fibonacci, primesOnly, lcmArray, hcfArray } = require("./utils/math");
const { askAI } = require("./utils/ai");

dotenv.config();
const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL
  });
});

app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return res.status(400).json({ is_success: false });
    }

    const key = keys[0];
    let data;

    if (key === "fibonacci") {
      if (!Number.isInteger(body[key]) || body[key] < 0) {
        return res.status(400).json({ is_success: false });
      }
      data = fibonacci(body[key]);
    }

    else if (key === "prime") {
      if (!Array.isArray(body[key])) {
        return res.status(400).json({ is_success: false });
      }
      data = primesOnly(body[key]);
    }

    else if (key === "lcm") {
      if (!Array.isArray(body[key])) {
        return res.status(400).json({ is_success: false });
      }
      data = lcmArray(body[key]);
    }

    else if (key === "hcf") {
      if (!Array.isArray(body[key])) {
        return res.status(400).json({ is_success: false });
      }
      data = hcfArray(body[key]);
    }

    else if (key === "AI") {
      if (typeof body[key] !== "string") {
        return res.status(400).json({ is_success: false });
      }
      data = await askAI(body[key]);
    }

    else {
      return res.status(400).json({ is_success: false });
    }

    res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL,
      data
    });

  } catch {
    res.status(500).json({ is_success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
