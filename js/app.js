// MigrantChild Connect - Main Application Logic
// Mobile-friendly, high-accessibility client prototype

class App {
  constructor() {
    this.lang = localStorage.getItem("mc_lang") || "mr"; // Default Marathi for Maharashtra migrant families
    this.currentScreen = "home";
    this.selectedSchoolId = "sch-1";
    this.activeChildId = "child-1";
    this.viewMode = "list"; // 'list' or 'map'
    this.deviceMode = "phone"; // 'phone' or 'expanded'

    // Load or initialize state
    this.children = this.loadState("mc_children", initialSampleChildren);
    this.schools = sampleSchools;
    this.childcareCentres = sampleChildcareCentres;
    this.isLoggedIn = localStorage.getItem("mc_is_logged_in") === "true";

    // Filter state for schools
    this.filters = {
      search: "",
      distance: "all",
      type: "all",
      medium: "all",
      class: "all"
    };

    // Chat history
    this.chatMessages = [
      {
        sender: "bot",
        textEn: "Namaste! I am your MigrantChild Connect AI Assistant. How can I help you today? You can ask about school admission, missing documents, or safe childcare while working.",
        textMr: "नमस्ते! मी तुमचा मायग्रंट चाईल्ड कनेक्ट AI मदतनीस आहे. मी तुम्हाला कशी मदत करू? तुम्ही शाळा प्रवेश, कागदपत्रे नसणे किंवा कामावर जाताना मुलांची काळजी याविषयी विचारू शकता.",
        textHi: "नमस्ते! मैं आपका माइग्रेंट चाइल्ड कनेक्ट AI सहायक हूँ। आज मैं आपकी क्या सहायता कर सकता हूँ? आप स्कूल दाखिले, छूटे दस्तावेज़ों या बाल देखभाल के बारे में पूछ सकते हैं।"
      }
    ];

    this.init();
  }

  loadState(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  saveState(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  }

  getActiveChild() {
    return this.children.find(c => c.id === this.activeChildId) || this.children[0];
  }

  t(key) {
    const dict = translations[this.lang] || translations["en"];
    return dict[key] || translations["en"][key] || key;
  }

  init() {
    this.bindEvents();
    this.updateLanguageUI();
    this.renderActiveChildSnippet();
    
    // Check if user is logged in
    if (!this.isLoggedIn) {
      this.navigate("login");
    } else {
      this.navigate("home");
    }
  }

  bindEvents() {
    // Language Switcher Buttons
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const selectedLang = e.currentTarget.getAttribute("data-lang");
        this.setLanguage(selectedLang);
      });
    });

    // Bottom Navigation
    document.querySelectorAll(".nav-item").forEach(item => {
      item.addEventListener("click", (e) => {
        const target = e.currentTarget.getAttribute("data-screen");
        if (target) this.navigate(target);
      });
    });

    // Floating Viewport Switcher (Phone vs Desktop)
    const viewToggleBtn = document.getElementById("toggleDeviceFrameBtn");
    if (viewToggleBtn) {
      viewToggleBtn.addEventListener("click", () => {
        const wrapper = document.querySelector(".device-wrapper");
        if (this.deviceMode === "phone") {
          this.deviceMode = "expanded";
          wrapper.classList.add("expanded-view");
          viewToggleBtn.innerHTML = "📱 Phone View";
        } else {
          this.deviceMode = "phone";
          wrapper.classList.remove("expanded-view");
          viewToggleBtn.innerHTML = "💻 Full Screen";
        }
      });
    }

    // Header Emergency 1098 Button
    const headerEmerg = document.getElementById("headerEmergencyBtn");
    if (headerEmerg) {
      headerEmerg.addEventListener("click", () => this.openEmergencyModal());
    }

    // Modal Close buttons
    document.querySelectorAll(".modal-close-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
      });
    });

    // Close modal when tapping outside
    document.querySelectorAll(".modal-overlay").forEach(modal => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
        }
      });
    });
  }

  setLanguage(newLang) {
    this.lang = newLang;
    localStorage.setItem("mc_lang", newLang);
    this.updateLanguageUI();
    
    // Refresh the current active screen
    this.renderScreen(this.currentScreen);
  }

  updateLanguageUI() {
    // Update language button styles
    document.querySelectorAll(".lang-btn").forEach(btn => {
      if (btn.getAttribute("data-lang") === this.lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const translation = this.t(key);
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.setAttribute("placeholder", translation);
      } else {
        el.textContent = translation;
      }
    });

    // Update dynamic sub-header child bar
    this.renderActiveChildSnippet();
  }

  renderActiveChildSnippet() {
    const child = this.getActiveChild();
    const container = document.getElementById("activeChildSnippet");
    if (container && child) {
      container.innerHTML = `
        <div class="child-info-snippet">
          <div class="child-avatar">${child.name.charAt(0)}</div>
          <div>
            <strong>${child.name}</strong> 
            <span style="opacity:0.85; font-size:12px;">(${child.targetClass} • ${child.currentDistrict})</span>
          </div>
        </div>
        <span class="switch-child-link" onclick="app.openSwitchChildModal()">${this.t("switchChild")} ⇄</span>
      `;
    }
  }

  navigate(screenId, params = {}) {
    this.currentScreen = screenId;
    window.assistantManager.stopSpeaking();

    // Toggle active screen visibility
    document.querySelectorAll(".app-screen").forEach(screen => {
      screen.classList.remove("active");
    });

    const targetEl = document.getElementById(`screen-${screenId}`);
    if (targetEl) {
      targetEl.classList.add("active");
    }

    // Update bottom nav highlighting
    document.querySelectorAll(".nav-item").forEach(item => {
      if (item.getAttribute("data-screen") === screenId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Render screen specific dynamic content
    this.renderScreen(screenId, params);
  }

  renderScreen(screenId, params = {}) {
    switch (screenId) {
      case "login":
        this.renderLoginScreen();
        break;
      case "home":
        this.renderHomeScreen();
        break;
      case "schools":
        this.renderSchoolsScreen();
        break;
      case "school-detail":
        if (params.schoolId) this.selectedSchoolId = params.schoolId;
        this.renderSchoolDetailScreen(this.selectedSchoolId);
        break;
      case "documents":
        this.renderDocumentsScreen();
        break;
      case "missing-check":
        if (params.schoolId) this.selectedSchoolId = params.schoolId;
        this.renderMissingCheckScreen(this.selectedSchoolId);
        break;
      case "admission-form":
        if (params.schoolId) this.selectedSchoolId = params.schoolId;
        this.renderAdmissionFormScreen(this.selectedSchoolId);
        break;
      case "tracker":
        this.renderTrackerScreen();
        break;
      case "childcare":
        this.renderChildcareScreen();
        break;
      case "assistant":
        this.renderAssistantScreen();
        break;
      case "help":
        this.renderHelpScreen();
        break;
      case "privacy":
        this.renderPrivacyScreen();
        break;
      case "admin":
        this.renderAdminScreen();
        break;
    }
  }

  // =========================================================================
  // 1. LOGIN & ONBOARDING SCREEN
  // =========================================================================
  renderLoginScreen() {
    const container = document.getElementById("screen-login");
    container.innerHTML = `
      <div class="ui-card" style="margin-top: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <div class="brand-logo-circle" style="width: 60px; height: 60px; font-size: 32px; margin: 0 auto 10px; background: #e0f2fe; color: #0284c7;">🎒</div>
          <h2 style="font-size: 20px; font-weight: 800; color: var(--text-dark);">${this.t("loginTitle")}</h2>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">${this.t("loginSubtitle")}</p>
        </div>

        <form id="loginForm" onsubmit="app.handleLoginSubmit(event)">
          <div style="margin-bottom: 14px;">
            <label style="font-size: 13px; font-weight: 700; display: block; margin-bottom: 6px;">${this.t("phoneLabel")}</label>
            <div style="display: flex; gap: 8px;">
              <span style="display: flex; align-items: center; background: #f1f5f9; padding: 0 12px; border-radius: var(--radius-md); font-weight: 700; border: 1.5px solid var(--border-light);">+91</span>
              <input type="tel" id="loginPhone" class="search-input" placeholder="${this.t("phonePlaceholder")}" value="9822144501" required maxlength="10" />
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="font-size: 13px; font-weight: 700;">${this.t("otpLabel")}</label>
              <button type="button" class="badge badge-blue" style="cursor: pointer; border: none;" onclick="app.fillDemoOtp()">${this.t("fillDemoOtp")}</button>
            </div>
            <input type="number" id="loginOtp" class="search-input" placeholder="1234" value="1234" required />
            <span style="font-size: 11px; color: var(--text-subtle);">${this.t("otpHint")}</span>
          </div>

          <!-- Migration Question -->
          <div style="background: #f8fafc; padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-light); margin-bottom: 16px;">
            <label style="font-size: 13px; font-weight: 700; display: block; margin-bottom: 8px;">
              🌾 ${this.t("migrantQuestion")}
            </label>
            <div style="display: flex; gap: 10px; margin-bottom: 10px;">
              <label style="display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer;">
                <input type="radio" name="isMigrant" value="yes" checked onchange="app.toggleWorkSector(true)" /> ${this.t("migrantYes")}
              </label>
            </div>
            <div style="display: flex; gap: 10px; margin-bottom: 10px;">
              <label style="display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer;">
                <input type="radio" name="isMigrant" value="no" onchange="app.toggleWorkSector(false)" /> ${this.t("migrantNo")}
              </label>
            </div>

            <div id="workSectorContainer">
              <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">${this.t("workSectorLabel")}:</label>
              <select id="loginSector" class="search-input" style="height: 42px;">
                <option value="Sugarcane Harvesting">${this.t("sectorSugarcane")}</option>
                <option value="Brick Kiln">${this.t("sectorBrickKiln")}</option>
                <option value="Construction">${this.t("sectorConstruction")}</option>
                <option value="Farming">${this.t("sectorFarm")}</option>
                <option value="Other">${this.t("sectorOther")}</option>
              </select>
            </div>
          </div>

          <!-- Child Profile Fields -->
          <div style="border-top: 1px solid var(--border-light); padding-top: 14px; margin-bottom: 16px;">
            <h4 style="font-size: 15px; font-weight: 800; margin-bottom: 4px;">👶 ${this.t("createProfileTitle")}</h4>
            <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">${this.t("createProfileSubtitle")}</p>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div>
                <label style="font-size: 12px; font-weight: 700;">${this.t("childName")}</label>
                <input type="text" id="regChildName" class="search-input" value="Aarav Ramesh Rathod" required />
              </div>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div>
                  <label style="font-size: 12px; font-weight: 700;">${this.t("childAge")}</label>
                  <input type="number" id="regChildAge" class="search-input" value="8" min="3" max="18" required />
                </div>
                <div>
                  <label style="font-size: 12px; font-weight: 700;">${this.t("targetClass")}</label>
                  <select id="regTargetClass" class="search-input">
                    <option value="Class 1">Class 1 (इयत्ता १)</option>
                    <option value="Class 2">Class 2 (इयत्ता २)</option>
                    <option value="Class 3" selected>Class 3 (इयत्ता ३)</option>
                    <option value="Class 4">Class 4 (इयत्ता ४)</option>
                    <option value="Class 5">Class 5 (इयत्ता ५)</option>
                    <option value="Class 6">Class 6 (इयत्ता ६)</option>
                    <option value="Class 7">Class 7 (इयत्ता ७)</option>
                  </select>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div>
                  <label style="font-size: 12px; font-weight: 700;">${this.t("originDistrict")}</label>
                  <input type="text" id="regOrigin" class="search-input" value="Beed (बीड)" required />
                </div>
                <div>
                  <label style="font-size: 12px; font-weight: 700;">${this.t("currentDistrict")}</label>
                  <select id="regCurrentDist" class="search-input">
                    <option value="Kolhapur (कोल्हापूर)" selected>Kolhapur (कोल्हापूर)</option>
                    <option value="Satara (सातारा)">Satara (सातारा)</option>
                    <option value="Beed (बीड)">Beed (बीड)</option>
                    <option value="Pune (पुणे)">Pune (पुणे)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style="font-size: 12px; font-weight: 700;">${this.t("prevSchool")}</label>
                <input type="text" id="regPrevSchool" class="search-input" value="Z.P. School Ashti, Beed" />
              </div>
            </div>
          </div>

          <button type="submit" class="big-tap-btn btn-primary">
            <span>✅ ${this.t("saveProfileBtn")}</span>
          </button>
        </form>
      </div>
    `;
  }

  fillDemoOtp() {
    const otpInput = document.getElementById("loginOtp");
    if (otpInput) otpInput.value = "1234";
  }

  toggleWorkSector(show) {
    const el = document.getElementById("workSectorContainer");
    if (el) el.style.display = show ? "block" : "none";
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    const otp = document.getElementById("loginOtp").value;
    if (otp !== "1234") {
      alert(this.lang === "mr" ? "कृपया डेमोसाठी 1234 हा OTP टाका." : "Please enter demo OTP 1234.");
      return;
    }

    const childName = document.getElementById("regChildName").value;
    const childAge = document.getElementById("regChildAge").value;
    const targetClass = document.getElementById("regTargetClass").value;
    const origin = document.getElementById("regOrigin").value;
    const currentDist = document.getElementById("regCurrentDist").value;
    const prevSchool = document.getElementById("regPrevSchool").value;
    const phone = document.getElementById("loginPhone").value;
    const sector = document.getElementById("loginSector") ? document.getElementById("loginSector").value : "Sugarcane Harvesting";

    // Update active child
    const activeChild = this.getActiveChild();
    activeChild.name = childName;
    activeChild.age = parseInt(childAge) || 8;
    activeChild.targetClass = targetClass;
    activeChild.originDistrict = origin;
    activeChild.currentDistrict = currentDist;
    activeChild.prevSchool = prevSchool;
    activeChild.phone = phone;
    activeChild.workSector = sector;

    this.saveState("mc_children", this.children);
    this.isLoggedIn = true;
    localStorage.setItem("mc_is_logged_in", "true");

    this.renderActiveChildSnippet();
    this.navigate("home");
  }

  // =========================================================================
  // 2. HOME SCREEN
  // =========================================================================
  renderHomeScreen() {
    const child = this.getActiveChild();
    const container = document.getElementById("screen-home");

    // Application status snippet if applied
    let appStatusSnippet = "";
    if (child.application && child.application.hasApplied) {
      const statusColor = child.application.status === "accepted" ? "badge-green" :
                          child.application.status === "moredocs" ? "badge-amber" : "badge-blue";
      appStatusSnippet = `
        <div class="ui-card ui-card-highlight" style="cursor: pointer;" onclick="app.navigate('tracker')">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 13px; font-weight: 700; color: var(--primary-blue-dark);">📋 ${this.t("activeAppTitle")}</span>
            <span class="badge ${statusColor}">${child.application.statusLabel}</span>
          </div>
          <div style="font-size: 15px; font-weight: 800; color: var(--text-dark);">${child.application.schoolName}</div>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${child.application.notes}</p>
          <div style="margin-top: 8px; font-size: 12px; font-weight: 700; color: var(--primary-blue); text-decoration: underline;">
            ${this.t("viewAppTracker")} →
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <!-- Prominent Red Emergency Button Card -->
      <div class="emergency-prominent-card" onclick="app.openEmergencyModal()">
        <div class="emergency-info-left">
          <div class="emergency-icon-box">🚨</div>
          <div class="emergency-text">
            <h3>${this.t("emergencyTitle")} (1098)</h3>
            <p>${this.lang === "mr" ? "संकटात तात्काळ मदत • २४ तास मोफत" : "24/7 Free Immediate Assistance for Children"}</p>
          </div>
        </div>
        <button class="big-tap-btn btn-danger" style="width: auto; min-height: 42px; padding: 6px 14px; font-size: 13px;">
          📞 1098
        </button>
      </div>

      <!-- Welcome Migration Guidance Banner -->
      <div class="home-welcome-card">
        <h2>${this.t("greeting")}, ${child.parentName || "Palak"}! 👋</h2>
        <p>${this.t("welcomeBannerDesc")}</p>
        <div class="step-chips">
          <div class="step-chip">
            <span class="step-num">1</span>
            <div><strong>${this.t("step1Title")}:</strong> ${this.t("step1Desc")}</div>
          </div>
          <div class="step-chip">
            <span class="step-num">2</span>
            <div><strong>${this.t("step2Title")}:</strong> ${this.t("step2Desc")}</div>
          </div>
          <div class="step-chip">
            <span class="step-num">3</span>
            <div><strong>${this.t("step3Title")}:</strong> ${this.t("step3Desc")}</div>
          </div>
        </div>
      </div>

      ${appStatusSnippet}

      <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 12px; color: var(--text-dark);">
        ${this.t("quickActionsTitle")}
      </h3>

      <!-- 5 Big Navigation Cards with rich icons & descriptions -->
      <div class="big-cards-grid">
        <!-- 1. Find School -->
        <div class="hub-card" onclick="app.navigate('schools')">
          <div class="hub-card-icon icon-blue">🏫</div>
          <div class="hub-card-text">
            <h3>${this.t("cardSchoolTitle")}</h3>
            <p>${this.t("cardSchoolDesc")}</p>
          </div>
          <div class="hub-card-arrow">›</div>
        </div>

        <!-- 2. Document Wallet -->
        <div class="hub-card" onclick="app.navigate('documents')">
          <div class="hub-card-icon icon-green">📁</div>
          <div class="hub-card-text">
            <h3>${this.t("cardDocsTitle")}</h3>
            <p>${this.t("cardDocsDesc")}</p>
          </div>
          <div class="hub-card-arrow">›</div>
        </div>

        <!-- 3. Safe Childcare -->
        <div class="hub-card" onclick="app.navigate('childcare')">
          <div class="hub-card-icon icon-purple">🧸</div>
          <div class="hub-card-text">
            <h3>${this.t("cardChildcareTitle")}</h3>
            <p>${this.t("cardChildcareDesc")}</p>
          </div>
          <div class="hub-card-arrow">›</div>
        </div>

        <!-- 4. Ask Assistant -->
        <div class="hub-card" onclick="app.navigate('assistant')">
          <div class="hub-card-icon icon-amber">🤖</div>
          <div class="hub-card-text">
            <h3>${this.t("cardAssistantTitle")}</h3>
            <p>${this.t("cardAssistantDesc")}</p>
          </div>
          <div class="hub-card-arrow">›</div>
        </div>

        <!-- 5. Get Help & Protection -->
        <div class="hub-card" onclick="app.navigate('help')">
          <div class="hub-card-icon icon-rose">🛡️</div>
          <div class="hub-card-text">
            <h3>${this.t("cardHelpTitle")}</h3>
            <p>${this.t("cardHelpDesc")}</p>
          </div>
          <div class="hub-card-arrow">›</div>
        </div>
      </div>

      <!-- Quick Privacy & Admin Portal links -->
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #ffffff; border-radius: var(--radius-md); border: 1px solid var(--border-light); font-size: 13px;">
        <span onclick="app.navigate('privacy')" style="color: var(--primary-blue-dark); cursor: pointer; font-weight: 600;">🔒 ${this.t("privacyTitle")}</span>
        <span onclick="app.navigate('admin')" style="color: var(--primary-green-dark); cursor: pointer; font-weight: 700;">📊 ${this.t("adminView")} →</span>
      </div>
    `;
  }

  // =========================================================================
  // 3. SMART SCHOOL FINDER SCREEN
  // =========================================================================
  renderSchoolsScreen() {
    const container = document.getElementById("screen-schools");
    const child = this.getActiveChild();

    container.innerHTML = `
      <div class="screen-header-title">
        <span>🏫</span> ${this.t("schoolsTitle")}
      </div>
      <p class="screen-header-subtitle">${this.t("schoolsSubtitle")}</p>

      <!-- Search & Location Bar -->
      <div class="search-filter-box">
        <div class="search-input-group">
          <input type="text" id="schoolSearchInput" class="search-input" placeholder="${this.t("searchLocationPlaceholder")}" value="${this.filters.search}" oninput="app.handleSchoolSearch(this.value)" />
          <button class="loc-btn" onclick="app.simulateLocation()">
            📍 ${this.t("useLocationBtn")}
          </button>
        </div>

        <!-- Filters Row -->
        <div class="filter-chips-row">
          <!-- Distance Filter -->
          <select class="filter-select" id="filterDist" onchange="app.handleFilterChange('distance', this.value)">
            <option value="all">${this.t("filterDistAll")}</option>
            <option value="2">${this.t("filterDist2")}</option>
            <option value="5">${this.t("filterDist5")}</option>
          </select>

          <!-- Type Filter -->
          <select class="filter-select" id="filterType" onchange="app.handleFilterChange('type', this.value)">
            <option value="all">${this.t("filterTypeAll")}</option>
            <option value="govt">${this.t("filterTypeGovt")}</option>
            <option value="hostel">${this.t("filterTypeHostel")}</option>
            <option value="private">${this.t("filterTypePrivate")}</option>
          </select>

          <!-- Medium Filter -->
          <select class="filter-select" id="filterMedium" onchange="app.handleFilterChange('medium', this.value)">
            <option value="all">${this.t("filterMediumAll")}</option>
            <option value="Marathi">मराठी (Marathi)</option>
            <option value="Hindi">हिंदी (Hindi)</option>
            <option value="English">English</option>
          </select>
        </div>
      </div>

      <!-- View Toggle & Count -->
      <div class="view-toggle-row">
        <div style="font-size: 14px; font-weight: 700; color: var(--text-muted);">
          <span id="schoolsCountBadge">0</span> ${this.t("schoolsFound")}
        </div>
        <div class="toggle-pills">
          <button class="toggle-pill-btn ${this.viewMode === 'list' ? 'active' : ''}" onclick="app.setSchoolViewMode('list')">
            📋 ${this.t("viewList")}
          </button>
          <button class="toggle-pill-btn ${this.viewMode === 'map' ? 'active' : ''}" onclick="app.setSchoolViewMode('map')">
            🗺️ ${this.t("viewMap")}
          </button>
        </div>
      </div>

      <!-- Container for List or Map -->
      <div id="schoolsDisplayArea"></div>
    `;

    this.renderFilteredSchools();
  }

  handleSchoolSearch(val) {
    this.filters.search = val;
    this.renderFilteredSchools();
  }

  handleFilterChange(type, val) {
    this.filters[type] = val;
    this.renderFilteredSchools();
  }

  simulateLocation() {
    // Cycles between sample locations
    const presets = ["Kolhapur", "Beed", "Satara"];
    const current = this.filters.search;
    const next = presets[(presets.indexOf(current) + 1) % presets.length];
    this.filters.search = next;
    const input = document.getElementById("schoolSearchInput");
    if (input) input.value = next;
    this.renderFilteredSchools();
  }

  setSchoolViewMode(mode) {
    this.viewMode = mode;
    this.renderSchoolsScreen();
  }

  getFilteredSchools() {
    return this.schools.filter(school => {
      // Search text
      if (this.filters.search) {
        const query = this.filters.search.toLowerCase();
        const matchesName = school.name.toLowerCase().includes(query);
        const matchesDist = school.districtName.toLowerCase().includes(query);
        const matchesTal = school.taluka.toLowerCase().includes(query);
        if (!matchesName && !matchesDist && !matchesTal) return false;
      }
      // Distance
      if (this.filters.distance !== "all") {
        const maxDist = parseFloat(this.filters.distance);
        if (school.distanceKm > maxDist) return false;
      }
      // Type
      if (this.filters.type !== "all") {
        if (school.type !== this.filters.type) return false;
      }
      // Medium
      if (this.filters.medium !== "all") {
        if (!school.medium.includes(this.filters.medium)) return false;
      }
      return true;
    });
  }

  renderFilteredSchools() {
    const displayArea = document.getElementById("schoolsDisplayArea");
    const countBadge = document.getElementById("schoolsCountBadge");
    if (!displayArea) return;

    const filtered = this.getFilteredSchools();
    if (countBadge) countBadge.textContent = filtered.length;

    if (this.viewMode === "map") {
      this.renderSchoolMap(displayArea, filtered);
      return;
    }

    if (filtered.length === 0) {
      displayArea.innerHTML = `
        <div class="ui-card" style="text-align: center; padding: 30px;">
          <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
          <h4 style="font-weight: 700;">No schools found matching your filters.</h4>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Try clearing search or increasing distance.</p>
          <button class="doc-sub-btn doc-sub-btn-primary" style="margin-top: 12px;" onclick="app.resetSchoolFilters()">Clear Filters</button>
        </div>
      `;
      return;
    }

    let html = "";
    filtered.forEach(school => {
      const typeBadge = school.type === "hostel" ? `<span class="badge badge-purple">🏢 ${this.t("seasonalHostelTag")}</span>` :
                        school.type === "govt" ? `<span class="badge badge-green">🏛️ ${this.t("filterTypeGovt")}</span>` :
                        `<span class="badge badge-blue">🏫 ${this.t("filterTypePrivate")}</span>`;

      html += `
        <div class="school-card" onclick="app.navigate('school-detail', { schoolId: '${school.id}' })">
          <div class="school-card-header">
            <h4 class="school-name">${school.name}</h4>
            <span class="distance-pill">📍 ${school.distanceKm} ${this.t("distanceKm")}</span>
          </div>

          <div class="school-tags">
            ${school.verified ? `<span class="badge badge-green">✓ ${this.t("verifiedBadge")}</span>` : `<span class="badge badge-amber">Pending Verification</span>`}
            ${typeBadge}
            <span class="badge badge-amber">🍲 ${this.t("freeMiddayMeal")}</span>
          </div>

          <div class="school-meta-grid">
            <div><strong>🗣️ ${this.t("filterMedium")}:</strong> ${school.medium}</div>
            <div><strong>📚 ${this.t("filterClass")}:</strong> ${school.classes}</div>
            <div><strong>⏰ ${this.t("timings")}:</strong> ${school.timings}</div>
            <div><strong>📍 ${this.t("colDistrict")}:</strong> ${school.districtName} (${school.taluka})</div>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 10px;">
            <button class="big-tap-btn btn-primary" style="min-height: 44px; padding: 8px 14px; font-size: 14px;">
              ${this.t("viewSchoolDetails")} →
            </button>
          </div>
        </div>
      `;
    });

    displayArea.innerHTML = html;
  }

  resetSchoolFilters() {
    this.filters = { search: "", distance: "all", type: "all", medium: "all", class: "all" };
    this.renderSchoolsScreen();
  }

  renderSchoolMap(container, schools) {
    let pinsSvg = "";
    const width = 440;
    const height = 300;

    schools.forEach((sch, idx) => {
      // Deterministic layout coordinates for prototype
      const x = 50 + (idx % 4) * 100 + ((idx * 17) % 30);
      const y = 45 + Math.floor(idx / 4) * 120 + ((idx * 23) % 25);
      const color = sch.type === "hostel" ? "#9333ea" : sch.type === "govt" ? "#16a34a" : "#0284c7";

      pinsSvg += `
        <g class="map-school-pin" onclick="app.navigate('school-detail', { schoolId: '${sch.id}' })">
          <circle cx="${x}" cy="${y}" r="16" fill="${color}" fill-opacity="0.25" />
          <circle cx="${x}" cy="${y}" r="12" fill="${color}" stroke="#ffffff" stroke-width="2" />
          <text x="${x}" y="${y + 4}" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="bold">${idx + 1}</text>
          <rect x="${x - 45}" y="${y + 16}" width="90" height="18" rx="4" fill="#1e293b" fill-opacity="0.9" />
          <text x="${x}" y="${y + 28}" text-anchor="middle" fill="#ffffff" font-size="9" font-family="sans-serif">${sch.taluka} (${sch.distanceKm} km)</text>
        </g>
      `;
    });

    container.innerHTML = `
      <div class="map-container">
        <svg class="map-svg-canvas" viewBox="0 0 ${width} ${height}" style="background: #e2e8f0;">
          <!-- Map Grid Lines -->
          <line x1="0" y1="100" x2="${width}" y2="100" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4" />
          <line x1="0" y1="200" x2="${width}" y2="200" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4" />
          <line x1="150" y1="0" x2="150" y2="${height}" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4" />
          <line x1="300" y1="0" x2="300" y2="${height}" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4" />
          
          <!-- District labels -->
          <text x="20" y="25" fill="#475569" font-size="11" font-weight="bold">📍 Maharashtra Migrant Corridor (Kolhapur - Satara - Beed)</text>

          <!-- Pins -->
          ${pinsSvg}
        </svg>

        <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(255,255,255,0.95); padding: 4px 10px; border-radius: var(--radius-full); font-size: 11px; font-weight: 700; color: #1e293b; box-shadow: 0 1px 4px rgba(0,0,0,0.2);">
          🟢 Govt ZP • 🟣 Seasonal Hostel • 🔵 Private
        </div>
      </div>
      <p style="font-size: 12px; color: var(--text-muted); text-align: center; margin-bottom: 16px;">
        💡 Tap any pin on the map to view school details & admission instructions.
      </p>
    `;
  }

  // =========================================================================
  // 4. SCHOOL DETAIL & ADMISSION GUIDE
  // =========================================================================
  renderSchoolDetailScreen(schoolId) {
    const school = this.schools.find(s => s.id === schoolId) || this.schools[0];
    const container = document.getElementById("screen-school-detail");
    const child = this.getActiveChild();

    container.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <button class="doc-sub-btn doc-sub-btn-help" onclick="app.navigate('schools')">
          ← ${this.t("backToSchools")}
        </button>
      </div>

      <div class="ui-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <h2 style="font-size: 19px; font-weight: 800; color: var(--text-dark);">${school.name}</h2>
          <span class="distance-pill">📍 ${school.distanceKm} ${this.t("distanceKm")}</span>
        </div>

        <div class="school-tags" style="margin-bottom: 14px;">
          ${school.verified ? `<span class="badge badge-green">✓ ${this.t("verifiedBadge")} (${this.t("lastUpdated")}: ${school.lastUpdated})</span>` : ""}
          <span class="badge badge-blue">🗣️ ${school.medium}</span>
          <span class="badge badge-purple">📚 ${school.classes}</span>
        </div>

        <!-- Highlighted Law Notice for Migrant Families -->
        <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 8px; color: var(--primary-green-dark); font-weight: 800; font-size: 15px; margin-bottom: 4px;">
            📢 ${this.t("midYearNoticeHeading")}
          </div>
          <p style="font-size: 13px; color: #166534; line-height: 1.4;">
            ${this.t("midYearNoticeText")}
          </p>
        </div>

        <!-- Eligibility & Age criteria -->
        <div style="margin-bottom: 16px;">
          <h4 style="font-size: 15px; font-weight: 800; color: var(--text-dark); margin-bottom: 6px;">
            🎯 ${this.t("eligibilityTitle")}
          </h4>
          <p style="font-size: 13px; color: var(--text-muted);">${school.eligibilityText}</p>
        </div>

        <!-- Admission Steps -->
        <div style="margin-bottom: 16px;">
          <h4 style="font-size: 15px; font-weight: 800; color: var(--text-dark); margin-bottom: 6px;">
            🪜 ${this.t("admissionStepsTitle")}
          </h4>
          <ol style="padding-left: 20px; font-size: 13px; color: var(--text-muted); display: flex; flex-direction: column; gap: 4px;">
            ${school.steps.map(st => `<li>${st}</li>`).join("")}
          </ol>
        </div>

        <!-- Important Dates -->
        <div style="margin-bottom: 16px; background: #f8fafc; padding: 12px; border-radius: var(--radius-md);">
          <h4 style="font-size: 14px; font-weight: 700; color: var(--text-dark); margin-bottom: 4px;">
            📅 ${this.t("importantDatesTitle")}
          </h4>
          <p style="font-size: 13px; color: var(--text-muted);">${school.dates}</p>
        </div>

        <!-- School Contact & Headmaster -->
        <div style="margin-bottom: 20px; border-top: 1px solid var(--border-light); padding-top: 14px;">
          <h4 style="font-size: 15px; font-weight: 800; color: var(--text-dark); margin-bottom: 8px;">
            📞 ${this.t("contactTitle")}
          </h4>
          <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 10px;">
            <div><strong>${this.t("headmaster")}:</strong> ${school.headmaster}</div>
            <div><strong>📍 ${this.t("worksiteLocationLabel")}:</strong> ${school.address}</div>
            <div><strong>⏰ ${this.t("timings")}:</strong> ${school.timings}</div>
          </div>
          <a href="tel:${school.phone}" class="big-tap-btn btn-secondary" style="min-height: 44px; text-decoration: none; padding: 8px 14px; font-size: 14px;">
            📞 ${this.t("callSchool")}: ${school.phone}
          </a>
        </div>

        <!-- Document Checklist: Required, Optional, Conditional -->
        <div style="border-top: 1px solid var(--border-light); padding-top: 14px; margin-bottom: 20px;">
          <h4 style="font-size: 16px; font-weight: 800; color: var(--text-dark); margin-bottom: 12px;">
            📁 ${this.t("docChecklistTitle")}
          </h4>

          <!-- Required -->
          <div style="margin-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 700; color: #15803d; margin-bottom: 4px;">
              ✅ ${this.t("requiredDocs")}:
            </div>
            <ul style="padding-left: 20px; font-size: 13px; color: var(--text-muted);">
              ${school.checklist.required.map(d => `<li><strong>${d.name}:</strong> ${d.desc}</li>`).join("")}
            </ul>
          </div>

          <!-- Conditional -->
          <div style="margin-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 700; color: #b45309; margin-bottom: 4px;">
              ⚠️ ${this.t("conditionalDocs")}:
            </div>
            <ul style="padding-left: 20px; font-size: 13px; color: var(--text-muted);">
              ${school.checklist.conditional.map(d => `<li><strong>${d.name}:</strong> ${d.desc}</li>`).join("")}
            </ul>
          </div>

          <!-- Optional -->
          <div>
            <div style="font-size: 13px; font-weight: 700; color: #0369a1; margin-bottom: 4px;">
              ℹ️ ${this.t("optionalDocs")}:
            </div>
            <ul style="padding-left: 20px; font-size: 13px; color: var(--text-muted);">
              ${school.checklist.optional.map(d => `<li><strong>${d.name}:</strong> ${d.desc}</li>`).join("")}
            </ul>
          </div>
        </div>

        <!-- Action CTAs -->
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button class="big-tap-btn btn-primary" onclick="app.navigate('admission-form', { schoolId: '${school.id}' })">
            ✍️ ${this.t("applyNowBtn")} (${child.name})
          </button>
          
          <button class="big-tap-btn btn-outline" onclick="app.navigate('missing-check', { schoolId: '${school.id}' })">
            🔍 ${this.t("checkMissingBtn")}
          </button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 5. DOCUMENT WALLET SCREEN
  // =========================================================================
  renderDocumentsScreen() {
    const container = document.getElementById("screen-documents");
    const child = this.getActiveChild();

    const docDefs = [
      { id: "birth_cert", title: "Birth Certificate (जन्म दाखला)", icon: "📜", desc: "Age proof for school register" },
      { id: "prev_report", title: "Previous Report Card (मागील गुणपत्रिका)", icon: "📊", desc: "Shows prior class learning level" },
      { id: "tc", title: "Transfer Certificate (शाळा सोडल्याचा दाखला)", icon: "🏫", desc: "School leaving certificate from previous village" },
      { id: "photo", title: "Child Photo (मुलाचा फोटो)", icon: "📸", desc: "For ID card & student register" },
      { id: "aadhaar", title: "Aadhaar Card (आधार कार्ड - ऐच्छिक)", icon: "🪪", desc: "Optional for admission, helpful for DBT" },
      { id: "migration_slip", title: "Migration / Worksite Slip (कामगार पावती)", icon: "🏷️", desc: "Mukkadam or sugar factory slip (optional)" }
    ];

    let html = `
      <div class="screen-header-title">
        <span>📁</span> ${this.t("walletTitle")}
      </div>
      <p class="screen-header-subtitle">${this.t("walletSubtitle")}</p>

      <div style="background: #e0f2fe; padding: 12px; border-radius: var(--radius-md); margin-bottom: 16px; font-size: 13px; color: var(--primary-blue-dark); border: 1px solid #bae6fd;">
        <strong>👶 ${child.name}</strong> • ${this.t("colDistrict")}: ${child.currentDistrict}
      </div>
    `;

    docDefs.forEach(def => {
      const docState = child.documents[def.id] || { uploaded: false };
      const isUp = docState.uploaded;
      const statusBadge = isUp ? 
        `<span class="badge badge-green">✓ ${this.t("statusUploaded")} (${docState.date || 'Recent'})</span>` : 
        `<span class="badge badge-red">✗ ${this.t("statusMissing")}</span>`;

      html += `
        <div class="doc-item-card ${isUp ? 'is-uploaded' : 'is-missing'}">
          <div class="doc-card-top">
            <div class="doc-title-box">
              <div class="doc-icon-badge ${isUp ? 'icon-green' : 'icon-rose'}">${def.icon}</div>
              <div class="doc-title-text">
                <h4>${def.title}</h4>
                <p>${def.desc}</p>
              </div>
            </div>
            ${statusBadge}
          </div>

          <div class="doc-actions-row">
            ${isUp ? `
              <button class="doc-sub-btn doc-sub-btn-primary" onclick="app.viewSampleDoc('${def.id}', '${def.title}')">
                👁️ ${this.t("viewDocBtn")}
              </button>
              <button class="doc-sub-btn" style="background:#e2e8f0;" onclick="app.simulateDocUpload('${def.id}')">
                🔄 Re-upload
              </button>
            ` : `
              <button class="doc-sub-btn doc-sub-btn-primary" onclick="app.simulateDocUpload('${def.id}')">
                📤 ${this.t("uploadBtn")}
              </button>
            `}
            
            <button class="doc-sub-btn doc-sub-btn-help" onclick="app.openDocHelpModal('${def.id}')">
              ❓ ${this.t("noDocBtn")}
            </button>
          </div>
        </div>
      `;
    });

    html += `
      <div style="margin-top: 16px;">
        <button class="big-tap-btn btn-primary" onclick="app.navigate('missing-check')">
          🔍 ${this.t("missingCheckTitle")} →
        </button>
      </div>
    `;

    container.innerHTML = html;
  }

  simulateDocUpload(docId) {
    const child = this.getActiveChild();
    const mockFiles = {
      birth_cert: "birth_declaration_signed.pdf",
      prev_report: "class_eval_slip.pdf",
      tc: "school_leaving_cert.pdf",
      photo: "child_passport_photo.jpg",
      aadhaar: "aadhaar_masked_sample.pdf",
      migration_slip: "mukkadam_receipt.pdf"
    };

    child.documents[docId] = {
      uploaded: true,
      name: mockFiles[docId] || "document.pdf",
      date: "Just now"
    };

    this.saveState("mc_children", this.children);
    alert(this.t("uploadSuccess"));
    this.renderDocumentsScreen();
  }

  viewSampleDoc(docId, title) {
    const modal = document.getElementById("genericModal");
    const titleEl = document.getElementById("genericModalTitle");
    const bodyEl = document.getElementById("genericModalBody");

    titleEl.innerHTML = `📄 ${title}`;
    bodyEl.innerHTML = `
      <div style="text-align: center; padding: 20px; background: #f8fafc; border-radius: var(--radius-md); border: 2px dashed #cbd5e1;">
        <div style="font-size: 48px; margin-bottom: 8px;">📑</div>
        <h4 style="font-weight: 700; color: var(--text-dark);">Digital Copy Stored Securely</h4>
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
          File: <code>${docId}_sample.pdf</code> (Verified & Encrypted)
        </p>
        <div style="margin-top: 16px; display: inline-flex; gap: 8px;">
          <span class="badge badge-green">✓ Ready for School Application</span>
        </div>
      </div>
    `;
    modal.classList.add("active");
  }

  openDocHelpModal(docKey) {
    const info = documentAlternatives[docKey] || {
      titleEn: "Document Alternative",
      solutionEn: "Under the RTE Act, children cannot be denied admission for lack of formal paperwork. Submit a written self-declaration from the parent.",
      solutionMr: "शिक्षण हक्क कायद्यानुसार कागदपत्रांअभावी प्रवेश रोखता येत नाही. पालकांचे साध्या कागदावरील हमीपत्र चालते.",
      solutionHi: "शिक्षा के अधिकार के तहत कागज़ न होने पर भी दाखिला नहीं रोका जा सकता। माता-पिता का सामान्य घोषणा पत्र मान्य है।"
    };

    const modal = document.getElementById("genericModal");
    const titleEl = document.getElementById("genericModalTitle");
    const bodyEl = document.getElementById("genericModalBody");

    const solution = this.lang === "mr" ? info.solutionMr : this.lang === "hi" ? info.solutionHi : info.solutionEn;

    titleEl.innerHTML = `💡 ${this.t("alternativeHelpTitle")} ${info.titleEn}`;
    bodyEl.innerHTML = `
      <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: var(--radius-md); padding: 16px; margin-bottom: 16px;">
        <h4 style="font-weight: 800; color: #92400e; margin-bottom: 8px;">
          📜 ${this.lang === "mr" ? "कायदेशीर मार्गदर्शक व उपाय:" : "Legal Solution & Official Guidance:"}
        </h4>
        <div style="font-size: 14px; color: #78350f; white-space: pre-line; line-height: 1.5;">
          ${solution}
        </div>
      </div>

      <div style="background: #f1f5f9; padding: 12px; border-radius: var(--radius-md); font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">
        ⚠️ <strong>${this.t("confirmWithSchoolNote")}</strong>
      </div>

      <button class="big-tap-btn btn-primary" onclick="document.getElementById('genericModal').classList.remove('active')">
        ${this.t("closeBtn")}
      </button>
    `;

    modal.classList.add("active");
  }

  // =========================================================================
  // 6. MISSING-DOCUMENT CHECK SCREEN
  // =========================================================================
  renderMissingCheckScreen(preselectedSchoolId) {
    const container = document.getElementById("screen-missing-check");
    const child = this.getActiveChild();
    const currentSchoolId = preselectedSchoolId || this.selectedSchoolId;
    const school = this.schools.find(s => s.id === currentSchoolId) || this.schools[0];

    // Compute missing and available documents
    // Requirements from school checklist
    const requiredList = school.checklist.required;
    const conditionalList = school.checklist.conditional;

    const available = [];
    const missing = [];

    // Check required
    requiredList.forEach(item => {
      const isUp = child.documents[item.id] && child.documents[item.id].uploaded;
      if (isUp) {
        available.push({ name: item.name, desc: item.desc, key: item.id });
      } else {
        missing.push({ name: item.name, desc: item.desc, key: item.id, type: "Required" });
      }
    });

    // Check conditional
    conditionalList.forEach(item => {
      const isUp = child.documents[item.id] && child.documents[item.id].uploaded;
      if (isUp) {
        available.push({ name: item.name, desc: item.desc, key: item.id });
      } else {
        missing.push({ name: item.name, desc: item.desc, key: item.id, type: "Conditional" });
      }
    });

    // School selector dropdown options
    const schoolOptions = this.schools.map(s => `
      <option value="${s.id}" ${s.id === school.id ? 'selected' : ''}>${s.name} (${s.taluka})</option>
    `).join("");

    container.innerHTML = `
      <div class="screen-header-title">
        <span>🔍</span> ${this.t("missingCheckTitle")}
      </div>
      <p class="screen-header-subtitle">${this.t("missingCheckSubtitle")}</p>

      <!-- School Dropdown -->
      <div class="ui-card" style="margin-bottom: 16px;">
        <label style="font-size: 13px; font-weight: 700; display: block; margin-bottom: 6px;">
          ${this.t("selectSchoolLabel")}
        </label>
        <select class="search-input" onchange="app.renderMissingCheckScreen(this.value)">
          ${schoolOptions}
        </select>
      </div>

      <!-- Result Banner -->
      ${missing.length === 0 ? `
        <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: var(--radius-lg); padding: 18px; margin-bottom: 18px; text-align: center;">
          <div style="font-size: 36px; margin-bottom: 6px;">🎉</div>
          <h3 style="font-size: 17px; font-weight: 800; color: #166534;">${this.t("allDocsReady")}</h3>
          <p style="font-size: 13px; color: #15803d; margin-top: 4px;">You can submit the admission application directly.</p>
        </div>
      ` : `
        <div style="background: #fffbeb; border: 2px solid #fde68a; border-radius: var(--radius-lg); padding: 16px; margin-bottom: 18px;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 800; color: #92400e; margin-bottom: 4px;">
            ⚠️ <span>${missing.length} ${this.t("docsMissingNotice")}</span>
          </div>
          <p style="font-size: 12px; color: #78350f;">
            ${this.lang === "mr" ? "कागदपत्र नसले तरी शिक्षण हक्क कायद्यानुसार (RTE) स्व-घोषणापत्रावर तात्पुरता प्रवेश मिळतो." : "Under RTE Act Section 4, missing documents do not block entry. You can proceed with a parent self-declaration."}
          </p>
        </div>
      `}

      <!-- Missing Documents Section with Workaround Advice -->
      ${missing.length > 0 ? `
        <div class="ui-card" style="border-left: 4px solid var(--danger-red); margin-bottom: 16px;">
          <h4 style="font-size: 15px; font-weight: 800; color: var(--danger-red); margin-bottom: 12px;">
            ❌ ${this.t("missingDocsTitle")} (${missing.length})
          </h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${missing.map(m => `
              <div style="background: #fff5f5; padding: 12px; border-radius: var(--radius-md); border: 1px solid #fed7d7;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="color: #9b2c2c;">${m.name}</strong>
                  <span class="badge badge-red">Missing</span>
                </div>
                <p style="font-size: 12px; color: #742a2a; margin-top: 4px;">${m.desc}</p>
                <div style="margin-top: 8px; display: flex; gap: 8px;">
                  <button class="doc-sub-btn doc-sub-btn-primary" onclick="app.simulateDocUpload('${m.key}')">
                    📤 Upload Now
                  </button>
                  <button class="doc-sub-btn doc-sub-btn-help" onclick="app.openDocHelpModal('${m.key}')">
                    💡 View Workaround / Alternative
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Available Documents Section -->
      <div class="ui-card" style="border-left: 4px solid var(--primary-green); margin-bottom: 20px;">
        <h4 style="font-size: 15px; font-weight: 800; color: var(--primary-green-dark); margin-bottom: 12px;">
          ✅ ${this.t("availableDocsTitle")} (${available.length})
        </h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${available.map(a => `
            <div style="display: flex; align-items: center; justify-content: space-between; background: #f0fdf4; padding: 10px 14px; border-radius: var(--radius-md);">
              <span style="font-size: 14px; font-weight: 600; color: #166534;">✓ ${a.name}</span>
              <span class="badge badge-green">Ready</span>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Action Button -->
      <button class="big-tap-btn btn-primary" onclick="app.navigate('admission-form', { schoolId: '${school.id}' })">
        ✍️ ${this.t("applyWithDeclaration")}
      </button>
    `;
  }

  // =========================================================================
  // 7. ADMISSION FORM SCREEN
  // =========================================================================
  renderAdmissionFormScreen(schoolId) {
    const container = document.getElementById("screen-admission-form");
    const child = this.getActiveChild();
    const currentSchoolId = schoolId || this.selectedSchoolId;
    const school = this.schools.find(s => s.id === currentSchoolId) || this.schools[0];

    // Count uploaded docs
    let attachedCount = 0;
    Object.values(child.documents).forEach(d => { if (d && d.uploaded) attachedCount++; });

    container.innerHTML = `
      <div style="margin-bottom: 12px;">
        <button class="doc-sub-btn doc-sub-btn-help" onclick="app.navigate('school-detail', { schoolId: '${school.id}' })">
          ← ${this.t("backToSchools")}
        </button>
      </div>

      <div class="screen-header-title">
        <span>✍️</span> ${this.t("admissionFormTitle")}
      </div>
      <p class="screen-header-subtitle">${this.t("admissionFormSubtitle")}</p>

      <div class="ui-card">
        <div style="background: #e0f2fe; padding: 12px; border-radius: var(--radius-md); margin-bottom: 16px; border: 1px solid #bae6fd;">
          <h4 style="font-weight: 800; color: var(--primary-blue-dark); font-size: 15px;">🏫 ${school.name}</h4>
          <p style="font-size: 12px; color: var(--text-muted);">${school.address} • ${school.taluka}, ${school.districtName}</p>
        </div>

        <form id="admissionApplicationForm" onsubmit="app.handleAdmissionSubmit(event, '${school.id}')">
          <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
            <div>
              <label style="font-size: 12px; font-weight: 700;">${this.t("childName")}</label>
              <input type="text" class="search-input" value="${child.name}" required readonly style="background:#f8fafc;" />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <div>
                <label style="font-size: 12px; font-weight: 700;">${this.t("childAge")}</label>
                <input type="text" class="search-input" value="${child.age} Years" readonly style="background:#f8fafc;" />
              </div>
              <div>
                <label style="font-size: 12px; font-weight: 700;">${this.t("targetClass")}</label>
                <input type="text" class="search-input" value="${child.targetClass}" readonly style="background:#f8fafc;" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <div>
                <label style="font-size: 12px; font-weight: 700;">${this.t("originDistrict")}</label>
                <input type="text" class="search-input" value="${child.originDistrict}" readonly style="background:#f8fafc;" />
              </div>
              <div>
                <label style="font-size: 12px; font-weight: 700;">${this.t("parentNameLabel")}</label>
                <input type="text" id="formParentName" class="search-input" value="${child.parentName || 'Ramesh Rathod'}" required />
              </div>
            </div>

            <div>
              <label style="font-size: 12px; font-weight: 700;">${this.t("contactPhoneLabel")}</label>
              <input type="tel" id="formParentPhone" class="search-input" value="${child.phone || '9822144501'}" required />
            </div>

            <div>
              <label style="font-size: 12px; font-weight: 700;">${this.t("worksiteLocationLabel")}</label>
              <input type="text" id="formWorksite" class="search-input" value="${child.worksiteAddress || 'Datta Sugar Mill Labour Camp, Shiroli'}" required />
            </div>

            <div>
              <label style="font-size: 12px; font-weight: 700;">${this.t("workSectorLabel")}</label>
              <input type="text" class="search-input" value="${child.workSector}" readonly style="background:#f8fafc;" />
            </div>
          </div>

          <!-- Document Wallet Attachment Summary -->
          <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: var(--radius-md); padding: 12px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="color: #166534; font-size: 13px;">📎 ${this.t("attachedDocsSummary")}:</strong>
              <span class="badge badge-green">${attachedCount} Files</span>
            </div>
            <p style="font-size: 12px; color: #15803d; margin-top: 4px;">
              ${this.lang === "mr" ? "कागदपत्र पाकिटातील सर्व उपलब्ध दाखले या अर्जासोबत आपोआप जोडले गेले आहेत." : "All available documents from your Document Wallet are automatically linked to this application."}
            </p>
          </div>

          <button type="submit" class="big-tap-btn btn-primary">
            🚀 ${this.t("submitApplicationBtn")}
          </button>
        </form>
      </div>
    `;
  }

  handleAdmissionSubmit(event, schoolId) {
    event.preventDefault();
    const child = this.getActiveChild();
    const school = this.schools.find(s => s.id === schoolId) || this.schools[0];

    const generatedId = `MC-2024-${Math.floor(1000 + Math.random() * 9000)}`;

    child.application = {
      hasApplied: true,
      appId: generatedId,
      schoolId: school.id,
      schoolName: school.name,
      appliedDate: "Today (12 Nov 2024)",
      status: "submitted",
      statusLabel: this.t("statusSubmitted"),
      notes: "Application dispatched to School Headmaster register."
    };

    this.saveState("mc_children", this.children);
    this.navigate("tracker");
  }

  // =========================================================================
  // 8. APPLICATION TRACKER SCREEN
  // =========================================================================
  renderTrackerScreen() {
    const container = document.getElementById("screen-tracker");
    const child = this.getActiveChild();

    if (!child.application || !child.application.hasApplied) {
      container.innerHTML = `
        <div class="screen-header-title">
          <span>📋</span> ${this.t("appTrackerTitle")}
        </div>
        <div class="ui-card" style="text-align: center; padding: 30px;">
          <div style="font-size: 40px; margin-bottom: 8px;">📝</div>
          <h4 style="font-weight: 800;">No Active Application Found</h4>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            You have not submitted an admission application for ${child.name} yet.
          </p>
          <button class="big-tap-btn btn-primary" style="margin-top: 16px;" onclick="app.navigate('schools')">
            🔍 Find a School & Apply
          </button>
        </div>
      `;
      return;
    }

    const appData = child.application;
    const currentStatus = appData.status; // 'submitted', 'review', 'moredocs', 'accepted'

    const steps = [
      { id: "submitted", label: this.t("statusSubmitted"), icon: "1" },
      { id: "review", label: this.t("statusReview"), icon: "2" },
      { id: "moredocs", label: this.t("statusMoreDocs"), icon: "3" },
      { id: "accepted", label: this.t("statusAccepted"), icon: "4" }
    ];

    const statusIndexMap = { submitted: 0, review: 1, moredocs: 2, accepted: 3 };
    const currentIndex = statusIndexMap[currentStatus] !== undefined ? statusIndexMap[currentStatus] : 0;

    const statusHelpText = {
      submitted: this.t("statusHelpSubmitted"),
      review: this.t("statusHelpReview"),
      moredocs: this.t("statusHelpMoreDocs"),
      accepted: this.t("statusHelpAccepted")
    }[currentStatus] || "";

    container.innerHTML = `
      <div class="screen-header-title">
        <span>📋</span> ${this.t("appTrackerTitle")}
      </div>
      <p class="screen-header-subtitle">${this.t("demoStatusLabel")}</p>

      <div class="ui-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div>
            <div style="font-size: 12px; color: var(--text-muted); font-weight: 600;">${this.t("appId")}: <code>${appData.appId}</code></div>
            <h3 style="font-size: 17px; font-weight: 800; color: var(--text-dark); margin-top: 2px;">${appData.schoolName}</h3>
          </div>
          <span class="badge badge-blue">${appData.appliedDate}</span>
        </div>

        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px; background: #f8fafc; padding: 8px 12px; border-radius: var(--radius-md);">
          <strong>👶 ${child.name}</strong> • ${child.targetClass} • ${child.workSector}
        </div>

        <!-- Stepper Component -->
        <div class="tracker-stepper">
          ${steps.map((st, i) => {
            let cls = "";
            if (i < currentIndex) cls = "completed";
            else if (i === currentIndex) cls = "active";
            return `
              <div class="step-node ${cls}">
                <div class="node-circle">${i < currentIndex ? '✓' : st.icon}</div>
                <div class="node-label">${st.label}</div>
              </div>
            `;
          }).join("")}
        </div>

        <!-- Current Status Explanatory Box -->
        <div style="background: ${currentStatus === 'accepted' ? '#f0fdf4' : currentStatus === 'moredocs' ? '#fffbeb' : '#e0f2fe'}; border-radius: var(--radius-md); padding: 14px; margin-bottom: 20px; border: 1.5px solid ${currentStatus === 'accepted' ? '#86efac' : currentStatus === 'moredocs' ? '#fde68a' : '#bae6fd'};">
          <div style="display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 15px; margin-bottom: 4px; color: ${currentStatus === 'accepted' ? '#166534' : currentStatus === 'moredocs' ? '#92400e' : '#0369a1'};">
            ${currentStatus === 'accepted' ? '🎉' : currentStatus === 'moredocs' ? '⚠️' : 'ℹ️'} ${appData.statusLabel}
          </div>
          <p style="font-size: 13px; color: var(--text-dark); line-height: 1.4;">${statusHelpText}</p>
        </div>

        <!-- Prototype Interactive Status Switcher -->
        <div style="background: #f1f5f9; padding: 12px; border-radius: var(--radius-md); border: 1px dashed var(--border-light);">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">
            🧪 ${this.t("changeDemoStatus")}
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
            <button class="doc-sub-btn" style="background:#ffffff;" onclick="app.setDemoAppStatus('submitted')">1. Submitted</button>
            <button class="doc-sub-btn" style="background:#ffffff;" onclick="app.setDemoAppStatus('review')">2. Under Review</button>
            <button class="doc-sub-btn" style="background:#ffffff;" onclick="app.setDemoAppStatus('moredocs')">3. More Docs Needed</button>
            <button class="doc-sub-btn" style="background:#ffffff;" onclick="app.setDemoAppStatus('accepted')">4. Accepted</button>
          </div>
        </div>
      </div>
    `;
  }

  setDemoAppStatus(status) {
    const child = this.getActiveChild();
    if (child.application) {
      child.application.status = status;
      const labels = {
        submitted: this.t("statusSubmitted"),
        review: this.t("statusReview"),
        moredocs: this.t("statusMoreDocs"),
        accepted: this.t("statusAccepted")
      };
      child.application.statusLabel = labels[status];
      this.saveState("mc_children", this.children);
      this.renderTrackerScreen();
    }
  }

  // =========================================================================
  // 9. SAFE CHILDCARE FINDER SCREEN
  // =========================================================================
  renderChildcareScreen() {
    const container = document.getElementById("screen-childcare");

    let html = `
      <div class="screen-header-title">
        <span>🧸</span> ${this.t("childcareTitle")}
      </div>
      <p class="screen-header-subtitle">${this.t("childcareSubtitle")}</p>
    `;

    this.childcareCentres.forEach(centre => {
      const isConfirmed = centre.availability === "confirmed";
      const availBadge = isConfirmed ? 
        `<span class="badge badge-green">✓ ${this.t("availabilityConfirmed")}</span>` : 
        `<span class="badge badge-amber">ℹ️ ${this.t("availabilityPending")}</span>`;

      html += `
        <div class="ui-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
            <h3 style="font-size: 16px; font-weight: 800; color: var(--text-dark);">
              ${this.lang === "mr" && centre.nameMr ? centre.nameMr : centre.name}
            </h3>
            <span class="distance-pill">📍 ${centre.distanceKm} ${this.t("distanceKm")}</span>
          </div>

          <div style="margin-bottom: 10px;">
            ${availBadge}
            <span class="badge badge-blue">⏰ ${centre.timings}</span>
          </div>

          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">
            <strong>📍 ${this.t("worksiteLocationLabel")}:</strong> ${centre.address}
          </p>

          <div style="background: #f8fafc; border-radius: var(--radius-md); padding: 10px; margin-bottom: 14px;">
            <div style="font-size: 12px; font-weight: 700; color: var(--text-dark); margin-bottom: 4px;">
              🥗 ${this.t("servicesProvided")}:
            </div>
            <ul style="padding-left: 18px; font-size: 12px; color: var(--text-muted); display: flex; flex-direction: column; gap: 2px;">
              ${centre.services.map(s => `<li>${s}</li>`).join("")}
            </ul>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 10px;">
            <div style="font-size: 12px; color: var(--text-muted);">
              <strong>${this.t("workerContact")}:</strong> ${centre.sevikaName}
            </div>
            <a href="tel:${centre.phone}" class="big-tap-btn btn-secondary" style="min-height: 40px; padding: 6px 14px; font-size: 13px; text-decoration: none; width: auto;">
              📞 Call: ${centre.phone}
            </a>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // =========================================================================
  // 10. AI MULTILINGUAL ASSISTANT (CHAT)
  // =========================================================================
  renderAssistantScreen() {
    const container = document.getElementById("screen-assistant");

    container.innerHTML = `
      <div class="screen-header-title">
        <span>🤖</span> ${this.t("assistantTitle")}
      </div>
      <p class="screen-header-subtitle">${this.t("assistantSubtitle")}</p>

      <div class="chat-window">
        <!-- Message Bubbles Container -->
        <div class="chat-messages" id="chatMessagesContainer"></div>

        <!-- Quick Prompt Chips -->
        <div class="chips-suggestions">
          <div class="prompt-chip" onclick="app.sendPresetChat('qMidYear')">📅 ${this.t("qMidYear")}</div>
          <div class="prompt-chip" onclick="app.sendPresetChat('qNoTc')">📄 ${this.t("qNoTc")}</div>
          <div class="prompt-chip" onclick="app.sendPresetChat('qWhereLeaveChild')">🧸 ${this.t("qWhereLeaveChild")}</div>
          <div class="prompt-chip" onclick="app.sendPresetChat('qFees')">💰 ${this.t("qFees")}</div>
          <div class="prompt-chip" onclick="app.sendPresetChat('qHostel')">🏢 ${this.t("qHostel")}</div>
        </div>

        <!-- Input Bar with Mic & Send -->
        <div class="chat-input-bar">
          <button type="button" class="mic-action-btn" id="micBtn" onclick="app.toggleMic()" title="Tap to speak">
            🎙️
          </button>
          <input type="text" id="chatInputText" class="chat-input-text" placeholder="${this.t("chatPlaceholder")}" onkeydown="if(event.key === 'Enter') app.handleUserChatSend()" />
          <button type="button" class="chat-send-btn" onclick="app.handleUserChatSend()">
            ➤
          </button>
        </div>
      </div>
    `;

    this.renderChatMessages();
  }

  renderChatMessages() {
    const container = document.getElementById("chatMessagesContainer");
    if (!container) return;

    let html = "";
    this.chatMessages.forEach((msg, idx) => {
      const isBot = msg.sender === "bot";
      const text = this.lang === "mr" && msg.textMr ? msg.textMr :
                   this.lang === "hi" && msg.textHi ? msg.textHi :
                   msg.textEn || msg.text;

      html += `
        <div class="chat-bubble ${isBot ? 'bot' : 'user'}">
          <div style="white-space: pre-line;">${text}</div>
          ${isBot ? `
            <div class="bubble-footer-actions">
              <button class="read-aloud-pill" id="readBtn-${idx}" onclick="app.speakMessage('${idx}')">
                🔊 ${this.t("readAloudBtn")}
              </button>
            </div>
          ` : ""}
        </div>
      `;
    });

    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
  }

  speakMessage(idx) {
    const msg = this.chatMessages[idx];
    if (!msg) return;

    const text = this.lang === "mr" && msg.textMr ? msg.textMr :
                 this.lang === "hi" && msg.textHi ? msg.textHi :
                 msg.textEn || msg.text;

    const btn = document.getElementById(`readBtn-${idx}`);
    if (window.assistantManager.isSpeaking) {
      window.assistantManager.stopSpeaking();
      if (btn) btn.innerHTML = `🔊 ${this.t("readAloudBtn")}`;
      return;
    }

    if (btn) btn.innerHTML = `⏹️ ${this.t("stopReadingBtn")}`;
    window.assistantManager.speak(text, this.lang, () => {
      if (btn) btn.innerHTML = `🔊 ${this.t("readAloudBtn")}`;
    });
  }

  sendPresetChat(key) {
    const question = this.t(key);
    this.handleChatQuery(question);
  }

  handleUserChatSend() {
    const input = document.getElementById("chatInputText");
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    input.value = "";
    this.handleChatQuery(text);
  }

  handleChatQuery(query) {
    // Add user message
    this.chatMessages.push({
      sender: "user",
      text: query,
      textEn: query,
      textMr: query,
      textHi: query
    });
    this.renderChatMessages();

    // Get assistant response
    setTimeout(() => {
      const response = window.assistantManager.getResponse(query, this.lang);
      this.chatMessages.push({
        sender: "bot",
        text: response,
        textEn: response,
        textMr: response,
        textHi: response
      });
      this.renderChatMessages();

      // Auto read aloud if desired or just let parent tap
    }, 400);
  }

  toggleMic() {
    const btn = document.getElementById("micBtn");
    if (window.assistantManager.isListening) {
      window.assistantManager.stopListening();
      if (btn) btn.classList.remove("listening");
      return;
    }

    if (btn) btn.classList.add("listening");
    window.assistantManager.startListening(
      this.lang,
      (transcript) => {
        if (btn) btn.classList.remove("listening");
        this.handleChatQuery(transcript);
      },
      (error) => {
        if (btn) btn.classList.remove("listening");
      },
      () => {
        if (btn) btn.classList.remove("listening");
      }
    );
  }

  // =========================================================================
  // 11. CHILD PROTECTION & HELP SCREEN
  // =========================================================================
  renderHelpScreen() {
    const container = document.getElementById("screen-help");

    container.innerHTML = `
      <div class="screen-header-title">
        <span>🛡️</span> ${this.t("protectionTitle")}
      </div>
      <p class="screen-header-subtitle">${this.t("protectionSubtitle")}</p>

      <!-- Verified Helplines Section -->
      <div class="ui-card">
        <h3 style="font-size: 16px; font-weight: 800; color: var(--danger-red); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
          🚨 ${this.t("emergencyHelplineSection")}
        </h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${emergencyHelplines.map(line => `
            <div style="display: flex; justify-content: space-between; align-items: center; background: #fff5f5; border: 1px solid #fed7d7; padding: 12px; border-radius: var(--radius-md);">
              <div>
                <strong style="color: #9b2c2c; font-size: 14px;">${line.name}</strong>
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${line.desc}</p>
              </div>
              <a href="${line.tel}" class="big-tap-btn btn-danger" style="width: auto; min-height: 40px; padding: 6px 14px; font-size: 13px; text-decoration: none;">
                📞 ${line.number}
              </a>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Legal Guidance Cards -->
      <div class="ui-card">
        <h3 style="font-size: 16px; font-weight: 800; color: var(--text-dark); margin-bottom: 12px;">
          📖 ${this.t("guidanceSection")}
        </h3>

        <!-- Card 1: What is child labour -->
        <div style="margin-bottom: 14px; background: #f8fafc; padding: 14px; border-radius: var(--radius-md); border-left: 4px solid var(--accent-amber);">
          <h4 style="font-size: 14px; font-weight: 800; color: var(--accent-amber); margin-bottom: 4px;">
            🛑 ${this.t("guideLabourTitle")}
          </h4>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.4;">
            ${this.t("guideLabourText")}
          </p>
        </div>

        <!-- Card 2: How to report abuse -->
        <div style="margin-bottom: 14px; background: #f8fafc; padding: 14px; border-radius: var(--radius-md); border-left: 4px solid var(--primary-blue);">
          <h4 style="font-size: 14px; font-weight: 800; color: var(--primary-blue-dark); margin-bottom: 4px;">
            📢 ${this.t("guideAbuseTitle")}
          </h4>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.4;">
            ${this.t("guideAbuseText")}
          </p>
        </div>

        <!-- Card 3: Worksite emergency -->
        <div style="background: #f8fafc; padding: 14px; border-radius: var(--radius-md); border-left: 4px solid var(--primary-green);">
          <h4 style="font-size: 14px; font-weight: 800; color: var(--primary-green-dark); margin-bottom: 4px;">
            🚨 ${this.t("guideEmergencyTitle")}
          </h4>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.4;">
            ${this.t("guideEmergencyText")}
          </p>
        </div>
      </div>

      <!-- Report a Concern Form -->
      <div class="ui-card">
        <h3 style="font-size: 16px; font-weight: 800; color: var(--text-dark); margin-bottom: 6px;">
          📝 ${this.t("reportConcernTitle")}
        </h3>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px;">
          ${this.lang === "mr" ? "तुमची माहिती पूर्णपणे सुरक्षित व गोपनीय ठेवली जाते." : "All reports are confidential and forwarded directly to the District Child Protection Unit."}
        </p>

        <form onsubmit="app.handleConcernSubmit(event)">
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">${this.t("concernTypeLabel")}</label>
            <select id="concernType" class="search-input" required>
              <option value="labour">${this.t("concernLabour")}</option>
              <option value="out_of_school">${this.t("concernOutOfSchool")}</option>
              <option value="safety">${this.t("concernSafety")}</option>
              <option value="marriage">${this.t("concernMarriage")}</option>
            </select>
          </div>

          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">${this.t("concernDescLabel")}</label>
            <textarea id="concernDesc" class="search-input" style="height: 70px; padding: 10px;" placeholder="Brief details about the child and situation..." required></textarea>
          </div>

          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">${this.t("concernLocationLabel")}</label>
            <input type="text" id="concernLoc" class="search-input" placeholder="e.g. Sugar Factory Gate 3, Hatkanangale" />
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
              <input type="checkbox" id="concernAnon" checked />
              <span>🔒 ${this.t("anonymousCheck")}</span>
            </label>
          </div>

          <button type="submit" class="big-tap-btn btn-danger">
            🚨 ${this.t("submitReportBtn")}
          </button>
        </form>
      </div>
    `;
  }

  handleConcernSubmit(event) {
    event.preventDefault();
    alert(this.t("reportSuccess"));
    const desc = document.getElementById("concernDesc");
    if (desc) desc.value = "";
  }

  // =========================================================================
  // 12. PRIVACY SCREEN
  // =========================================================================
  renderPrivacyScreen() {
    const container = document.getElementById("screen-privacy");

    container.innerHTML = `
      <div class="screen-header-title">
        <span>🔒</span> ${this.t("privacyTitle")}
      </div>
      <p class="screen-header-subtitle">Simple, honest data privacy for seasonal families.</p>

      <div class="ui-card">
        <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: var(--radius-md); padding: 14px; margin-bottom: 18px;">
          <p style="font-size: 14px; color: #166534; font-weight: 600; line-height: 1.4;">
            ${this.t("privacyConsentBanner")}
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 14px; color: var(--text-dark);">
          <div style="display: flex; gap: 10px;">
            <span style="font-size: 20px;">🛡️</span>
            <div><strong>${this.t("privacyPoint1")}</strong></div>
          </div>
          <div style="display: flex; gap: 10px;">
            <span style="font-size: 20px;">📋</span>
            <div><strong>${this.t("privacyPoint2")}</strong></div>
          </div>
          <div style="display: flex; gap: 10px;">
            <span style="font-size: 20px;">🪪</span>
            <div><strong>${this.t("privacyPoint3")}</strong></div>
          </div>
          <div style="display: flex; gap: 10px;">
            <span style="font-size: 20px;">🗑️</span>
            <div><strong>${this.t("privacyPoint4")}</strong></div>
          </div>
        </div>

        <div style="margin-top: 24px; border-top: 1px solid var(--border-light); padding-top: 16px;">
          <button class="doc-sub-btn doc-sub-btn-help" onclick="app.resetAllDemoData()">
            ⚠️ Reset All Prototype Demo Data to Default
          </button>
        </div>
      </div>
    `;
  }

  resetAllDemoData() {
    if (confirm("Reset all prototype data to defaults?")) {
      localStorage.clear();
      window.location.reload();
    }
  }

  // =========================================================================
  // 13. ADMIN DASHBOARD SCREEN (/admin)
  // =========================================================================
  renderAdminScreen() {
    const container = document.getElementById("screen-admin");

    // Compute admin metrics
    const totalRegistered = 142; // realistic mock count
    const appsReceived = 98;
    const docsMissing = 34;
    const outOfSchool = 19;

    // Sample applications table
    const tableRows = this.children.map((ch, idx) => {
      const appData = ch.application || {};
      const statusBadge = appData.status === "accepted" ? '<span class="badge badge-green">Accepted</span>' :
                          appData.status === "moredocs" ? '<span class="badge badge-amber">More Docs</span>' :
                          appData.status === "review" ? '<span class="badge badge-blue">Under Review</span>' :
                          appData.status === "submitted" ? '<span class="badge badge-purple">Submitted</span>' :
                          '<span class="badge badge-red">Unenrolled</span>';

      return `
        <tr>
          <td>
            <strong>${ch.name}</strong>
            <div style="font-size: 11px; color: var(--text-muted);">${ch.workSector}</div>
          </td>
          <td>${ch.currentDistrict}</td>
          <td>${appData.schoolName || 'None'}</td>
          <td>${appData.appliedDate || 'Pending'}</td>
          <td>${statusBadge}</td>
          <td>
            <div style="display: flex; gap: 4px;">
              <button class="badge badge-blue" style="cursor: pointer; border: none;" onclick="app.adminRequestDocs('${ch.id}', '${ch.name}')">${this.t("btnRequestDocs")}</button>
              <button class="badge badge-green" style="cursor: pointer; border: none;" onclick="app.adminApprove('${ch.id}', '${ch.name}')">${this.t("btnApprove")}</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <div class="screen-header-title" style="margin-bottom: 0;">
          <span>📊</span> ${this.t("adminTitle")}
        </div>
        <button class="doc-sub-btn doc-sub-btn-primary" onclick="app.navigate('home')">
          ← ${this.t("parentView")}
        </button>
      </div>
      <p class="screen-header-subtitle">${this.t("adminSubtitle")}</p>

      <!-- 4 KPI Metrics Cards -->
      <div class="admin-metrics-grid">
        <div class="metric-card">
          <div class="metric-num">${totalRegistered}</div>
          <div class="metric-title">${this.t("metricTotalRegistered")}</div>
        </div>
        <div class="metric-card">
          <div class="metric-num" style="color: var(--primary-green);">${appsReceived}</div>
          <div class="metric-title">${this.t("metricAppsReceived")}</div>
        </div>
        <div class="metric-card">
          <div class="metric-num" style="color: var(--accent-amber);">${docsMissing}</div>
          <div class="metric-title">${this.t("metricDocsMissing")}</div>
        </div>
        <div class="metric-card">
          <div class="metric-num" style="color: var(--danger-red);">${outOfSchool}</div>
          <div class="metric-title">${this.t("metricOutOfSchool")}</div>
        </div>
      </div>

      <!-- District Distribution Bar Chart -->
      <div class="ui-card">
        <h4 style="font-size: 15px; font-weight: 800; color: var(--text-dark); margin-bottom: 4px;">
          📈 ${this.t("chartTitle")}
        </h4>
        <div class="bar-chart-container">
          <div class="bar-row">
            <div class="bar-label">Kolhapur</div>
            <div class="bar-track">
              <div class="bar-fill" style="width: 82%;">48 children</div>
            </div>
          </div>
          <div class="bar-row">
            <div class="bar-label">Beed</div>
            <div class="bar-track">
              <div class="bar-fill" style="width: 70%;">41 children</div>
            </div>
          </div>
          <div class="bar-row">
            <div class="bar-label">Satara</div>
            <div class="bar-track">
              <div class="bar-fill" style="width: 52%;">29 children</div>
            </div>
          </div>
          <div class="bar-row">
            <div class="bar-label">Pune</div>
            <div class="bar-track">
              <div class="bar-fill" style="width: 32%;">16 children</div>
            </div>
          </div>
          <div class="bar-row">
            <div class="bar-label">Jalna</div>
            <div class="bar-track">
              <div class="bar-fill" style="width: 20%;">8 children</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Applications Table -->
      <div class="ui-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h4 style="font-size: 15px; font-weight: 800; color: var(--text-dark);">
            📋 ${this.t("appsTableTitle")}
          </h4>
          <button class="doc-sub-btn doc-sub-btn-help" onclick="alert('Exporting PDF/CSV summary report...')">
            📥 ${this.t("exportReport")}
          </button>
        </div>

        <div class="data-table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>${this.t("colChild")}</th>
                <th>${this.t("colDistrict")}</th>
                <th>${this.t("colSchool")}</th>
                <th>${this.t("colDate")}</th>
                <th>${this.t("colStatus")}</th>
                <th>${this.t("colActions")}</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  adminRequestDocs(childId, name) {
    const child = this.children.find(c => c.id === childId);
    if (child && child.application) {
      child.application.status = "moredocs";
      child.application.statusLabel = this.t("statusMoreDocs");
      child.application.notes = "Administrator sent SMS request for missing age declaration.";
      this.saveState("mc_children", this.children);
    }
    alert(`Simulated Action: SMS & WhatsApp notice sent to parent of ${name} requesting additional documents.`);
    this.renderAdminScreen();
  }

  adminApprove(childId, name) {
    const child = this.children.find(c => c.id === childId);
    if (child) {
      if (!child.application) child.application = { hasApplied: true };
      child.application.status = "accepted";
      child.application.statusLabel = this.t("statusAccepted");
      child.application.notes = "Admission approved under RTE Section 4 by District Child Welfare Officer.";
      this.saveState("mc_children", this.children);
    }
    alert(`Success: Admission formally APPROVED for ${name}! Uniform and books allotted.`);
    this.renderAdminScreen();
  }

  // =========================================================================
  // MODALS: Switch Child & Emergency Help
  // =========================================================================
  openSwitchChildModal() {
    const modal = document.getElementById("genericModal");
    const titleEl = document.getElementById("genericModalTitle");
    const bodyEl = document.getElementById("genericModalBody");

    titleEl.innerHTML = `👶 ${this.t("switchChild")} / Select Child Profile`;
    
    let html = `
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
        ${this.children.map(ch => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: ${ch.id === this.activeChildId ? '#e0f2fe' : '#f8fafc'}; border: 1.5px solid ${ch.id === this.activeChildId ? '#0284c7' : '#e2e8f0'}; border-radius: var(--radius-md); cursor: pointer;" onclick="app.setActiveChild('${ch.id}')">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="child-avatar">${ch.name.charAt(0)}</div>
              <div>
                <strong>${ch.name}</strong> (${ch.age} yrs • ${ch.targetClass})
                <div style="font-size: 11px; color: var(--text-muted);">${ch.workSector} • ${ch.currentDistrict}</div>
              </div>
            </div>
            ${ch.id === this.activeChildId ? '<span class="badge badge-blue">Active</span>' : '<span style="font-size: 12px; color: var(--primary-blue);">Switch</span>'}
          </div>
        `).join("")}
      </div>

      <button class="big-tap-btn btn-outline" onclick="app.navigate('login'); document.getElementById('genericModal').classList.remove('active');">
        ➕ Add Another Child Profile
      </button>
    `;

    bodyEl.innerHTML = html;
    modal.classList.add("active");
  }

  setActiveChild(childId) {
    this.activeChildId = childId;
    this.renderActiveChildSnippet();
    document.getElementById("genericModal").classList.remove("active");
    this.renderScreen(this.currentScreen);
  }

  openEmergencyModal() {
    const modal = document.getElementById("genericModal");
    const titleEl = document.getElementById("genericModalTitle");
    const bodyEl = document.getElementById("genericModalBody");

    titleEl.innerHTML = `🚨 ${this.t("emergencyTitle")} (1098)`;
    bodyEl.innerHTML = `
      <div style="text-align: center; margin-bottom: 16px;">
        <div style="font-size: 40px; margin-bottom: 4px;">📞</div>
        <h3 style="font-size: 18px; font-weight: 800; color: var(--danger-red);">Childline India 1098</h3>
        <p style="font-size: 13px; color: var(--text-muted);">
          24x7 Toll-Free Emergency Helpline for Children in Distress & Protection
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px;">
        <a href="tel:1098" class="big-tap-btn btn-danger" style="text-decoration: none;">
          📞 Tap to Call 1098 Now (Free)
        </a>
        <a href="tel:112" class="big-tap-btn btn-secondary" style="text-decoration: none;">
          🚔 Police Emergency (112)
        </a>
      </div>

      <div style="background: #f8fafc; padding: 12px; border-radius: var(--radius-md); font-size: 12px; color: var(--text-muted); line-height: 1.4;">
        ℹ️ Calls are free from any mobile phone. You do not need balance or recharge. Your identity is protected.
      </div>
    `;

    modal.classList.add("active");
  }
}

// Instantiate Global App
window.app = new App();

