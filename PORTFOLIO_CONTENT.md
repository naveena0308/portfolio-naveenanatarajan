# Naveena N — Portfolio Website Content (Revised)

> **Live:** [portfolio-naveenanatarajan.vercel.app](https://portfolio-naveenanatarajan.vercel.app/)
> **Last Updated:** October 29, 2026
> **Availability:** Open to AI/ML roles in **Bangalore**, **Chennai**, and **Remote Worldwide**

---

## 1. Header & Navigation

- **Brand:** Naveena
- **Links:** About (`#hero`) · Projects (`#projects`) · Skills (`#skills`) · Experience (`#experience`) · Contact (`#contact`)
- **Actions:** Theme toggle (light/dark) · Resume download (`Naveena_s_Resume___27_10_2026.pdf`, saved as `Naveena_N_Resume.pdf`)

---

## 2. Hero

### Status chips
- **Open to AI/ML roles · Bangalore, Chennai & Remote** (animated green pulse)
- Bangalore, India
- Associate @ MResult

### Headline
Hi, I'm **Naveena N**

### Typewriter: "I build…"
1. agents that plan, act, and double-check themselves.
2. RAG that shows its sources and verifies its numbers.
3. pipelines where pixels and PDFs go in and structure comes out.
4. AI products people can actually talk to.
5. ML systems that ship: tracked, containerized, reproducible.

### Bio
> AI/ML Engineer at MResult. I ship agentic AI, production RAG, and document intelligence, from the model to the FastAPI backend to the live app. My latest build answers questions over a 121-page government budget with page-level citations and verified numbers.

### Academic pills
- **IIT Madras**, B.S. Data Science *(ongoing)*
- **Jeppiaar Institute of Technology**, B.Tech AI & Data Science *(2025)*

### CTAs
- **See FinSight Live** (primary) → [finsight-ai-sage.vercel.app](https://finsight-ai-sage.vercel.app/)
- **Explore Projects** → `#projects`
- **Download Resume**

### Social & quick connect
- **GitHub:** [github.com/naveena0308](https://github.com/naveena0308)
- **LinkedIn:** *(replace with your full profile URL)*
- **Email:** `navirajan2003@gmail.com` (one-click copy)

### Hero visual floaters & dynamics
- **Focus Floater:** Agentic AI & LLMs (cycles through LangGraph & AutoGen, Autonomous Agents)
- **Vision Floater:** Computer Vision & Multimodal (cycles through YOLO & OpenCV, Document Intelligence)
- **Systems Floater:** RAG & MLOps (cycles through FastAPI & Docker, PostgreSQL & pgvector)
- **Wave Bubble:** "Hi, ask me anything 👋" appears after 2s; clicking scrolls smoothly to the assistant chat.
- **Card & Floater Animations:** Gentle vertical float and independent floater drift (respects `prefers-reduced-motion: reduce`).

---

## 3. Telemetry Bar

| Metric | Label |
| :--- | :--- |
| **95.6%** | Answer precision, FinSight eval suite (30 test cases) |
| **0.845** | ROC-AUC, telecom churn model (7,000+ records) |
| **~95%** | Manual effort cut by multimodal document workflows |
| **~40%** | Summarization effort saved by a multi-agent system |

---

## 4. Projects

### 4.1 FinSight AI: Agentic Financial Budget Analyst
*Live on Vercel · Jun 2026 – Present*

Ask a 121-page government fiscal white paper anything. A LangGraph agent plans the query, routes it between SQL and vector search, and verifies every number against source tables before answering, with page-level citations.

- Multi-agent RAG that **checks numeric answers against ground truth** to curb hallucinations
- PyMuPDF ETL turned the PDF into **223 section-aware chunks and 42 relational tables**
- **MCP server (4 tools)** for Claude Desktop and Cursor, plus **Gemini → GPT-4o-mini failover**
- **95.6% precision** on a 30-case automated eval suite

**Stack:** `LangGraph` `Next.js 14` `FastAPI` `Neon Postgres` `pgvector` `MCP`
**Actions:** [Launch Live App](https://finsight-ai-sage.vercel.app/) · View Code *(link to the FinSight repo, not your profile)*

### 4.2 Customer Churn Prediction with MLOps
*Jan 2026 – Mar 2026*

An end-to-end churn pipeline on 7,000+ telecom records, from preprocessing to batch inference, with every experiment tracked and reproducible.

- Compared multiple classifiers; **Logistic Regression won at 0.845 ROC-AUC and 0.61 F1**, with interpretability
- **MLflow** for experiment tracking and model versioning
- Container-ready architecture with **Docker + FastAPI**

**Stack:** `MLflow` `Docker` `FastAPI` `Scikit-learn`
**Actions:** View Repository *(link to the churn repo)*

### 4.3 Multi-Agent Summarizer
*MResult · Enterprise*

An AutoGen + ChromaDB system that ingests, cleans, and summarizes enterprise datasets into structured insights, **cutting manual effort by ~40%**.

**Stack:** `AutoGen` `ChromaDB` `NumPy` `Pandas`

### 4.4 Multimodal Document AI
*MResult · Enterprise*

CV workflows that read text, tables, and images in documents, **cutting manual effort by ~95%**. Production document classification and extraction run on FastAPI + Snowflake.

**Stack:** `OpenCV` `YOLO` `FastAPI` `Snowflake`

---

## 5. Skills

**Filter tabs:** All · Generative AI & Agents · ML & Model Development · MLOps & Cloud · Computer Vision & Doc AI · Data & Backend

- **Generative AI & Agents:** LangGraph, LangChain, LlamaIndex, AutoGen, MCP, ReAct, RAG
- **ML & Model Development:** Python, PyTorch, Scikit-learn, LoRA/QLoRA, NumPy, Pandas
- **MLOps & Cloud:** MLflow, Docker, CI/CD, AWS (S3, EC2), GCP Vertex AI
- **Computer Vision & Doc AI:** YOLO, OpenCV, EfficientNet, PyMuPDF
- **Data & Backend:** PostgreSQL, pgvector, ChromaDB, Snowflake, SQL, FastAPI, Next.js

---

## 6. Experience

### Associate, Data Science
**MResult Technologies, Bangalore** · Jan 2026 – Present
- Built **GnA Intelligence Engine**, an agentic finance and analytics platform (ReAct + LlamaIndex) deployed on AWS EC2
- Shipped a **real-time Vertex AI avatar** that demos a logistics app and answers feature questions live
- Delivered document classification and extraction pipelines (FastAPI + Snowflake), tuned for accuracy and latency
- Contributed to CI/CD and MLflow tracking, with secure artifact storage via S3 presigned URLs

### Trainee, Data Science
**MResult Technologies, Bangalore** · Jul 2025 – Dec 2025
- Authored an internal white paper benchmarking **VoxAPI**, a secure LLM gateway, using BLEU, ROUGE and BERTScore
- Built multimodal CV workflows that cut manual effort by **~95%**

### Data Science Intern
**MResult Technologies, Bangalore** · Feb 2025 – Apr 2025
- Built a NumPy/Pandas ingestion pipeline and an **AutoGen + ChromaDB** multi-agent summarizer that cut manual effort by **40%**

---

## 7. Education

### B.S. in Data Science & Applications
**IIT Madras** · 2024 – Present · Online degree
Statistics, machine learning pipelines, and application engineering.

### B.Tech in Artificial Intelligence & Data Science
**Jeppiaar Institute of Technology** · 2021 – 2025
Deep learning, computer vision, data structures, and backend systems.

---

## 8. Contact

- **Status Badge:** Open to roles · replies within 24h
- **Heading:** Messy data, hard problem? Let’s build the AI that solves it.
- **Subtext:** Agentic AI, computer vision, RAG, MLOps, document AI, or a role on your team. I’m open to opportunities in **Bangalore, Chennai, and remote worldwide**, and I’d love to hear about it.
- **Email:** `navirajan2003@gmail.com` (with one-click copy button)
- **Location:** Bangalore, India · Open to Chennai & Remote Worldwide
- **Map Visual:** Animated corridor & remote beacon connecting Bangalore, Chennai, and worldwide
- **Interactive Card:** Dual tabs (Send a message with intent chips + Ask my assistant with 0ms copilot)
- **Submission:** Formspree (`https://formspree.io/f/xbjnvpzw`) directly to inbox with email-client fallback

---

## 9. Footer

- **Brand:** Naveena N · AI/ML Engineer · Bangalore, Chennai & Remote
- **Links:** Back to Top ↑ · GitHub · Resume PDF

---

## 10. Navi (AI Copilot) Knowledge Base

Keep answers consistent with the numbers above.

1. **Experience:** MResult since Feb 2025; GnA Intelligence Engine, Vertex AI avatar, document classification pipelines.
2. **FinSight:** 121-page white paper, 223 section-aware chunks, 42 Neon Postgres tables, MCP server (4 tools), Gemini → GPT-4o-mini failover, **95.6% precision on 30 test cases**.
3. **Churn MLOps:** 7,000+ records, 0.845 ROC-AUC, 0.61 F1, MLflow tracking, container-ready Docker + FastAPI.
4. **Education:** IIT Madras B.S. (ongoing); Jeppiaar B.Tech (2025).
5. **Skills:** Agentic AI, Core ML, MLOps, Computer Vision, Backend.
6. **Resume:** One-click download.
7. **Contact:** Email, GitHub, LinkedIn.
8. **Availability:** "Naveena is open to AI/ML roles in Bangalore, Chennai, and remote worldwide." Currently based in Bangalore.

---

## Pre-launch checklist

- [ ] Replace the generic LinkedIn link with your profile URL
- [ ] Point each "Code" / "View Repository" button to its own repo
- [ ] Remove every "99%" claim (hero, telemetry, project card, Navi)
- [ ] Update the footer, contact and status chip to say Bangalore, Chennai & Remote
- [ ] Add "Open to roles in Bangalore, Chennai & Remote Worldwide" to your resume objective and LinkedIn headline
