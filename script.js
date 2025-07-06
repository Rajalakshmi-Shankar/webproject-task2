let startTime = 0;
let interval;
let isRunning = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
  const now = Date.now();
  const diff = now - startTime;
  display.textContent = formatTime(diff);
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTime = Date.now() - (display.dataset.time || 0);
    interval = setInterval(updateDisplay, 1000);
    isRunning = true;
  }
});

pauseBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(interval);
    display.dataset.time = Date.now() - startTime;
    isRunning = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  display.textContent = '00:00:00';
  display.dataset.time = 0;
  isRunning = false;
  laps.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (isRunning) {
    const lapTime = display.textContent;
    const li = document.createElement('li');
    li.textContent = `Lap: ${lapTime}`;
    laps.appendChild(li);
  }
});
