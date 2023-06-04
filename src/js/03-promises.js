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

      let delay = firstDelay;
      for (let i = 1; i <= amount; i++) {
        createPromise(i, delay)
          .then(({ position, delay }) => {
            const result = document.createElement('p');
            result.textContent = `✅ Fulfilled promise ${position} in ${delay}ms`;
            resultsDiv.appendChild(result);

            setTimeout(() => {
              result.remove();
            }, 4000);
          })
          .catch(({ position, delay }) => {
            const result = document.createElement('p');
            result.textContent = `❌ Rejected promise ${position} in ${delay}ms`;
            resultsDiv.appendChild(result);

            setTimeout(() => {
              result.remove();
            }, 10000);
          });

        delay += step;
      }
    });




    
//  function createPromise(position, delay) {
//       return new Promise((resolve, reject) => {
//         const shouldResolve = Math.random() > 0.3;
//         setTimeout(() => {
//           if (shouldResolve) {
//             resolve({ position, delay });
//           } else {
//             reject({ position, delay });
//           }
//         }, delay);
//       });
//     }

//     document.querySelector('.form').addEventListener('submit', function (event) {
//       event.preventDefault();

//       const delayInput = this.elements['delay'];
//       const stepInput = this.elements['step'];
//       const amountInput = this.elements['amount'];

//       const firstDelay = parseInt(delayInput.value);
//       const step = parseInt(stepInput.value);
//       const amount = parseInt(amountInput.value);

//       let delay = firstDelay;
//       for (let i = 1; i <= amount; i++) {
//         createPromise(i, delay)
//           .then(({ position, delay }) => {
//             console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//           })
//           .catch(({ position, delay }) => {
//             console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//           });

//         delay += step;
//       }
//     });


