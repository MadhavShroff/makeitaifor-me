// documents/index.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CollectionList from '@/components/documents/CollectionList';
import FileUploadComponent from '@/components/documents/FileUploadComponent';
import { fetchDocs, fetchUser } from '@/utils/fetches';
import {ScrollableStackContainer, ScrollableBoxContainer } from '@/components/Stacks';

const Documents = () => {
  const [user, setUser] = useState(null);
  const [docs, setDocs] = useState(null);

  const onUser = (user => {
    setUser(user);
    fetchDocs(user, setDocs)
  })

  useEffect(() => {
    fetchUser(onUser);
  }, []);

  return (
    <main className={'flex flex-col'}>
      <Navbar user={user} />
      <ScrollableStackContainer />
      <FileUploadComponent />
    </main>
  );
};

export default Documents;
