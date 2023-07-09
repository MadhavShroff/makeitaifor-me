// documents/index.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CollectionList from '@/components/documents/CollectionList';
import FileUploadComponent from '@/components/documents/FileUploadComponent';
import { fetchUser } from '@/utils/fetches';

const Documents = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(setUser);
  }, []);
  
  return (
    <main className={'min-h-screen items-center '}>
      <Navbar user={user}/>
      <CollectionList />
      <FileUploadComponent />
    </main>
  );
};

export default Documents;
