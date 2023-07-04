import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

const FileUploadComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const handleFileUpload = async () => {
    if (!file) {
      return;
    }

    // Call backend to get the pre-signed URL
    const response = await axios.get(
      `http://localhost:3000/fileupload/generate-presigned-url?filename=${file.name}&mimetype=${file.type}`,
    );

    const { uploadUrl } = response.data;

    // Upload the file directly to S3
    await axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    console.log('File uploaded successfully');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input type="file" onChange={handleFileChange} className="my-4" />
      <button
        onClick={handleFileUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 focus:outline-none"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUploadComponent;
