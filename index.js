const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const createTimerAnimator = () => {
  let timer;
  return (timeLimit) => {
    clearInterval(timer);
    timer = setInterval(function () {
      if (timeLimit <= 0) {
        clearInterval(timer);
        alert("Time is over!");
      } else {
        let seconds = timeLimit % 60,
          hours = Math.floor(timeLimit / 3600),
          minutes = Math.floor((timeLimit - hours * 3600) / 60);
        timerEl.innerText = [hours, minutes, seconds]
          .map((el) => el.toString().padStart(2, 0))
          .join(":");
        timeLimit--;
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", (event) => {
  const value = event.target.value;
  const filteredValue = value
    .split("")
    .filter((el) => !isNaN(el))
    .join("");
  inputEl.value = filteredValue;
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
