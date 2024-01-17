/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { renderTourMap } from './leaflet';

// DOM elements
const loginForm = document.querySelector('.form');
const map = document.querySelector('#map');
const logOutBtn = document.querySelector(
  '.nav__el--logout',
);

// Values

// Delegation
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password =
      document.getElementById('password').value;
    login(email, password);
  });
}

if (map) {
  const locations = JSON.parse(map.dataset.locations);
  renderTourMap(locations);
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);
