const articleSliderSection = document.querySelector("#slider");
const articleSlider = articleSliderSection?.querySelector(".slider");
const articleSlides = articleSlider
  ? Array.from(articleSlider.querySelectorAll(".slider_element"))
  : [];
const articleSliderDots = articleSliderSection
  ? Array.from(articleSliderSection.querySelectorAll(".article_slider_dot"))
  : [];

if (articleSlider && articleSlides.length && articleSliderDots.length) {
  const mobileSliderQuery = window.matchMedia("(max-width: 1024px)");
  let activeSlideIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  const clampSlideIndex = (index) =>
    Math.min(Math.max(index, 0), articleSlides.length - 1);

  const goToSlide = (index) => {
    setActiveSlide(clampSlideIndex(index));
  };

  const setActiveSlide = (index) => {
    activeSlideIndex = clampSlideIndex(index);

    articleSlides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeSlideIndex;

      slide.classList.toggle("is-active", isActive);
      slide.classList.toggle("is-prev", slideIndex === activeSlideIndex - 1);
      slide.classList.toggle("is-next", slideIndex === activeSlideIndex + 1);
      slide.classList.toggle("is-before", slideIndex < activeSlideIndex);
      slide.classList.toggle("is-after", slideIndex > activeSlideIndex);
    });

    articleSliderDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlideIndex;

      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  articleSliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  articleSlides.forEach((slide, index) => {
    slide.setAttribute("role", "group");
    slide.setAttribute(
      "aria-label",
      `${index + 1} of ${articleSlides.length}`,
    );

    slide.addEventListener("click", () => {
      if (mobileSliderQuery.matches) {
        goToSlide(index);
      }
    });
  });

  articleSlider.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();

    const direction = event.key === "ArrowRight" ? 1 : -1;

    goToSlide(activeSlideIndex + direction);
  });

  articleSlider.addEventListener(
    "touchstart",
    (event) => {
      if (!mobileSliderQuery.matches) {
        return;
      }

      const touch = event.changedTouches[0];

      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    },
    { passive: true },
  );

  articleSlider.addEventListener(
    "touchend",
    (event) => {
      if (!mobileSliderQuery.matches || !touchStartX) {
        return;
      }

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;

      touchStartX = 0;
      touchStartY = 0;

      if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }

      goToSlide(activeSlideIndex + (deltaX < 0 ? 1 : -1));
    },
    { passive: true },
  );

  setActiveSlide(0);
}
