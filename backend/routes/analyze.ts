import express from "express";
import { analyzeJobWithAI } from "../services/aiService";

const router = express.Router();

/**
 * POST /api/analyze
 * Receives job data and returns AI-powered scam analysis.
 */
router.post("/analyze", async (req, res) => {
  const { jobText, companyName, jobUrl } = req.body;

  // Basic validation
  if (!jobText) {
    return res.status(400).json({ error: "Job description is required." });
  }

  try {
    // Call the AI service to perform analysis
    const result = await analyzeJobWithAI(jobText, companyName, jobUrl);
    res.json(result);
  } catch (error: any) {
    console.error("Route Error:", error);
    res.status(500).json({ 
      error: error.message || "An error occurred during analysis.",
      risk_level: "Error",
      risk_score: 0,
      detected_issues: ["Service temporarily unavailable"],
      explanation: "We encountered an error while processing your request. Please try again later.",
      safety_tips: ["Check your internet connection", "Try a shorter job description"]
    });
  }
});

export default router;
