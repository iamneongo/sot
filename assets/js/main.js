const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("#primary-navigation");

// Hide the header when scrolling down, reveal it (slide down) when scrolling up.
if (header) {
  let lastY = window.scrollY;
  const revealThreshold = 6; // ignore tiny scroll jitter
  const onScroll = () => {
    const y = window.scrollY;
    // Never hide while the mobile menu overlay is open.
    if (header.classList.contains("is-menu-open")) {
      lastY = y;
      return;
    }
    if (y <= 80) {
      header.classList.remove("is-hidden"); // always show near the top
    } else if (y > lastY + revealThreshold) {
      header.classList.add("is-hidden"); // scrolling down
    } else if (y < lastY - revealThreshold) {
      header.classList.remove("is-hidden"); // scrolling up
    }
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

if (header && menuToggle && navigation) {
  // Move nav to body so position:fixed works independently of header stacking context
  document.body.appendChild(navigation);

  const body = document.body;
  const brand = header.querySelector(".brand");
  const menuToggleLabel = menuToggle.querySelector(".sr-only");
  const menuToggleIcon = menuToggle.querySelector("i");
  const mobileBreakpoint = 980;
  let scrollPosition = 0;

  if (brand && !navigation.querySelector(".nav__mobile-head")) {
    const mobileHead = document.createElement("div");
    const mobileBrand = brand.cloneNode(true);
    const mobileCloseButton = document.createElement("button");

    mobileHead.className = "nav__mobile-head";

    mobileBrand.classList.remove("brand");
    mobileBrand.classList.add("nav__mobile-brand");

    mobileCloseButton.className = "nav__close";
    mobileCloseButton.type = "button";
    mobileCloseButton.setAttribute("aria-label", "Đóng menu");
    mobileCloseButton.setAttribute("data-menu-close", "");
    mobileCloseButton.innerHTML =
      '<i class="fa-solid fa-xmark" aria-hidden="true"></i><span class="sr-only">Đóng menu</span>';

    mobileHead.append(mobileBrand, mobileCloseButton);
    navigation.prepend(mobileHead);
  }

  const menuCloseButton = navigation.querySelector("[data-menu-close]");

  const isMobileMenu = () => window.innerWidth <= mobileBreakpoint;

  const syncToggleState = (isOpen) => {
    menuToggle.setAttribute("aria-expanded", String(isOpen));

    if (menuToggleLabel) {
      menuToggleLabel.textContent = isOpen ? "Đóng menu" : "Mở menu";
    }

    if (menuToggleIcon) {
      menuToggleIcon.classList.toggle("fa-bars", !isOpen);
      menuToggleIcon.classList.toggle("fa-xmark", isOpen);
    }
  };

  const lockScroll = () => {
    if (body.classList.contains("menu-locked")) {
      return;
    }

    scrollPosition = window.scrollY;
    body.classList.add("menu-locked");
    body.style.top = `-${scrollPosition}px`;
  };

  const unlockScroll = () => {
    if (!body.classList.contains("menu-locked")) {
      return;
    }

    body.classList.remove("menu-locked");
    body.style.top = "";
    window.scrollTo(0, scrollPosition);
  };

  const closeMenu = () => {
    header.classList.remove("is-menu-open");
    syncToggleState(false);
    unlockScroll();
  };

  const openMenu = () => {
    header.classList.add("is-menu-open");
    syncToggleState(true);

    if (isMobileMenu()) {
      lockScroll();

      if (menuCloseButton) {
        requestAnimationFrame(() => menuCloseButton.focus());
      }
    }
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.contains("is-menu-open");
    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  });

  if (menuCloseButton) {
    menuCloseButton.addEventListener("click", () => {
      closeMenu();
      menuToggle.focus();
    });
  }

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (isMobileMenu()) {
        closeMenu();
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!isMobileMenu() || !header.classList.contains("is-menu-open")) {
      return;
    }

    const target = event.target;

    if (navigation.contains(target) || menuToggle.contains(target)) {
      return;
    }

    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("is-menu-open")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > mobileBreakpoint) {
      closeMenu();
    }
  });

  syncToggleState(false);
}

const gallery = document.querySelector("[data-gallery]");

if (gallery) {
  const mainImage = gallery.querySelector("[data-gallery-main]");
  const thumbs = Array.from(gallery.querySelectorAll("[data-gallery-thumb]"));
  let intervalId;
  let currentIndex = thumbs.findIndex(t => t.classList.contains("is-active"));
  if (currentIndex === -1) currentIndex = 0;

  const setActiveThumb = (index) => {
    const thumb = thumbs[index];
    const src = thumb.getAttribute("data-gallery-thumb");
    if (!src || !mainImage) return;

    mainImage.src = src;
    thumbs.forEach((item) => item.classList.remove("is-active"));
    thumb.classList.add("is-active");
    currentIndex = index;
  };

  const startAutoSlide = () => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      let nextIndex = (currentIndex + 1) % thumbs.length;
      setActiveThumb(nextIndex);
    }, 3500);
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      setActiveThumb(index);
      startAutoSlide(); // Reset timer on user interaction
    });
  });

  if (thumbs.length > 1) {
    startAutoSlide();
  }
}

const quantity = document.querySelector("[data-quantity]");

if (quantity) {
  const input = quantity.querySelector("[data-quantity-input]");
  const decrease = quantity.querySelector("[data-quantity-dec]");
  const increase = quantity.querySelector("[data-quantity-inc]");

  const readValue = () => {
    const parsed = parseInt(input.value, 10);
    return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  };

  const setValue = (value) => {
    input.value = String(Math.max(1, value));
  };

  if (input && decrease && increase) {
    decrease.addEventListener("click", () => setValue(readValue() - 1));
    increase.addEventListener("click", () => setValue(readValue() + 1));
    input.addEventListener("change", () => setValue(readValue()));
  }
}

const tabsBar = document.querySelector("[data-tabs]");

if (tabsBar) {
  const tabs = tabsBar.querySelectorAll("[data-tab]");

  const sections = Array.from(tabs)
    .map((tab) => {
      const id = (tab.getAttribute("href") || "").replace("#", "");
      const section = id ? document.getElementById(id) : null;
      return section ? { tab, section } : null;
    })
    .filter(Boolean);

  const updateTabs = (activeTab) => {
    tabs.forEach((item) => item.classList.remove("is-active"));
    activeTab.classList.add("is-active");

    sections.forEach(({ tab, section }) => {
      if (tab === activeTab) {
        section.style.display = "";
      } else {
        section.style.display = "none";
      }
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      updateTabs(tab);
    });
  });

  const initialActive = Array.from(tabs).find(t => t.classList.contains("is-active")) || tabs[0];
  if (initialActive) updateTabs(initialActive);
}

if (window.jQuery && jQuery.fn.owlCarousel) {
  jQuery(".reviews__carousel").owlCarousel({
    dots: true,
    dotsEach: true,
    items: 1,
    loop: true,
    margin: 16,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      760: {
        items: 2,
        margin: 18,
      },
      980: {
        items: 3,
        margin: 20,
      },
    },
  });
}


