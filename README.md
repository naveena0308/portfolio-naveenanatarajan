# Naveena N — AI/ML Engineer & Agentic Systems Portfolio

[![Portfolio Live](https://img.shields.io/badge/Portfolio-Live-2563EB?style=flat-square&logo=vercel)](https://finsight-ai-sage.vercel.app/)
[![FinSight AI Live](https://img.shields.io/badge/FinSight%20AI-Live%20on%20Vercel-FFB800?style=flat-square&logo=vercel)](https://finsight-ai-sage.vercel.app/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-10B981?style=flat-square)](https://github.com/naveena0308)
[![License](https://img.shields.io/badge/License-MIT-8B5CF6?style=flat-square)](LICENSE)

A personal portfolio engineered for **Naveena N**, an AI/ML Engineer specializing in Autonomous Multi-Agent Systems, LangGraph orchestration, Model Context Protocol (MCP), Production RAG, MLOps, and Document Intelligence.

Designed with an executive porcelain white aesthetic, single signature Royal Cobalt Blue (`#2563EB`) accent, interactive agentic reasoning trace simulations, and a hybrid AI portfolio assistant (**Navi**).

---

## 🌟 Key Architecture & Features

### 1. Selected Production Projects
- **FinSight AI (Featured)**: Answers questions on Tamil Nadu's 121-page Fiscal Management White Paper with page-level citations. Powered by LangGraph ReAct routing between ChromaDB semantic vectors and 42 structured budget tables in Neon PostgreSQL, backed by numeric verification agents (0.00% discrepancy). Frontend built with Next.js/React on Vercel.
- **Customer Churn Prediction with MLOps**: End-to-end pipeline evaluated on 7,000+ Telco records (ROC-AUC 0.845, F1 0.61), tracked via MLflow, containerized with Docker, and served through FastAPI.
- **Enterprise Multi-Agent Summarizer (MResult)**: AutoGen and ChromaDB multi-agent system cutting manual effort by ~40% with ~99% extraction accuracy in manual validation.

### 2. Live Agent Sandbox & Trace Simulation
- Interactive simulation of FinSight AI's multi-agent reasoning lifecycle: `THOUGHT` → `ACTION (MCP Tool)` → `OBSERVATION` → `VERIFICATION AGENT` → `SYNTHESIS`.
- Verifies SQL aggregations in Neon PostgreSQL against Table 2.1 (Page 27) and Executive Summary (Page 12).

### 3. Navi — Floating Hybrid Portfolio Copilot
- **Hybrid Intent Cache (Level 1)**: Instant (0ms, zero-cost, zero-hallucination) responses for top recruiter queries (MResult experience, FinSight architecture, churn metrics, IIT Madras studies, resume download, contact info).
- **Serverless AI Fallback (Level 2)**: Vercel serverless function (`/api/chat.js`) supporting Groq (Llama 3.3 70B), Gemini 1.5 Flash, or OpenAI for open-ended queries, with intelligent client-side fallback.
- **Actionable UI**: Interactive in-chat buttons (`[Download Resume]`, `[Launch FinSight Live]`, `[Email Naveena]`).

### 4. Tactile 5-Stage Engineering Pipeline
- Explores the complete document-to-agent lifecycle:
  `01 Ingest` (121 Pages, 223 section-aware chunks) → `02 Reason` (LangGraph ReAct) → `03 Ground` (ChromaDB + Neon PostgreSQL + Snowflake) → `04 Verify` (Numeric verification agent) → `05 Deploy` (Docker + FastAPI + Vercel).

### 5. Production Telemetry & Filterable Skills
- Animated telemetry counters: **~99%** extraction accuracy, **0.845** ROC-AUC, **~40%** manual effort reduction, **42 Tables** queried in FinSight.
- Category filter tabs with single-view expansion across Generative AI & Agents, MLOps & Cloud, Computer Vision & Doc AI, and Core ML.

---

## 📁 Repository Structure

```
portfolio-naveenanatarajan/
├── api/
│   └── chat.js                          # Vercel Serverless Function for Navi (Groq / Gemini / OpenAI)
├── index.html                           # Semantic HTML5 architecture & layout
├── style.css                            # Executive design system, typography, animations
├── script.js                            # Interactive state, trace simulation, hybrid chatbot
├── vercel.json                          # Vercel deployment headers & clean routing
├── Naveena_s_Resume___16_09_2026.pdf    # Downloadable verified resume
├── avatar_stylized.jpg                  # Stylized 3D tech portrait
├── photo_original.jpg                   # Original professional photograph
├── myphoto.jpeg                         # Original uploaded photo source
└── README.md                            # Documentation & deployment guide
```

---

## 🚀 Local Development

The project is built with zero external build dependencies (pure HTML5, CSS3, and JavaScript), making it instantaneous to run.

```bash
# Start local development server
python -m http.server 8085
```

Open [http://localhost:8085](http://localhost:8085) in your web browser.

---

## 🌐 Deploy to Vercel

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete modern AI developer portfolio dashboard"
   git push origin main
   ```
2. Navigate to [vercel.com/new](https://vercel.com/new) and import your `portfolio-naveenanatarajan` repository.
3. Framework Preset: **Other** (Root directory: `./`).
4. *(Optional for live LLM)*: Under **Settings → Environment Variables**, add:
   - `GROQ_API_KEY` (recommended for ultra-fast Llama 3.3 70B) or `GEMINI_API_KEY`.
5. Click **Deploy**.
6. Under **Settings → Domains**, add your custom domain.

---

## 📬 Contact

- **Engineer**: Naveena N
- **Email**: [navirajan2003@gmail.com](mailto:navirajan2003@gmail.com)
- **GitHub**: [github.com/naveena0308](https://github.com/naveena0308)
- **Location**: Bangalore, Karnataka, India