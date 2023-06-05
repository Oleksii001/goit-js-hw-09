 import Notiflix from 'notiflix';
function createPromise(position, delay) {
      return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;
        setTimeout(() => {
          if (shouldResolve) {
            resolve({ position, delay });
          } else {
            reject({ position, delay });
          }
        }, delay);
      });
    }

    document.querySelector('.form').addEventListener('submit', (event) => {
      event.preventDefault();

      const delayInput = document.querySelector('input[name="delay"]');
      const stepInput = document.querySelector('input[name="step"]');
      const amountInput = document.querySelector('input[name="amount"]');
      const resultsDiv = document.getElementById('results');

      const firstDelay = parseInt(delayInput.value);
      const step = parseInt(stepInput.value);
      const amount = parseInt(amountInput.value);

      if (firstDelay < 0 || step < 0 || amount <= 0) {
        const notification = document.createElement('p');
        Notiflix.Notify.failure("Invalid input values");
        // notification.textContent = 'Invalid input values';
        resultsDiv.appendChild(notification);
        return;
      }

      let delay = firstDelay;
      for (let i = 1; i <= amount; i++) {
        createPromise(i, delay)
          .then(({ position, delay }) => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            setTimeout(() => {
              Notiflix.Notify.remove('.notiflix-notification');
            }, 4000);
          })
          .catch(({ position, delay }) => {
            Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            setTimeout(() => {
              Notiflix.Notify.remove('.notiflix-notification');
            }, 4000);
          });

        delay += step;
      }
    });

