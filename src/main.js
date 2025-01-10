import './style.css';
import router from './js/router';
import { logOut } from './js/utilities/logout';
import { updateNavBar, initNavBarListeners } from './js/utilities/updateNavBar';
import { searchOverlay } from './js/views/searchOverlay';
import { initHeaderSideBar } from './js/utilities/initHeaderSideBar';
import { signInGuestController } from './js/utilities/authservice';
// import { initThemeToggle } from './js/utilities/initThemeToggle';
window.addEventListener('DOMContentLoaded', async () => {
  await signInGuestController();
  router(window.location.pathname);

  initHeaderSideBar();
  // initThemeToggle();
  document.getElementById('logOutBtn')?.addEventListener('click', logOut);
  await searchOverlay();
  updateNavBar();
  initNavBarListeners();
});
