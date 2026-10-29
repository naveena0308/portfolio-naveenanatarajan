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
    'Agentic AI systems that reason and act.',
    'RAG that cites its sources and checks its math.',
    'Multi-agent workflows with LangGraph & MCP.',
    'Document AI that cuts manual work by 95%.',
    'ML pipelines that ship with MLflow & Docker.'
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
          card.style.display = '';
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
  // 7. CONTACT SECTION: SPOTLIGHT, TABS, INTENT CHIPS, COPY & FORMSPREE
  // ==========================================================================
  
  // Global Toast Notification Helper
  function showToast(msg) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // One-Click Email Copy Handlers
  const copyContactEmailBtn = document.getElementById('copyContactEmailBtn');
  if (copyContactEmailBtn) {
    copyContactEmailBtn.addEventListener('click', () => {
      const email = 'navirajan2003@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const label = copyContactEmailBtn.querySelector('.copy-label');
        const icon = copyContactEmailBtn.querySelector('i');
        if (label) label.textContent = 'Copied!';
        if (icon) icon.className = 'fa-solid fa-check';
        copyContactEmailBtn.classList.add('copied');
        showToast('Email copied: navirajan2003@gmail.com');

        setTimeout(() => {
          if (label) label.textContent = 'Copy';
          if (icon) icon.className = 'fa-regular fa-copy';
          copyContactEmailBtn.classList.remove('copied');
        }, 2200);
      }).catch(() => {
        showToast('navirajan2003@gmail.com');
      });
    });
  }

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
        showToast('Email copied: navirajan2003@gmail.com');

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

  // Spotlight Cursor Tracking on Contact Interactive Card
  const contactInteractiveCard = document.getElementById('contactInteractiveCard');
  if (contactInteractiveCard) {
    contactInteractiveCard.addEventListener('pointermove', (e) => {
      const rect = contactInteractiveCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      contactInteractiveCard.style.setProperty('--spotlight-x', `${x}px`);
      contactInteractiveCard.style.setProperty('--spotlight-y', `${y}px`);
    });
  }

  // Dual Tabs Switcher (Send a Message vs Ask Assistant)
  const tabContactForm = document.getElementById('tabContactForm');
  const tabContactCopilot = document.getElementById('tabContactCopilot');
  const paneContactForm = document.getElementById('paneContactForm');
  const paneContactCopilot = document.getElementById('paneContactCopilot');

  if (tabContactForm && tabContactCopilot && paneContactForm && paneContactCopilot) {
    tabContactForm.addEventListener('click', () => {
      tabContactForm.classList.add('active');
      tabContactForm.setAttribute('aria-selected', 'true');
      tabContactCopilot.classList.remove('active');
      tabContactCopilot.setAttribute('aria-selected', 'false');
      paneContactForm.classList.remove('hidden');
      paneContactCopilot.classList.add('hidden');
    });

    tabContactCopilot.addEventListener('click', () => {
      tabContactCopilot.classList.add('active');
      tabContactCopilot.setAttribute('aria-selected', 'true');
      tabContactForm.classList.remove('active');
      tabContactForm.setAttribute('aria-selected', 'false');
      paneContactCopilot.classList.remove('hidden');
      paneContactForm.classList.add('hidden');
      const embeddedChatLog = document.getElementById('embeddedChatLog');
      if (embeddedChatLog) embeddedChatLog.scrollTop = embeddedChatLog.scrollHeight;
    });
  }

  // "What's this about?" Quick Intent Chips
  const intentChips = document.querySelectorAll('.intent-chip');
  const formTopicInput = document.getElementById('formTopicInput');
  const messageInput = document.getElementById('messageInput');

  intentChips.forEach(chip => {
    chip.addEventListener('click', () => {
      intentChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const intent = chip.getAttribute('data-intent');
      const placeholder = chip.getAttribute('data-placeholder');

      if (formTopicInput) formTopicInput.value = intent;
      if (messageInput && placeholder) {
        messageInput.placeholder = placeholder;
      }
    });
  });

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
      const topic = formTopicInput?.value || 'General Inquiry';

      if (btnSubmitForm) {
        btnSubmitForm.disabled = true;
        btnSubmitForm.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Dispatching to inbox...';
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
            formSuccessMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message was delivered directly to Naveena. She replies within 24 hours.';
          }
          if (btnSubmitForm) {
            btnSubmitForm.innerHTML = '<i class="fa-solid fa-check"></i> Message Dispatched';
            btnSubmitForm.style.background = 'var(--color-emerald)';
            btnSubmitForm.style.color = '#FFFFFF';
          }
          showToast('Message dispatched to Naveena\'s inbox!');
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
        const mailtoLink = `mailto:navirajan2003@gmail.com?subject=${encodeURIComponent('[' + topic + '] from ' + name)}&body=${encodeURIComponent(message)}%0A%0A— ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
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
      text: `<p>I have <strong>1.5+ years of experience</strong> at <strong>MResult</strong>, engineering agentic AI and document intelligence from ingestion to production:</p>
      <ul>
        <li><strong>Associate (Jan 2026 – Present):</strong> Built GnA Intelligence Engine (agentic AI finance with ReAct &amp; LlamaIndex on AWS EC2), shipped a live Vertex AI avatar guide for logistics, and delivered document classification &amp; extraction pipelines (FastAPI + Snowflake) with MLflow tracking.</li>
        <li><strong>Trainee (Jul – Dec 2025):</strong> Authored an internal white paper on VoxAPI LLM gateway benchmarking (BLEU, ROUGE, BERTScore), and built multimodal computer vision workflows cutting manual effort by <strong>~95%</strong>.</li>
        <li><strong>Intern (Feb – Apr 2025):</strong> Built an enterprise multi-agent summarizer with AutoGen and ChromaDB, cutting manual effort by <strong>40%</strong>.</li>
      </ul>`,
      actions: [
        { label: 'View Experience Section', href: '#experience' },
        { label: 'Download Resume', href: 'Naveena_s_Resume___27_10_2026.pdf', download: true }
      ]
    },
    finsight: {
      text: `<p><strong>FinSight AI</strong> is my production agentic system for Tamil Nadu's 121-page Fiscal Management White Paper:</p>
      <ul>
        <li><strong>Section-Aware RAG:</strong> 121-page white paper parsed with PyMuPDF into 223 section-aware chunks keeping page citations.</li>
        <li><strong>Data Grounding:</strong> 42 relational tables in <strong>Neon PostgreSQL</strong> for SQL query routing.</li>
        <li><strong>Multi-Agent Reasoning:</strong> LangGraph ReAct agent that checks numeric answers against source tables to curb hallucinations.</li>
        <li><strong>Evaluations &amp; Protocol:</strong> <strong>95.6% precision</strong> on a 30-case eval suite, MCP server (4 tools) for Claude Desktop/Cursor, and Gemini &rarr; GPT-4o-mini failover.</li>
      </ul>`,
      actions: [
        { label: 'Launch FinSight Live', href: 'https://finsight-ai-sage.vercel.app/', external: true },
        { label: 'View Project Details', href: '#projects' }
      ]
    },
    churn: {
      text: `<p><strong>Customer Churn Prediction with MLOps:</strong></p>
      <ul>
        <li>Trained and evaluated on <strong>7,000+ telecom records</strong>.</li>
        <li>Compared multiple classifiers; Logistic Regression won at <strong>0.845 ROC-AUC and 0.61 F1</strong> with interpretability.</li>
        <li>Tracked experiments and model versioning via <strong>MLflow</strong>; containerized with <strong>Docker</strong> and served via <strong>FastAPI</strong> for batch inference.</li>
      </ul>`,
      actions: [
        { label: 'View Projects Section', href: '#projects' }
      ]
    },
    education: {
      text: `<p>My academic credentials:</p>
      <ul>
        <li><strong>IIT Madras:</strong> B.S. in Data Science &amp; Applications <em>(ongoing online degree covering statistics, ML pipelines, and application engineering)</em>.</li>
        <li><strong>Jeppiaar Institute of Technology (2021 – 2025):</strong> B.Tech in Artificial Intelligence &amp; Data Science.</li>
      </ul>`,
      actions: [
        { label: 'View Education Section', href: '#experience' }
      ]
    },
    skills: {
      text: `<p>My core technical toolkit:</p>
      <ul>
        <li><strong>Generative AI &amp; Agents:</strong> LangGraph, LangChain, LlamaIndex, AutoGen, MCP, ReAct, RAG.</li>
        <li><strong>Computer Vision &amp; Multimodal:</strong> YOLO, OpenCV, EfficientNet, multimodal layout parsing.</li>
        <li><strong>ML &amp; Model Development:</strong> Python, PyTorch, Scikit-learn, LoRA/QLoRA, NumPy, Pandas.</li>
        <li><strong>MLOps &amp; Cloud:</strong> MLflow, Docker, CI/CD, AWS (S3, EC2), GCP Vertex AI.</li>
        <li><strong>Data &amp; Backend:</strong> PostgreSQL, pgvector, ChromaDB, Snowflake, SQL, FastAPI, Next.js.</li>
      </ul>`,
      actions: [
        { label: 'Explore Skills Matrix', href: '#skills' }
      ]
    },
    availability: {
      text: `<p><strong>Availability &amp; Preferred Locations:</strong></p>
      <p>I am actively <strong>open to AI/ML engineering roles in Bangalore, Chennai, and remote opportunities worldwide</strong>. Currently based in Bangalore, India, and ready for immediate discussions.</p>`,
      actions: [
        { label: 'Email Me Directly', href: 'mailto:navirajan2003@gmail.com' },
        { label: 'Download Resume', href: 'Naveena_s_Resume___27_10_2026.pdf', download: true }
      ]
    },
    resume: {
      text: `<p>You can download my verified resume right here. It includes all verified metrics, MResult roles, and project architectures.</p>`,
      actions: [
        { label: 'Download Resume (PDF)', href: 'Naveena_s_Resume___27_10_2026.pdf', download: true }
      ]
    },
    contact: {
      text: `<p>I am open to AI/ML engineering roles, collaboration, and remote opportunities worldwide:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:navirajan2003@gmail.com">navirajan2003@gmail.com</a></li>
        <li><strong>Location:</strong> Bangalore, India · Open to Chennai &amp; Remote Worldwide</li>
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
            <p>Conversation reset. I'm <strong>Navi</strong>, Naveena's AI copilot with instant intent caching and verified system retrieval.</p>
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

    if (q.match(/\b(availab|relocat|chennai|notice|immediate)\b/)) return 'availability';
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
            { label: 'Download Resume', href: 'Naveena_s_Resume___27_10_2026.pdf', download: true },
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
        `<p>I am grounded in my production agentic pipelines, computer vision workflows, and ML engineering background.</p>
         <p>You can ask me about my <strong>MResult experience</strong>, the <strong>FinSight AI</strong> pipeline, my <strong>churn MLOps model</strong>, or my <strong>IIT Madras degree</strong>.</p>
         <p>For custom inquiries, you can also reach me directly!</p>`,
        [
          { label: 'Email Me Directly', href: 'mailto:navirajan2003@gmail.com' },
          { label: 'Download Resume', href: 'Naveena_s_Resume___27_10_2026.pdf', download: true }
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
  // 10. EMBEDDED CONTACT ASSISTANT (Pane 2: Ask My Assistant)
  // ==========================================================================
  const embeddedChatLog = document.getElementById('embeddedChatLog');
  const embeddedChatForm = document.getElementById('embeddedChatForm');
  const embeddedChatInput = document.getElementById('embeddedChatInput');
  const embeddedSuggestions = document.querySelectorAll('.embedded-sugg-btn');

  function appendEmbeddedMsg(text, isUser = false) {
    if (!embeddedChatLog) return;
    const bubble = document.createElement('div');
    bubble.className = `embedded-bubble ${isUser ? 'embedded-user' : 'embedded-bot'}`;

    if (isUser) {
      bubble.innerHTML = `<div class="embedded-content"><p>${escapeHtml(text)}</p></div>`;
    } else {
      bubble.innerHTML = `
        <div class="embedded-avatar"><img src="avatar_stylized.jpg" alt="Navi"></div>
        <div class="embedded-content">${text}</div>
      `;
    }
    embeddedChatLog.appendChild(bubble);
    embeddedChatLog.scrollTop = embeddedChatLog.scrollHeight;
  }

  function handleEmbeddedQuery(query) {
    if (!query || !query.trim()) return;
    appendEmbeddedMsg(query, true);

    const typingEl = document.createElement('div');
    typingEl.className = 'embedded-bubble embedded-bot';
    typingEl.innerHTML = `
      <div class="embedded-avatar"><img src="avatar_stylized.jpg" alt="Navi"></div>
      <div class="embedded-content"><span class="typing-text"><i class="fa-solid fa-spinner fa-spin"></i> Reasoning...</span></div>
    `;
    embeddedChatLog.appendChild(typingEl);
    embeddedChatLog.scrollTop = embeddedChatLog.scrollHeight;

    const intent = classifyIntent(query);
    setTimeout(() => {
      typingEl.remove();
      if (intent && hybridKnowledge[intent]) {
        const item = hybridKnowledge[intent];
        let html = item.text;
        if (item.actions && item.actions.length > 0) {
          html += `<div style="margin-top:0.4rem;display:flex;gap:0.4rem;flex-wrap:wrap;">`;
          item.actions.forEach(act => {
            const dl = act.download ? 'download="Naveena_N_Resume.pdf"' : '';
            const ext = act.external ? 'target="_blank" rel="noopener noreferrer"' : '';
            html += `<a href="${act.href}" class="chat-action-link" style="font-size:0.75rem;padding:0.25rem 0.6rem;" ${dl} ${ext}>${act.label}</a>`;
          });
          html += `</div>`;
        }
        appendEmbeddedMsg(html, false);
      } else {
        appendEmbeddedMsg(
          `<p>I am grounded in my production agentic AI pipelines, computer vision workflows, and ML background. I am actively open to AI/ML engineering roles in Bangalore, Chennai, and remote worldwide!</p>
           <p>Feel free to send me a message via the other tab or email <a href="mailto:navirajan2003@gmail.com">navirajan2003@gmail.com</a>.</p>`,
          false
        );
      }
    }, 400);
  }

  if (embeddedChatForm && embeddedChatInput) {
    embeddedChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = embeddedChatInput.value.trim();
      if (!val) return;
      embeddedChatInput.value = '';
      handleEmbeddedQuery(val);
    });
  }

  embeddedSuggestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-query') || btn.textContent.trim();
      handleEmbeddedQuery(q);
    });
  });

  // ==========================================================================
  // 11. HERO CARD DYNAMICS: ROTATING KEYWORDS & WAVE BUBBLE
  // ==========================================================================
  const heroKeywordFocus = document.getElementById('heroKeywordFocus');
  const heroKeywordSystems = document.getElementById('heroKeywordSystems');
  const avatarWaveBubble = document.getElementById('avatarWaveBubble');

  // Rotating Keywords Array (3 pairs covering Agentic AI, Vision/Multimodal, Systems/MLOps)
  const keywordPairs = [
    { focus: 'Agentic AI & Vision', systems: 'RAG & MLOps' },
    { focus: 'Computer Vision & Multimodal', systems: 'Pipelines & Evaluation' },
    { focus: 'Autonomous Agents & LLMs', systems: 'FastAPI & Production AI' }
  ];

  let currentPairIndex = 0;
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroKeywordFocus && heroKeywordSystems && !prefersReducedMotion) {
    setInterval(() => {
      // Fade out
      heroKeywordFocus.classList.add('fade-out');
      heroKeywordSystems.classList.add('fade-out');

      setTimeout(() => {
        currentPairIndex = (currentPairIndex + 1) % keywordPairs.length;
        heroKeywordFocus.textContent = keywordPairs[currentPairIndex].focus;
        heroKeywordSystems.textContent = keywordPairs[currentPairIndex].systems;

        // Fade in
        heroKeywordFocus.classList.remove('fade-out');
        heroKeywordSystems.classList.remove('fade-out');
      }, 280);
    }, 3200);
  }

  // Wave Bubble Appear after 2s and Click-to-Scroll to Assistant
  if (avatarWaveBubble) {
    setTimeout(() => {
      avatarWaveBubble.classList.add('visible');
    }, 2000);

    avatarWaveBubble.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      const tabContactCopilot = document.getElementById('tabContactCopilot');
      const embeddedChatInput = document.getElementById('embeddedChatInput');

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Activate Assistant tab
      if (tabContactCopilot) {
        tabContactCopilot.click();
      }

      // Focus input field with a friendly nudge after scrolling completes
      setTimeout(() => {
        if (embeddedChatInput) {
          embeddedChatInput.focus();
        }
      }, 700);
    });
  }

  // Ensure clean typography baseline
  document.documentElement.setAttribute('data-font', 'inter');

});
