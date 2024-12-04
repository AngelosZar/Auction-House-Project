import { signInApiCall } from '../../model/auth/sign_in';
import { getApiKey } from '../../utilities/apiKey';
import { API_KEY } from '../../utilities/constants';
export const signInController = async (event) => {
  event.preventDefault();
  const form = event.target;

  const data = {
    email: form.email.value,
    password: form.password.value,
  };
  try {
    const result = await signInApiCall(data);
    if (!result.ok) return;
    const apiKey = await getApiKey();
    console.log(apiKey);
  } catch (error) {
    alert(error.message);
    throw error;
  } finally {
    // alert('You have successfully signed in');
    // window.location.href = '/profile/';
  }
};
