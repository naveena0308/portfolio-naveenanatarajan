/**
 * NAVEENA N — AI/ML ENGINEER PORTFOLIO JAVASCRIPT
 * Interactive Behaviors:
 * - Dynamic Typewriter effect
 * - Light / Dark Mode Theme Switcher
 * - Animated Telemetry Stat Counters (with data-prefix & data-suffix support)
 * - 5-Stage Tactile Pipeline Inspector (Ingest → Reason → Ground → Verify → Deploy)
 * - FinSight AI Agent Live Trace Simulation (Deduplicated with timer cleanup)
 * - Skills Category Filter Tabs (Single-view full-width expansion)
 * - Formspree Contact Form Dispatch with Mailto Fallback
 * - Active Navigation ScrollSpy & Mobile Menu
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. THEME SWITCHER (Light / Dark)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to light (executive white theme)
  const savedTheme = localStorage.getItem('naveena_portfolio_theme') || 'light';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('naveena_portfolio_theme', newTheme);
    });
  }

  // ==========================================================================
  // 2. TYPEWRITER EFFECT
  // ==========================================================================
  const typewriterText = document.getElementById('typewriterText');
  const phrases = [
    'AI/ML & Agentic Systems.',
    'Multi-Agent Workflows with LangGraph & MCP.',
    'Production RAG & Financial Intelligence.',
    'Scalable MLOps Pipelines with FastAPI & MLflow.',
    'Multimodal Document AI with 99% Extraction.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    if (!typewriterText) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2200; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Pause before typing next phrase
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // ==========================================================================
  // 3. ANIMATED TELEMETRY NUMBER COUNTERS
  // ==========================================================================
  const telemetryNumbers = document.querySelectorAll('.telemetry-number');

  const telemetryObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const duration = 1800; // ms
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = target * easeProgress;

          el.textContent = prefix + currentVal.toFixed(decimals) + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = prefix + target.toFixed(decimals) + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  telemetryNumbers.forEach(num => telemetryObserver.observe(num));

  // ==========================================================================
  // 4. 5-STAGE PIPELINE INSPECTOR (How I build)
  // ==========================================================================
  const pipelineCards = document.querySelectorAll('.pipeline-step-card');
  const detailStepNum = document.getElementById('detailStepNum');
  const detailTitle = document.getElementById('detailTitle');
  const detailDesc = document.getElementById('detailDesc');
  const dmVal1 = document.getElementById('dmVal1');
  const dmLbl1 = document.getElementById('dmLbl1');
  const dmVal2 = document.getElementById('dmVal2');
  const dmLbl2 = document.getElementById('dmLbl2');
  const dmVal3 = document.getElementById('dmVal3');
  const dmLbl3 = document.getElementById('dmLbl3');

  const pipelineData = {
    1: {
      step: 'Stage 01 Focus',
      title: 'Document Intelligence & Section-Aware Ingestion',
      desc: 'Fiscal PDF reports and tables are split into section-aware chunks that keep chapter, sub-chapter, and page metadata. This lets the retriever cite the exact page and section behind each answer and reduces unsupported claims.',
      v1: '121 Pages', l1: 'Fiscal Document Size',
      v2: '223 Chunks', l2: 'Section-Aware Segments',
      v3: 'Table + Page Context', l3: 'Kept in Every Chunk'
    },
    2: {
      step: 'Stage 02 Focus',
      title: 'Autonomous Reasoning & Multi-Agent Planning',
      desc: 'Incoming analytical questions are parsed by LangGraph ReAct agents. The query planner decomposes complex fiscal requests into sub-goals, determining whether to trigger semantic vector search or verified SQL queries.',
      v1: 'ReAct', l1: 'Reasoning Framework',
      v2: 'LangGraph', l2: 'StateGraph Routing',
      v3: 'AutoGen', l3: 'Multi-Agent Collaboration'
    },
    3: {
      step: 'Stage 03 Focus',
      title: 'Hybrid Semantic & Relational Database Grounding',
      desc: 'Retrieval runs across dual backends: dense semantic vector search via ChromaDB alongside verified SQL lookups across 42 structured budget tables in Neon PostgreSQL and enterprise Snowflake data clouds.',
      v1: '42 Tables', l1: 'Structured Budget Tables',
      v2: 'ChromaDB', l2: 'Dense Vector Embeddings',
      v3: 'PostgreSQL (Neon)', l3: 'Serverless Relational DB'
    },
    4: {
      step: 'Stage 04 Focus',
      title: 'Numeric Verification & Standardized MCP Server',
      desc: 'Numeric verification agents check figures against source budget tables before answering. An exposable Model Context Protocol (MCP) server enables external AI agents to securely query verified endpoints.',
      v1: '0.00%', l1: 'Numeric Discrepancy',
      v2: 'MCP Server', l2: 'Standardized Tool API',
      v3: 'Source Cited', l3: 'Page-level Attribution'
    },
    5: {
      step: 'Stage 05 Focus',
      title: 'Production Deployment & Continuous MLOps',
      desc: 'Containerized microservices are packaged with Docker and deployed to AWS EC2 and Vercel. Experiment tracking and model versioning are maintained via MLflow, leveraging AWS S3 presigned URLs for secure artifact lifecycle management.',
      v1: 'Vercel / EC2', l1: 'Production Hosting',
      v2: 'MLflow', l2: 'Experiment Registry',
      v3: 'Docker', l3: 'Container Architecture'
    }
  };

  pipelineCards.forEach(card => {
    card.addEventListener('click', () => {
      pipelineCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const step = card.getAttribute('data-step');
      const data = pipelineData[step];

      if (data && detailStepNum) {
        detailStepNum.textContent = data.step;
        detailTitle.textContent = data.title;
        detailDesc.textContent = data.desc;
        dmVal1.textContent = data.v1;
        dmLbl1.textContent = data.l1;
        dmVal2.textContent = data.v2;
        dmLbl2.textContent = data.l2;
        dmVal3.textContent = data.v3;
        dmLbl3.textContent = data.l3;
      }
    });
  });

  // ==========================================================================
  // 5. INTERACTIVE AGENT SANDBOX SIMULATION (FinSight AI Trace)
  // ==========================================================================
  const queryChips = document.querySelectorAll('.query-chip');
  const agentTraceOutput = document.getElementById('agentTraceOutput');
  const btnReplayTrace = document.getElementById('btnReplayTrace');
  const terminalCitations = document.getElementById('terminalCitations');

  const traceScenarios = {
    1: {
      citation: '<i class="fa-solid fa-bookmark"></i> Citations: Table 2.1 (Page 27)',
      steps: [
        { tag: 'THOUGHT', class: 'tag-thought', text: 'Analyzing Tamil Nadu Fiscal White Paper: Public Debt trajectory & liabilities from 2021-22 to 2025-26. Routing to Query Planner agent...' },
        { tag: 'ACTION: MCP_TOOL', class: 'tag-action', text: 'Invoking <code class="code-inline">neon_postgres_query(query="SELECT fiscal_year, outstanding_debt_cr, debt_gdp_ratio FROM tn_debt_liabilities ORDER BY fiscal_year ASC;")</code>' },
        { tag: 'OBSERVATION', class: 'tag-observation', text: 'Neon Postgres returned 5 rows: <code class="code-inline">{ 2021-22: ₹5.70L Cr (26.6% GSDP) → 2025-26: ₹8.42L Cr (27.2% GSDP) }</code> from Table 2.1, Page 27.' },
        { tag: 'VERIFICATION AGENT', class: 'tag-verify', text: 'Cross-checked against White Paper Section 2 chunks. Discrepancy = 0.00%. Verified citation: Table 2.1 (Page 27).' },
        { tag: 'SYNTHESIS', class: 'tag-final', text: 'Total Outstanding Debt and Liabilities trajectory projected to rise from <strong>₹5.70 Lakh Cr</strong> to <strong>₹8.42 Lakh Cr</strong> by 2025-26, maintaining debt-to-GSDP within 27.2%. Fully verified against Table 2.1, Page 27.' }
      ]
    },
    2: {
      citation: '<i class="fa-solid fa-bookmark"></i> Citations: Executive Summary (Page 12)',
      steps: [
        { tag: 'THOUGHT', class: 'tag-thought', text: 'Calculating Committed Expenditure crowd-out ratio (salaries, pensions, debt interest servicing) vs. Capital Outlay...' },
        { tag: 'ACTION: MCP_TOOL', class: 'tag-action', text: 'Invoking <code class="code-inline">neon_postgres_query(query="SELECT committed_exp_cr, capital_exp_cr, (committed_exp_cr * 100.0 / total_revenue_receipts) as crowd_out_pct FROM tn_expenditure_summary WHERE year=\'2024-25\';")</code>' },
        { tag: 'OBSERVATION', class: 'tag-observation', text: 'Neon Postgres returned: <code class="code-inline">{ committed_exp: ₹1,56,840 Cr, capital_exp: ₹42,500 Cr, crowd_out_pct: 71.4% }</code> from Executive Summary, Page 12.' },
        { tag: 'VERIFICATION AGENT', class: 'tag-verify', text: 'Audited against Comptroller & Auditor General (CAG) reconciled benchmarks. Rounding variance = 0.00%.' },
        { tag: 'SYNTHESIS', class: 'tag-final', text: 'Committed expenditure accounts for <strong>71.4%</strong> of total revenue receipts (₹1,56,840 Cr), severely restricting discretionary capital outlay to ₹42,500 Cr. Grounded in Executive Summary, Page 12.' }
      ]
    },
    3: {
      citation: '<i class="fa-solid fa-bookmark"></i> Citations: Table 2.1 (Page 27)',
      steps: [
        { tag: 'THOUGHT', class: 'tag-thought', text: 'Auditing request: Cross-verify Table 2.1 Outstanding Debt and Liabilities numbers against source White Paper citations.' },
        { tag: 'ACTION: MCP_TOOL', class: 'tag-action', text: 'Invoking <code class="code-inline">neon_postgres_query(query="SELECT per_capita_debt_inr, debt_servicing_ratio, nominal_gsdp_cr FROM tn_debt_audit WHERE table_id=\'Table_2.1\' AND page=27;")</code>' },
        { tag: 'OBSERVATION', class: 'tag-observation', text: 'Neon Postgres returned Table 2.1 (Page 27): <code class="code-inline">{ per_capita_debt: "₹70,500 (sample estimate)", debt_servicing_ratio: "21% of revenue", nominal_gsdp_cr: "₹24,80,000 Cr", cag_reconciled: true }</code>' },
        { tag: 'VERIFICATION AGENT', class: 'tag-verify', text: 'Audit passed: Per-capita debt and 21% debt-servicing ratio cross-verified against Table 2.1 source tables. Zero discrepancy detected.' },
        { tag: 'SYNTHESIS', class: 'tag-final', text: 'Table 2.1 audit confirmed: Per-capita debt burden is <strong>₹70,500 per citizen</strong> (sample value), with debt servicing consuming <strong>21%</strong> of state revenue. Fully cited from Table 2.1, Page 27.' }
      ]
    }
  };

  let currentQueryIndex = 1;
  let activeTraceTimers = [];

  function cancelActiveTrace() {
    activeTraceTimers.forEach(id => clearTimeout(id));
    activeTraceTimers = [];
  }

  function renderTrace(queryIndex) {
    if (!agentTraceOutput) return;

    // 1. Cancel any active execution timers to prevent duplicate line printing
    cancelActiveTrace();

    const scenario = traceScenarios[queryIndex] || traceScenarios[1];
    const steps = scenario.steps;

    // 2. Update terminal citations footer to match current scenario
    if (terminalCitations) {
      terminalCitations.innerHTML = scenario.citation;
    }

    // 3. Clear container & display brief initialization
    agentTraceOutput.innerHTML = '<div style="color: #64748B; font-style: italic; padding: 0.6rem 0.5rem;"><i class="fa-solid fa-spinner fa-spin"></i> Initializing LangGraph agent trace...</div>';

    const initTimer = setTimeout(() => {
      agentTraceOutput.innerHTML = '';

      steps.forEach((step, idx) => {
        const stepTimer = setTimeout(() => {
          const stepDiv = document.createElement('div');
          stepDiv.className = `trace-step ${step.class.replace('tag-', 'trace-')}`;
          stepDiv.innerHTML = `
            <span class="trace-tag ${step.class}">${step.tag}</span>
            <span class="trace-text">${step.text}</span>
          `;
          stepDiv.style.opacity = '0';
          stepDiv.style.transform = 'translateY(6px)';
          stepDiv.style.transition = 'all 0.25s ease';
          agentTraceOutput.appendChild(stepDiv);

          requestAnimationFrame(() => {
            stepDiv.style.opacity = '1';
            stepDiv.style.transform = 'translateY(0)';
          });
        }, idx * 280);

        activeTraceTimers.push(stepTimer);
      });
    }, 200);

    activeTraceTimers.push(initTimer);
  }

  // Initialize first trace on page load
  renderTrace(1);

  queryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      queryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentQueryIndex = parseInt(chip.getAttribute('data-query'), 10);
      renderTrace(currentQueryIndex);
    });
  });

  if (btnReplayTrace) {
    btnReplayTrace.addEventListener('click', () => {
      renderTrace(currentQueryIndex);
    });
  }

  // ==========================================================================
  // 6. SKILLS CATEGORY FILTER TABS
  // ==========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-category-card');
  const skillsGrid = document.querySelector('.skills-grid');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      // Expand card to full width when a single category is selected
      if (skillsGrid) {
        if (filter === 'all') {
          skillsGrid.classList.remove('single-view');
        } else {
          skillsGrid.classList.add('single-view');
        }
      }

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ==========================================================================
  // 7. ONE-CLICK EMAIL COPY & FORMSPREE CONTACT FORM DISPATCH
  // ==========================================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyEmailText = document.getElementById('copyEmailText');

  if (copyEmailBtn && copyEmailText) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'navirajan2003@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const origText = copyEmailText.textContent;
        copyEmailText.textContent = 'Copied to clipboard!';
        copyEmailBtn.style.borderColor = 'var(--color-emerald)';
        copyEmailBtn.style.color = 'var(--color-emerald)';

        setTimeout(() => {
          copyEmailText.textContent = origText;
          copyEmailBtn.style.borderColor = '';
          copyEmailBtn.style.color = '';
        }, 2200);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  // Contact Form Submission (Formspree AJAX with Mailto Fallback)
  const contactForm = document.getElementById('contactForm');
  const formSuccessMsg = document.getElementById('formSuccessMsg');
  const btnSubmitForm = document.getElementById('btnSubmitForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = document.getElementById('nameInput')?.value || '';
      const email = document.getElementById('emailInput')?.value || '';
      const message = document.getElementById('messageInput')?.value || '';

      if (btnSubmitForm) {
        btnSubmitForm.disabled = true;
        btnSubmitForm.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Dispatching message...';
      }

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          if (formSuccessMsg) {
            formSuccessMsg.classList.remove('hidden');
            formSuccessMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.';
          }
          if (btnSubmitForm) {
            btnSubmitForm.innerHTML = '<i class="fa-solid fa-check"></i> Message Dispatched';
            btnSubmitForm.style.background = 'var(--color-emerald)';
            btnSubmitForm.style.color = '#FFFFFF';
          }
          contactForm.reset();
        } else {
          throw new Error('Formspree endpoint returned non-200');
        }
      } catch (err) {
        // Fallback: notify user and open mailto link directly
        if (formSuccessMsg) {
          formSuccessMsg.classList.remove('hidden');
          formSuccessMsg.innerHTML = '<i class="fa-solid fa-circle-info"></i> Direct email client triggered for navirajan2003@gmail.com.';
        }
        const mailtoLink = `mailto:navirajan2003@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
        window.location.href = mailtoLink;

        if (btnSubmitForm) {
          btnSubmitForm.disabled = false;
          btnSubmitForm.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
        }
      }
    });
  }

  // ==========================================================================
  // 8. ACTIVE NAVIGATION SCROLLSPY & MOBILE MENU
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinksContainer = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-open');
      });
    });
  }

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 9. FLOATING HYBRID CHATBOT (Naveena Copilot)
  // ==========================================================================
  const chatWidget = document.getElementById('portfolioChatWidget');
  const chatLauncherBtn = document.getElementById('chatLauncherBtn');
  const chatDrawer = document.getElementById('chatDrawer');
  const btnCloseChat = document.getElementById('btnCloseChat');
  const btnResetChat = document.getElementById('btnResetChat');
  const chatMessages = document.getElementById('chatMessages');
  const chatTypingIndicator = document.getElementById('chatTypingIndicator');
  const chatInputForm = document.getElementById('chatInputForm');
  const chatInputField = document.getElementById('chatInputField');
  const chatChips = document.querySelectorAll('.chat-chip');

  // Grounded Deterministic Knowledge Base (Level 1: 0ms Intent Cache)
  const hybridKnowledge = {
    experience: {
      text: `<p>Naveena has <strong>1.5+ years of experience</strong> at <strong>MResult</strong>, driving agentic AI and document intelligence from ingestion to production:</p>
      <ul>
        <li><strong>Associate (Jan 2026 – Present):</strong> Built autonomous agentic pipelines with ReAct and LlamaIndex on AWS EC2 via FastAPI; integrated Snowflake document extraction with S3 presigned artifact tracking.</li>
        <li><strong>Trainee (Jul – Dec 2025):</strong> Developed multimodal CV workflows for text, tables, and charts with <strong>~99% extraction accuracy</strong> in manual validation.</li>
        <li><strong>Intern (Feb – Apr 2025):</strong> Built an enterprise multi-agent summarizer with AutoGen and ChromaDB, reducing manual effort by <strong>~40%</strong>.</li>
      </ul>`,
      actions: [
        { label: 'View Experience Section', href: '#experience' },
        { label: 'Download Resume', href: 'Naveena_s_Resume___16_09_2026.pdf', download: true }
      ]
    },
    finsight: {
      text: `<p><strong>FinSight AI</strong> is Naveena's production agentic system for Tamil Nadu's 121-page Fiscal Management White Paper:</p>
      <ul>
        <li><strong>Section-Aware RAG:</strong> 121 pages split into 223 section-aware chunks keeping chapter and page citations.</li>
        <li><strong>Data Grounding:</strong> 42 structured budget tables in <strong>Neon PostgreSQL</strong> for SQL aggregations.</li>
        <li><strong>Multi-Agent Reasoning:</strong> LangGraph ReAct agent with numeric verification agents checking figures against source budget tables (0.00% discrepancy).</li>
        <li><strong>Full-Stack Frontend:</strong> Built with Next.js/React on Vercel.</li>
      </ul>`,
      actions: [
        { label: 'Launch FinSight Live', href: 'https://finsight-ai-sage.vercel.app/', external: true },
        { label: 'View Agent Trace Demo', href: '#sandbox' }
      ]
    },
    churn: {
      text: `<p><strong>Customer Churn Prediction with MLOps:</strong></p>
      <ul>
        <li>Trained and evaluated on <strong>7,000+ Telco records</strong>.</li>
        <li>Compared multiple classifiers; Logistic Regression achieved the strongest balance of accuracy and explainability (<strong>ROC-AUC 0.845, F1 0.61</strong>).</li>
        <li>Tracked experiments and model versioning via <strong>MLflow</strong>; containerized with <strong>Docker</strong> and served via <strong>FastAPI</strong> for batch inference.</li>
      </ul>`,
      actions: [
        { label: 'View Projects Section', href: '#projects' }
      ]
    },
    education: {
      text: `<p>Naveena's academic credentials:</p>
      <ul>
        <li><strong>IIT Madras:</strong> B.S. in Data Science <em>(ongoing online degree program covering advanced statistics, ML, and programming)</em>.</li>
        <li><strong>Jeppiaar Engineering College (2025):</strong> B.Tech in Artificial Intelligence & Data Science.</li>
        <li><strong>IIITDM Chennai (2022):</strong> Data Analytics Research Intern; built predictive ML models on photon emission datasets with 87% shelf-life estimation accuracy.</li>
      </ul>`,
      actions: [
        { label: 'View Education Section', href: '#education' }
      ]
    },
    skills: {
      text: `<p>Naveena's core technical toolkit:</p>
      <ul>
        <li><strong>Agentic AI:</strong> LangGraph, AutoGen, LlamaIndex, MCP, ReAct loops, ChromaDB.</li>
        <li><strong>Machine Learning:</strong> Python, PyTorch, Scikit-Learn, XGBoost, OpenCV, Pandas, NumPy.</li>
        <li><strong>MLOps & Cloud:</strong> Docker, FastAPI, MLflow, AWS EC2 & S3, CI/CD.</li>
        <li><strong>Databases:</strong> PostgreSQL (Neon), Snowflake, SQL.</li>
        <li><strong>Full-Stack:</strong> React & Next.js (currently learning to build full-stack AI apps).</li>
      </ul>`,
      actions: [
        { label: 'Explore Skills Matrix', href: '#skills' }
      ]
    },
    resume: {
      text: `<p>You can download Naveena's verified resume right here. It includes all verified metrics, MResult roles, and project architectures.</p>`,
      actions: [
        { label: 'Download Resume (PDF)', href: 'Naveena_s_Resume___16_09_2026.pdf', download: true }
      ]
    },
    contact: {
      text: `<p>Naveena is actively <strong>open to AI/ML engineering roles</strong>:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:navirajan2003@gmail.com">navirajan2003@gmail.com</a></li>
        <li><strong>Location:</strong> Bangalore, Karnataka, India</li>
        <li><strong>GitHub:</strong> <a href="https://github.com/naveena0308" target="_blank" rel="noopener noreferrer">github.com/naveena0308</a></li>
      </ul>`,
      actions: [
        { label: 'Send Direct Email', href: 'mailto:navirajan2003@gmail.com' },
        { label: 'Go to Contact Form', href: '#contact' }
      ]
    }
  };

  function toggleChat(forceState) {
    if (!chatDrawer || !chatWidget) return;
    const shouldOpen = forceState !== undefined ? forceState : !chatDrawer.classList.contains('open');

    if (shouldOpen) {
      chatDrawer.classList.add('open');
      chatWidget.classList.add('is-open');
      chatDrawer.setAttribute('aria-hidden', 'false');
      if (chatInputField) chatInputField.focus();
    } else {
      chatDrawer.classList.remove('open');
      chatWidget.classList.remove('is-open');
      chatDrawer.setAttribute('aria-hidden', 'true');
    }
  }

  if (chatLauncherBtn) {
    chatLauncherBtn.addEventListener('click', () => toggleChat());
  }

  if (btnCloseChat) {
    btnCloseChat.addEventListener('click', () => toggleChat(false));
  }

  if (btnResetChat) {
    btnResetChat.addEventListener('click', () => {
      if (!chatMessages) return;
      chatMessages.innerHTML = `
        <div class="chat-bubble chat-bubble-bot">
          <div class="chat-bubble-avatar">
            <img src="avatar_stylized.jpg" alt="Navi">
          </div>
          <div class="chat-bubble-content">
            <p>Conversation reset. I'm <strong>Navi</strong>, Naveena's portfolio copilot with instant intent caching and AI generative fallback.</p>
            <p>Pick a topic or ask a custom question!</p>
          </div>
        </div>
      `;
    });
  }

  function appendUserBubble(text) {
    if (!chatMessages) return;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble chat-bubble-user';
    bubble.innerHTML = `
      <div class="chat-bubble-content">
        <p class="chat-user-text">${escapeHtml(text)}</p>
      </div>
    `;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function appendBotBubble(htmlContent, actions = []) {
    if (!chatMessages) return;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble chat-bubble-bot';

    let actionsHtml = '';
    if (actions && actions.length > 0) {
      actionsHtml = `<div class="chat-action-pills">` + actions.map(act => {
        const downloadAttr = act.download ? 'download="Naveena_N_Resume.pdf"' : '';
        const targetAttr = act.external ? 'target="_blank" rel="noopener noreferrer"' : '';
        let iconClass = 'fa-solid fa-arrow-right';
        if (act.download) iconClass = 'fa-solid fa-file-arrow-down';
        else if (act.href && act.href.startsWith('mailto:')) iconClass = 'fa-solid fa-envelope';
        else if (act.external) iconClass = 'fa-solid fa-arrow-up-right-from-square';

        return `<a href="${act.href}" class="chat-action-link" ${downloadAttr} ${targetAttr}><i class="${iconClass}"></i> ${act.label}</a>`;
      }).join('') + `</div>`;
    }

    bubble.innerHTML = `
      <div class="chat-bubble-avatar">
        <img src="avatar_stylized.jpg" alt="Navi">
      </div>
      <div class="chat-bubble-content">
        ${htmlContent}
        ${actionsHtml}
      </div>
    `;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Attach click listeners to in-chat hash navigation
    bubble.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          toggleChat(false);
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function showTyping(show) {
    if (!chatTypingIndicator) return;
    if (show) {
      chatTypingIndicator.classList.remove('hidden');
      if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
    } else {
      chatTypingIndicator.classList.add('hidden');
    }
  }

  // Hybrid Intent Classifier
  function classifyIntent(input) {
    const q = input.toLowerCase().trim();

    if (q.match(/\b(mresult|work|job|experience|career|associate|intern|trainee|company)\b/)) return 'experience';
    if (q.match(/\b(finsight|rag|white paper|budget|fiscal|tamil nadu|chunks|table|react agent)\b/)) return 'finsight';
    if (q.match(/\b(churn|telco|roc|auc|mlops|fastapi|mlflow|docker|classifier)\b/)) return 'churn';
    if (q.match(/\b(iit|madras|jeppiaar|college|degree|education|b\.?tech|b\.?s|university|study)\b/)) return 'education';
    if (q.match(/\b(skill|stack|tools|python|langgraph|autogen|mcp|pytorch|react|next\.?js)\b/)) return 'skills';
    if (q.match(/\b(resume|cv|download|pdf|profile)\b/)) return 'resume';
    if (q.match(/\b(contact|email|reach|hire|role|location|bangalore|talk)\b/)) return 'contact';

    return null;
  }

  async function handleUserQuery(queryText) {
    if (!queryText || !queryText.trim()) return;

    appendUserBubble(queryText);
    showTyping(true);

    const intent = classifyIntent(queryText);

    // LEVEL 1: High-Confidence Intent Match (0ms cached execution)
    if (intent && hybridKnowledge[intent]) {
      setTimeout(() => {
        showTyping(false);
        const data = hybridKnowledge[intent];
        appendBotBubble(data.text, data.actions);
      }, 350);
      return;
    }

    // LEVEL 2 & 3: Generative Serverless Fallback (/api/chat) or Grounded Knowledge Synthesis
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply && !data.fallback) {
          showTyping(false);
          appendBotBubble(`<p>${escapeHtml(data.reply)}</p>`, [
            { label: 'Download Resume', href: 'Naveena_s_Resume___16_09_2026.pdf', download: true },
            { label: 'Contact Naveena', href: 'mailto:navirajan2003@gmail.com' }
          ]);
          return;
        }
      }
    } catch (err) {
      // Offline / Static local dev mode
    }

    // Client-side Grounded Synthesis Fallback (Guaranteed response without error)
    setTimeout(() => {
      showTyping(false);
      appendBotBubble(
        `<p>I am grounded in Naveena's production agentic pipelines, RAG architecture, and ML engineering background.</p>
         <p>You can ask me about her <strong>MResult experience</strong>, the <strong>FinSight AI</strong> pipeline, her <strong>churn MLOps model</strong>, or her <strong>IIT Madras degree</strong>.</p>
         <p>For custom inquiries, you can also reach Naveena directly!</p>`,
        [
          { label: 'Email Naveena Directly', href: 'mailto:navirajan2003@gmail.com' },
          { label: 'Download Resume', href: 'Naveena_s_Resume___16_09_2026.pdf', download: true }
        ]
      );
    }, 450);
  }

  // Handle Quick Chips Click
  chatChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const intentKey = chip.getAttribute('data-intent');
      const chipText = chip.getAttribute('data-label') || chip.textContent.trim();

      appendUserBubble(chipText);
      showTyping(true);

      setTimeout(() => {
        showTyping(false);
        if (hybridKnowledge[intentKey]) {
          const data = hybridKnowledge[intentKey];
          appendBotBubble(data.text, data.actions);
        }
      }, 300);
    });
  });

  // Handle Input Form Submission
  if (chatInputForm && chatInputField) {
    chatInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInputField.value.trim();
      if (!val) return;
      chatInputField.value = '';
      handleUserQuery(val);
    });
  }

  // ==========================================================================
  // 10. TYPOGRAPHY SWITCHER CONTROLLER
  // ==========================================================================
  const fontButtons = document.querySelectorAll('.font-btn');
  const savedFont = localStorage.getItem('portfolio-font') || 'inter';

  function applyFont(fontKey) {
    document.documentElement.setAttribute('data-font', fontKey);
    document.body.setAttribute('data-font', fontKey);
    localStorage.setItem('portfolio-font', fontKey);

    fontButtons.forEach(btn => {
      if (btn.getAttribute('data-font-target') === fontKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Initialize default / saved font
  applyFont(savedFont);

  fontButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetFont = btn.getAttribute('data-font-target');
      if (targetFont) applyFont(targetFont);
    });
  });

});
