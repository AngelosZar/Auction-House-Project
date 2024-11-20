import { signInApiCall } from '../../model/auth/sign_in';

export const signInController = async (event) => {
  const form = document.forms.signInForm;
  //   const form = event.target;
  //   console.log(form);
  //   console.log('iam here');
  const data = {
    email: form.email.value,
    password: form.password.value,
  };
  try {
    const result = await signInApiCall(data);
    console.log(result);
  } catch (error) {}
};
