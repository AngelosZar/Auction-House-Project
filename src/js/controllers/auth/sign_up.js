import { signUpApiCall } from '../../model/auth/sign_up';
export async function onSignUpUser(params) {
  try {
    await signUpApiCall();
  } catch (error) {}
  console.log('i am doing all the work');
}
