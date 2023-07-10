// documents/index.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CollectionList from '@/components/documents/CollectionList';
import FileUploadComponent from '@/components/documents/FileUploadComponent';
import { fetchUser } from '@/utils/fetches';
import { Stacks, ScrollableStackContainer } from '@/components/Stacks';

const Documents = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  return (
    <main className={'flex flex-col'}>
      <Navbar user={user} />
      <CollectionList />
      <FileUploadComponent />
      {/* <Stacks title="Stacks" /> */}
      <ScrollableStackContainer />
    </main>
  );
};

export default Documents;
