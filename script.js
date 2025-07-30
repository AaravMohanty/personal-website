// script.js
// Toggle navigation on small screens
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Theme toggle for dark/light mode
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Load theme preference from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  applyTheme(savedTheme);
  // Set current year in footer
  const yearSpan = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  if (yearSpan) {
    yearSpan.textContent = currentYear;
  }
  // Initialize typewriter effect for tagline
  const taglineEl = document.querySelector('.hero .tagline');
  if (taglineEl) {
    const fullText = taglineEl.textContent.trim();
    taglineEl.textContent = '';
    let idx = 0;
    function type() {
      taglineEl.textContent += fullText.charAt(idx);
      idx++;
      if (idx < fullText.length) {
        setTimeout(type, 60);
      }
    }
    type();
  }
});

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-mode');
  const newTheme = isDark ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
});

// Intersection Observer for reveal animations
(() => {
  const revealElements = document.querySelectorAll('.reveal');
  const options = { threshold: 0.15 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, options);
  revealElements.forEach(el => observer.observe(el));
})();

// Scroll spy to highlight active navigation link based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinkElements = document.querySelectorAll('.navbar nav ul li a');
  let currentSection = '';
  const fromTop = window.scrollY + 150; // account for fixed navbar height
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  navLinkElements.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active');
    }
  });
});