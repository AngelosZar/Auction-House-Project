import { signInController } from '../controllers/auth/sign_in';

const signInForm = document.forms.signInForm;

signInForm.addEventListener('submit', signInController);
