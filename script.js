
// ==================================
// BIODATA PORTOFOLIO
// JavaScript
// ==================================

document.addEventListener("DOMContentLoaded", () => {
  // AMBIL ELEMEN HTML
  const body = document.body;
  const themeBtn = document.getElementById("themeBtn");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const moreBtn = document.getElementById("moreBtn");
  const moreText = document.getElementById("moreText");
  const topBtn = document.getElementById("topBtn");
  const typing = document.getElementById("typing");
  const year = document.getElementById("year");

  // TAHUN OTOMATIS
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // DARK MODE / LIGHT MODE
  function updateThemeIcon() {
    if (!themeBtn) return;

    const icon = themeBtn.querySelector("i");
    if (!icon) return;

    const isDark = body.classList.contains("dark");

    icon.className = isDark
      ? "fa-solid fa-moon"
      : "fa-solid fa-sun";

    themeBtn.setAttribute(
      "aria-label",
      isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"
    );
  }

  // Baca tema yang tersimpan jika tersedia
  try {
    const savedTheme = localStorage.getItem("biodata-theme");

    if (
      savedTheme === "dark" ||
      savedTheme === "light"
    ) {
      body.classList.toggle(
        "dark",
        savedTheme === "dark"
      );
    }
  } catch (error) {
    // Website tetap berfungsi jika penyimpanan diblokir
  }

  updateThemeIcon();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      body.classList.toggle("dark");

      const theme = body.classList.contains("dark")
        ? "dark"
        : "light";

      try {
        localStorage.setItem("biodata-theme", theme);
      } catch (error) {
        // Mode tema tetap berubah meski tidak tersimpan
      }

      updateThemeIcon();
    });
  }

  // MENU NAVIGASI HP
  function closeMenu() {
    if (navLinks) {
      navLinks.classList.remove("active");
    }

    if (menuBtn) {
      const icon = menuBtn.querySelector("i");

      if (icon) {
        icon.className = "fa-solid fa-bars";
      }

      menuBtn.setAttribute("aria-expanded", "false");
    }
  }

  if (menuBtn && navLinks) {
    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      const icon = menuBtn.querySelector("i");

      if (icon) {
        icon.className = isOpen
          ? "fa-solid fa-xmark"
          : "fa-solid fa-bars";
      }

      menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", event => {
      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuBtn.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // LIHAT SELENGKAPNYA
  if (moreBtn && moreText) {
    moreBtn.setAttribute("aria-expanded", "false");

    moreBtn.addEventListener("click", () => {
      const isOpen = moreText.classList.toggle("show");

      moreBtn.textContent = isOpen
        ? "Tampilkan Lebih Sedikit"
        : "Lihat Selengkapnya";

      moreBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });
  }

  // EFEK MENGETIK
  if (typing) {
    const phrases = [
      "Mahasiswa Sistem Informasi",
      "Web Developer",
      "Pecinta Teknologi",
      "Terus Belajar dan Berkembang"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        typing.textContent = phrase.slice(0, charIndex);

        if (charIndex >= phrase.length) {
          deleting = true;
          setTimeout(typeEffect, 1500);
          return;
        }
      } else {
        charIndex--;
        typing.textContent = phrase.slice(0, charIndex);

        if (charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      setTimeout(typeEffect, deleting ? 40 : 75);
    }

    typeEffect();
  }

  // ANIMASI SAAT SECTION MUNCUL
  const sections = document.querySelectorAll(
    "main .section"
  );

  sections.forEach(section => {
    section.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    sections.forEach(section => {
      revealObserver.observe(section);
    });
  } else {
    sections.forEach(section => {
      section.classList.add("visible");
    });
  }

  // ANIMASI PROGRESS BAR SKILL
  const skillBars = document.querySelectorAll(
    ".fill[data-level]"
  );

  function animateSkillBars() {
    skillBars.forEach(bar => {
      const level = Number(bar.dataset.level);

      if (
        Number.isFinite(level) &&
        level >= 0 &&
        level <= 100
      ) {
        bar.style.width = level + "%";
      }
    });
  }

  if ("IntersectionObserver" in window) {
    const skillSection = document.getElementById("skills");

    if (skillSection) {
      const skillObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateSkillBars();
              skillObserver.disconnect();
            }
          });
        },
        {
          threshold: 0.15
        }
      );

      skillObserver.observe(skillSection);
    }
  } else {
    animateSkillBars();
  }

  // TOMBOL KEMBALI KE ATAS
  function updateTopButton() {
    if (!topBtn) return;

    topBtn.classList.toggle(
      "show",
      window.scrollY > 350
    );
  }

  window.addEventListener(
    "scroll",
    updateTopButton,
    { passive: true }
  );

  updateTopButton();

  if (topBtn) {
    topBtn.setAttribute("aria-label", "Kembali ke atas");

    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});


