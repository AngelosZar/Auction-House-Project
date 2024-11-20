import { signInController } from '../controllers/auth/sign_in';
console.log('sign in view');
// signInController();

const signInForm = document.forms.signInForm;
console.log(signInForm);
signInForm.addEventListener('submit', signInController);
