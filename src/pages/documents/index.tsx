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
    fetchUser((user => {
      setUser(user);
      fetchDocs(user, (docs) => {
        console.log("docs: ", docs);
        setDocs(docs);
      })
    }));
  }, []);

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
