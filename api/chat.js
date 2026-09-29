// api/chat.js — Vercel Serverless Function for Navi (Portfolio Copilot)
// Supports Groq (Llama 3.3), Gemini 1.5 Flash, or OpenAI if API keys are set in Vercel Environment Variables.
// If no key is set, returns fallback: true so the client-side grounded hybrid cache handles the query.

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  // Grounded context prompt for Naveena Natarajan
  const SYSTEM_PROMPT = `You are "Navi", a professional AI assistant representing Naveena Natarajan.
Your job is to answer recruiter and visitor questions strictly and accurately based on Naveena's verified background below:

PROFILE SUMMARY:
- Role: AI/ML Engineer specializing in Agentic AI, RAG Systems, and MLOps.
- Location: Bangalore, Karnataka, India.
- Email: navirajan2003@gmail.com
- GitHub: https://github.com/naveena0308
- Current Availability: Actively open to AI/ML engineering roles in Bangalore or remote.

EXPERIENCE (1.5+ years at MResult):
- Associate (Data Science), Jan 2026 – Present:
  * Built end-to-end agentic pipeline using ReAct and LlamaIndex for autonomous reasoning and tool use, deployed on AWS EC2 with FastAPI.
  * Document-classification and information-extraction pipelines integrated with Snowflake via FastAPI.
  * Contributed to CI/CD workflows and MLflow experiment tracking, using S3 presigned URLs for secure artifact storage.
- Trainee (Data Science), Jul 2025 – Dec 2025:
  * Built document-processing system with fine-tuned models, reaching ~90% accuracy on an evaluation set after parameter and inference tuning.
  * Built multimodal CV workflows for text, tables, and images, with ~99% extraction accuracy in manual validation.
- Data Science Intern, Feb 2025 – Apr 2025:
  * Built NumPy/Pandas pipeline for ingesting, cleaning, and transforming enterprise datasets.
  * Built multi-agent summarizer with AutoGen and ChromaDB, cutting manual effort by ~40%.
- Data Analytics Research Intern, IIITDM Chennai (Aug – Oct 2022):
  * Built predictive ML models (K-Means, regression) on photon emission datasets, reaching 87% accuracy in shelf-life estimation.

FEATURED PROJECTS:
1. FinSight AI (Live on Vercel: https://finsight-ai-sage.vercel.app/):
   * Grounded financial analyst for Tamil Nadu's 121-page Fiscal White Paper.
   * LangGraph ReAct agent routes questions between vector search (223 section-aware chunks from 121-page PDF) and SQL over 42 structured budget tables in Neon PostgreSQL.
   * Numeric verification agent cross-checks numbers against source tables before answering (0.00% discrepancy).
   * Frontend built with Next.js/React on Vercel.
2. Customer Churn Prediction with MLOps:
   * Telco churn pipeline on 7,000+ records.
   * Logistic Regression achieved ROC-AUC 0.845 and F1 0.61.
   * Tracked with MLflow, containerized with Docker, served via FastAPI.
3. Enterprise Multi-Agent Summarizer (MResult):
   * AutoGen + ChromaDB multi-agent system reducing manual effort by ~40% with ~99% extraction accuracy.

EDUCATION:
- B.S. in Data Science (IIT Madras, Ongoing): Online degree program covering statistics, ML, programming.
- B.Tech in Artificial Intelligence & Data Science (Jeppiaar Engineering College, Graduated 2025).

SKILLS:
- Agentic AI: LangGraph, AutoGen, LlamaIndex, MCP, ReAct framework, ChromaDB.
- ML & Core: Python, PyTorch, Scikit-Learn, XGBoost, OpenCV, Pandas, NumPy.
- MLOps: Docker, FastAPI, MLflow, AWS EC2 & S3, CI/CD, Git.
- Databases: PostgreSQL (Neon), Snowflake.
- Full-Stack: React & Next.js (currently learning to build full-stack AI products).

GUIDELINES:
- Answer in 2 to 4 concise, impactful sentences.
- Always highlight verified metrics (~99% extraction, 0.845 ROC-AUC, 121 pages, 42 tables, ~40% manual effort reduction).
- If asked about non-professional or controversial topics, politely decline and steer back to Naveena's engineering work.`;

  // Fallback if no LLM key is configured in Vercel environment
  if (!groqKey && !geminiKey && !openaiKey) {
    return res.status(200).json({
      fallback: true,
      message: "No server-side API key configured. Handled by client-side hybrid cache."
    });
  }

  try {
    // 1. Groq (Llama 3.3 70B - Ultra fast)
    if (groqKey) {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message }
          ],
          temperature: 0.3,
          max_tokens: 280
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API responded with status ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content;
      return res.status(200).json({ reply, source: 'groq-llama-3.3' });
    }

    // 2. Gemini 1.5 Flash
    if (geminiKey) {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: message }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 280
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API responded with status ${response.status}`);
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return res.status(200).json({ reply, source: 'gemini-1.5-flash' });
    }

    // 3. OpenAI (gpt-4o-mini)
    if (openaiKey) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openaiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message }
          ],
          temperature: 0.3,
          max_tokens: 280
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API responded with status ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content;
      return res.status(200).json({ reply, source: 'openai-gpt-4o-mini' });
    }
  } catch (error) {
    console.error("Chat backend error:", error);
    return res.status(200).json({
      fallback: true,
      error: error.message
    });
  }
}
