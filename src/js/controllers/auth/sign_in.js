import { signInApiCall } from '../../model/auth/sign_in';

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

    // window.location.href = '/profile/';
    alert('You have successfully signed in');
  } catch (error) {
    alert(error.message);
    throw error;
  }
};
