/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { renderTourMap } from './leaflet';
import { updateSettings } from './updateSettings';

// DOM elements
const loginForm = document.querySelector('.form--login');
const map = document.querySelector('#map');
const logOutBtn = document.querySelector(
  '.nav__el--logout',
);
const userDataForm = document.querySelector(
  '.form-user-data',
);
const userPasswordForm = document.querySelector(
  '.form-user-password',
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

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    updateSettings({ name, email }, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordCurrent = document.getElementById(
      'password-current',
    ).value;
    const password =
      document.getElementById('password').value;
    const passwordConfirm = document.getElementById(
      'password-confirm',
    ).value;
    updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );
  });
}
