// ResponsiveImage.js 
import React from 'react';
import Image from 'next/image';

const ResponsiveImage = ({ src, alt }) => {
  return (
    <div className='image-container'>
      <Image src={src} layout='fill' alt={alt} className='image' />
    </div>
  );
};


const styles = `
  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
    }
    
    .image {
      object-fit: cover;
    } 
`;
  
export default ResponsiveImage;
