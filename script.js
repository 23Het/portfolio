// ── SCROLL FADE-IN ───────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── NAV ACTIVE STATE ─────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
  });
});

// ── SCROLL TO TOP ────────────────────────────────────────────────────────
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

// ── BATCH SELECTOR ───────────────────────────────────────────────────────
function selectBatch(el) {
  document.querySelectorAll('.batch-option').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  const msg = document.getElementById('batchMsg');
  msg.textContent = '\u2705 Connect on WhatsApp to check availability for this batch and reserve your seat.';
  msg.classList.add('highlight');
}

// ── CONTACT FORM ─────────────────────────────────────────────────────────
// Opens the visitor's email client with all fields pre-filled.
// No external service required — works entirely in-browser.
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;

  // Clear previous inline errors
  form.querySelectorAll('.form-error').forEach(el => el.remove());
  form.querySelectorAll('.form-input--error, .form-select--error').forEach(el => {
    el.classList.remove('form-input--error', 'form-select--error');
  });

  const nameInput  = form.querySelector('[name="name"]');
  const emailInput = form.querySelector('[name="email"]');
  const name       = nameInput.value.trim();
  const email      = emailInput.value.trim();
  const inquiry    = form.querySelector('[name="inquiry_type"]').value;
  const message    = form.querySelector('[name="message"]').value.trim();

  // Inline error helper
  function showError(input, msg) {
    input.classList.add(input.tagName === 'SELECT' ? 'form-select--error' : 'form-input--error');
    const span = document.createElement('span');
    span.className = 'form-error';
    span.textContent = msg;
    input.parentNode.appendChild(span);
  }

  let valid = true;
  if (!name) { showError(nameInput, 'Please enter your name.'); valid = false; }
  if (!email) {
    showError(emailInput, 'Please enter your email address.'); valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError(emailInput, 'Please enter a valid email address (e.g. you@example.com).'); valid = false;
  }

  if (!valid) return;

  const btn = form.querySelector('button[type="submit"]');
  const originalLabel = btn.textContent;
  btn.textContent = 'Opening email client\u2026';
  btn.disabled = true;

  const subject = `Portfolio Inquiry \u2014 ${inquiry || 'General'}`;
  const body    = `From: ${name}\nEmail: ${email}\nInquiry: ${inquiry || 'Not specified'}\n\n${message}`;

  window.location.href =
    `mailto:hetshah231@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // mailto doesn't navigate away — reset button after a short pause
  setTimeout(() => {
    btn.textContent = originalLabel;
    btn.disabled = false;
  }, 2000);
});
