import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const btnStart = document.querySelector('button[data-start]');
const btnReset = document.querySelector('button[data-reset]');
    const hoursEl = document.querySelector('span[data-hours]');
    const daysEl = document.querySelector('span[data-days]');
    const minutesEl = document.querySelector('span[data-minutes]');
    const secondsEl = document.querySelector('span[data-seconds]');
    const datetimePicker = flatpickr("#datetime-picker", {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        const userDate = selectedDates[0].getTime();
        const currentDate = new Date().getTime();
        if (userDate < currentDate) {
          Notiflix.Notify.failure("Please choose a date in the future");
          btnStart.disabled = true;
        } else {
          btnStart.disabled = false;
        }
      },
    });
      const inputEl = datetimePicker._input


    let timerId;

    function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor(((ms % day) % hour) / minute);
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      return { days, hours, minutes, seconds };
    }

    function updateDateTime() {
      const selectedDate = datetimePicker.selectedDates[0].getTime();
      const currentDate = new Date().getTime();
      const difference = selectedDate - currentDate;
      const { days, hours, minutes, seconds } = convertMs(difference);
      daysEl.textContent = addLeadingZero(days);
      hoursEl.textContent = addLeadingZero(hours);
      minutesEl.textContent = addLeadingZero(minutes);
      secondsEl.textContent = addLeadingZero(seconds);

      if (difference <= 0) {
        clearInterval(timerId);
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        btnStart.disabled = false;
      }
    }

    function addLeadingZero(value) {
      return value.toString().padStart(2, '0');
    }

    function onBtnStartClick() {
      updateDateTime();
      timerId = setInterval(() => updateDateTime(), 1000);
      btnStart.disabled = true;
      inputEl.disabled = true;
      datetimePicker.disabled = true;
    }

    function onBtnResetClick() {
      clearInterval(timerId);
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      btnStart.disabled = false;
      inputEl.disabled = false;
      datetimePicker.disabled = false;
    }

    btnStart.addEventListener('click', onBtnStartClick);
    btnReset.addEventListener('click', onBtnResetClick);
