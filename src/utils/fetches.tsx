// fetches.tsx
export const fetchUser = (setUser) => {
  return fetch('https://api.makeitaifor.me/auth/cognito/me', { method: 'GET', credentials: 'include',})
  .then((res) => {
    if (!res.ok) { throw new Error('Not authorized'); }
    return res.json();
  })
  .then((data) => {
    console.log("fetchUser data: ", data);
    setUser(data);
  })
  .catch((error) => {
    setUser(null);
  });
};
