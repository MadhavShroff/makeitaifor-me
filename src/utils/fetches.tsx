import {
  Chat,
  FileData,
  Message,
  S3MetaData,
  User,
  areMessages,
  isMessage,
} from "./types";
import { Environments, whichEnv } from "./whichEnv";
import { mockChats } from "@/pages/documents";
import { Model } from "./types";

// fetches.tsx
export const fetchUser = (setUser): Promise<void> => {
  return fetch("https://api.makeitaifor.me/auth/cognito/me", {
    method: "GET",
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Not authorized");
      }
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
export const fetchTestGraph = (setGraph): Promise<void> => {
  return fetch("https://api.makeitaifor.me/test/graph/1", {
    method: "GET",
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Not authorized");
      }
      return res.json();
    })
    .then((data) => {
      console.log("fetchTestGraph data: ", data);
      setGraph(data);
    })
    .catch((error) => {
      setGraph(null);
    });
};

export const handleFilesUpload = async (files: File[], setMessage) => {
  console.log("handleFilesUpload");
  console.log("files: ", files);
  if (!files || files.length === 0) {
    return;
  }

  setMessage("Uploading " + files.length + " files...");
  const uploadPromises = files.map(async (file) => {
    // Call backend to get the pre-signed URL
    const response = await fetch(
      `https://api.makeitaifor.me/fileupload/generate-presigned-url?filename=${file.name}&mimetype=${file.type}`,
      { method: "GET", credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    const { uploadUrl } = responseData;

    console.log(`Uploading ${file.name} to ${uploadUrl}`);

    // Upload the file directly to S3
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error(`File upload was not successful for ${file.name}`);
    }

    console.log(`File ${file.name} uploaded successfully`);
  });

  // Wait for all uploads to complete
  await Promise.all(uploadPromises)
    .then(() => {
      setMessage("Upload complete");
      window.location.reload();
    })
    .catch((error) => {
      setMessage("Upload failed. Try again?");
    });
};

export const fetchFilesMetaData = async (
  userId: string
): Promise<S3MetaData[]> => {
  if (!userId) return [];

  const res = await fetch(
    "https://api.makeitaifor.me/fileupload/list-files/" + userId,
    { method: "GET", credentials: "include" }
  );
  if (!res.ok) {
    throw new Error("Not authorized");
  }

  const data = await res.json();
  if (!data || !data.files) return [];

  console.log("fetchFilesMetaData data: ", data);
  return data.files;
};

// returns a list of metadata of chats associated with the userId,
// does not fetch the messges within the chats, ie fetches a shallow copy of User.chats
export const fetchChatsMetadata = async (userId: string): Promise<User> => {
  if (whichEnv(process.env.APP_ENV) === Environments.Development) {
    return {
      _id: "64f9eb690c42d44c40b86f59",
      provider: "cognito",
      userId: "0f5d739e-7539-499c-9117-2b986c17b247",
      email: "ciramey479@searpen.com",
      username: "foo2",
      name: "foo2 Bar2ooqiq Oibqefib",
      chats: mockChats,
      role: "guest",
      createdAt: new Date("2023-09-07T15:25:29.283Z"),
      updatedAt: new Date("2023-09-07T15:25:29.283Z"),
      __v: 0,
    };
  } else {
    const res = await fetch(
      "https://api.makeitaifor.me/chats/getChatsMetadata/" + userId,
      { method: "GET", credentials: "include" }
    );
    if (!res.ok) {
      console.log("fetchChatsMetadata res: ", res);
      throw new Error("Not authorized");
    }
    return await res.json();
  }
};

export const fetchMessagesData = async (
  messages: string[] | Message[]
): Promise<Message[]> => {
  if (!messages || messages.length == 0) return [];

  if (areMessages(messages)) return messages as Message[];

  let messageIds = messages.filter((message) => typeof message === "string");

  if (messageIds.length !== messages.length) {
    throw new Error(
      "fetchMessagesData: messages is not a list of strings or messages"
    );
  }

  console.log("fetchMessagesData for messageIds: ", messageIds);

  if (whichEnv(process.env.APP_ENV) === Environments.Development) {
    return [];
  } else {
    const res = await fetch(
      "https://api.makeitaifor.me/chats/getMessagesData/",
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ messageIds: messageIds }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.log("fetchChatsMetadata res: ", res);
      throw new Error(errorData.message || "Not authorized");
    }

    return await res.json();
  }
};

export const fetchDocumentContent = async (
  fileKey,
  callback
): Promise<void> => {
  if (!fileKey) return;
  const res = await fetch(
    `https://api.makeitaifor.me/fileupload/getDocumentContent/`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        fileKey: fileKey,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Not authorized");
  }

  console.log("fetchDocumentContent res: ", res);

  const data = await res.json();
  if (!data) return;

  console.log("fetchDocumentContent data: ", data.text);
  callback(data.text);
};

export const getGuestAccess = async () => {
  console.log("Getting guest access");
  const response = await fetch(
    whichEnv(process.env.APP_ENV) === Environments.Production
      ? "https://api.makeitaifor.me/auth/guest"
      : "http://localhost:3000/auth/guest",
    {
      method: "GET",
      credentials: "include",
    }
  );
  window.location.href = "/chat";
  console.log(response);
  return response;
};

// returns the updates chats[] with the new chat included
export const createNewChat = async (): Promise<Chat[]> => {
  const res = await fetch("https://api.makeitaifor.me/chats/createNewChat/", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log("createNewChat res: ", res);
    throw new Error(errorData.message || "Not authorized");
  }

  return await res.json();
};

// returns a list of available models
export const fetchModels = async (): Promise<Model[]> => {
  console.log("fetchModels");
  const res = await fetch("https://api.makeitaifor.me/chats/getModels/", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log("fetchModels res: ", res);
    throw new Error(errorData.message || "Not authorized");
  }

  const r = await res.json();
  console.log("fetchModels response: ", r);
  return r;
};

// set the modelUsed param for a chat with chatId
export const setModelForChat = async (
  chatId: string,
  modelUsed: string
): Promise<void> => {
  const res = await fetch("https://api.makeitaifor.me/chats/setModelUsed/", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ chatId: chatId, modelUsed: modelUsed }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log("setModelUsed res: ", res);
    throw new Error(errorData.message || "Not authorized");
  }

  return await res.json();
};

// set the fileOrCollectionUsed param for a chat with chatId. null implies no file or collection is used for this chat.
export const setFileOrCollectionForChat = async (
  chatId: string,
  fileOrCollectionKey: string | null
): Promise<void> => {
  const res = await fetch(
    "https://api.makeitaifor.me/chats/setFileOrCollectionUsed/",
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        chatId: chatId,
        fileOrCollectionKey: fileOrCollectionKey,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.log("setFileOrCollectionForChat res: ", res);
    throw new Error(errorData.message || "Not authorized");
  }

  return await res.json();
};

//returns search result for the google search module
export const fetchGoogleSearchModuleResult = async (
  query: String,
  n: number
): Promise<void> => {
  const res = await fetch("http://localhost:3000/search/google",  {    //https://api.makeitaifor.me/search/google/
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      query: query,
      n: n,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log("fetchGoogleSearchModuleResults res: ", res);
    throw new Error(errorData.message || "Not authorized");
  }

  return await res.json();
};
