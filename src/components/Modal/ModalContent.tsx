import { useDropzone } from 'react-dropzone';
import Button from '../Button';
import { handleFilesUpload } from '@/utils/fetches';
import { useState } from 'react';

interface FileDetailsProps {
  files: File[];
  removeFile: (fileName: string) => void;
}

const FileDetails: React.FC<FileDetailsProps> = ({ files, removeFile }) => (
  <div className="flex flex-col w-full overflow-auto">
    <div className="w-full">
      <div className="inline-block py-2 w-full">
        <div className="overflow-hidden w-full">
          <table className="text-center text-sm font-light w-full">
            <thead
              className="border-b font-medium dark:border-neutral-500 dark:text-neutral-800">
              <tr>
                <th scope="col" className=" px-6 py-4">Remove</th>
                <th scope="col" className=" px-6 py-4">Name</th>
                <th scope="col" className=" px-6 py-4">Type</th>
                <th scope="col" className=" px-6 py-4">Size</th>
              </tr>
            </thead>
            <tbody className='dark:bg-slate-800'>
              {files.map((file: any, index: number) => (
                <tr key={index}>
                  <td className="whitespace-nowrap border-b border-slate-100 dark:border-slate-700 pt-2 pb-2 text-slate-500 dark:text-slate-400">
                    <Button text='X' onClick={() => removeFile(file.name)} className='hover:bg-red-500 text-white font-bold text-xl p-0' _key={index} />
                  </td>
                  <td className="whitespace-nowrap border-b border-slate-100 dark:border-slate-700 pt-2 pb-2 text-slate-500 dark:text-slate-400 sm:truncate text-left">{file.name}</td>
                  <td className="whitespace-nowrap border-b border-slate-100 dark:border-slate-700 pt-2 pb-2 text-slate-500 dark:text-slate-400 text-left">{file.type}</td>
                  <td className="whitespace-nowrap border-b border-slate-100 dark:border-slate-700 pt-2 pb-2 text-slate-500 dark:text-slate-400">{file.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);


interface ModalContentProps {
  onDrop: (acceptedFiles: File[]) => void;
  files: File[];
  removeFile: (fileName: string) => void;
}

export const ModalContent: React.FC<ModalContentProps> = ({ onDrop, files, removeFile }) => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop });

  const [uploadedFileUrl] = useState(null);

  console.log("uploadedFileUrl: ", uploadedFileUrl);


  const handleUpload = () => {
    handleFilesUpload(acceptedFiles);
  };
  
  return (
    <div>
      <div className="w-full text-center flex sm:flex-col items-center pb-6 justify-between">
        <h1 className='text-3xl w-2/ sm:flex-col'>Upload Files</h1>
        <div {...getRootProps({ className: 'dropzone md:w-3/5 h-32 align-middle flex sm:flex-col items-center justify-center border-4 border-dotted rounded' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
      <FileDetails files={files} removeFile={removeFile}/>
      <div className='w-full h-1/5 flex flex-col justify-center items-center'>
        <Button text='Upload and Ingest' onClick={handleUpload} className='hover:bg-green-500 text-white font-bold text-sm' _key={0} />
      </div>
    </div>
  );
};

const FileUploadModal = ({ visible, onClose, onDrop, files, removeFile }) => {
  if (!visible) return null;

  const handleOnBackDropClick = (e) => {
    if (e.target.id === "backdrop") onClose && onClose();
  };

  return (
    <div
      id="backdrop"
      onClick={handleOnBackDropClick}
      className="bg-black bg-opacity-50 backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-black w-4/5 h-1/2 p-5 rounded-xl border-4 border-white">
        <ModalContent onDrop={onDrop} files={files} removeFile={removeFile}/>
      </div>
    </div>
  );
};

export default FileUploadModal;
