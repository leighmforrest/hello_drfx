import * as yup from 'yup';
import { MAX_FILE_SIZE, SUPPORTED_FORMATS } from '../../settings';

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email.').required('Email is required.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(6, 'Password must be at least 6 characters.'),
});

export const registerSchema = yup.object({
  email: yup.string().email('Invalid email.').required('Email is required.'),
  handle: yup
    .string()
    .required('Handle is required.')
    .min(5, 'Handle must be at least 5 characters.')
    .max(26, 'Handle must not be longer than 26 characters.'),
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

export const pictureSchema = yup.object({
  title: yup
    .string()
    .required('Title is required.')
    .min(6, 'Title must be at least 6 characters.')
    .max(126, 'Title must not exceed 126 characters.'),
  picture: yup
    .mixed()
    .test(
      'required',
      'A picture is required.',
      (value) => value && value.length > 0,
    )
    .test('fileSize', 'This file is too large (max 5MB).', (value) => {
      if (!value || !value.length) return true;
      return value && value[0] && value[0].size <= MAX_FILE_SIZE;
    })
    .test('fileType', 'File type is unsupported.', (value) => {
      if (!value || !value.length) return true;
      return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type);
    }),
});
