(function initStarfield() {
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");
  let stars = [];
  const NUM_STARS = 120;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStar() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() < 0.2 ? 2 : 1,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random()
    };
  }

  function initStars() {
    stars = Array.from({ length: NUM_STARS }, createStar);
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
      ctx.fillStyle = `rgba(57,255,20,${star.opacity * 0.6})`;
      ctx.fillRect(
        Math.floor(star.x),
        Math.floor(star.y),
        star.size,
        star.size
      );
      star.y += star.speed;
      star.opacity =
        0.3 + 0.7 * Math.abs(Math.sin(Date.now() * 0.001 + star.x));
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(drawStars);
  }

  resize();
  initStars();
  drawStars();
  window.addEventListener("resize", () => {
    resize();
    initStars();
  });
})();

/* ---- 2. TYPEWRITER HERO TITLE ---- */
(function initTypewriter() {
  const el = document.getElementById("typed-title");
  const texts = ["HELLO!", "THIS IS MY FINAL PROJECT.", "RRRRRRRRRRR!!!"];
  let textIdx = 0,
    charIdx = 0,
    deleting = false;

  function tick() {
    const current = texts[textIdx];
    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        textIdx = (textIdx + 1) % texts.length;
      }
    }
    setTimeout(tick, deleting ? 55 : 85);
  }
  tick();
})();

/* ---- 3. SPRITE ANIMATION (color cycle) ---- */
(function initSprite() {
  const sprite = document.querySelector(".pixel-art");
  const colors = ["#39ff14", "#ffe600", "#00eaff", "#b44fff", "#ff3a3a"];
  let i = 0;
  setInterval(() => {
    sprite.style.color = colors[i % colors.length];
    sprite.style.textShadow = `0 0 8px ${colors[i % colors.length]}`;
    i++;
  }, 600);
})();

/* ---- 4. WORKS FILTER ---- */
(function initWorksFilter() {
  const btns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".work-card");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        if (filter === "all" || card.dataset.cat === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
})();

/* ---- 5. CONTACT FORM & MODAL ---- */
(function initContact() {
  const sendBtn = document.getElementById("send-btn");
  const overlay = document.getElementById("modal-overlay");
  const closeBtn = document.getElementById("modal-close");

  sendBtn.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".pixel-input");
    const allFilled = [...inputs].every((i) => i.value.trim() !== "");
    if (!allFilled) {
      sendBtn.textContent = "!! FILL ALL FIELDS";
      setTimeout(() => {
        sendBtn.textContent = "▶ SEND MESSAGE";
      }, 1500);
      return;
    }
    // Simulate send
    overlay.classList.add("active");
    inputs.forEach((i) => (i.value = ""));
  });

  closeBtn.addEventListener("click", () => overlay.classList.remove("active"));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("active");
  });
})();

/* ---- 6. NAV SCROLL HIGHLIGHT ---- */
(function initNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.style.color =
              link.getAttribute("href") === `#${entry.target.id}`
                ? "var(--yellow)"
                : "";
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => observer.observe(s));
})();

/* ---- 7. SCROLL REVEAL (fade-in sections) ---- */
(function initReveal() {
  const targets = document.querySelectorAll(
    ".section, .work-card, .about-card"
  );
  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "none";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* ---- 8. PIXEL CLICK BURST EFFECT ---- */
document.addEventListener("click", function (e) {
  if (e.target.closest(".pixel-btn") || e.target.closest(".filter-btn")) return;
  const burst = document.createElement("div");
  burst.textContent = "+EXP";
  burst.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    font-family: 'Press Start 2P', monospace;
    font-size: 10px;
    color: #ffe600;
    pointer-events: none;
    z-index: 9998;
    animation: floatup 0.8s forwards;
  `;
  const style = document.createElement("style");
  style.textContent = `
    @keyframes floatup {
      0% { opacity: 1; transform: translate(-50%, 0); }
      100% { opacity: 0; transform: translate(-50%, -40px); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 900);
});

function openLightbox(src, title) {
  const img = document.getElementById("lightbox-img");
  const titleEl = document.getElementById("lightbox-title");
  const lightbox = document.getElementById("lightbox");

  img.src = "";
  img.src = src;
  titleEl.textContent = title;
  lightbox.classList.add("active");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeLightbox();
});