'use client';
import OpenModal from '../../buttons/OpenModal';
import AuthTitle from '../AuthTitle';
import ThirdPartyRegister from '../register/ThirdPartyRegister';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <OpenModal btnTitle='Iniciar sesión' btnColor='grayBtn'>
      <AuthTitle>Iniciar sesión</AuthTitle>
      <LoginForm/>
      <ThirdPartyRegister/>
    </OpenModal>
  );
}
