export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/':
      await import('./controllers/homepage.js');
      break;
    case '/auth/sign_in/':
      await import('./views/auth/sign_in.js');
      break;
    case '/auth/sign_up/':
      await import('./views/auth/sign_up.js');
      break;
    case '/profile/':
      await import('./controllers/profile/read.js');
      break;
    case '/profile/update/':
      await import('./controllers/profile/update.js');
      break;
    case '/biddings/single-listing/':
      await import('./controllers/listings/singleListing.js');
      break;
  }
}
