import { useDropzone } from 'react-dropzone';
import Button from '../Button';
import { handleFilesUpload } from '@/utils/fetches';
import { useState } from 'react';
import Image from 'next/image';

interface FileDetailsProps {
  files: File[];
  removeFile: (fileName: string) => void;
}

interface ModalContentProps {
  onDrop: (acceptedFiles: File[]) => void;
  files: File[];
  removeFile: (fileName: string) => void;
}

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
      <div className="bg-black w-4/5 sm:w-full lg:w-1/2 p-4 h-fit rounded-xl border-4 border-white overflow-auto">
        <ModalContent onDrop={onDrop} files={files} removeFile={removeFile} />
        <div className='flex jhu justify-center items-center bg-black p-1'>
          <div className='text-center text-[#ff0000] text-xs'>
            Disclaimer: Please do not upload any sensitive data like private keys or passwords. The data is uploaded to a private server with limited access control, through an encrypted channel(HTTPS). 
            BUT until legal terms and conditions are established, the user is responsibe for the data that they choose to upload to this site In the event it is leaked or misued, the user is responsible for the consequences.
            This application is a work in progress. This disclaimer will be removed in the near future, once this application meets compliance standards.
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalContent: React.FC<ModalContentProps> = ({ onDrop, files, removeFile }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [uploadedFileUrl] = useState(null);
  const [message, setMessage] = useState("Upload Files");

  console.log("uploadedFileUrl: ", uploadedFileUrl);

  const handleUpload = () => {
    handleFilesUpload(files, setMessage);
  };

  return (
    <div>
      <div className="w-full text-center flex sm:flex-col items-center pb-4 justify-between">
        <h1 className='text-3xl sm:flex-col sm:text-xl'>{message}</h1>
        <div {...getRootProps({ className: 'dropzone md:w-3/5 h-32 align-middle flex sm:flex-col items-center justify-center border-4 border-dotted rounded' })}>
          <input {...getInputProps()} />
          <p>Click Here or Drag and Drop a file here to upload and process</p>
        </div>
      </div>
      <div key={11} className="flex items-center pr-1 pt-1 pb-1 pl-3 mb-2 border sm:text-sm rounded-full whitespace-nowrap font-bold">
        <input type="url" placeholder="Enter URL of a document, Youtube video or any other source..." className="pr-2 appearance-none bg-transparent border-none w-full text-orange-500 leading-tight focus:outline-none"></input>
        <button className="h-7 w-14 rounded-full object-cover border-white border-2 pl-1 pr-1 hover:bg-orange-500 hover:text-black">
          Add
        </button>
      </div>
      {files.length > 0 && <FileDetails files={files} removeFile={removeFile} /> }
      <div className='w-full h-1/5 flex text-xl flex-col justify-center items-center'>
        <Button text='Upload and Ingest' onClick={handleUpload} className='hover:bg-green-500 text-white text-xl font-bold text-sm' _key={0} />
      </div>
    </div>
  );
};

const FileDetails: React.FC<FileDetailsProps> = ({ files, removeFile }) => (
  <div className="flex flex-col w-full overflow-auto">
    <div className="w-full">
      <div className="inline-block py-2 w-full">
        <div className="overflow-hidden w-full">
          <table className="text-center text-sm font-light w-full">
            <thead
              className="border-b font-medium border-neutral-500 text-neutral-300">
              <tr>
                <th scope="col" className=" px-6 py-4">Remove</th>
                <th scope="col" className=" px-6 py-4 text-left">Name</th>
                <th scope="col" className=" px-6 py-4">Type</th>
                <th scope="col" className=" px-6 py-4">Size</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file: any, index: number) => (
                <tr key={index}>
                  <td className="whitespace-nowrap border-b border-slate-700 pt-2 pb-2 text-slate-500">
                    <div onClick={() => removeFile(file.name)} className='flex justify-center items-center hover:border-red-500 hover:border-4 p-2 rounded text-white font-bold text-xl p-0 cursor-pointer'>
                      <Image
                        src="/trash-can.svg"
                        alt="Delete"
                        width={30}
                        height={30}
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap border-b border-slate-700 pt-2 pb-2 text-slate-500 sm:truncate text-left">{file.name}</td>
                  <td className="whitespace-nowrap border-b border-slate-700 pt-2 pb-2 text-slate-500 text-left">{file.type}</td>
                  <td className="whitespace-nowrap border-b border-slate-700 pt-2 pb-2 text-slate-500">{file.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default FileUploadModal;
