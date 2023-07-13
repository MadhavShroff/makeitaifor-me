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

// fetches.tsx
export const uploadFiles = (files, setUploadedFileUrl) => {
  if (files.length > 0) {
    const data = new FormData();
    data.append('file', files[0]);

    return fetch('https://api.makeitaifor.me/fileupload', {
      method: 'POST',
      body: data
    })
    .then((res) => {
      if (!res.ok) { throw new Error('Network response was not ok'); }
      return res.json();
    })
    .then((data) => {
      console.log("uploadFiles data: ", data);
      setUploadedFileUrl(data.url);
    })
    .catch((error) => {
      setUploadedFileUrl(null);
    });
  }
};
