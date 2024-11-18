import './style.css';
import router from './js/router';
console.log('connected');
//
window.addEventListener('DOMContentLoaded', () => {
  router(window.location.pathname);
});
