// script.js
// Toggle navigation on small screens
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// On DOM load, initialise dynamic behaviours
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearSpan = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  if (yearSpan) {
    yearSpan.textContent = currentYear;
  }
  // Typewriter effect for tagline
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