const highlightsTrack = document.querySelector(".highlights_track");
const highlightDots = document.querySelectorAll(".highlights_dot");

highlightDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    highlightsTrack.classList.add("is-hidden");

    setTimeout(() => {
      highlightsTrack.style.transform = `translateX(-${index * 100}%)`;
      highlightsTrack.classList.remove("is-hidden");
    }, 120);
    highlightDots.forEach((d) => d.classList.remove("is-active"));
    dot.classList.add("is-active");
  });
});
