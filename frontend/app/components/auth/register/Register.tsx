'use client';
import OpenModal from '../../buttons/OpenModal';
import AuthTitle from '../AuthTitle';
import RegisterForm from './RegisterForm';
import ThirdPartyRegister from './ThirdPartyRegister';

export default function Register() {
  return (
    <OpenModal btnTitle='Regístrate' btnColor='yellowBtn'>
      <AuthTitle>Regístrate</AuthTitle>
      <RegisterForm/>
      <ThirdPartyRegister/>
    </OpenModal>
  );
}
