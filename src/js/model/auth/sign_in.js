import { API_AUTH_LOGIN } from '../../utilities/constants';
console.log(API_AUTH_LOGIN);
export const signInApiCall = async (data) => {
  //
  console.log('I am fetching data from the server');
  //
  const response = await fetch(API_AUTH_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    console.log(result);
    return result;
  }
  //   console.log(result);
  //   console.log('this is the result from the api call', result);
  return result;
};
