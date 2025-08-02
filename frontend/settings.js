export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const MAX_FILE_SIZE = 6 * 1024 * 1024
export const VALID_IMAGE_TYPES = ['jpg', 'gif', 'png', 'jpeg']
export const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
export const LIMIT = 6

export const endpoints = {
  login: '/accounts/jwt/create/',
  refresh: '/accounts/jwt/refresh/',
  user: '/accounts/users/me/',
  register: '/accounts/users/',
  passwordReset: '/accounts/users/reset_password/',
  passwordResetConfirm: '/accounts/users/reset_password_confirm/',
  passwordChange: '/accounts/users/set_password/',
  index: '/',
  pictureCreate: '/'
};
