// =======================================
// Load environment variables FIRST
// =======================================
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";
import analyzeRouter from "./routes/analyze";

/**
 * JobShield AI Server
 * Unified Backend + Frontend (Hackathon Stable)
 */

async function startServer() {
  const app = express();

  // ✅ FIXED TYPE ERROR HERE
  const PORT: number = Number(process.env.PORT) || 3000;

  // =======================================
  // Middleware
  // =======================================
  app.use(cors());
  app.use(express.json());

  // Debug check (optional — remove later)
  console.log(
    "API KEY LOADED:",
    process.env.GROQ_API_KEY ? "YES" : "NO"
  );

  // =======================================
  // API Routes
  // =======================================
  app.use("/api", analyzeRouter);

  // Health check
  app.get("/api/health", (_, res) => {
    res.json({
      status: "ok",
      service: "JobShield AI Backend",
    });
  });

  // =======================================
  // Development Mode (Vite Middleware)
  // =======================================
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    app.use(vite.middlewares);
  }
  // =======================================
  // Production Mode
  // =======================================
  else {
    const distPath = path.resolve(process.cwd(), "dist");

    app.use(express.static(distPath));

    app.get("*", (_, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // =======================================
  // Start Server
  // =======================================
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📡 API Endpoint: http://localhost:${PORT}/api/analyze`);
  });
}

// =======================================
// Boot Server
// =======================================
startServer().catch((err) => {
  console.error("❌ Server failed to start:");
  console.error(err);
});