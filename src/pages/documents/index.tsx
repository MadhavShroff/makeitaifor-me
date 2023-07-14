// documents/index.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import FileUploadComponent from '@/components/documents/FileUploadComponent';
import { fetchDocs, fetchUser } from '@/utils/fetches';
import {ScrollableStackContainer, ScrollableBoxContainer } from '@/components/Stacks';

const Documents = () => {
  const [user, setUser] = useState(null);
  const [docs, setDocs] = useState<string[]>([]); 

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  if(user) {
    fetchDocs(user).then((data) => {
      console.log("fetchDocs data: ", data);
      if(!data) return;
      const filtered = (data as any).map((doc) => {
        const fileName = doc.Key.split('/')[1];
        const w = fileName.split('.')[0];
        console.log("w: ", w);
        if(w.length > 70) return w.substring(0, 70) + '...' + fileName.split('.')[1]; // shorten the file name if it is too long
        else return fileName;
      })
      return filtered;
    }).then((filtered) => {
      setDocs(filtered);
    }).catch((error) => {
      console.log("error: ", error);
    });
  }

  console.log("docs: ", docs);

  return (
    <main className={'flex flex-col'}>
      <Navbar user={user} />
      <ScrollableStackContainer />
      <ScrollableBoxContainer titles={docs} />
      <FileUploadComponent />
    </main>
  );
};

export default Documents;
