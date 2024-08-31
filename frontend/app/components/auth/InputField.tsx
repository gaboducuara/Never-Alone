import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

interface IInputField {
  label: string;
  id: string;
  type: string;
  formikProps: any;
}

export default function InputField({
  label,
  id,
  type,
  formikProps,
}: IInputField) {
  const { formik } = formikProps;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="relative flex flex-col gap- transparency-imposed1">
      <label htmlFor={id}>{label}</label>
      <div className="polygon-border transparency-imposed">
        <div className="polygon glassmorphism transparency-imposed">
          <div className="absolute left-0 pl-3 flex items-center pointer-events-none transparency-imposed bg-gray">
            {id === 'username' ? (
              <PersonOutlineOutlinedIcon />
            ) : id === 'email' ? (
              <EmailOutlinedIcon />
            ) : id === 'password' ? (
              <LockOutlinedIcon />
            ) : null}
          </div>
          <input
            className="polygon pl-2 py-2 focus:border-none w-64 ml-10"
            id={id}
            type={showPassword ? 'text' : type} // Toggle between 'text' and original 'type' for password field
            {...formik.getFieldProps(id)}
          />
          {id === 'password' && ( // Show password toggle button only for password field
            <div className="absolute inset-y-1 right-0 pr-3 flex items-center">
              {showPassword ? (
                <VisibilityOffIcon onClick={togglePasswordVisibility} />
              ) : (
                <VisibilityIcon onClick={togglePasswordVisibility} />
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        {formik.touched[id] && formik.errors[id] ? (
          <span className="text-red-500">{formik.errors[id]}</span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
    </div>
  );
}
