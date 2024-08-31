'use client';

import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import { LoginUser } from "../../../api/actions/auth";
import InputField from "../InputField";
import { initialValuesLogin, validationSchemaLogin } from "../validation";

export default function LoginForm() {
  
  const formik = useFormik({
    initialValues: initialValuesLogin,
    validationSchema:validationSchemaLogin ,
    onSubmit: (values)=> LoginUser(values)
  });

  return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
          <div>
            <a><span>¿Olvidaste tu contraseña?</span></a>
          </div>
          <Button type='submit' className="btn yellowBtn glitch w-[8.3rem] place-self-center">Iniciar sesión</Button>
        </form>
  );
}
