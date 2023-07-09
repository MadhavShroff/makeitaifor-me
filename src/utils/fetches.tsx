// fetches.tsx

import Cookies from 'js-cookie';

export const fetchUser = (setUser) => {
  const token = Cookies.get('makeitaifor-me-jwt-cookie');

  return fetch('https://api.makeitaifor.me/auth/cognito/me', {
    method: 'GET',
    credentials: 'include',
  })
  .then((res) => {
    if (!res.ok) { throw new Error('Not authorized'); }
    return res.json();
  })
  .then((data) => {
    console.log("fetchUser data: ", data);
    setUser(data);
  })
  .catch((error) => {
    console.error('Error:', error);
    setUser(null);
  });
};
