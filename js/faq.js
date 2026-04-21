const faqQuestions = document.querySelectorAll(".faq_question");

faqQuestions.forEach((questionButton) => {
  questionButton.addEventListener("click", () => {
    const currentItem = questionButton.closest(".faq_item");
    const currentAnswerId = questionButton.getAttribute("aria-controls");
    const currentAnswer = document.getElementById(currentAnswerId);
    const isExpanded = questionButton.getAttribute("aria-expanded") === "true";

    faqQuestions.forEach((button) => {
      const item = button.closest(".faq_item");
      const answerId = button.getAttribute("aria-controls");
      const answer = document.getElementById(answerId);

      button.setAttribute("aria-expanded", "false");
      item.classList.remove("is_open");
      answer.hidden = true;
    });

    if (!isExpanded) {
      questionButton.setAttribute("aria-expanded", "true");
      currentItem.classList.add("is_open");
      currentAnswer.hidden = false;
    }
  });
});
