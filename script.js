/* =========================
   PROJECT CARD SCROLL ANIMATION (ENHANCED)
========================= */
const projectCards = document.querySelectorAll(".project-card");

if (projectCards.length > 0) {
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 200); // Stagger delay
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  projectCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    cardObserver.observe(card);
  });
}


/* =========================
   SECTION FADE-IN
========================= */
const sections = document.querySelectorAll("section");

if (sections.length > 0) {
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(sec => {
    sec.style.opacity = "0";
    sec.style.transform = "translateY(40px)";
    sec.style.transition = "all 0.6s ease";
    sectionObserver.observe(sec);
  });
}

/* =========================
   STAGGER ANIMATIONS FOR CARDS AND ITEMS
========================= */
const testimonialCards = document.querySelectorAll(".testimonial-card");
const workflowSteps = document.querySelectorAll(".step");

function addStaggerAnimation(elements, delay = 100) {
  if (elements.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.5s ease";
      observer.observe(el);
    });
  }
}

addStaggerAnimation(testimonialCards, 150);
addStaggerAnimation(workflowSteps, 200);


/* =========================
   CHAT SYSTEM (UPGRADED)
========================= */
const chatBtn = document.getElementById("chatBtn");
const chatPanel = document.getElementById("chatPanel");
const closeChat = document.getElementById("closeChat");

const openChatBtn = document.getElementById("openChatBtn");
const openChatBtn2 = document.getElementById("openChatBtn2");
const footerChatBtn = document.getElementById("footerChatBtn");

if (chatPanel) {

  const openChat = () => chatPanel.classList.add("active");
  const closeChatPanel = () => chatPanel.classList.remove("active");

  // Floating chat button
  if (chatBtn) {
    chatBtn.addEventListener("click", openChat);
  }

  // Close button
  if (closeChat) {
    closeChat.addEventListener("click", closeChatPanel);
  }

  // Start Project + Contact buttons
  [openChatBtn, openChatBtn2, footerChatBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openChat();
      });
    }
  });

  // 🚨 CRITICAL FIX: Stop clicks inside chat from bubbling
  chatPanel.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Close only when clicking truly outside
  document.addEventListener("click", (e) => {
    const isChatTrigger =
      e.target.closest("#chatBtn") ||
      e.target.closest("#openChatBtn") ||
      e.target.closest("#openChatBtn2") ||
      e.target.closest("#footerChatBtn");

    if (!chatPanel.classList.contains("active")) return;

    if (!chatPanel.contains(e.target) && !isChatTrigger) {
      closeChatPanel();
    }
  });

  // ESC key closes chat
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeChatPanel();
  });
}

/* =========================
   WHATSAPP FORM
========================= */
const chatForm = document.getElementById("chatForm");

if (chatForm) {
  chatForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const inquiryType = document.getElementById("inquiryType")?.value || "";
    const service = document.getElementById("service")?.value || "";
    const budget = document.getElementById("budget")?.value || "";
    const idea = document.getElementById("idea")?.value || "";

    const phoneNumber = "2347049900703";

    let message = "";

    if (inquiryType === "Request CV") {
      message = `Hello, I would like to request your CV/resume.

Message: ${idea}`;
    } else {
      message = `Hello, I want to start a project.

Service: ${service}
Budget: ${budget}
Idea: ${idea}`;
    }

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

    chatPanel?.classList.remove("active");
    chatForm.reset();
  });
}


/* =========================
   HERO PARTICLES
========================= */
const canvas = document.getElementById("heroCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function initParticles() {
    particles = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6
      });
    }
  }

  initParticles();

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(77,163,255,0.15)";
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x <= 0 || p.x >= canvas.width) p.dx *= -1;
      if (p.y <= 0 || p.y >= canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(77,163,255,0.7)";
      ctx.fill();
    });

    drawLines();
    requestAnimationFrame(animate);
  }

  animate();
}


/* =========================
   TYPING EFFECT (SAFE RESET)
========================= */
const typingElement = document.getElementById("typingText");

if (typingElement) {
  const text = "Full-stack developer building web & mobile systems that scale";
  let index = 0;

  typingElement.innerHTML = "";

  function type() {
    if (index < text.length) {
      typingElement.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, 30);
    }
  }

  type();
}


/* =========================
   CURSOR GLOW (SMOOTH)
========================= */
const glow = document.querySelector(".cursor-glow");

if (glow) {
  let mouseX = 0, mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glow.style.left = mouseX + "px";
    glow.style.top = mouseY + "px";
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}


/* =========================
   HERO PARALLAX EFFECT
========================= */
const hero = document.querySelector(".hero");

if (hero) {
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    hero.style.transform = `translate(${x}px, ${y}px)`;
  });
}


/* =========================
   PROJECT CARD TILT EFFECT (ENHANCED)
========================= */
projectCards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -8;
    const rotateY = (x / rect.width - 0.5) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
  });
});