// Bottom nav: highlight active section on scroll & click
(function () {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = ['built-section', 'timeline-section', 'gallery-section', 'skills-section', 'contact-section'];

  function setActive(sectionId) {
    var normalized = sectionId === 'me' ? 'me' : sectionId.replace('-section', '');
    navItems.forEach(function (item) {
      item.classList.toggle('active', item.getAttribute('data-section') === normalized);
    });
  }

  function onScroll() {
    var firstSection = document.getElementById(sections[0]);
    var scrollY = window.scrollY;
    var trigger = 220;
    var current = 'me';

    if (firstSection && scrollY > firstSection.offsetTop - 120) {
      sections.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
          var top = el.getBoundingClientRect().top;
          if (top <= trigger) {
            current = id;
          }
        }
      });
    }

    setActive(current);
  }

  navItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          var sectionId = href === '#hero' ? 'me' : href.slice(1);
          setActive(sectionId);
        }
      }
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial state
})();

// Scroll-triggered animations: add .in-view when elements enter viewport
(function () {
  const animated = document.querySelectorAll('.animate-on-scroll');
  const skillsSection = document.getElementById('skills-section');

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
  );

  animated.forEach(function (el) {
    observer.observe(el);
  });

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.2 }
    );
    skillsObserver.observe(skillsSection);
  }
})();
