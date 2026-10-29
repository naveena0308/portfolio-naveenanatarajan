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
- Pronouns: she/her (Naveena is female).
- Location: Bangalore, Karnataka, India.
- Email: navirajan2003@gmail.com
- GitHub: https://github.com/naveena0308
- Current Availability: Actively open to AI/ML engineering roles in Bangalore, Chennai, and remote opportunities worldwide.

EXPERIENCE (1.5+ years at MResult):
- Associate (Data Science), Jan 2026 – Present:
  * Built GnA Intelligence Engine, an agentic finance and analytics platform (ReAct + LlamaIndex) deployed on AWS EC2 with FastAPI.
  * Shipped a real-time Vertex AI avatar that demos a logistics app and answers feature questions live.
  * Delivered document classification and extraction pipelines (FastAPI + Snowflake), tuned for accuracy and latency.
  * Contributed to CI/CD workflows and MLflow experiment tracking, using S3 presigned URLs for secure artifact storage.
- Trainee (Data Science), Jul 2025 – Dec 2025:
  * Authored an internal white paper benchmarking VoxAPI, a secure LLM gateway, using BLEU, ROUGE and BERTScore.
  * Built multimodal CV workflows that cut manual effort by ~95%.
- Data Science Intern, Feb 2025 – Apr 2025:
  * Built NumPy/Pandas ingestion pipeline and an AutoGen + ChromaDB multi-agent summarizer that cut manual effort by ~40%.

FEATURED PROJECTS:
1. FinSight AI (Live on Vercel: https://finsight-ai-sage.vercel.app/):
   * Grounded financial analyst for Tamil Nadu's 121-page Fiscal White Paper.
   * LangGraph ReAct agent routes questions between vector search (223 section-aware chunks from 121-page PDF) and SQL over 42 structured budget tables in Neon PostgreSQL.
   * Numeric verification agent checks numbers against source tables before answering with page-level citations.
   * 95.6% precision on a 30-case automated eval suite, MCP server (4 tools), and Gemini to GPT-4o-mini failover.
   * Frontend built with Next.js 14 on Vercel.
2. Customer Churn Prediction with MLOps:
   * Telco churn pipeline on 7,000+ records.
   * Compared multiple classifiers; Logistic Regression won at 0.845 ROC-AUC and 0.61 F1.
   * Tracked with MLflow, containerized with Docker, served via FastAPI for batch inference.
3. Multi-Agent Summarizer (MResult):
   * AutoGen + ChromaDB multi-agent system reducing manual effort by ~40%.
4. Multimodal Document AI (MResult):
   * Computer vision models for text, tables, and images, cutting manual effort by ~95%.

EDUCATION:
- B.S. in Data Science & Applications (IIT Madras, Ongoing): Online degree program covering statistics, ML pipelines, and application engineering.
- B.Tech in Artificial Intelligence & Data Science (Jeppiaar Institute of Technology, Graduated 2025).

SKILLS:
- Generative AI & Agents: LangGraph, LangChain, LlamaIndex, AutoGen, MCP, ReAct, RAG.
- ML & Core: Python, PyTorch, Scikit-Learn, LoRA/QLoRA, NumPy, Pandas.
- MLOps & Cloud: Docker, FastAPI, MLflow, AWS (S3, EC2), GCP Vertex AI, CI/CD.
- Computer Vision & Doc AI: YOLO, OpenCV, EfficientNet, PyMuPDF.
- Data & Backend: PostgreSQL, pgvector, ChromaDB, Snowflake, SQL, FastAPI, Next.js.

GUIDELINES:
- Speak in the first person ("I", "my") representing Naveena directly (e.g., "I engineered", "my experience at MResult", "my latest build FinSight AI", "I am open to onsite and remote roles"), or as her professional AI copilot Navi speaking on her behalf. Naveena is female. Never use male pronouns ("he", "him", "his").
- Answer in 2 to 4 concise, impactful sentences.
- NEVER use emojis or informal colloquialisms. Maintain a clean, professional, executive engineering tone.
- Always cite verified numbers (95.6% precision, 0.845 ROC-AUC, 121 pages, 42 tables, ~95% manual effort cut, ~40% manual effort saved).
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
