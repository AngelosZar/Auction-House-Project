import { onSignUpUser } from '../controllers/auth/sign_up';

const signUpForm = document.forms.register;

signUpForm.addEventListener('submit', onSignUpUser);
