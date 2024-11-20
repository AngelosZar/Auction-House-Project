export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/':
      await import('./views/home.js');
      break;
    case '/auth/sign_in/':
      await import('./views/auth/sign_in.js');
      break;
    case '/auth/sign_up/':
      await import('./views/auth/sign_up.js');
      break;
    case '/profile/':
      await import('./views/profile/profile.js');
      break;
  }
}
