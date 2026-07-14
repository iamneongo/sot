document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger is missing.');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // Utility function to check if elements exist
  const initAnimation = (selector, config) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      gsap.from(elements, config);
    }
  };

  // 1. Fade Up Effect
  initAnimation('.gsap-fade-up', {
    scrollTrigger: {
      trigger: '.gsap-fade-up',
      start: 'top 85%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.15,
  });

  // 2. Slide In Left
  initAnimation('.gsap-slide-left', {
    scrollTrigger: {
      trigger: '.gsap-slide-left',
      start: 'top 85%',
    },
    x: -80,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.2,
  });

  // 3. Slide In Right
  initAnimation('.gsap-slide-right', {
    scrollTrigger: {
      trigger: '.gsap-slide-right',
      start: 'top 85%',
    },
    x: 80,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.2,
  });

  // 4. Zoom / Scale In
  initAnimation('.gsap-scale', {
    scrollTrigger: {
      trigger: '.gsap-scale',
      start: 'top 85%',
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.5)',
    stagger: 0.2,
  });

  // 5. Staggered Grid Items (like products or blog posts)
  // Add .gsap-stagger-container to the grid, and .gsap-stagger-item to children
  const staggerContainers = document.querySelectorAll('.gsap-stagger-container');
  staggerContainers.forEach(container => {
    const items = container.querySelectorAll('.gsap-stagger-item');
    if (items.length > 0) {
      gsap.from(items, {
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
      });
    }
  });

  // 6. Flip In 3D (for featured cards)
  initAnimation('.gsap-flip', {
    scrollTrigger: {
      trigger: '.gsap-flip',
      start: 'top 85%',
    },
    rotationY: 90,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.2,
    transformOrigin: '50% 50%',
  });
});
