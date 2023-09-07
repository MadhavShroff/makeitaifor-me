import { Chat, FileData, S3MetaData, User } from "./types";
import { cognitoLogoutUrl } from "./constants";
import { Environments, whichEnv } from "./whichEnv";

// fetches.tsx
export const fetchUser = (setUser) : Promise<void> => {
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

export const handleFilesUpload = async (files: File[], setMessage) => {
  console.log("handleFilesUpload");
  console.log("files: ", files);
  if (!files || files.length === 0) {
    return;
  }

  setMessage('Uploading ' + files.length + ' files...');
  const uploadPromises = files.map(async (file) => {
    // Call backend to get the pre-signed URL
    const response = await fetch(
      `https://api.makeitaifor.me/fileupload/generate-presigned-url?filename=${file.name}&mimetype=${file.type}`,
      { method: 'GET', credentials: 'include',}
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    const { uploadUrl } = responseData;

    console.log(`Uploading ${file.name} to ${uploadUrl}`);

    // Upload the file directly to S3
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error(`File upload was not successful for ${file.name}`);
    }

    console.log(`File ${file.name} uploaded successfully`);
  });

  // Wait for all uploads to complete
  await Promise.all(uploadPromises).then(() => {
    setMessage('Upload complete');
    setTimeout(() => setMessage('Upload More Files ?'), 3000);
  }).catch((error) => {
    setMessage('Upload failed. Try again?');
  });
};

export const fetchFilesMetaData = async (userId: string): Promise<S3MetaData[]> => {
  if (!userId) return [];

  const res = await fetch('https://api.makeitaifor.me/fileupload/list-files/' + userId, { method: 'GET', credentials: 'include', });
  if (!res.ok) { throw new Error('Not authorized'); }

  const data = await res.json();
  if (!data || !data.files) return [];

  console.log("fetchFilesMetaData data: ", data);
  return data.files;
};


// returns a list of metadata of chats associated with the userId, 
// does not fetch the messges within the chats, ie fetches a shallow copy of User.chats
export const fetchChatsMetadata = async () : Promise<User> => {
  const res = await fetch('http://localhost:3000/chats/getChatsMetadata', { method: 'GET', credentials: 'include',});
  if (!res.ok) { throw new Error('Not authorized'); }
  return await res.json();
};

export const fetchChatContent = async (user, chatId) : Promise<Chat | null> => {
  if (!user) return null;

  const res = await fetch('https://api.makeitaifor.me/chats/getChatContent', { method: 'GET', credentials: 'include', body: JSON.stringify({ chatId: chatId })});
  if (!res.ok) { throw new Error('Not authorized'); }
  
  const data = await res.json();
  if(!data) return null;
  
  return data;
};

export const fetchDocumentContent = async (user, fileId, callback): Promise<void> => {
  if (!user) return;

  const res = await fetch(`https://api.makeitaifor.me/chats/getDocumentContent?userId=${user}&fileId=${fileId}`, { 
    method: 'GET', 
    credentials: 'include', 
  });
  console.log(res);
  if (!res.ok) { throw new Error('Not authorized'); }

  const data = await res.json();
  if (!data) return;

  callback(data);
};

export const getGuestAccess = async() => {
  console.log('Getting guest access');
  const response = await fetch(
    whichEnv(process.env.APP_ENV) === Environments.Production ?
    'https://api.makeitaifor.me/auth/guest'
    : 'http://localhost:3000/auth/guest'
    , {
    method: 'GET',
    credentials: 'include', // This will include the cookies in the request
  });
  window.location.reload();
  console.log(response);
  return response;
}

