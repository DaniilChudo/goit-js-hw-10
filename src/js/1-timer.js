import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

let countdownInterval;
const timerDisplay = document.querySelector('.timer');
const startButton = document.querySelector('[data-start]');

startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(document.querySelector('#datetime-picker').value, 'Y-m-d H:i:S');
  startButton.disabled = true;
  document.querySelector('#datetime-picker').disabled = true;

  function updateTimer() {
    const currentDate = new Date();
    const difference = selectedDate.getTime() - currentDate.getTime();

    if (difference <= 0) {
      clearInterval(countdownInterval);
      displayTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
      });
      startButton.disabled = false;
      document.querySelector('#datetime-picker').disabled = false;
    } else {
      const time = convertMs(difference);
      displayTimer(time);
    }
  }

  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
});

function displayTimer(time) {
  document.querySelector('[data-days]').textContent = addLeadingZero(time.days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(time.hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(time.minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
