const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    hamburger.classList.toggle("open");
  });

  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      hamburger.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      mobileMenu.classList.remove("active");
      hamburger.classList.remove("open");
    }
  });
}

window.addEventListener("scroll", () => {
  document.getElementById("navbar")?.classList.toggle("scrolled", window.scrollY > 50);
});


document.querySelectorAll(".faq-question").forEach(q => {
  q.addEventListener("click", () => {
    q.parentElement.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const current = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === current ||
        (current.includes("service") && link.getAttribute("href").includes("service"))) {
      link.classList.add("active");
    }
  });
});

const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

function showToast() {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 6000);
}

function closeToast() {
  toast.classList.remove("show");
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = form.querySelector(".submit-btn");
    const originalText = btn.innerHTML;

    btn.innerHTML = "Sending...";
    btn.disabled = true;

    fetch("https://formspree.io/f/xpwgwkok", {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    })
    .then(response => {
      if (response.ok) {
        form.reset();
        showToast();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error("Failed");
      }
    })
    .catch(() => {
      alert("Connection error. Please try again or email me directly.");
    })
    .finally(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
  });
}

// before-after
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".before-after-container").forEach(container => {
    const beforeImg = container.querySelector(".ba-before");
    const divider  = container.querySelector(".ba-divider");
    const handle   = container.querySelector(".ba-handle");
    if (!beforeImg || !divider || !handle) return; 

    container.setAttribute("tabindex", "0");
    container.setAttribute("role", "slider");
    container.setAttribute("aria-valuemin", "3");
    container.setAttribute("aria-valuemax", "97");

    let dragging = false;
    let percent = 50;

    const setPosition = (p, updateAria = true) => {
      percent = Math.max(3, Math.min(97, p));
      divider.style.left = percent + "%";
      handle.style.left  = percent + "%";
      beforeImg.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
      if (updateAria) container.setAttribute("aria-valuenow", Math.round(percent));
    };

    setPosition(50, true);

    const moveDividerToClientX = (clientX, allowWhileNotDragging = false) => {
      if (!dragging && !allowWhileNotDragging) return;

      const rect = container.getBoundingClientRect();
      let x = clientX - rect.left;
      let newPercent = (x / rect.width) * 100;
      newPercent = Math.max(3, Math.min(97, newPercent));
      setPosition(newPercent);
    };

    container.addEventListener("mousedown", (e) => {
      dragging = true;
      moveDividerToClientX(e.clientX, true);
    });

    window.addEventListener("mousemove", (e) => {
      moveDividerToClientX(e.clientX);
    });

    window.addEventListener("mouseup", () => {
      dragging = false;
    });

    container.addEventListener("touchstart", (e) => {
      dragging = true;
      moveDividerToClientX(e.touches[0].clientX, true);
      e.preventDefault();
    }, { passive: false });

    container.addEventListener("touchmove", (e) => {
      moveDividerToClientX(e.touches[0].clientX);
      e.preventDefault();
    }, { passive: false });

    window.addEventListener("touchend", () => {
      dragging = false;
    });

    // Keyboard accessibility
    container.addEventListener("keydown", (e) => {
      const step = e.shiftKey ? 10 : 2; 
      if (e.key === "ArrowLeft" || e.key === "Left") {
        e.preventDefault();
        setPosition(percent - step);
      } else if (e.key === "ArrowRight" || e.key === "Right") {
        e.preventDefault();
        setPosition(percent + step);
      } else if (e.key === "Home") {
        e.preventDefault();
        setPosition(3);
      } else if (e.key === "End") {
        e.preventDefault();
        setPosition(97);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setPosition(50);
      }
    });

    container.querySelectorAll("img").forEach(img => {
      img.addEventListener("dragstart", e => e.preventDefault());
    });

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setPosition(percent, false);
      }, 120);
    });

    container.setAttribute("aria-valuenow", Math.round(percent));
  });
});

// HOVER BEFORE/AFTER 
document.querySelectorAll('.before-after').forEach(container => {
  const beforeImg = container.querySelector('img:nth-child(1)'); 
  const afterImg  = container.querySelector('img:nth-child(2)');

  const preload = new Image();
  preload.src = afterImg.src;

  container.addEventListener('mouseenter', () => {
    beforeImg.style.opacity = '0';
    afterImg.style.opacity  = '1';
  });

  container.addEventListener('mouseleave', () => {
    beforeImg.style.opacity = '1';
    afterImg.style.opacity  = '0';
  });

  container.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (afterImg.style.opacity === '1') {
      beforeImg.style.opacity = '1';
      afterImg.style.opacity  = '0';
    } else {
      beforeImg.style.opacity = '0';
      afterImg.style.opacity  = '1';
    }
  });
});

document.querySelectorAll('.hover-swap').forEach(img => {
  const beforeImage = img.getAttribute('data-before');

  if (beforeImage) {
      img.style.setProperty('--before-img', `url("${beforeImage}")`);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  document.querySelectorAll(".image-wrapper.hover-swap").forEach(wrapper => {
    const img = wrapper.querySelector("img");
    const beforeSrc = wrapper.dataset.before;
    const afterSrc = img.src;

    let showingBefore = false;

    const setImage = (isBefore) => {
      showingBefore = isBefore;
      img.src = isBefore ? beforeSrc : afterSrc;
    };

    if (isMobile) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setImage(true);
          }
        });
      });

      observer.observe(wrapper);
    }

    wrapper.addEventListener("click", () => {
      if (isMobile) {
        setImage(!showingBefore);
      }
    });

    wrapper.addEventListener("mouseenter", () => {
      if (!isMobile) img.src = beforeSrc;
    });

    wrapper.addEventListener("mouseleave", () => {
      if (!isMobile) img.src = afterSrc;
    });
  });
});


const scrollCircle = document.getElementById('scroll-circle');
const scrollArrow = scrollCircle.querySelector('.scroll-arrow');
const circle = scrollCircle.querySelector('.progress-ring__circle');

const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight ? (scrollTop / docHeight) * 100 : 0;

  setProgress(scrollPercent);

  if (scrollTop > 100 && scrollTop < docHeight - 100) {
    scrollCircle.classList.remove('hidden');
    scrollCircle.classList.remove('down');
  } else if (scrollTop >= docHeight - 100) {
    scrollCircle.classList.remove('hidden');
    scrollCircle.classList.add('down');
  } else {
    scrollCircle.classList.add('hidden');
  }
});

scrollCircle.addEventListener('click', () => {
  if (scrollCircle.classList.contains('down')) {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

function createFestiveSnow() {
  const container = document.getElementById('festive-snow');
  const symbols = [
    '❄️', 
    '🎄', 
    '🎅', 
    '🍭',
    '🦌',
    '⛄', 
    '🎁', 
    '🔔', 
    '⭐',
    '🧦', 
    '⚪', 
    '🌿', 
    '🍪'  
  ];
  const colors = ['blue', 'white', 'red', 'green', 'gold'];
  const count = 20; 

  for (let i = 0; i < count; i++) {
    const flake = document.createElement('div');
    flake.className = 'festive-flake';
    
    flake.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    flake.classList.add(colors[Math.floor(Math.random() * colors.length)]);
    
    flake.style.left = Math.random() * 100 + 'vw';
    
    const size = Math.random() * 1.8 + 0.8; 
    flake.style.fontSize = size + 'em';
    
    const duration = Math.random() * 15 + 12; 
    flake.style.animationDuration = duration + 's';
    
    flake.style.animationDelay = Math.random() * 10 + 's';
    
    flake.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');

    container.appendChild(flake);
  }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes festive-fall {
    0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.9; }
    100% { 
      transform: translateY(110vh) translateX(var(--drift, 80px)) rotate(360deg); 
      opacity: 0.1; 
    }
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', createFestiveSnow);

// Ultimate Festive Popup – Icons fall IMMEDIATELY & reach the very bottom
function showFestivePopup() {
  const popup = document.getElementById('festive-popup');
  const title = document.getElementById('popup-title');
  const message = document.getElementById('popup-message');
  const closeBtn = document.getElementById('popup-close');
  const fallArea = document.getElementById('festive-fall-area');

  if (!popup || !fallArea) return;

  // Clear previous items
  fallArea.innerHTML = '';

  // Date-based message (your loved messages - unchanged)
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  let titleText = "Compliments of the Season!";
  let msgText = "Wishing you joy, peace & more plumbing calls this festive season!";

  if (month === 12 && day >= 25 && day <= 28) {
    titleText = "Merry Christmas!";
    msgText = "Wishing you a joyful Christmas filled with warmth, love, and zero frozen pipes!";
  } else if ((month === 12 && day >= 29) || (month === 1 && day <= 7 && year === 2026)) {
    titleText = "Happy New Year 2026!";
    msgText = "May your year be filled with hot leads, smooth pipes, and endless hot water!";
  }

  title.textContent = titleText;
  message.textContent = msgText;

  // Show popup immediately
  popup.classList.add('show');

  // Real beautiful Christmas icons
  const icons = [
    '❄️', 
    '🎄', 
    '🎅', 
    '🍭',
    '🦌',
    '⛄', 
    '🎁', 
    '🔔', 
    '⭐',
    '🧦', 
    '⚪', 
    '🌿', 
    '🍪'  
  ];
    const colors = ['blue', 'red', 'green', 'gold', 'white'];

  let itemCount = 0;

  const createFallingItem = () => {
    if (!popup.classList.contains('show')) return;

    const item = document.createElement('div');
    item.className = 'pile-flake';
    item.classList.add(colors[Math.floor(Math.random() * colors.length)]);

    item.innerHTML = icons[Math.floor(Math.random() * icons.length)];

    item.style.left = Math.random() * 86 + 7 + '%';

    item.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');

    item.style.fontSize = (Math.random() * 1.8 + 1.4) + 'em';

    const duration = Math.random() * 8 + 10; 
    item.style.animationDuration = duration + 's';

    fallArea.appendChild(item);

    itemCount++;

    setTimeout(createFallingItem, 500 + Math.random() * 300);
  };

  createFallingItem();

  const closeHandler = () => {
    popup.classList.remove('show');
    fallArea.innerHTML = '';
    closeBtn.removeEventListener('click', closeHandler);
  };
  closeBtn.addEventListener('click', closeHandler);
}

document.addEventListener('DOMContentLoaded', showFestivePopup);

document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
    if (e.ctrlKey && (e.key === "u" || e.key === "U" || e.key === "s" || e.key === "S")) {
        e.preventDefault();
    }
    if (e.keyCode === 123) {
        e.preventDefault();
    }
});