import { ResetPasswordMutationVariables } from '~/generated/graphql';

export type ResetPasswordValidationErrors = {
  form?: string;
  password?: string;
  confirmPassword?: string;
  token?: string
  message?: string;
};

export const validateResetPasswordForm = (
  formData: FormData,
): ResetPasswordValidationErrors => {
  const errors: ResetPasswordValidationErrors = {};
  const password = formData.get('password');
  const token = formData.get('token') || '';
  const confirmPassword = formData.get('confirmPassword');
  if (!password || typeof password !== 'string') {
    errors.password = 'A valid Password is required.';
  } else if (password && password.length < 4) {
    errors.password = 'Please provide atleast 4 characters in password';
  }
  if (!confirmPassword || typeof confirmPassword !== 'string') {
    errors.confirmPassword = 'A valid Confirm Password is required.';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'Confirm password does not match with password typed';
  }

  if (!token || typeof token !== 'string') {
    errors.token = 'A valid token is required.';
  }
  
  return errors;
};

export const extractResetPasswordFormValues = (
  formData: FormData,
): ResetPasswordMutationVariables => {
  const password: ResetPasswordMutationVariables['password'] =  formData.get('password') as string;
  const token: ResetPasswordMutationVariables['token'] = formData.get('token') as string;
  return { password, token };
};
