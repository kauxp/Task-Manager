import React from 'react';
import Image from 'next/image';
import LoginIllus from "../assets/AuthSVG.svg";
import Login from "../pages/login";
const Auth: React.FC = () => {
  
    return (
      <div className="flex min-h-screen w-full">
      <div className="w-1/2 bg-white">
        <div className="h-full flex items-center justify-center">
          <Image className='scale-150' src={LoginIllus} alt='Login Illustration'/>
        </div>
      </div>
      <div className='justify-center items-center w-1/2 bg-[#eeffb1] flex'>
        <div className='scale-125'>
            
        </div>
      </div>
    </div>
    );
}

export default Auth;