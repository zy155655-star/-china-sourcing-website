const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');

const updateHeader = () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

/* Contact form */
const form = document.querySelector('#quote-form');
const formSuccess = document.querySelector('.form-success');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const originalButtonText = button ? button.innerHTML : '';

    if (button) {
      button.disabled = true;
      button.innerHTML = 'Sending...';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        form.reset();

        if (formSuccess) {
          formSuccess.textContent =
            'Thank you! Your sourcing request has been received. We will review it and get back to you within one business day.';
          formSuccess.style.opacity = '1';
        }

        if (button) {
          button.innerHTML = 'Request received ✓';
        }
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      if (formSuccess) {
        formSuccess.textContent =
          'Something went wrong. Please try again or contact us directly.';
        formSuccess.style.opacity = '1';
      }

      if (button) {
        button.innerHTML = originalButtonText;
        button.disabled = false;
      }
    }
  });
}