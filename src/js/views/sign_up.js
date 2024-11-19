import { onSignUpUser } from '../controllers/auth/sign_up';

const signUpForm = document.forms.register;
// await onSignUpUser();
signUpForm.addEventListener('submit', onSignUpUser);
// signUpForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   console.log('event', event.target);
//   console.log('event', event.target.email.value);
//   console.log('event', event.target.username.value);
//   console.log('event', event.target.password.value);
//   console.log('event', event.target.confirmPassword.value);
//   alert('i am submitting');
//     onSignUpUser(event);
// });
