const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');

/* Header */
const updateHeader = () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

/* Mobile navigation */
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (nav) nav.classList.remove('open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

/* Scroll reveal */
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element);
  });
}

/* Contact form */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quote-form');

  if (!form) return;

  const successMessage = form.querySelector('.form-success');
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    /* 阻止浏览器跳转到 Formspree */
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const originalText = submitButton
      ? submitButton.innerHTML
      : '';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = 'Sending...';
    }

    try {
      const response = await fetch(form.getAttribute('action'), {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      /* 提交成功，但不离开当前网站 */
      form.reset();

      if (successMessage) {
        successMessage.textContent =
          'Thank you! Your sourcing request has been received. We will review it and get back to you within one business day.';
        successMessage.style.opacity = '1';
      }

      if (submitButton) {
        submitButton.innerHTML = 'Request received ✓';
      }

    } catch (error) {
      if (successMessage) {
        successMessage.textContent =
          'Something went wrong. Please try again or contact us directly.';
        successMessage.style.opacity = '1';
      }

      if (submitButton) {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }
    }
  }, false);
});