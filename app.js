/**
 * Core Application Logic for CareerVantage Job & Placement Prep Portal
 */

// Application State
const state = {
  activeTab: 'jobs',
  activePrepTab: 'quant',
  jobs: [...INITIAL_JOBS],
  bookmarks: JSON.parse(localStorage.getItem('cv_bookmarks') || '[]'),
  applications: JSON.parse(localStorage.getItem('cv_applications') || '[]'),
  solvedDSA: new Set(JSON.parse(localStorage.getItem('cv_solved_dsa') || '[]')),
  dsaNotes: JSON.parse(localStorage.getItem('cv_dsa_notes') || '{}'),
  quizScores: { correct: 0, total: 0 },
  selectedJob: null,
  selectedCompany: null,
  selectedDSA: null,
  activeDSACodeLang: 'cpp'
};

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  loadCustomJobs();
  initTheme();
  setupNavigation();
  setupJobFilters();
  setupDsaFilters();
  setupCompanyFilters();
  renderAll();
});

// Load any custom jobs posted by user
function loadCustomJobs() {
  const savedCustom = JSON.parse(localStorage.getItem('cv_custom_jobs') || '[]');
  if (savedCustom && savedCustom.length > 0) {
    state.jobs = [...savedCustom, ...INITIAL_JOBS];
  }
}

// Theme handling (Light / Dark)
function initTheme() {
  const savedTheme = localStorage.getItem('cv_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cv_theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Toast notification helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  const icon = type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 200);
  }, 3200);
}

// Top navigation & Sub-navigation setup
function setupNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      switchTab(target);
    });
  });

  // Mobile menu toggle
  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobileNavDrawer');
    if (mobileMenu) {
      mobileMenu.classList.toggle('active');
    }
  });

  // Post Job modal triggers
  document.getElementById('postJobNavBtn')?.addEventListener('click', () => openModal('postJobModal'));
  document.getElementById('postJobHeroBtn')?.addEventListener('click', () => openModal('postJobModal'));

  // Prep Hub Sub-tab switching
  const prepSubBtns = document.querySelectorAll('.prep-tab-btn');
  prepSubBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      prepSubBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const subtarget = btn.dataset.subtarget;
      state.activePrepTab = subtarget;
      document.querySelectorAll('.prep-subview').forEach(view => view.classList.remove('active'));
      const activeView = document.getElementById(`prepView_${subtarget}`);
      if (activeView) activeView.classList.add('active');
    });
  });
}

function switchTab(tabId) {
  state.activeTab = tabId;
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.target === tabId);
  });
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === `section_${tabId}`);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render everything
function renderAll() {
  renderStats();
  renderJobs();
  renderApplicationsAndBookmarks();
  renderAptitudePrep();
  renderTechnicalPrep();
  renderHrPrep();
  renderCompanies();
  renderDsaSheet();
  updateDsaProgress();
}

// ----------------------------------------------------
// 1. STATS STRIP
// ----------------------------------------------------
function renderStats() {
  const totalJobsEl = document.getElementById('statTotalJobs');
  const totalCompaniesEl = document.getElementById('statTotalCompanies');
  const dsaSolvedEl = document.getElementById('statDsaSolved');
  const appsCountEl = document.getElementById('statAppsCount');

  if (totalJobsEl) totalJobsEl.textContent = state.jobs.length;
  if (totalCompaniesEl) totalCompaniesEl.textContent = COMPANIES_DATA.length;
  if (dsaSolvedEl) dsaSolvedEl.textContent = `${state.solvedDSA.size} / ${DSA_SHEET_DATA.length}`;
  if (appsCountEl) appsCountEl.textContent = state.applications.length;

  // Header badges
  const appBadge = document.getElementById('navAppsBadge');
  if (appBadge) appBadge.textContent = state.applications.length + state.bookmarks.length;
}

// ----------------------------------------------------
// 2. JOB PORTAL
// ----------------------------------------------------
function setupJobFilters() {
  const searchInput = document.getElementById('jobSearchInput');
  const locationSelect = document.getElementById('jobLocationSelect');
  const expSelect = document.getElementById('jobExpSelect');
  const typeSelect = document.getElementById('jobTypeSelect');

  const triggerFilter = () => renderJobs();
  searchInput?.addEventListener('input', triggerFilter);
  locationSelect?.addEventListener('change', triggerFilter);
  expSelect?.addEventListener('change', triggerFilter);
  typeSelect?.addEventListener('change', triggerFilter);

  // Post Job form submission
  document.getElementById('postJobForm')?.addEventListener('submit', handlePostJob);
  // Apply Job form submission
  document.getElementById('applyJobForm')?.addEventListener('submit', handleApplyJob);
}

function renderJobs() {
  const grid = document.getElementById('jobGridContainer');
  if (!grid) return;

  const searchQuery = (document.getElementById('jobSearchInput')?.value || '').toLowerCase().trim();
  const locVal = document.getElementById('jobLocationSelect')?.value || 'all';
  const expVal = document.getElementById('jobExpSelect')?.value || 'all';
  const typeVal = document.getElementById('jobTypeSelect')?.value || 'all';

  const filtered = state.jobs.filter(job => {
    const matchesQuery = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery) ||
      job.company.toLowerCase().includes(searchQuery) ||
      job.skillsRequired.some(s => s.toLowerCase().includes(searchQuery)) ||
      job.tags.some(t => t.toLowerCase().includes(searchQuery));

    const matchesLoc = locVal === 'all' || job.location.toLowerCase().includes(locVal.toLowerCase());
    const matchesExp = expVal === 'all' || job.experience.toLowerCase().includes(expVal.toLowerCase());
    const matchesType = typeVal === 'all' || job.type.toLowerCase().includes(typeVal.toLowerCase());

    return matchesQuery && matchesLoc && matchesExp && matchesType;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: 16px; border: 1px dashed var(--border-color);">
        <p style="font-size: 1.3rem; font-weight: 700; margin-bottom: 8px;">No matching job postings found</p>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Try adjusting your keywords or filters to see more opportunities.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(job => {
    const isBookmarked = state.bookmarks.includes(job.id);
    const hasApplied = state.applications.some(a => a.jobId === job.id);

    return `
      <div class="job-card" data-id="${job.id}">
        <div class="job-card-header">
          <img src="${job.logo}" alt="${job.company} logo" class="company-logo" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'">
          <div class="job-header-info">
            <h3 class="job-title">${escapeHtml(job.title)}</h3>
            <div class="job-company">${escapeHtml(job.company)} • <span style="color: var(--text-light); font-size: 0.8rem;">${job.postedDate}</span></div>
          </div>
          <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark('${job.id}')" title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Job'}">
            ${isBookmarked ? '❤️' : '🤍'}
          </button>
        </div>

        <div class="job-details-pills">
          <span class="pill pill-salary">💰 ${escapeHtml(job.salary)}</span>
          <span class="pill">📍 ${escapeHtml(job.location)}</span>
          <span class="pill">💼 ${escapeHtml(job.type)}</span>
          <span class="pill">⏳ ${escapeHtml(job.experience)}</span>
        </div>

        <p class="job-snippet">${escapeHtml(job.description)}</p>

        <div class="job-tags">
          ${job.tags.slice(0, 4).map(tag => `<span class="tag-badge">${escapeHtml(tag)}</span>`).join('')}
        </div>

        <div class="job-card-actions">
          <button class="btn-secondary" onclick="viewJobDetails('${job.id}')">View Details</button>
          <button class="btn-primary" onclick="openApplyModal('${job.id}')" ${hasApplied ? 'style="background: var(--success);"' : ''}>
            ${hasApplied ? 'Applied ✓' : 'Apply Now ➔'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function toggleBookmark(jobId) {
  if (state.bookmarks.includes(jobId)) {
    state.bookmarks = state.bookmarks.filter(id => id !== jobId);
    showToast('Job removed from bookmarks');
  } else {
    state.bookmarks.push(jobId);
    showToast('Job saved to your bookmarks!', 'success');
  }
  localStorage.setItem('cv_bookmarks', JSON.stringify(state.bookmarks));
  renderJobs();
  renderApplicationsAndBookmarks();
  renderStats();
}

function viewJobDetails(jobId) {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  state.selectedJob = job;

  const content = document.getElementById('jobDetailModalContent');
  if (!content) return;

  const hasApplied = state.applications.some(a => a.jobId === job.id);

  content.innerHTML = `
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
      <img src="${job.logo}" alt="${job.company}" style="width: 54px; height: 54px; border-radius: 12px; object-fit: contain; background: white; padding: 6px; border: 1px solid var(--border-color);">
      <div>
        <h2 style="font-size: 1.4rem; font-weight: 800;">${escapeHtml(job.title)}</h2>
        <p style="color: var(--text-muted); font-weight: 600;">${escapeHtml(job.company)} • ${escapeHtml(job.location)}</p>
      </div>
    </div>

    <div class="job-details-pills" style="margin-bottom: 20px;">
      <span class="pill pill-salary">💰 ${escapeHtml(job.salary)}</span>
      <span class="pill">💼 ${escapeHtml(job.type)}</span>
      <span class="pill">⏳ ${escapeHtml(job.experience)}</span>
      <span class="pill">📅 Deadline: ${job.deadline}</span>
    </div>

    <h4 style="font-weight: 700; margin-bottom: 8px;">Role Overview</h4>
    <p style="color: var(--text-muted); margin-bottom: 20px; line-height: 1.6;">${escapeHtml(job.description)}</p>

    <h4 style="font-weight: 700; margin-bottom: 8px;">Eligibility Criteria</h4>
    <div style="background: var(--bg-subtle); padding: 14px; border-radius: 10px; margin-bottom: 20px;">
      <p><strong>Degree:</strong> ${escapeHtml(job.eligibility.degree)}</p>
      <p><strong>Target Batches:</strong> ${escapeHtml(job.eligibility.batch)}</p>
      <p><strong>CGPA / Criteria:</strong> ${escapeHtml(job.eligibility.cgpa)}</p>
    </div>

    <h4 style="font-weight: 700; margin-bottom: 8px;">Key Responsibilities</h4>
    <ul style="padding-left: 20px; margin-bottom: 20px; color: var(--text-muted); line-height: 1.6;">
      ${job.responsibilities.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
    </ul>

    <h4 style="font-weight: 700; margin-bottom: 8px;">Hiring Process Rounds</h4>
    <ol style="padding-left: 20px; margin-bottom: 24px; color: var(--text-muted); line-height: 1.6;">
      ${job.rounds.map(r => `<li><strong>${escapeHtml(r)}</strong></li>`).join('')}
    </ol>

    <div style="display: flex; gap: 12px; margin-top: 10px;">
      <button class="btn-primary" style="flex: 1;" onclick="closeModal('jobDetailModal'); openApplyModal('${job.id}');" ${hasApplied ? 'disabled style="background: var(--success);"' : ''}>
        ${hasApplied ? 'Already Applied' : 'Proceed to Apply Now ➔'}
      </button>
    </div>
  `;

  openModal('jobDetailModal');
}

function openApplyModal(jobId) {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  state.selectedJob = job;

  document.getElementById('applyJobTitle').textContent = `Apply for ${job.title} at ${job.company}`;
  document.getElementById('applyJobIdInput').value = job.id;
  openModal('applyJobModal');
}

function handleApplyJob(e) {
  e.preventDefault();
  const jobId = document.getElementById('applyJobIdInput').value;
  const name = document.getElementById('applicantName').value.trim();
  const email = document.getElementById('applicantEmail').value.trim();
  const college = document.getElementById('applicantCollege').value.trim();
  const batch = document.getElementById('applicantBatch').value;
  const resumeLink = document.getElementById('applicantResume').value.trim();
  const notes = document.getElementById('applicantNote').value.trim();

  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;

  const newApp = {
    id: 'app-' + Date.now(),
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    appliedDate: new Date().toLocaleDateString(),
    status: 'Application Submitted',
    applicant: { name, email, college, batch, resumeLink, notes }
  };

  state.applications.unshift(newApp);
  localStorage.setItem('cv_applications', JSON.stringify(state.applications));

  closeModal('applyJobModal');
  showToast(`Application successfully sent to ${job.company}!`, 'success');
  renderJobs();
  renderApplicationsAndBookmarks();
  renderStats();
}

function handlePostJob(e) {
  e.preventDefault();
  const title = document.getElementById('newJobTitle').value.trim();
  const company = document.getElementById('newJobCompany').value.trim();
  const location = document.getElementById('newJobLocation').value.trim();
  const type = document.getElementById('newJobType').value;
  const exp = document.getElementById('newJobExp').value;
  const salary = document.getElementById('newJobSalary').value.trim();
  const tagsStr = document.getElementById('newJobTags').value.trim();
  const description = document.getElementById('newJobDesc').value.trim();

  const newJob = {
    id: 'job-custom-' + Date.now(),
    title,
    company,
    logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    location,
    type,
    experience: exp,
    salary,
    category: 'Software Engineering',
    postedDate: 'Just now',
    deadline: '2026-12-31',
    tags: tagsStr ? tagsStr.split(',').map(s => s.trim()) : ['Tech', 'Hiring'],
    description,
    eligibility: {
      degree: 'B.Tech / B.E / MCA / Equivalent',
      batch: '2025, 2026 Batch',
      cgpa: '6.0+ CGPA'
    },
    responsibilities: [
      'Contribute to core feature implementation and code reviews.',
      'Collaborate with product and QA squads.'
    ],
    skillsRequired: tagsStr ? tagsStr.split(',').map(s => s.trim()) : ['Programming'],
    rounds: ['Online Assessment', 'Technical Interview', 'HR Interview']
  };

  const savedCustom = JSON.parse(localStorage.getItem('cv_custom_jobs') || '[]');
  savedCustom.unshift(newJob);
  localStorage.setItem('cv_custom_jobs', JSON.stringify(savedCustom));

  state.jobs.unshift(newJob);
  closeModal('postJobModal');
  showToast('New job opportunity posted live!', 'success');
  renderJobs();
  renderStats();
}

// ----------------------------------------------------
// 3. APPLICATIONS & SAVED JOBS VIEW
// ----------------------------------------------------
function renderApplicationsAndBookmarks() {
  const appsContainer = document.getElementById('myApplicationsContainer');
  const bookmarksContainer = document.getElementById('myBookmarksContainer');

  // Render Applications
  if (appsContainer) {
    if (state.applications.length === 0) {
      appsContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.95rem;">You haven't submitted any applications yet. Explore openings and apply!</p>`;
    } else {
      appsContainer.innerHTML = state.applications.map(app => `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 18px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--card-shadow);">
          <div>
            <h4 style="font-weight: 700; font-size: 1.05rem;">${escapeHtml(app.jobTitle)}</h4>
            <p style="color: var(--text-muted); font-size: 0.88rem;">${escapeHtml(app.company)} • Applied on ${app.appliedDate}</p>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="badge-pill badge-primary" style="background: #e0e7ff; color: #4338ca; padding: 6px 12px; font-size: 0.82rem;">${app.status}</span>
          </div>
        </div>
      `).join('');
    }
  }

  // Render Bookmarked Jobs
  if (bookmarksContainer) {
    const bookmarkedList = state.jobs.filter(j => state.bookmarks.includes(j.id));
    if (bookmarkedList.length === 0) {
      bookmarksContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.95rem;">No saved jobs yet. Click the heart icon on any job card to save it here.</p>`;
    } else {
      bookmarksContainer.innerHTML = bookmarkedList.map(job => `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <img src="${job.logo}" alt="${job.company}" style="width: 36px; height: 36px; border-radius: 8px; object-fit: contain;">
            <div>
              <h4 style="font-weight: 700; font-size: 0.98rem;">${escapeHtml(job.title)}</h4>
              <p style="color: var(--text-muted); font-size: 0.82rem;">${escapeHtml(job.company)} • ${escapeHtml(job.location)}</p>
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-primary" style="padding: 6px 14px; font-size: 0.82rem;" onclick="viewJobDetails('${job.id}')">View & Apply</button>
            <button class="btn-secondary" style="padding: 6px 10px; font-size: 0.82rem; color: var(--danger);" onclick="toggleBookmark('${job.id}')">✕</button>
          </div>
        </div>
      `).join('');
    }
  }
}

// ----------------------------------------------------
// 4. PREPARATION HUB: APTITUDE
// ----------------------------------------------------
function renderAptitudePrep() {
  const container = document.getElementById('aptitudeContainer');
  if (!container) return;

  const sections = ['quantitative', 'logical', 'verbal'];

  container.innerHTML = sections.map(secKey => {
    const data = APTITUDE_DATA[secKey];
    return `
      <div class="prep-card">
        <div class="prep-card-header">
          <div class="prep-card-title">
            <span>${secKey === 'quantitative' ? '🧮' : secKey === 'logical' ? '🧩' : '📖'}</span>
            ${data.title}
          </div>
          <span class="badge-pill badge-primary">${data.topics.length} Key Topics</span>
        </div>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">${data.description}</p>

        <!-- Topic Accordions & Formulas -->
        <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px;">
          ${data.topics.map(topic => `
            <details style="background: var(--bg-subtle); border-radius: 10px; padding: 14px 18px; border: 1px solid var(--border-color);">
              <summary style="font-weight: 700; font-size: 1.02rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                <span>${escapeHtml(topic.name)}</span>
                <span style="font-size: 0.82rem; color: var(--primary); font-weight: 600;">Formula Cheat Sheet ▾</span>
              </summary>
              <div style="margin-top: 14px; pt-2;">
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 12px;">${topic.summary}</p>
                <div class="cheat-sheet-box">
                  <strong style="color: var(--primary); font-size: 0.85rem; text-transform: uppercase;">Key Formulas & Rules:</strong>
                  <ul>
                    ${topic.formulaCheatSheet.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </details>
          `).join('')}
        </div>

        <!-- Practice Problem Arena -->
        <h4 style="font-weight: 700; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
          <span>🎯</span> Practice Arena (${data.practiceProblems.length} Exam Problems)
        </h4>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${data.practiceProblems.map(p => `
            <div class="quiz-card" id="quizCard_${p.id}">
              <div class="quiz-question">${escapeHtml(p.question)}</div>
              <div class="quiz-options">
                ${p.options.map((opt, optIdx) => `
                  <div class="quiz-option" onclick="handleQuizAnswer('${p.id}', ${optIdx}, ${p.correctIndex})">
                    <span>${String.fromCharCode(65 + optIdx)}. ${escapeHtml(opt)}</span>
                  </div>
                `).join('')}
              </div>
              <div class="quiz-explanation" id="expl_${p.id}">
                <strong>Explanation:</strong><br>
                ${escapeHtml(p.explanation)}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function handleQuizAnswer(problemId, selectedIdx, correctIdx) {
  const card = document.getElementById(`quizCard_${problemId}`);
  if (!card) return;

  const options = card.querySelectorAll('.quiz-option');
  options.forEach((opt, idx) => {
    opt.style.pointerEvents = 'none';
    if (idx === correctIdx) {
      opt.classList.add('selected-correct');
    } else if (idx === selectedIdx) {
      opt.classList.add('selected-wrong');
    }
  });

  const expl = document.getElementById(`expl_${problemId}`);
  if (expl) expl.style.display = 'block';

  if (selectedIdx === correctIdx) {
    showToast('Correct Answer! 🎉', 'success');
  } else {
    showToast('Incorrect. Check the explanation below.', 'error');
  }
}

// ----------------------------------------------------
// 5. PREPARATION HUB: TECHNICAL CS
// ----------------------------------------------------
function renderTechnicalPrep() {
  const container = document.getElementById('technicalContainer');
  if (!container) return;

  container.innerHTML = TECHNICAL_DATA.map(tech => `
    <div class="prep-card">
      <div class="prep-card-header">
        <div class="prep-card-title">
          <span>💻</span> ${escapeHtml(tech.title)}
        </div>
        <span class="badge-pill badge-primary">${tech.category}</span>
      </div>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;">${tech.summary}</p>

      <!-- Quick Revision Cheat Sheet -->
      <div class="cheat-sheet-box" style="border-left-color: var(--primary);">
        <strong style="color: var(--primary); font-size: 0.85rem; text-transform: uppercase;">Quick Revision Flashcards:</strong>
        <ul>
          ${tech.cheatSheet.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
        </ul>
      </div>

      <!-- Top Interview Questions -->
      <h4 style="font-weight: 700; margin: 20px 0 12px; display: flex; align-items: center; gap: 8px;">
        <span>🔥</span> High-Frequency Interview Questions & Solutions
      </h4>

      <div style="display: flex; flex-direction: column; gap: 14px;">
        ${tech.interviewQuestions.map(q => `
          <details style="background: var(--bg-subtle); border-radius: 10px; padding: 14px 18px; border: 1px solid var(--border-color);">
            <summary style="font-weight: 600; cursor: pointer; color: var(--text-main);">
              ${escapeHtml(q.question)}
            </summary>
            <div style="margin-top: 14px; font-size: 0.92rem; line-height: 1.6; color: var(--text-muted); white-space: pre-line;">
              ${escapeHtml(q.answer)}
            </div>
          </details>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ----------------------------------------------------
// 6. PREPARATION HUB: HR BEHAVIORAL
// ----------------------------------------------------
function renderHrPrep() {
  const container = document.getElementById('hrContainer');
  if (!container) return;

  container.innerHTML = `
    <!-- Frameworks -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 28px;">
      ${HR_DATA.frameworks.map(fw => `
        <div class="prep-card" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <h3 style="font-weight: 700; font-size: 1.15rem;">${escapeHtml(fw.name)}</h3>
            <span class="hr-eval-badge">${escapeHtml(fw.badge)}</span>
          </div>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">${escapeHtml(fw.description)}</p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${fw.steps.map(s => `
              <div style="background: var(--bg-subtle); padding: 10px 14px; border-radius: 8px; font-size: 0.88rem; display: flex; gap: 12px;">
                <span style="font-weight: 800; color: var(--primary);">${s.letter}</span>
                <div>
                  <strong>${escapeHtml(s.title)}:</strong> ${escapeHtml(s.tip)}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- High Frequency Questions -->
    <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 18px;">Top Behavioral Questions with Ideal Answers</h3>
    <div style="display: flex; flex-direction: column; gap: 18px;">
      ${HR_DATA.questions.map(q => `
        <div class="hr-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="font-size: 1.15rem; font-weight: 700;">${escapeHtml(q.question)}</h4>
            <span class="badge-pill badge-primary">${escapeHtml(q.category)}</span>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 10px;">
            <strong>What Interviewers Evaluate:</strong> ${escapeHtml(q.whatTheyEvaluate)}
          </p>
          <p style="font-size: 0.88rem; color: var(--primary); font-weight: 600; margin-bottom: 14px;">
            <strong>Structure:</strong> ${escapeHtml(q.idealStructure)}
          </p>

          <details>
            <summary style="font-weight: 600; color: var(--primary); cursor: pointer; margin-bottom: 10px;">
              View Word-by-Word Model Answer ▾
            </summary>
            <div class="model-answer-box">
              ${escapeHtml(q.modelAnswer)}
            </div>
          </details>

          <div style="margin-top: 14px;">
            <strong style="color: var(--danger); font-size: 0.85rem;">⚠️ Pitfalls & Red Flags to Avoid:</strong>
            <ul style="padding-left: 20px; font-size: 0.86rem; color: var(--text-muted); margin-top: 6px;">
              ${q.redFlagsToAvoid.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ----------------------------------------------------
// 7. COMPANY HIRING PROCESS
// ----------------------------------------------------
function setupCompanyFilters() {
  const searchInput = document.getElementById('companySearchInput');
  const tierSelect = document.getElementById('companyTierSelect');

  const triggerFilter = () => renderCompanies();
  searchInput?.addEventListener('input', triggerFilter);
  tierSelect?.addEventListener('change', triggerFilter);
}

function renderCompanies() {
  const grid = document.getElementById('companyGridContainer');
  if (!grid) return;

  const searchQuery = (document.getElementById('companySearchInput')?.value || '').toLowerCase().trim();
  const tierVal = document.getElementById('companyTierSelect')?.value || 'all';

  const filtered = COMPANIES_DATA.filter(comp => {
    const matchesQuery = !searchQuery ||
      comp.name.toLowerCase().includes(searchQuery) ||
      comp.syllabus.some(s => s.toLowerCase().includes(searchQuery));

    const matchesTier = tierVal === 'all' || comp.tier.toLowerCase().includes(tierVal.toLowerCase());
    return matchesQuery && matchesTier;
  });

  grid.innerHTML = filtered.map(comp => `
    <div class="job-card" style="cursor: pointer;" onclick="viewCompanyDetails('${comp.id}')">
      <div class="job-card-header">
        <img src="${comp.logo}" alt="${comp.name}" class="company-logo" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'">
        <div class="job-header-info">
          <h3 class="job-title">${escapeHtml(comp.name)}</h3>
          <span class="badge-pill badge-primary" style="font-size: 0.75rem;">${escapeHtml(comp.tier)}</span>
        </div>
      </div>

      <div class="job-details-pills">
        <span class="pill pill-salary">💰 ${escapeHtml(comp.ctcRange)}</span>
        <span class="pill">📝 ${comp.examPattern.roundsCount} Rounds</span>
        <span class="pill">⏱️ ${comp.examPattern.duration}</span>
      </div>

      <div style="background: var(--bg-subtle); padding: 12px; border-radius: 8px; font-size: 0.85rem; margin-bottom: 14px;">
        <strong>Eligibility:</strong> ${escapeHtml(comp.eligibility.cgpa)}
      </div>

      <div class="job-card-actions" style="margin-top: auto;">
        <button class="btn-primary" style="width: 100%;">View Complete Hiring Blueprint ➔</button>
      </div>
    </div>
  `).join('');
}

function viewCompanyDetails(companyId) {
  const comp = COMPANIES_DATA.find(c => c.id === companyId);
  if (!comp) return;

  const content = document.getElementById('companyDetailModalContent');
  if (!content) return;

  content.innerHTML = `
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
      <img src="${comp.logo}" alt="${comp.name}" style="width: 58px; height: 58px; border-radius: 12px; object-fit: contain; background: white; padding: 6px; border: 1px solid var(--border-color);">
      <div>
        <h2 style="font-size: 1.5rem; font-weight: 800;">${escapeHtml(comp.name)} Hiring Blueprint</h2>
        <p style="color: var(--primary); font-weight: 700;">${escapeHtml(comp.ctcRange)} • ${escapeHtml(comp.tier)}</p>
      </div>
    </div>

    <!-- Eligibility Box -->
    <div style="background: var(--bg-subtle); border-radius: 12px; padding: 16px; margin-bottom: 24px; border: 1px solid var(--border-color);">
      <h4 style="font-weight: 700; margin-bottom: 10px; color: var(--primary);">📋 Eligibility & Cutoffs</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px; font-size: 0.9rem;">
        <div><strong>Degree:</strong> ${escapeHtml(comp.eligibility.degree)}</div>
        <div><strong>CGPA Cutoff:</strong> ${escapeHtml(comp.eligibility.cgpa)}</div>
        <div><strong>Eligible Batches:</strong> ${escapeHtml(comp.eligibility.batch)}</div>
        <div><strong>Academic Gaps:</strong> ${escapeHtml(comp.eligibility.gapAllowed)}</div>
      </div>
    </div>

    <!-- Exam Pattern Breakdown -->
    <h4 style="font-weight: 800; margin-bottom: 14px; font-size: 1.15rem;">Exam Pattern & Round Breakdown (${comp.examPattern.roundsCount} Rounds)</h4>
    <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
      ${comp.examPattern.sections.map((sec, idx) => `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px 18px; box-shadow: var(--card-shadow);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong style="color: var(--text-main); font-size: 0.98rem;">Round ${idx + 1}: ${escapeHtml(sec.name)}</strong>
            <span class="badge-pill badge-primary" style="font-size: 0.74rem;">${escapeHtml(sec.duration)}</span>
          </div>
          <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.5;">${escapeHtml(sec.format)}</p>
        </div>
      `).join('')}
    </div>

    <!-- Detailed Syllabus -->
    <h4 style="font-weight: 800; margin-bottom: 12px; font-size: 1.15rem;">Exam & Interview Syllabus</h4>
    <ul style="padding-left: 20px; margin-bottom: 24px; color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">
      ${comp.syllabus.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
    </ul>

    <!-- Insider Tips -->
    <div class="cheat-sheet-box" style="border-left-color: var(--accent); margin-bottom: 20px;">
      <strong style="color: var(--accent); font-size: 0.9rem; text-transform: uppercase;">💡 Insider Strategy & Interview Tips:</strong>
      <ul style="margin-top: 8px;">
        ${comp.tips.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
      </ul>
    </div>
  `;

  openModal('companyDetailModal');
}

// ----------------------------------------------------
// 8. DEDICATED DSA SHEET
// ----------------------------------------------------
function setupDsaFilters() {
  const searchInput = document.getElementById('dsaSearchInput');
  const topicSelect = document.getElementById('dsaTopicSelect');
  const diffSelect = document.getElementById('dsaDiffSelect');

  const trigger = () => renderDsaSheet();
  searchInput?.addEventListener('input', trigger);
  topicSelect?.addEventListener('change', trigger);
  diffSelect?.addEventListener('change', trigger);
}

function updateDsaProgress() {
  const total = DSA_SHEET_DATA.length;
  const solved = state.solvedDSA.size;
  const percent = total > 0 ? Math.round((solved / total) * 100) : 0;

  const bar = document.getElementById('dsaProgressBar');
  const text = document.getElementById('dsaProgressText');
  const pill = document.getElementById('dsaNavPill');

  if (bar) bar.style.width = `${percent}%`;
  if (text) text.textContent = `${solved} of ${total} Solved (${percent}%)`;
  if (pill) pill.textContent = `${percent}%`;
}

function renderDsaSheet() {
  const tbody = document.getElementById('dsaTableBody');
  if (!tbody) return;

  const searchQuery = (document.getElementById('dsaSearchInput')?.value || '').toLowerCase().trim();
  const topicVal = document.getElementById('dsaTopicSelect')?.value || 'all';
  const diffVal = document.getElementById('dsaDiffSelect')?.value || 'all';

  const filtered = DSA_SHEET_DATA.filter(item => {
    const matchesSearch = !searchQuery ||
      item.title.toLowerCase().includes(searchQuery) ||
      item.topic.toLowerCase().includes(searchQuery) ||
      item.companies.some(c => c.toLowerCase().includes(searchQuery));

    const matchesTopic = topicVal === 'all' || item.topic.toLowerCase() === topicVal.toLowerCase();
    const matchesDiff = diffVal === 'all' || item.difficulty.toLowerCase() === diffVal.toLowerCase();

    return matchesSearch && matchesTopic && matchesDiff;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-muted);">
          No DSA problems match your filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    const isDone = state.solvedDSA.has(item.id);
    const diffClass = item.difficulty === 'Easy' ? 'diff-easy' : item.difficulty === 'Medium' ? 'diff-medium' : 'diff-hard';

    return `
      <tr style="${isDone ? 'opacity: 0.75;' : ''}">
        <td style="width: 40px; text-align: center;">
          <input type="checkbox" class="status-checkbox" ${isDone ? 'checked' : ''} onchange="toggleDSASolved('${item.id}', this.checked)">
        </td>
        <td>
          <div style="font-weight: 700; color: ${isDone ? 'var(--text-muted)' : 'var(--text-main)'};">
            ${escapeHtml(item.title)}
          </div>
          <span style="font-size: 0.78rem; color: var(--text-light);">${escapeHtml(item.topic)}</span>
        </td>
        <td>
          <span class="diff-badge ${diffClass}">${item.difficulty}</span>
        </td>
        <td>
          <div style="display: flex; gap: 4px; flex-wrap: wrap;">
            ${item.companies.map(c => `<span class="tag-badge" style="font-size: 0.7rem; padding: 2px 6px;">${escapeHtml(c)}</span>`).join('')}
          </div>
        </td>
        <td style="white-space: nowrap;">
          <a href="${item.leetcodeUrl}" target="_blank" rel="noopener" style="text-decoration: none; color: var(--primary); font-weight: 600; font-size: 0.85rem;">
            Practice ↗
          </a>
        </td>
        <td style="white-space: nowrap;">
          <button class="btn-secondary" style="padding: 6px 12px; font-size: 0.82rem;" onclick="viewDSASolution('${item.id}')">
            Solution & Code
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleDSASolved(id, checked) {
  if (checked) {
    state.solvedDSA.add(id);
    showToast('Problem marked as Solved! 🌟', 'success');
  } else {
    state.solvedDSA.delete(id);
    showToast('Problem marked as Incomplete');
  }
  localStorage.setItem('cv_solved_dsa', JSON.stringify([...state.solvedDSA]));
  updateDsaProgress();
  renderStats();
}

function viewDSASolution(problemId) {
  const item = DSA_SHEET_DATA.find(p => p.id === problemId);
  if (!item) return;
  state.selectedDSA = item;

  const content = document.getElementById('dsaSolutionModalContent');
  if (!content) return;

  content.innerHTML = `
    <div style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
        <h2 style="font-size: 1.4rem; font-weight: 800;">${escapeHtml(item.title)}</h2>
        <span class="diff-badge ${item.difficulty === 'Easy' ? 'diff-easy' : item.difficulty === 'Medium' ? 'diff-medium' : 'diff-hard'}">${item.difficulty}</span>
      </div>
      <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">${escapeHtml(item.description)}</p>
    </div>

    <!-- Intuition & Approach -->
    <div class="cheat-sheet-box" style="border-left-color: var(--secondary); margin-bottom: 20px;">
      <strong style="color: var(--secondary); font-size: 0.88rem; text-transform: uppercase;">Optimal Intuition & Approach:</strong>
      <p style="margin-top: 8px; font-size: 0.92rem; line-height: 1.6;">${escapeHtml(item.intuition)}</p>
    </div>

    <!-- Complexity Metrics -->
    <div style="display: flex; gap: 16px; margin-bottom: 20px; flex-wrap: wrap;">
      <div style="background: var(--bg-subtle); padding: 10px 16px; border-radius: 8px; font-size: 0.88rem;">
        <strong>Time Complexity:</strong> ${escapeHtml(item.timeComplexity)}
      </div>
      <div style="background: var(--bg-subtle); padding: 10px 16px; border-radius: 8px; font-size: 0.88rem;">
        <strong>Space Complexity:</strong> ${escapeHtml(item.spaceComplexity)}
      </div>
    </div>

    <!-- Multi-Language Code Tabs -->
    <div class="code-tab-nav">
      <button class="code-tab-btn ${state.activeDSACodeLang === 'cpp' ? 'active' : ''}" onclick="switchDSACodeLang('cpp')">C++</button>
      <button class="code-tab-btn ${state.activeDSACodeLang === 'java' ? 'active' : ''}" onclick="switchDSACodeLang('java')">Java</button>
      <button class="code-tab-btn ${state.activeDSACodeLang === 'python' ? 'active' : ''}" onclick="switchDSACodeLang('python')">Python 3</button>
      <button style="margin-left: auto; background: transparent; border: none; color: #94a3b8; cursor: pointer; font-size: 0.8rem;" onclick="copyCodeSnippet()">📋 Copy Code</button>
    </div>
    <div class="code-block" id="dsaCodeBlock">${escapeHtml(item.solutions[state.activeDSACodeLang])}</div>
  `;

  openModal('dsaSolutionModal');
}

function switchDSACodeLang(lang) {
  state.activeDSACodeLang = lang;
  if (!state.selectedDSA) return;

  document.querySelectorAll('.code-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase().includes(lang));
  });

  const block = document.getElementById('dsaCodeBlock');
  if (block) {
    block.textContent = state.selectedDSA.solutions[lang];
  }
}

function copyCodeSnippet() {
  if (!state.selectedDSA) return;
  const code = state.selectedDSA.solutions[state.activeDSACodeLang];
  navigator.clipboard.writeText(code).then(() => {
    showToast('Code copied to clipboard! 📋', 'success');
  });
}

// ----------------------------------------------------
// MODAL HELPERS
// ----------------------------------------------------
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modals when clicking outside modal box
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Escape HTML utility to prevent XSS
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
