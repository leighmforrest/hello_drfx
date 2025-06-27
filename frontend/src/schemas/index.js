import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email.').required('Email is required.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(6, 'Password must be at least 6 characters.'),
});

export const registerSchema = yup.object({
  email: yup.string().email('Invalid email.').required('Email is required.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(6, 'Password must be at least 6 characters.'),
});

export const passwordResetRequestSchema = yup.object({
  email: yup.string().email('Invalid email.').required('Email is required.'),
});

export const passwordResetConfirmSchema = yup.object({
  new_password: yup
    .string()
    .required('Password is required.')
    .min(6, 'Password must be at least 6 characters.'),
});

export const passwordChangeSchema = yup.object({
  new_password: yup
    .string()
    .required('Password is required.')
    .min(6, 'Password must be at least 6 characters.'),
  current_password: yup
    .string()
    .required('Password is required.')
    .min(6, 'Password must be at least 6 characters.'),
});
