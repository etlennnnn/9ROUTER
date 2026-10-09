const projectData = [
  {
    name: 'BOUNCE BALL GAME',
    category: 'Web Game',
    image: 'assets/images/bounce-ball-preview.svg',
    description:
      'Game sederhana berbasis web yang dibuat untuk mempelajari JavaScript, kontrol keyboard, objek, collision, dan interaksi dalam game.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Three.js'],
    url: ''
  },
  {
    name: 'ANDROID SIMPLE APP',
    category: 'Android Application',
    image: 'assets/images/android-app-preview.svg',
    description:
      'Aplikasi Android sederhana yang dibuat untuk mempelajari interface, input pengguna, button, dan interaksi dasar menggunakan Android Studio.',
    tech: ['Java', 'XML', 'Android Studio'],
    url: ''
  }
];

const projectGrid = document.querySelector('#projects-grid');

function renderProjects() {
  if (!projectGrid) return;

  projectGrid.innerHTML = projectData
    .map(
      (project) => `
        <article class="project-card reveal">
          <div class="project-thumbnail">
            <img src="${project.image}" alt="${project.name} preview" />
          </div>
          <div class="project-body">
            <span class="project-kicker">${project.category}</span>
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="tech-stack">
              ${project.tech.map((item) => `<span>${item}</span>`).join('')}
            </div>
            <button type="button" class="project-link" data-project-url="${project.url}">
              VIEW PROJECT
            </button>
          </div>
        </article>
      `
    )
    .join('');
}

function setupProjectButtons() {
  const buttons = document.querySelectorAll('.project-link');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const url = button.dataset.projectUrl;

      if (!url || url.trim() === '') {
        const status = document.getElementById('formStatus') || null;
        if (status) {
          status.textContent = 'Link project belum ditambahkan. Silakan isi URL project pada file JavaScript.';
          status.className = 'form-status error';
        } else {
          window.alert('Link project belum ditambahkan. Silakan isi URL project terlebih dahulu.');
        }
        return;
      }

      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
}

function setupNavbar() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${entry.target.id}`;
            link.classList.toggle('active', isActive);
          });
        }
      });
    },
    { threshold: 0.55 }
  );

  document.querySelectorAll('main section[id]').forEach((section) => {
    sectionObserver.observe(section);
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 24) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  if (!backToTop) return;

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function setupFormValidation() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    const inputs = [name, email, message];
    const isAnyEmpty = inputs.some((input) => !input.value.trim());

    if (isAnyEmpty) {
      status.textContent = 'Semua field wajib diisi.';
      status.className = 'form-status error';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      status.textContent = 'Format email tidak valid.';
      status.className = 'form-status error';
      return;
    }

    status.textContent = 'Demo berhasil! Form sudah divalidasi, tetapi pesan belum dikirim karena website belum menggunakan backend.';
    status.className = 'form-status success';
    form.reset();
  });
}

renderProjects();
setupProjectButtons();
setupNavbar();
setupRevealAnimations();
setupBackToTop();
setupFormValidation();
