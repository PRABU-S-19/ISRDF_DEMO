// Set current year
document.getElementById('yr').textContent = new Date().getFullYear();

// Smooth reveal on scroll with IntersectionObserver
const faders = document.querySelectorAll('.fade-up');
const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
faders.forEach(el => io.observe(el));

// Header scroll effects
const header = document.getElementById('siteHeader');
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('section[id]'));
const onScroll = () => {
    const y = window.scrollY;
    if (y > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    // Progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
    document.getElementById('progress').style.width = pct + '%';
    // Current section for nav highlighting
    let currentId = sections[0] && sections[0].id ? sections[0].id : '';
    for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentId = sec.id;
            break;
        }
    }
    navLinks.forEach(link => {
        if (link.href.includes(currentId)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};
window.addEventListener('scroll', onScroll);
onScroll(); // Call on load

// Counter animation
const counters = document.querySelectorAll('.impact-number');
const duration = 2000;
const easeOutQuad = t => t * (2 - t);
const runCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const start = performance.now();
    const step = (ts) => {
        const elapsed = Math.min(ts - start, duration);
        const progress = easeOutQuad(elapsed / duration);
        const value = Math.floor(progress * target);
        el.textContent = value.toLocaleString();
        
        if (elapsed < duration) {
            requestAnimationFrame(step);
        } else {
            el.textContent = target.toLocaleString();
        }
    };
    requestAnimationFrame(step);
};
const counterObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCounter(entry.target);
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.45 });
counters.forEach(c => counterObs.observe(c));

// Back to top functionality
document.getElementById('toTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Accessibility: keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.activeElement.blur();
});
// Gallery Slider
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelector(".slides");
  const images = document.querySelectorAll(".slides img");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsContainer = document.querySelector(".dots");

  let index = 0;
  const total = images.length;
  let autoSlide;

  // Create dots
  images.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("button");

  function updateSlide() {
    slides.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function goToSlide(i) {
    index = i;
    updateSlide();
    resetAutoSlide();
  }

  function nextSlide() {
    index = (index + 1) % total;
    updateSlide();
  }

  function prevSlide() {
    index = (index - 1 + total) % total;
    updateSlide();
  }

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 4000); // 4s interval
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  startAutoSlide();
});
