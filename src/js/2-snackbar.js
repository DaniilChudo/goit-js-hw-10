import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const delay = formData.get('delay');
    const state = formData.get('state');

    try {
      const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (state === 'fulfilled') {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
      });

      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topRight'
      });

    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight'
      });
    }
  });
});
