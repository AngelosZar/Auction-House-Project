import { API_KEY } from './constants';

export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append('X-Noroff-API-Key', API_KEY);
  }

  return headers;
}

// const headers = {
//   headers: {
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2ltWW9uZyIsImVtYWlsIjoic3VwcmVtZUxlYWRlckBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTczMjIwNTY2MX0.lHV6I6KFvTrDzUZWwu1Bt4od40wl9kP7Udyvkr9qXF8',
//     'X-Noroff-API-Key': 'b8ccaf6e-4043-4f1e-bd7e-a02728a0f022',
//   },
// };

//
// temporary .. create function to get the api key

// POST / auth / create - api - key;
