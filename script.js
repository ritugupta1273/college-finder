(function () {
  "use strict";

  /**
   * Central college dataset — search, compare, and overlays read from here (no reload).
   * Figures are illustrative for demo UX; verify with official brochures before decisions.
   */
  const COLLEGES_DATA = [
  {
    id: "iit-madras",
    name: "IIT Madras",
    short: "Chennai · Engineering & research",
    stream: "engineering",
    fees: "≈ ₹2.0–2.3 L / year (B.Tech, public)",
    placement: "≈ ₹21 LPA median (public reports)",
    location: "Chennai, Tamil Nadu",
    exams: "JEE Advanced",
    nirf: "NIRF #1 Engineering (recent cycles)",
    verified: true,
    link: "https://www.iitm.ac.in/",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=85",
    campusLife: "Strong research culture, CFI student tech clubs, and Asia’s largest tech fest (Shaastra). Hostels are spread across a green campus with metro connectivity improving year on year."
  },
  {
    id: "iisc",
    name: "IISc Bangalore",
    short: "Bengaluru · Research university",
    stream: "engineering",
    fees: "Varies by programme; research fellowships common",
    placement: "PhD / MS heavy; industry labs on campus",
    location: "Bengaluru, Karnataka",
    exams: "KVPY / GATE / JAM / JEE (select programmes)",
    nirf: "NIRF #1 University (overall)",
    verified: true,
    link: "https://iisc.ac.in/",
    image: "https://images.unsplash.com/photo-1564981797816-1129724d769d?auto=format&fit=crop&w=1200&q=85",
    campusLife: "India’s apex science campus — dense seminar culture, IISc start-up hub, and proximity to Bengaluru’s R&D corridor."
  },
  {
    id: "aiims-delhi",
    name: "AIIMS Delhi",
    short: "New Delhi · Apex medical",
    stream: "medical",
    fees: "Highly subsidised UG fees (govt. policy)",
    placement: "Residency / PG pathways; strong clinical network",
    location: "New Delhi",
    exams: "NEET UG",
    nirf: "NIRF #1 Medical",
    verified: true,
    link: "https://www.aiims.edu/",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85",
    campusLife: "Rigorous clinical rotations from early years; active research in AIIMS departments; intense but tightly-knit batch culture."
  },
  {
    id: "iit-delhi",
    name: "IIT Delhi",
    short: "New Delhi · Placements & startups",
    stream: "engineering",
    fees: "≈ ₹2.2 L / year (B.Tech, indicative)",
    placement: "≈ ₹25+ LPA median (batch-dependent)",
    location: "New Delhi",
    exams: "JEE Advanced",
    nirf: "NIRF top 3 Engineering · QS Asia ranked",
    verified: true,
    link: "https://home.iitd.ac.in/",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85",
    campusLife: "Hauz Khas location with strong industry ties; B.R.A. IIT Delhi start-up incubator; active tech & cultural societies."
  },
  {
    id: "iim-a",
    name: "IIM Ahmedabad",
    short: "Ahmedabad · Flagship MBA",
    stream: "management",
    fees: "MBA fees as per IIM-A policy (premium)",
    placement: "Top-tier domestic & international roles",
    location: "Ahmedabad, Gujarat",
    exams: "CAT + PI",
    nirf: "NIRF #1 Management (historically)",
    verified: true,
    link: "https://www.iima.ac.in/",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    campusLife: "Case-method pedagogy, global exchange tie-ups, and a tight alumni network across consulting, finance, and product."
  },
  {
    id: "nlsiu",
    name: "NLSIU Bangalore",
    short: "Bengaluru · National law school",
    stream: "law",
    fees: "As per NLU policy; scholarships available",
    placement: "Tier-1 law firms, litigation, policy",
    location: "Bengaluru, Karnataka",
    exams: "CLAT",
    nirf: "NIRF top Law (India)",
    verified: true,
    link: "https://www.nls.ac.in/",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=85",
    campusLife: "Moot courts, journals, and policy clinics; competitive peer set with strong placement into firms and chambers."
  },
  {
    id: "jnu",
    name: "JNU Delhi",
    short: "New Delhi · Social sciences & languages",
    stream: "arts",
    fees: "Subsidised UG/PG (public university)",
    placement: "Research, civil services, NGOs, media",
    location: "New Delhi",
    exams: "CUET (UG) / JNUEE patterns (check current year)",
    nirf: "Top social sciences reputation (India)",
    verified: true,
    link: "https://www.jnu.ac.in/",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85",
    campusLife: "Vibrant campus democracy, strong seminar culture, and affordable housing — ideal for humanities & policy aspirants."
  },
  {
    id: "srcc",
    name: "SRCC Delhi",
    short: "Delhi · Commerce flagship",
    stream: "management",
    fees: "DU fee structure (affordable UG)",
    placement: "Finance, consulting, UPSC pipeline",
    location: "New Delhi",
    exams: "CUET UG",
    nirf: "DU · Top commerce college",
    verified: true,
    link: "https://www.srcc.edu/",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=85",
    campusLife: "North Campus energy, strong societies (finance & economics), and proximity to Delhi’s internship markets."
  },
  {
    id: "vit",
    name: "VIT Vellore",
    short: "Tamil Nadu · Private technical university",
    stream: "engineering",
    fees: "≈ ₹1.7–2.0 L / year (indicative; branch-dependent)",
    placement: "≈ ₹8–10 LPA median (batch-dependent)",
    location: "Vellore, Tamil Nadu",
    exams: "VITEEE / management quotas",
    nirf: "Among top private engineering (NIRF)",
    verified: true,
    link: "https://vit.ac.in/",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
    campusLife: "Large cohorts, calendarised placements, and active coding clubs; campus shuttle between hostels and academic blocks."
  }
];

  const STREAM_LABELS = {
    engineering: "Engineering",
    medical: "Medical",
    management: "Management",
    law: "Law",
    arts: "Arts & Humanities"
  };
  const STREAM_RELATED_COURSES = {
    engineering: [
      "B.Tech Computer Science and Engineering",
      "B.Tech Artificial Intelligence and Data Science",
      "B.Tech Information Technology",
      "B.Tech Electronics and Communication Engineering",
      "B.Tech Electrical Engineering",
      "B.Tech Mechanical Engineering",
      "B.Tech Civil Engineering",
      "B.Tech Chemical Engineering",
      "B.Tech Aerospace Engineering",
      "B.Tech Biotechnology"
    ],
    medical: [
      "MBBS",
      "BDS",
      "BAMS",
      "BHMS",
      "BPT",
      "B.Sc Nursing",
      "B.Pharm",
      "BMLT",
      "B.Optom",
      "BUMS"
    ],
    management: [
      "BBA",
      "BMS",
      "Integrated BBA MBA",
      "MBA Marketing",
      "MBA Finance",
      "MBA Human Resource Management",
      "MBA Business Analytics",
      "MBA Operations Management",
      "PGDM",
      "Executive MBA"
    ],
    law: [
      "BA LLB (Hons)",
      "BBA LLB (Hons)",
      "B.Com LLB",
      "B.Sc LLB",
      "LLB (3 Year)",
      "LLM Corporate Law",
      "LLM Constitutional Law",
      "LLM Criminal Law",
      "Diploma in Cyber Law",
      "Diploma in Intellectual Property Rights"
    ],
    arts: [
      "BA English",
      "BA Economics",
      "BA Psychology",
      "BA Political Science",
      "BA Sociology",
      "BA History",
      "BA Journalism and Mass Communication",
      "BA Fine Arts",
      "BA Philosophy",
      "BA Public Administration"
    ]
  };

  const MQ_MOBILE = window.matchMedia("(max-width: 768px)");

  function initIcons() {
    if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
      lucide.createIcons();
    }
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function getCollege(id) {
    return COLLEGES_DATA.find(function (c) {
      return c.id === id;
    });
  }

  var TRENDING_IMAGES_BY_ID = {
    "iit-madras": "./images/iit madras.jpg.jpeg",
    iisc: "./images/iisc banglore.jpg.jpeg",
    "iit-delhi": "./images/iit delhi.jpg.jpeg",
    "iim-a": "./images/iim ahmedabad.jpg.jpeg",
    nlsiu: "./images/nlsiu banglore.jpg.jpeg",
    jnu: "./images/jnu delhi.jpg.jpeg",
    srcc: "./images/srcc delhi.jpg.jpeg",
    vit: "./images/vit vellore.jpg.jpeg"
  };

  function fileKeyFromName(name) {
    return String(name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .replace(/\s+/g, " ");
  }

  function getLocalCollegeImage(c) {
    if (c && TRENDING_IMAGES_BY_ID[c.id]) return TRENDING_IMAGES_BY_ID[c.id];
    return "./images/" + fileKeyFromName(c && c.name ? c.name : "") + ".jpg";
  }

  /* —— Trending cards + compare —— */
  const MAX_COMPARE = 3;
  let compareIds = [];

  const trendingGrid = byId("trendingGrid");

  function syncCompareCheckboxes() {
    document.querySelectorAll(".trend-compare").forEach(function (cb) {
      var id = cb.getAttribute("data-college-id");
      cb.checked = compareIds.indexOf(id) !== -1;
      var atCap = compareIds.length >= MAX_COMPARE;
      var on = compareIds.indexOf(id) !== -1;
      cb.disabled = atCap && !on;
    });
  }

  function updateCompareBar() {
    var bar = byId("compareBar");
    var countEl = byId("compareCount");
    var namesEl = byId("compareNames");
    var btn = byId("compareView");
    if (!bar || !countEl) return;
    var n = compareIds.length;
    if (n === 0) {
      bar.classList.remove("is-visible");
    } else {
      bar.classList.add("is-visible");
    }
    countEl.textContent = n + " / " + MAX_COMPARE + " selected";
    if (namesEl) {
      namesEl.innerHTML = compareIds
        .map(function (id) {
          var c = getCollege(id);
          return c ? "<span>" + escapeHtml(c.name) + "</span>" : "";
        })
        .join("");
    }
    if (btn) {
      btn.disabled = n < 2;
    }
    syncCompareCheckboxes();
    initIcons();
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function toggleCompare(id, checked) {
    var idx = compareIds.indexOf(id);
    if (checked) {
      if (idx === -1) {
        if (compareIds.length >= MAX_COMPARE) return;
        compareIds.push(id);
      }
    } else {
      if (idx !== -1) compareIds.splice(idx, 1);
    }
    updateCompareBar();
  }

  function renderTrendingCards() {
    if (!trendingGrid) return;
    trendingGrid.innerHTML = COLLEGES_DATA.map(function (c) {
      var v = c.verified
        ? '<span class="badge-verified"><i data-lucide="badge-check"></i> Verified</span>'
        : "";
      var official =
        c.link
          ? '<a class="btn-official" href="' +
            escapeHtml(c.link) +
            '" target="_blank" rel="noopener noreferrer">' +
            '<i data-lucide="external-link"></i><span>Official Site</span></a>'
          : "";
      var localImg = getLocalCollegeImage(c);
      var imgSrc = localImg;
      var fallbackImg = c.image || "";
      return (
        '<article class="trend-card" data-id="' +
        escapeHtml(c.id) +
        '">' +
        '<div class="trend-card__img">' +
        '<img src="' +
        escapeHtml(imgSrc) +
        '" data-fallback-src="' +
        escapeHtml(fallbackImg) +
        '" alt="" loading="lazy" onerror="this.onerror=null; if(this.dataset && this.dataset.fallbackSrc){ this.src=this.dataset.fallbackSrc; }"/>' +
        '<span class="badge-nirf">NIRF Top Ranked</span>' +
        "</div>" +
        '<div class="trend-card__body">' +
        '<div class="trend-card__head">' +
        "<h3>" +
        escapeHtml(c.name) +
        "</h3>" +
        v +
        "</div>" +
        "<p>" +
        escapeHtml(c.short) +
        "</p>" +
        '<span class="trend-meta">' +
        escapeHtml(c.nirf) +
        "</span>" +
        '<label class="trend-compare-label">' +
        '<input type="checkbox" class="trend-compare" data-college-id="' +
        escapeHtml(c.id) +
        '" /> Compare</label>' +
        '<div class="trend-actions">' +
        official +
        '<button type="button" class="btn-details" data-open-details="' +
        escapeHtml(c.id) +
        '">View Details</button>' +
        "</div>" +
        "</div></article>"
      );
    }).join("");

    trendingGrid.querySelectorAll(".trend-compare").forEach(function (cb) {
      cb.addEventListener("change", function () {
        toggleCompare(cb.getAttribute("data-college-id"), cb.checked);
      });
    });

    trendingGrid.querySelectorAll("[data-open-details]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openCollegeOverlay(btn.getAttribute("data-open-details"));
      });
    });

    syncCompareCheckboxes();
    initIcons();
  }

  /* —— College fullscreen overlay —— */
  var collegeOverlay = byId("collegeOverlay");
  var collegeOverlayContent = byId("collegeOverlayContent");
  var collegeOverlayClose = byId("collegeOverlayClose");

  function openCollegeOverlay(id) {
    var c = getCollege(id);
    if (!c || !collegeOverlay || !collegeOverlayContent) return;
    var localImg = getLocalCollegeImage(c);
    var fallbackImg = c.image || "";
    collegeOverlayContent.innerHTML =
      '<div class="overlay-hero">' +
      '<img src="' +
      escapeHtml(localImg) +
      '" data-fallback-src="' +
      escapeHtml(fallbackImg) +
      '" alt="" onerror="this.onerror=null; if(this.dataset && this.dataset.fallbackSrc){ this.src=this.dataset.fallbackSrc; }"/>' +
      '<div class="overlay-hero__text">' +
      "<h2>" +
      escapeHtml(c.name) +
      "</h2>" +
      "<p>" +
      escapeHtml(c.short) +
      "</p></div></div>" +
      (c.link
        ? '<div class="overlay-actions">' +
          '<a class="btn-official" href="' +
          escapeHtml(c.link) +
          '" target="_blank" rel="noopener noreferrer">' +
          '<i data-lucide="external-link"></i><span>Official Website</span></a>' +
          "</div>"
        : "") +
      '<div class="overlay-grid">' +
      '<div class="overlay-stat"><span>Fees</span><p>' +
      escapeHtml(c.fees) +
      "</p></div>" +
      '<div class="overlay-stat"><span>Placements</span><p>' +
      escapeHtml(c.placement) +
      "</p></div>" +
      '<div class="overlay-stat"><span>Location</span><p>' +
      escapeHtml(c.location) +
      "</p></div>" +
      '<div class="overlay-stat"><span>Entrance</span><p>' +
      escapeHtml(c.exams) +
      "</p></div></div>" +
      '<section class="overlay-section"><h3>Campus life</h3><p>' +
      escapeHtml(c.campusLife) +
      "</p></section>";
    collegeOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    initIcons();
    if (collegeOverlayClose) collegeOverlayClose.focus();
  }

  function closeCollegeOverlay() {
    if (!collegeOverlay) return;
    collegeOverlay.hidden = true;
    document.body.style.overflow = "";
  }

  if (collegeOverlayClose) {
    collegeOverlayClose.addEventListener("click", closeCollegeOverlay);
  }
  if (collegeOverlay) {
    collegeOverlay.addEventListener("click", function (e) {
      if (e.target && e.target.hasAttribute("data-close-college-overlay")) {
        closeCollegeOverlay();
      }
    });
  }

  /* —— Compare modal table —— */
  var compareModal = byId("compareModal");
  var compareTableWrap = byId("compareTableWrap");
  var compareModalClose = byId("compareModalClose");
  var compareViewBtn = byId("compareView");
  var compareClearBtn = byId("compareClear");

  function buildCompareTable() {
    if (!compareTableWrap) return;
    var ids = compareIds.slice();
    if (ids.length < 2) return;
    var rows = [
      { label: "Fees", key: "fees" },
      { label: "Placement (avg.)", key: "placement" },
      { label: "Location", key: "location" },
      { label: "Entrance exams", key: "exams" }
    ];
    var cols = ids.map(function (id) {
      return getCollege(id);
    });
    var thead =
      "<thead><tr><th></th>" +
      cols
        .map(function (c) {
          return "<th>" + escapeHtml(c.name) + "</th>";
        })
        .join("") +
      "</tr></thead>";
    var tbody =
      "<tbody>" +
      rows
        .map(function (row) {
          return (
            "<tr><th>" +
            escapeHtml(row.label) +
            "</th>" +
            cols
              .map(function (c) {
                return "<td>" + escapeHtml(c[row.key]) + "</td>";
              })
              .join("") +
            "</tr>"
          );
        })
        .join("") +
      "</tbody>";
    compareTableWrap.innerHTML = '<table class="compare-table">' + thead + tbody + "</table>";
  }

  function openCompareModal() {
    if (!compareModal || compareIds.length < 2) return;
    buildCompareTable();
    compareModal.hidden = false;
    document.body.style.overflow = "hidden";
    initIcons();
  }

  function closeCompareModal() {
    if (!compareModal) return;
    compareModal.hidden = true;
    if (!collegeOverlay || collegeOverlay.hidden) {
      document.body.style.overflow = "";
    }
  }

  if (compareViewBtn) {
    compareViewBtn.addEventListener("click", openCompareModal);
  }
  if (compareModalClose) {
    compareModalClose.addEventListener("click", closeCompareModal);
  }
  if (compareModal) {
    compareModal.addEventListener("click", function (e) {
      if (e.target && e.target.hasAttribute("data-close-compare")) {
        closeCompareModal();
      }
    });
  }
  if (compareClearBtn) {
    compareClearBtn.addEventListener("click", function () {
      compareIds = [];
      updateCompareBar();
      closeCompareModal();
    });
  }

  /* —— Stream / courses modal —— */
  var streamModal = byId("streamModal");
  var streamModalTitle = byId("streamModalTitle");
  var streamModalIntro = byId("streamModalIntro");
  var streamCollegeList = byId("streamCollegeList");
  var streamModalClose = byId("streamModalClose");
  var coursesDropdown = byId("coursesDropdown");
  var coursesTrigger = byId("coursesTrigger");

  function setCoursesDropdown(open) {
    if (!coursesDropdown || !coursesTrigger) return;
    coursesDropdown.classList.toggle("is-open", open);
    coursesTrigger.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function openStreamModal(streamKey) {
    if (!streamModal || !streamModalTitle || !streamCollegeList) {
      window.location.href = "index.html#trending";
      return;
    }
    var label = STREAM_LABELS[streamKey] || streamKey;
    streamModalTitle.textContent = "Top 10 related courses — " + label;
    if (streamModalIntro) {
      streamModalIntro.textContent =
        "Popular course options for " +
        label +
        ".";
    }
    var list = STREAM_RELATED_COURSES[streamKey] || [];
    streamCollegeList.innerHTML = list
      .slice(0, 10)
      .map(function (courseName) {
        return (
          "<li><button type=\"button\" class=\"stream-pick\" data-course-query=\"" +
          escapeHtml(courseName) +
          "\"><strong>" +
          escapeHtml(courseName) +
          "</strong></button></li>"
        );
      })
      .join("");
    streamCollegeList.querySelectorAll(".stream-pick").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var query = btn.getAttribute("data-course-query") || "";
        var input = byId("collegeSearch");
        closeStreamModal();
        if (input) input.value = query;
        runSearch(query);
      });
    });
    streamModal.hidden = false;
    document.body.style.overflow = "hidden";
    setCoursesDropdown(false);
    initIcons();
    if (streamModalClose) streamModalClose.focus();
  }

  function closeStreamModal() {
    if (!streamModal) return;
    streamModal.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-stream]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var key = btn.getAttribute("data-stream");
      if (key) openStreamModal(key);
    });
  });

  if (streamModalClose) {
    streamModalClose.addEventListener("click", closeStreamModal);
  }
  if (streamModal) {
    streamModal.addEventListener("click", function (e) {
      if (e.target && e.target.hasAttribute("data-close-stream")) {
        closeStreamModal();
      }
    });
  }

  if (coursesTrigger && coursesDropdown) {
    coursesTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      setCoursesDropdown(!coursesDropdown.classList.contains("is-open"));
    });

    document.addEventListener("click", function (e) {
      if (!coursesDropdown.contains(e.target)) {
        setCoursesDropdown(false);
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (streamModal && !streamModal.hidden) closeStreamModal();
    else if (compareModal && !compareModal.hidden) closeCompareModal();
    else if (collegeOverlay && !collegeOverlay.hidden) closeCollegeOverlay();
    else if (cityModal && !cityModal.hidden) closeCityModal();
  });

  /* —— Hero slider —— */
  var heroSlides = document.querySelectorAll(".hero-slide");
  var totalSlides = heroSlides.length;
  var currentSlide = 0;
  var sliderTimer = null;
  var sliderDots = byId("sliderDots");
  var btnPrev = byId("sliderPrev");
  var btnNext = byId("sliderNext");
  var heroSection = document.querySelector(".hero");
  var SLIDER_INTERVAL_MS = 5500;

  function showSlide(index) {
    if (!totalSlides) return;
    var next = ((index % totalSlides) + totalSlides) % totalSlides;
    currentSlide = next;
    heroSlides.forEach(function (slide, i) {
      slide.classList.toggle("is-active", i === currentSlide);
    });
    if (sliderDots) {
      sliderDots.querySelectorAll(".slider-dot").forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === currentSlide);
        dot.setAttribute("aria-current", i === currentSlide ? "true" : "false");
      });
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startSlider() {
    if (!totalSlides) return;
    stopSlider();
    sliderTimer = window.setInterval(nextSlide, SLIDER_INTERVAL_MS);
  }

  function stopSlider() {
    if (sliderTimer !== null) {
      window.clearInterval(sliderTimer);
      sliderTimer = null;
    }
  }

  function buildDots() {
    if (!sliderDots || !totalSlides) return;
    sliderDots.innerHTML = "";
    for (var i = 0; i < totalSlides; i += 1) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.setAttribute("aria-current", i === 0 ? "true" : "false");
      dot.addEventListener("click", function (idx) {
        return function () {
          showSlide(idx);
          startSlider();
        };
      }(i));
      sliderDots.appendChild(dot);
    }
  }

  if (totalSlides > 0) {
    buildDots();
    showSlide(0);
    startSlider();
    if (btnNext) {
      btnNext.addEventListener("click", function () {
        nextSlide();
        startSlider();
        initIcons();
      });
    }
    if (btnPrev) {
      btnPrev.addEventListener("click", function () {
        prevSlide();
        startSlider();
        initIcons();
      });
    }
    if (heroSection) {
      heroSection.addEventListener("mouseenter", stopSlider);
      heroSection.addEventListener("mouseleave", startSlider);
      heroSection.addEventListener("focusin", stopSlider);
      heroSection.addEventListener("focusout", startSlider);
    }
  }

  /* —— Mobile nav —— */
  var navToggle = byId("navToggle");
  var navPanel = byId("navPanel");

  function closeMobileNav() {
    if (!navPanel || !navToggle) return;
    navPanel.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  function openMobileNav() {
    if (!navPanel || !navToggle) return;
    navPanel.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
  }

  if (navToggle && navPanel) {
    navToggle.addEventListener("click", function () {
      if (navPanel.classList.contains("is-open")) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
      initIcons();
    });

    navPanel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (MQ_MOBILE.matches) closeMobileNav();
      });
    });
  }

  MQ_MOBILE.addEventListener("change", function () {
    setCoursesDropdown(false);
    closeMobileNav();
  });

  /* —— City modal —— */
  var cityModal = byId("cityModal");
  var cityModalClose = byId("cityModalClose");
  var modalTitle = byId("cityModalTitle");
  var modalColleges = byId("modalColleges");
  var modalCost = byId("modalCost");
  var modalHub = byId("modalHub");
  var modalSafety = byId("modalSafety");

  function openCityModal(tile) {
    if (!cityModal || !modalTitle) return;
    modalTitle.textContent = tile.getAttribute("data-city") || "City";
    if (modalColleges) {
      modalColleges.innerHTML =
        "<strong>Top Colleges:</strong> " + (tile.getAttribute("data-colleges") || "—");
    }
    if (modalCost) {
      modalCost.innerHTML =
        "<strong>Avg. Living Cost:</strong> " + (tile.getAttribute("data-cost") || "—");
    }
    if (modalSafety) {
      modalSafety.innerHTML =
        "<strong>Safety:</strong> " + (tile.getAttribute("data-safety") || "—");
    }
    if (modalHub) {
      modalHub.innerHTML = "<strong>Key Hub:</strong> " + (tile.getAttribute("data-hub") || "—");
    }
    cityModal.hidden = false;
    document.body.style.overflow = "hidden";
    initIcons();
    if (cityModalClose) cityModalClose.focus();
  }

  function closeCityModal() {
    if (!cityModal) return;
    cityModal.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".city-tile").forEach(function (tile) {
    tile.addEventListener("click", function () {
      openCityModal(tile);
    });
  });

  if (cityModalClose) {
    cityModalClose.addEventListener("click", closeCityModal);
  }
  if (cityModal) {
    cityModal.addEventListener("click", function (e) {
      if (e.target && e.target.hasAttribute("data-close-modal")) {
        closeCityModal();
      }
    });
  }

  /* —— Search —— */
  var heroSearchForm = byId("heroSearchForm");
  var searchToast = byId("searchToast");
  var searchResultsSection = byId("search-results");
  var searchResultsGrid = byId("searchResultsGrid");
  var searchResultsTitle = byId("searchResultsTitle");
  var searchResultsHint = byId("searchResultsHint");

  function showToast(message) {
    if (!searchToast) return;
    searchToast.textContent = message;
    searchToast.hidden = false;
    searchToast.classList.add("is-visible");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      searchToast.classList.remove("is-visible");
      searchToast.hidden = true;
    }, 2600);
  }

  function runSearch(q) {
    var query = (q || "").trim().toLowerCase();
    if (!searchResultsSection || !searchResultsGrid) {
      if (query) showToast("Searching 50,000+ listings for: " + q.trim());
      else showToast("Type a college, city, or course.");
      return;
    }
    if (!query) {
      searchResultsSection.hidden = true;
      showToast("Type a college, city, or course.");
      return;
    }
    var matches = COLLEGES_DATA.filter(function (c) {
      return (
        c.name.toLowerCase().indexOf(query) !== -1 ||
        c.short.toLowerCase().indexOf(query) !== -1 ||
        c.location.toLowerCase().indexOf(query) !== -1 ||
        c.exams.toLowerCase().indexOf(query) !== -1 ||
        c.stream.toLowerCase().indexOf(query) !== -1
      );
    });
    if (searchResultsTitle) searchResultsTitle.textContent = "Results for “" + q.trim() + "”";
    if (searchResultsHint) {
      searchResultsHint.textContent =
        matches.length === 0
          ? "No exact matches in our featured set — try IIT, AIIMS, law, or a city name."
          : matches.length + " match(es) in featured colleges.";
    }
    searchResultsGrid.innerHTML = matches
      .map(function (c) {
        return (
          '<article class="search-hit">' +
          "<h3>" +
          escapeHtml(c.name) +
          "</h3>" +
          "<p>" +
          escapeHtml(c.short) +
          "</p>" +
          '<button type="button" class="btn-details btn-details--inline" data-open-details="' +
          escapeHtml(c.id) +
          '">View Details</button>' +
          "</article>"
        );
      })
      .join("");
    searchResultsGrid.querySelectorAll("[data-open-details]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openCollegeOverlay(btn.getAttribute("data-open-details"));
      });
    });
    searchResultsSection.hidden = matches.length === 0;
    if (matches.length) {
      searchResultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      showToast("No featured matches — browse Trending below.");
    }
    initIcons();
  }

  /* —— Explore programs filter —— */
  var programTabs = byId("programTabs");
  var programGrid = byId("programGrid");
  var programTabsPrev = byId("programTabsPrev");
  var programTabsNext = byId("programTabsNext");

  function setProgramFilter(key) {
    if (!programTabs || !programGrid) return;
    programTabs.querySelectorAll(".program-tab").forEach(function (btn) {
      var on = btn.getAttribute("data-program-filter") === key;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    programGrid.querySelectorAll(".program-card").forEach(function (card) {
      var cat = card.getAttribute("data-program-cat") || "";
      card.hidden = key !== "all" && key !== cat;
    });
  }

  if (programTabs) {
    programTabs.querySelectorAll(".program-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-program-filter") || "all";
        setProgramFilter(key);
      });
    });
    setProgramFilter("all");
  }

  if (programTabs && programTabsPrev && programTabsNext) {
    programTabsPrev.addEventListener("click", function () {
      programTabs.scrollBy({ left: -220, behavior: "smooth" });
    });
    programTabsNext.addEventListener("click", function () {
      programTabs.scrollBy({ left: 220, behavior: "smooth" });
    });
  }

  if (heroSearchForm) {
    heroSearchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = byId("collegeSearch");
      runSearch(input ? input.value : "");
    });
  }

  var exploreCardGrid = byId("cardGrid");
  var filterBar = byId("filterBar");
  var filterNextBtn = document.querySelector(".next-btn");
  if (exploreCardGrid && filterBar) {
    var filterButtons = filterBar.querySelectorAll(".filter-btn");
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var selectedCategory = (btn.textContent || "").trim();
        filterButtons.forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });
        exploreCardGrid.querySelectorAll(".card").forEach(function (card) {
          var cardCategories = card.getAttribute("data-category") || "";
          var shouldShow =
            selectedCategory === "All" ||
            cardCategories.split(" ").indexOf(selectedCategory) !== -1;
          card.classList.toggle("hidden", !shouldShow);
          card.style.opacity = shouldShow ? "1" : "0";
        });
      });
    });
  }
  if (filterBar && filterNextBtn) {
    filterNextBtn.addEventListener("click", function () {
      filterBar.scrollBy({ left: 250, behavior: "smooth" });
    });
  }

  var CAREER_ROADMAP_DATA = {
    engineering: {
      title: "Roadmap",
      sub: "",
      colleges: ["IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", "NIT Trichy", "NIT Surathkal"],
      steps: [
        ["Choose stream & exams", "Select engineering, medical, management, law, or arts and map required entrance exams early."],
        ["Build profile", "Keep academic scores strong, join projects/internships, and improve communication and aptitude."],
        ["Apply and compare colleges", "Compare fees, placements, campus life, and location before locking your final shortlist."],
        ["Plan long-term career", "Choose specialization, certifications, and industry exposure to align with career goals."]
      ]
    },
    medical: {
      title: "Roadmap",
      sub: "",
      colleges: ["AIIMS Delhi", "CMC Vellore", "JIPMER Puducherry", "KGMU Lucknow", "MAMC Delhi", "Seth GS Mumbai"],
      steps: [
        ["Choose stream & exams", "Select engineering, medical, management, law, or arts and map required entrance exams early."],
        ["Build profile", "Keep academic scores strong, join projects/internships, and improve communication and aptitude."],
        ["Apply and compare colleges", "Compare fees, placements, campus life, and location before locking your final shortlist."],
        ["Plan long-term career", "Choose specialization, certifications, and industry exposure to align with career goals."]
      ]
    },
    management: {
      title: "Roadmap",
      sub: "",
      colleges: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "FMS Delhi", "SPJIMR Mumbai", "IIFT Delhi"],
      steps: [
        ["Choose stream & exams", "Select engineering, medical, management, law, or arts and map required entrance exams early."],
        ["Build profile", "Keep academic scores strong, join projects/internships, and improve communication and aptitude."],
        ["Apply and compare colleges", "Compare fees, placements, campus life, and location before locking your final shortlist."],
        ["Plan long-term career", "Choose specialization, certifications, and industry exposure to align with career goals."]
      ]
    }
  };

  var roadmapPanel = byId("careerRoadmapPanel");
  var roadmapTitle = byId("careerRoadmapTitle");
  var roadmapSub = byId("careerRoadmapSub");
  var roadmapSteps = byId("careerRoadmapSteps");
  var roadmapBtn = byId("careerRoadmapBtn");
  var careerCollegeListWrap = byId("careerCollegeListWrap");
  var careerCollegeList = byId("careerCollegeList");
  var careerCollegeListTitle = byId("careerCollegeListTitle");
  var streamGrid = byId("careerStreamsGrid");

  function setCareerRoadmap(key, showCollegeList) {
    if (!roadmapPanel || !roadmapTitle || !roadmapSub || !roadmapSteps) return;
    var data = CAREER_ROADMAP_DATA[key] || CAREER_ROADMAP_DATA.engineering;
    roadmapSub.textContent = "Simple path from class 11-12 to your first job or higher studies.";
    roadmapSteps.innerHTML = data.steps
      .map(function (step, idx) {
        return (
          "<li><span class=\"career-roadmap-step__num\">" +
          String(idx + 1) +
          "</span><div class=\"career-roadmap-step__text\"><strong>" +
          escapeHtml(step[0]) +
          "</strong><span>" +
          escapeHtml(step[1]) +
          "</span></div></li>"
        );
      })
      .join("");
    if (careerCollegeList) {
      var list = data.colleges || [];
      careerCollegeList.innerHTML = list
        .map(function (name) {
          return "<li>" + escapeHtml(name) + "</li>";
        })
        .join("");
    }
    if (careerCollegeListWrap) {
      careerCollegeListWrap.hidden = !showCollegeList;
    }
    if (careerCollegeListTitle) {
      var label = key.charAt(0).toUpperCase() + key.slice(1);
      careerCollegeListTitle.textContent = "Related Colleges - " + label;
    }
    if (streamGrid) {
      streamGrid.querySelectorAll(".career-stream-card").forEach(function (card) {
        card.classList.toggle("is-active", card.getAttribute("data-roadmap-key") === key);
      });
    }
    if (roadmapBtn) {
      var targetHash = key === "medical" ? "#science" : key === "management" ? "#commerce" : "#science";
      roadmapBtn.setAttribute("href", "careers.html" + targetHash);
    }
  }

  if (streamGrid) {
    streamGrid.querySelectorAll(".career-stream-card").forEach(function (card) {
      card.addEventListener("click", function (e) {
        var key = card.getAttribute("data-roadmap-key") || "engineering";
        if (e.target && e.target.closest && e.target.closest("[data-open-roadmap]")) return;
        setCareerRoadmap(key, false);
      });
    });
    streamGrid.querySelectorAll("[data-open-roadmap]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-open-roadmap") || "engineering";
        setCareerRoadmap(key, true);
        if (roadmapPanel) {
          roadmapPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    });
    setCareerRoadmap("engineering", false);
  }

  var yearEl = byId("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var backToTop = byId("backToTop");
  function toggleBackToTop() {
    if (!backToTop) return;
    backToTop.hidden = window.scrollY <= 400;
  }
  if (backToTop) {
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  renderTrendingCards();
  updateCompareBar();
  initIcons();
})();

















