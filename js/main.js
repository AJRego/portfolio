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
  document.body.classList.toggle("stop-scrolling");
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
      projectDeatilsBtn.display = "none";
      return; //end function execution
    }
    projectDeatilsBtn.display = "block";
    // get the project details
    const details = portfoioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;
    popup.querySelector(".pp-project-details").innerHTML = details;
    const title = portfoioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;
    popup.querySelector(".pp-title h2").innerHTML = title;
    const category = portfoioItems[itemIndex].querySelector("data-category");
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
