/* ------------------- navigation menu ------------------------- */

(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navMenu = document.querySelector(".nav-menu");
  const closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }

  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }

  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }

  // attach an event handler to document
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      if (event.target.hash !== "") {
        event.preventDefault();
        const hash = event.target.hash;
        //deactive existing active 'section'
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        // activate new section
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        // deactive existing active navigation menu 'link-item'
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");
        if (navMenu.classList.contains("open")) {
          // activate new navigation menu 'link-item'
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          // hide navigation menu
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              // activate new navigation menu 'link-item'
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        // add hash # to url
        window.location.hash = hash;
      }
    }
  });
})();

/* ------------------- about section tabs ------------------------- */

(() => {
  const aboutSection = document.querySelector(".about-section");
  const tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      // desactive existing active 'tab-item'
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // active new 'tab-item'
      event.target.classList.add("active", "outer-shadow");
      // desactive existing active 'tab-content'
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      // active new 'tab-content'
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

/* ------------------- portfolio filter and popup ------------------------- */

(() => {
  const filterContainer = document.querySelector(".portfolio-filter");
  const portfolioItemsContainer = document.querySelector(".portfolio-items");
  const portfoioItems = document.querySelectorAll(".portfolio-item");
  const popup = document.querySelector(".portfolio-popup");
  const prevBtn = popup.querySelector(".pp-prev");
  const nextBtn = popup.querySelector(".pp-next");
  const closeBtn = popup.querySelector(".pp-close");
  const projectDetailsContainer = popup.querySelector(".pp-details");
  const projectDeatilsBtn = popup.querySelector(".pp-project-details-btn");

  let itemIndex, slideIndex, screenshots;

  /* filter portfolio items */
  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      // desactive existing active 'filter-item'
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // activate new 'filter item'
      event.target.classList.add("active", "outer-shadow");
      const target = event.target.getAttribute("data-target");
      portfoioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(".portfolio-item-inner")
        .parentElement;
      // get the portfolio item index
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      screenshots = portfoioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
      // convert screenshots into array
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
    }
  });

  closeBtn.addEventListener("click", (event) => {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });

  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    // activate loader until the popupImg loaded
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      // desactive loader after the popupImg loaded
      popup.querySelector(".pp-loader").classList.remove("active");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + " of " + screenshots.length;
  }

  // next slide
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
  });

  // prev slide
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideshow();
  });

  function popupDetails() {
    // if portfolio-item-details no exists
    if (!portfoioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDeatilsBtn.style.display = "none";
      return; //end function execution
    }
    projectDeatilsBtn.style.display = "block";
    // get the project details
    const details = portfoioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;
    // set the project details
    popup.querySelector(".pp-project-details").innerHTML = details;
    // get the project title
    const title = portfoioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;
    // set the project title
    popup.querySelector(".pp-title h2").innerHTML = title;
    // get the project category
    const category = portfoioItems[itemIndex].getAttribute("data-category");
    // set the project category
    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join(" ");
  }

  projectDeatilsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });

  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDeatilsBtn.querySelector("i").classList.remove("fa-minus");
      projectDeatilsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
      projectDeatilsBtn.querySelector("i").classList.remove("fa-plus");
      projectDeatilsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }
})();

/* ------------------- testimonial slider ------------------------- */

(() => {
  const sliderContainer = document.querySelector(".testi-slider-container");
  const slides = sliderContainer.querySelectorAll(".testi-item");
  const slideWidth = sliderContainer.offsetWidth;
  const prevBtn = document.querySelector(".testi-slider-nav .prev");
  const nextBtn = document.querySelector(".testi-slider-nav .next");
  const activeSlide = sliderContainer.querySelector(".testi-item.active");

  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
    activeSlide
  );

  // set width of all slides
  slides.forEach((slide) => {
    slide.style.width = slideWidth + "px";
  });
  // set widtg of slider container
  sliderContainer.style.width = slideWidth * slides.length + "px";

  nextBtn.addEventListener("click", () => {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    slider();
  });

  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    slider();
  });

  function slider() {
    // deactivate existing active slides
    sliderContainer
      .querySelector(".testi-item.active")
      .classList.remove("active");
    // activate new slide
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
  }
  slider();
})();

/* ------------------- hide all sections except active ------------------------- */

(() => {
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();

window.addEventListener("load", () => {
  // preloader
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 600);
});
