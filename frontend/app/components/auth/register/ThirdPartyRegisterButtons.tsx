'use client';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from 'next-auth/react';

export default function ThirdPartyRegisterButtons() {
  
  const logGoogle = async()=>await signIn('google', {
      callbackUrl: '/',
      // callbackUrl: '/main',    si quisiera reedirigir cambio esto
    });
  return (
    <div className="flex mt-8 gap-5">
      <button onClick={()=>logGoogle()}>
        <GoogleIcon />
      </button>
      <button>
        <FacebookRoundedIcon />
      </button>
    </div>
  );
}
