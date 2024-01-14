/* eslint-disable */
import '@babel/polyfill';
import { login } from './login';
import { renderTourMap } from './leaflet';

// DOM elements
const loginForm = document.querySelector('.form');
const map = document.querySelector('#map');

// Log in form
document.addEventListener(
  'DOMContentLoaded',
  async function () {
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email =
          document.getElementById('email').value;
        const password =
          document.getElementById('password').value;

        login(email, password);
      });
    }
  },
);

// Map
document.addEventListener('DOMContentLoaded', () => {
  if (map) {
    const locations = JSON.parse(map.dataset.locations);
    renderTourMap(locations);
  }
});
