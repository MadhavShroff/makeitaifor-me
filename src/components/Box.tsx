import React from 'react';

interface BoxProps {
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ children }) => (
  <div className='flex items-stretch justify-center border-4 border-black p-2'>
    {React.Children.map(children, (child, index) => (
      <div key={index} className='box-item px-4'>
        {child}
      </div>
    ))}
  </div>
);

export default Box;
