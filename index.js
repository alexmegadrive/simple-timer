const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const createTimerAnimator = () => {
  let timer;
  function createTimeStr(timeLimit) {
    let seconds = timeLimit % 60,
      hours = Math.floor(timeLimit / 3600),
      minutes = Math.floor((timeLimit - hours * 3600) / 60);
    return [hours, minutes, seconds]
      .map((el) => el.toString().padStart(2, 0))
      .join(":");
  }
  return (timeLimit) => {
    clearInterval(timer); // сброс таймера для повторного ввода и запуска

    timer = setInterval(
      //оборачивание в IIFE и возврат функции для моментального отрабатывания функции и обновления
      // оставшихся секунд, не дожидаясь выполнения первого интервала
      (function updateTime() {
        timerEl.innerText = createTimeStr(timeLimit);
        if (timeLimit <= 0) {
          clearInterval(timer);
          setTimeout(() => alert("Time is over!"), 1);
          // добавление минмальной задержки, без которой рендер перед алертом не успеет выполниться,
          // значение - 1мс, т.к 0мс недостаточно для Chromium-браузеров
        } else {
          timeLimit--;
        }
        return updateTime;
      })(),
      1000
    );
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
