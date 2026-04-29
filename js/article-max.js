const articleSlider = document.querySelector("#slider .slider");
const articleSlides = articleSlider
  ? Array.from(articleSlider.querySelectorAll(".slider_element"))
  : [];
const articleSliderDots = Array.from(
  document.querySelectorAll(".article_slider_dot"),
);

if (articleSlider && articleSlides.length && articleSliderDots.length) {
  const mobileSliderQuery = window.matchMedia("(max-width: 1024px)");
  let activeSlideIndex = 0;
  let scrollFrame = null;

  const setActiveSlide = (index) => {
    activeSlideIndex = Math.max(0, Math.min(index, articleSlides.length - 1));

    articleSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeSlideIndex);
      slide.classList.toggle("is-before", slideIndex < activeSlideIndex);
      slide.classList.toggle("is-after", slideIndex > activeSlideIndex);
    });

    articleSliderDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlideIndex;
      dot.classList.toggle("is-active", isActive);

      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  const findCenteredSlide = () => {
    const sliderCenter =
      articleSlider.getBoundingClientRect().left + articleSlider.clientWidth / 2;

    return articleSlides.reduce(
      (closest, slide, index) => {
        const slideRect = slide.getBoundingClientRect();
        const slideCenter = slideRect.left + slideRect.width / 2;
        const distance = Math.abs(sliderCenter - slideCenter);

        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: activeSlideIndex, distance: Number.POSITIVE_INFINITY },
    ).index;
  };

  const updateActiveSlideFromScroll = () => {
    if (!mobileSliderQuery.matches) {
      return;
    }

    if (scrollFrame) {
      window.cancelAnimationFrame(scrollFrame);
    }

    scrollFrame = window.requestAnimationFrame(() => {
      setActiveSlide(findCenteredSlide());
      scrollFrame = null;
    });
  };

  articleSliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      articleSlides[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setActiveSlide(index);
    });
  });

  articleSlider.addEventListener("scroll", updateActiveSlideFromScroll, {
    passive: true,
  });
  window.addEventListener("resize", updateActiveSlideFromScroll);
  mobileSliderQuery.addEventListener("change", updateActiveSlideFromScroll);

  setActiveSlide(0);
}
