/* eslint-disable */
import '@babel/polyfill';
import { login } from './login';
import { renderTourMap } from './leaflet';

// DOM elements
const loginForm = document.querySelector('.form');
const map = document.querySelector('#map');

// Values
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

// Delegation
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    login(email, password);
  });
}

if (map) {
  const locations = JSON.parse(map.dataset.locations);
  renderTourMap(locations);
}
