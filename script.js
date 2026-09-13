const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 30);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const testimonials = [
  {
    quote: 'SourceBridge found us a better factory in three weeks than we\'d found in six months. More importantly, they gave us the confidence to place a much bigger second order.',
    initials: 'JM',
    name: 'Jordan Miller',
    role: 'Founder, Ardent Goods · United States'
  },
  {
    quote: 'What stands out is the candor. When a factory could not meet the finish we needed, they told us early and brought a viable alternative—not excuses.',
    initials: 'SK',
    name: 'Sophie Keller',
    role: 'Operations Director, Noma Home · Germany'
  },
  {
    quote: 'The inspection photos and concise updates made it feel like we had a trusted teammate on the factory floor. That changed how we scale launches.',
    initials: 'AR',
    name: 'Alex Rivera',
    role: 'Co-founder, Field & Form · Canada'
  }
];

let testimonialIndex = 0;
const quote = document.querySelector('.testimonial-wrap blockquote');
const avatar = document.querySelector('.author-avatar');
const author = document.querySelector('.quote-author p');
const counter = document.querySelector('.quote-controls strong');

const renderTestimonial = () => {
  const current = testimonials[testimonialIndex];
  quote.style.opacity = '0';
  setTimeout(() => {
    quote.textContent = current.quote;
    avatar.textContent = current.initials;
    author.innerHTML = `<strong>${current.name}</strong><br>${current.role}`;
    counter.textContent = String(testimonialIndex + 1).padStart(2, '0');
    quote.style.opacity = '1';
  }, 160);
};

document.querySelector('.quote-prev').addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + testimonials.length - 1) % testimonials.length;
  renderTestimonial();
});
document.querySelector('.quote-next').addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonial();
});

const form = document.querySelector('#quote-form');
const formSuccess = document.querySelector('.form-success');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const name = new FormData(form).get('name').trim();
  formSuccess.textContent = `Thanks${name ? `, ${name}` : ''}. Your project brief is ready for the SourceBridge team.`;
  form.reset();
});
