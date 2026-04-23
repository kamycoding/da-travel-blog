const highlightSlides = document.querySelectorAll(".highlight_slide");
const highlightDots = document.querySelectorAll(".highlights_dot");

const FADE_DURATION = 400;
let isAnimating = false;

highlightDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (isAnimating) return;

    const currentSlide = document.querySelector(".highlight_slide.is-active");
    const targetSlide = highlightSlides[index];
    if (currentSlide === targetSlide) return;

    isAnimating = true;

    highlightDots.forEach((d) => d.classList.remove("is-active"));
    dot.classList.add("is-active");

    currentSlide.style.opacity = "0";

    setTimeout(() => {
      currentSlide.classList.remove("is-active");
      currentSlide.style.opacity = "";

      targetSlide.classList.add("is-active");
      targetSlide.style.opacity = "0";

      void targetSlide.offsetWidth;

      targetSlide.style.opacity = "1";

      setTimeout(() => {
        targetSlide.style.opacity = "";
        isAnimating = false;
      }, FADE_DURATION);
    }, FADE_DURATION);
  });
});
