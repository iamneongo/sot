document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger is missing.');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // Utility function to apply animation individually to each element
  const initAnimation = (selector, config) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      // Clone config so we don't mutate the original
      const animationConfig = { ...config };
      animationConfig.scrollTrigger = {
        ...config.scrollTrigger,
        trigger: el // Set the trigger to the specific element
      };
      gsap.from(el, animationConfig);
    });
  };

  // 1. Fade Up Effect
  initAnimation('.gsap-fade-up', {
    scrollTrigger: {
      start: 'top 85%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  });

  // 2. Slide In Left
  initAnimation('.gsap-slide-left', {
    scrollTrigger: {
      start: 'top 85%',
    },
    x: -80,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  });

  // 3. Slide In Right
  initAnimation('.gsap-slide-right', {
    scrollTrigger: {
      start: 'top 85%',
    },
    x: 80,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  });

  // 4. Zoom / Scale In
  initAnimation('.gsap-scale', {
    scrollTrigger: {
      start: 'top 85%',
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.5)',
  });

  // 5. Staggered Grid Items (like products or blog posts)
  const staggerContainers = document.querySelectorAll('.gsap-stagger-container, .about-values__list, .products-grid, .contact__cards, .uses-bento__grid, .uses-steps__track, .uses-list, .about-flow__list');
  staggerContainers.forEach(container => {
    const items = container.querySelectorAll('.gsap-stagger-item, .about-value, .product-card, .contact-card, .uses-tile, .uses-step, .uses-dish, .about-flow__step');
    if (items.length > 0) {
      gsap.from(items, {
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      });
    }
  });

  // 6. Flip In 3D (for featured cards)
  initAnimation('.gsap-flip', {
    scrollTrigger: {
      start: 'top 85%',
    },
    rotationY: 90,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    transformOrigin: '50% 50%',
  });

  // 7. Auto-animate common sections that might lack classes
  const autoElements = document.querySelectorAll([
    '.about-story__text',
    '.about-quote__inner',
    '.product-gallery',
    '.product-summary',
    '.product-info',
    '.products-toolbar',
    '.faq__container',
    '.about-values__intro',
    '.contact-form',
    '.map-card',
    '.section-heading',
    '.uses-feature',
    '.about-cta__text',
    '.about-cta__media'
  ].join(', '));
  
  if (autoElements.length > 0) {
    autoElements.forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
  }
});
