export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/':
      await import('./views/home.js');
      break;
    case '/auth/sign_in/':
      await import('./views/sign_in.js');
      break;
    case '/auth/sign_up/':
      await import('./views/sign_up.js');
      break;
  }
}
