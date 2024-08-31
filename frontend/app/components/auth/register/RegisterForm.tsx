'use client';
import { Button } from '@nextui-org/react';
import { useFormik } from 'formik';
import { RegisterUser } from '../../../api/actions/auth';
import InputField from '../InputField';
import { initialValuesRegister, validationSchemaRegister } from '../validation';

export default function RegisterForm() {
  const formik = useFormik({
    initialValues: initialValuesRegister,
    validationSchema: validationSchemaRegister,
    onSubmit: (values) => RegisterUser(values),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <InputField
        type="text"
        label="Username:"
        id="username"
        formikProps={{ formik }}
      />
      <InputField
        type="email"
        label="Email:"
        id="email"
        formikProps={{ formik }}
      />
      <InputField
        type="password"
        label="Password:"
        id="password"
        formikProps={{ formik }}
      />
      <Button
        type="submit"
        className="btn yellowBtn glitch w-[8rem] place-self-center"
      >
        Regístrate
      </Button>
    </form>
  );
}
