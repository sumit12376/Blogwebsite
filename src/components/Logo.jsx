import React from 'react';
import { FaBloggerB } from "react-icons/fa6";

function Logo({ width = '100px', backgroundColor = 'blue', height = '50px', marginLeft = '3px' }) {
  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center', marginLeft, backgroundColor, padding: '10px', borderRadius: '50%' }}>
      <FaBloggerB style={{ width, height, objectFit: 'contain' }} />
   
    </div>
    <div className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-5xl font-bold'>
  LOG
</div>


     </>
  );
}

export default Logo;
