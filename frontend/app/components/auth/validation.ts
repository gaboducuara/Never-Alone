import * as Yup from 'yup';

export const initialValuesRegister = {
  username: '',
  email: '',
  password: '',
}

export const initialValuesLogin = {
  email: '',
  password: '',
}

export const validationSchemaRegister = Yup.object({
  username: Yup.string()
    .required('Debes completar este campo')
    .max(8, 'Máximo 8 caracteres'),
  email: Yup.string()
    .required('Debes completar este campo')
    .email('El formato no coincide con un email')
    .max(30, 'Máximo 30 caracteres'),
  password: Yup.string()
    .required('Debes completar este campo')
    .max(15, 'Máximo 15 caracteres')
    .min(10, 'Al menos 10 caracteres'),
})


export const validationSchemaLogin = Yup.object({
  email: Yup.string()
    .required('Debes completar este campo')
    .email('El formato no coincide con un email')
    .max(30, 'Máximo 30 caracteres'),
  password: Yup.string()
    .required('Debes completar este campo')
    .max(15, 'Máximo 15 caracteres')
    .min(10, 'Al menos 10 caracteres'),
})