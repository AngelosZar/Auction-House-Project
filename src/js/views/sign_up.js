import { onSignUpUser } from '../controllers/auth/sign_up';

const signUpForm = document.forms.register;
await onSignUpUser();
// signUpForm.addEventListener('submit', onSignUpUser);
signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('event', event.target);
  //   window.location.href = 'login.html';
  //   const formData = new FormData(signUpForm);
});
