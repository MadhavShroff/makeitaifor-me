// documents/index.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import CollectionList from '@/components/documents/CollectionList';
import FileUploadComponent from '@/components/documents/FileUploadComponent';

const Documents = () => {
  return (
    <main className={'min-h-screen items-center '}>
      <Navbar />
      <CollectionList />
      <FileUploadComponent />
    </main>
  );
};

export default Documents;
