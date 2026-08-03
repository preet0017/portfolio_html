/* ================================================
   script.js - Portfolio JavaScript
   ================================================ */

(function () {
  'use strict';

  /* ================================================
     DOM ELEMENTS
     ================================================ */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contact-form');
  const typingElement = document.getElementById('typing-text');

  /* ================================================
     NAVBAR - Scroll Effect & Background Blur
     ================================================ */
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);

  /* ================================================
     NAVBAR - Active Section Highlight
     ================================================ */
  function highlightActiveSection() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Desktop nav links
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });

        // Mobile nav links
        mobileLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveSection);

  /* ================================================
     MOBILE MENU - Toggle
     ================================================ */
  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);

  // Close mobile menu on link click
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ================================================
     TYPING ANIMATION
     ================================================ */
  // Start typing animation (only if element exists)
  if (typingElement) {
    const typingTexts = ['Web Developer', 'Backend Developer', 'AI/ML Enthusiast', 'Freelancer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
      const currentText = typingTexts[textIndex];

      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 400; // Pause before next word
      }

      setTimeout(typeText, typingSpeed);
    }

    typeText();
  }

  /* ================================================
     SCROLL REVEAL - Intersection Observer
     ================================================ */
  const revealElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ================================================
     BUTTON RIPPLE EFFECT
     ================================================ */
  const rippleButtons = document.querySelectorAll('.btn-primary, .form-submit');

  rippleButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      button.appendChild(ripple);

      setTimeout(function () {
        ripple.remove();
      }, 600);
    });
  });

  /* ================================================
     CONTACT FORM - Validation
     ================================================ */
  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showError(fieldId, message) {
    var group = document.getElementById(fieldId).closest('.form-group');
    group.classList.add('error');
    var errorEl = group.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearError(fieldId) {
    var group = document.getElementById(fieldId).closest('.form-group');
    group.classList.remove('error');
    var errorEl = group.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  function clearAllErrors() {
    var groups = contactForm.querySelectorAll('.form-group');
    groups.forEach(function (group) {
      group.classList.remove('error');
      var errorEl = group.querySelector('.form-error');
      if (errorEl) {
        errorEl.textContent = '';
      }
    });
  }

  // Real-time validation on input
  var formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(function (input) {
    input.addEventListener('input', function () {
      clearError(input.id);
    });
  });

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearAllErrors();

    var name = document.getElementById('form-name').value.trim();
    var subject = document.getElementById('form-subject').value.trim();
    var email = document.getElementById('form-email').value.trim();
    var message = document.getElementById('form-message').value.trim();

    var isValid = true;

    if (name === '') {
      showError('form-name', 'Name is required');
      isValid = false;
    } else if (name.length < 2) {
      showError('form-name', 'Name must be at least 2 characters');
      isValid = false;
    }

    if (subject === '') {
      showError('form-subject', 'Subject is required');
      isValid = false;
    }

    if (email === '') {
      showError('form-email', 'Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError('form-email', 'Please enter a valid email');
      isValid = false;
    }

    if (message === '') {
      showError('form-message', 'Message is required');
      isValid = false;
    } else if (message.length < 10) {
      showError('form-message', 'Message must be at least 10 characters');
      isValid = false;
    }

    if (isValid) {
      // Show success message
      var successEl = document.getElementById('form-success');
      successEl.classList.add('show');
      contactForm.reset();

      // Hide success after 5 seconds
      setTimeout(function () {
        successEl.classList.remove('show');
      }, 5000);
    }
  });

  /* ================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  /* ================================================
     STAGGERED ANIMATION DELAYS
     ================================================ */
  function addStaggerDelay(selector, baseDelay) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (el, index) {
      el.style.transitionDelay = baseDelay + index * 0.1 + 's';
    });
  }

  addStaggerDelay('.skill-card.fade-up', 0);
  addStaggerDelay('.project-card.fade-up', 0);

})();
