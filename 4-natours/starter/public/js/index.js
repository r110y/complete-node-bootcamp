/* eslint-disable */
import '@babel/polyfill';
import { login } from './login';
import { renderTourMap } from './leaflet';

// Log in form
document.addEventListener(
  'DOMContentLoaded',
  async function () {
    document
      .querySelector('.form')
      .addEventListener('submit', (e) => {
        e.preventDefault();

        const email =
          document.getElementById('email').value;
        const password =
          document.getElementById('password').value;

        login(email, password);
      });
  },
);

// Render map
const locations = JSON.parse(
  document.querySelector('#map')?.dataset.locations,
);

document.addEventListener('DOMContentLoaded', () => {
  const map = document.querySelector('#map');

  if (map) {
    renderTourMap(locations);
  }
});
