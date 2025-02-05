import React, { FC, useState } from 'react';
import FileUploadModal from '../Modal/ModalContent';

interface UploadFileBoxProps {
  setShowModal: (show: boolean) => void;
}

export const UploadFileBox: FC<UploadFileBoxProps> = ({ setShowModal }) => {
  return (
    <div className="group pl-16 sm:pl-12 pt-7">
      <div className="relative w-72 h-60 sm:w-40 sm:h-32">
        <div className='sm:w-full w-80 h-40 flex flex-col justify-between p-1 pl-2' onClick={() => setShowModal(true)}>
          <div className="w-full">
            <div className="relative w-72 h-40 sm:w-full">
              {[[0, 0], [2, 4], [4, 8], [6, 12], [8, 16]].map(([_0, _1], index) => {
                return (
                  <div key={index} className={`group w-full sm:h-24 sm:w-44 h-40 transform transition-all absolute sm:top-${_0} top-${_1} sm:-left-${_0} -left-${_1} rounded-lg bg-(--background-color)`}>
                    <div className="w-full h-full flex flex-col justify-center text-white items-center sm:border-2 border-4 border-dotted border-white absolute rounded-lg text-3xl p-2"></div>
                  </div>
                );
              })}
              <div className="group w-full sm:h-24 sm:w-44 h-40 flex flex-col items-center transform transition-all absolute sm:top-10 top-20 sm:-left-10 -left-20 rounded-lg bg-(--background-color)">
                <div className="w-full h-full flex flex-col justify-center text-white items-center border-4 border-dotted border-white absolute rounded-lg text-3xl p-2 visible group-hover:invisible">
                  Upload File(s) +
                </div>
                <div className="w-full h-full flex flex-col justify-center text-white items-center border-4 border-dotted border-white absolute rounded-lg sm:text-sm text-3xl p-2 invisible group-hover:visible text-center">
                  Click here or Drag and Drop to Upload +
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

const FileUploadComponent: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(file => file.name !== fileName)); // Here is the removeFile function
  };

  return (
    <div className='flex sm:flex-col flex-row'>
      <UploadFileBox setShowModal={setShowModal} />
      <FileUploadModal visible={showModal} onClose={() => setShowModal(false)} onDrop={acceptedFiles => setFiles(prev => [...prev, ...acceptedFiles])} files={files} removeFile={removeFile} />
    </div>
  );
}

export default FileUploadComponent;
