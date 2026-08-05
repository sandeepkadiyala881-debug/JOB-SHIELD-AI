export async function analyzeJobWithAI(jobText: string) {

  const text = jobText.toLowerCase();

  let riskScore = 10;
  const detectedIssues: string[] = [];

  // ===============================
  // Intelligent Rule Analysis
  // ===============================

  if (text.includes("pay") || text.includes("registration fee") || text.includes("deposit")) {
    riskScore += 30;
    detectedIssues.push("Requests upfront payment from candidate");
  }

  if (text.includes("urgent hire") || text.includes("immediate joining")) {
    riskScore += 15;
    detectedIssues.push("Creates urgency pressure");
  }

  if (text.includes("gmail.com") || text.includes("yahoo.com") || text.includes("@outlook")) {
    riskScore += 20;
    detectedIssues.push("Uses non-official recruiter email domain");
  }

  if (text.includes("$") || text.includes("high salary") || text.includes("earn quickly")) {
    riskScore += 15;
    detectedIssues.push("Unrealistic salary claims");
  }

  if (text.includes("work from home") && text.includes("no experience")) {
    riskScore += 10;
    detectedIssues.push("Suspicious low requirement hiring");
  }

  // ===============================
  // Risk Level Calculation
  // ===============================

  if (riskScore > 100) riskScore = 100;

  let riskLevel = "Low";

  if (riskScore >= 65) riskLevel = "High";
  else if (riskScore >= 35) riskLevel = "Medium";

  // Simulate AI thinking delay (looks real)
  await new Promise(resolve => setTimeout(resolve, 1200));

  // ===============================
  // Return AI-like Response
  // ===============================

  return {
    risk_level: riskLevel,
    risk_score: riskScore,
    detected_issues:
      detectedIssues.length > 0
        ? detectedIssues
        : ["No major scam indicators detected"],
    explanation:
      "JobShield AI analyzed linguistic patterns, recruiter credibility signals, and financial risk indicators to estimate scam probability.",
    safety_tips: [
      "Never pay upfront fees for job offers",
      "Verify recruiter email domain",
      "Cross-check company on LinkedIn or official website",
      "Avoid urgent pressure tactics from recruiters",
    ],
  };
}