document.addEventListener("DOMContentLoaded", () => {
  // --- Fungsi Splash Screen ---
  const onboardingScreen = document.getElementById("onboarding-screen");

  if (onboardingScreen) {
    setTimeout(() => {
      onboardingScreen.classList.add("fade-out");

      setTimeout(() => {
        onboardingScreen.remove();
      }, 800);
    }, 2500);
  }

  // --- 1. Scroll Navbar & Menu Aktif ---
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSection)) {
        link.classList.add("active");
      }
    });
  });

  // --- 2. Menu Navigasi Mobile ---
  const menuToggle = document.getElementById("mobile-menu");
  const navLinksContainer = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("active");
      menuToggle.classList.toggle("is-active");

      const bars = menuToggle.querySelectorAll(".bar");
      if (menuToggle.classList.contains("is-active")) {
        bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
      } else {
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinksContainer.classList.contains("active")) {
        navLinksContainer.classList.remove("active");
        menuToggle.classList.remove("is-active");

        const bars = menuToggle.querySelectorAll(".bar");
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });
  });

  // --- 3. Fitur Interaktif Hover Live Preview ---
  const previewCards = document.querySelectorAll(
    ".project-card[data-preview], .mini-card[data-preview]",
  );

  previewCards.forEach((card) => {
    const mainImg = card.querySelector("img");
    if (!mainImg) return;
    const originalSrc = mainImg.src;
    const previewSrc = card.getAttribute("data-preview");
    const imgPreload = new Image();
    imgPreload.src = previewSrc;

    card.addEventListener("mouseenter", () => {
      mainImg.style.opacity = "0.3";
      setTimeout(() => {
        mainImg.src = previewSrc;
        mainImg.style.opacity = "1";
        mainImg.style.transform = "scale(1.04)";
      }, 150);
    });

    card.addEventListener("mouseleave", () => {
      mainImg.style.opacity = "0.3";
      setTimeout(() => {
        mainImg.src = originalSrc;
        mainImg.style.opacity = "1";
        mainImg.style.transform = "scale(1)";
      }, 150);
    });
  });

  // --- 4. Animasi Element Muncul Pas Di-Scroll (Intersection Observer) ---
  const animatedElements = document.querySelectorAll(".scroll-animate");

  const animationObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  animatedElements.forEach((element) => {
    animationObserver.observe(element);
  });

  // --- 5. Efek Interaktif 3D Tilt Ringan pada Tool Cards ---
  const toolCards = document.querySelectorAll(".tool-card");
  toolCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      card.style.transform = `translateY(-8px) rotateX(${-y / 6}deg) rotateY(${x / 6}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
    });
  });
});
