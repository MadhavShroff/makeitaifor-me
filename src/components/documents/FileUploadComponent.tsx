import React, { FC, useState } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { ScrollableBoxContainer } from '../Stacks';
import CustomModal from '../Modal/GenericModal';
import FileUploadModal from '../Modal/ModalContent';

interface UploadFileBoxProps {
  setShowModal: (show: boolean) => void;
}

export const UploadFileBox: FC<UploadFileBoxProps> = ({ setShowModal }) => {
  return (
    <div className='group w-80 h-40 flex flex-col justify-between p-1 pl-2' onClick={() => setShowModal(true)}>
      <div className="w-full">
        <div className="relative w-72 h-40">
          <div className="w-full h-full flex flex-col justify-center text-white items-center border-4 border-dotted border-white absolute rounded-lg text-3xl p-2 visible group-hover:invisible">
            Upload File +
          </div>
          <div className="w-full h-full flex flex-col justify-center text-white items-center border-4 border-dotted border-white absolute rounded-lg text-3xl p-2 invisible group-hover:visible text-center">
            Click here or Drag and Drop to Upload +
          </div>
        </div>
      </div>
    </div>
  );
}

const FileUploadComponent: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: 'text/*,application/pdf' as unknown as DropzoneOptions['accept'],
    onDrop: acceptedFiles => {
      setFiles(prev => [...prev, ...acceptedFiles]);
    }
  });

  const filesList = acceptedFiles.map((file : File | any) => (
    <li key={file.path}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <div className='flex sm:flex-col flex-row sm:w-full'>
      <UploadFileBox setShowModal={setShowModal} />
      <ScrollableBoxContainer />
      <FileUploadModal visible={showModal} onClose={() => setShowModal(false)} onDrop={acceptedFiles => setFiles(prev => [...prev, ...acceptedFiles])} files={files} /> 
    </div>
  );
}

export default FileUploadComponent;
