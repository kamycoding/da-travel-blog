const videoWrapper = document.querySelector(".kamy_video_wrapper");
const video = document.querySelector(".kamy_video");
const videoButton = document.querySelector(".kamy_video_control");

if (videoWrapper && video && videoButton) {
  videoButton.addEventListener("click", () => {
    video.play();
  });

  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  video.addEventListener("play", () => {
    videoWrapper.classList.add("is_playing");
  });

  video.addEventListener("pause", () => {
    videoWrapper.classList.remove("is_playing");
  });

  video.addEventListener("ended", () => {
    videoWrapper.classList.remove("is_playing");
    video.currentTime = 0;
  });
}
