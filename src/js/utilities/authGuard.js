import { returnToken } from './returnToken';
//
export const authGuard = () => {
  const token = returnToken();
  if (!token) {
    const response = prompt('Ops you have to login to access this page\nClick ok to login');
    if (response !== null) {
      window.location.replace('/auth/sign_in/');
    }
  }
  return token;
};
