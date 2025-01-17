import { ContactUsMutationVariables } from '~/generated/graphql';

const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export type ContactUsValidationErrors = {
  form?: string;
  email?: string;
  message?: string;
};

export const validateContactUsForm = (
  formData: FormData,
): ContactUsValidationErrors => {
  const errors: ContactUsValidationErrors = {};
  const email = formData.get('email');
  const message = formData.get('message');

  if (!email || typeof email !== 'string' || !email.match(EMAIL_REGEX)) {
    errors.email = 'A valid e-mail address is required.';
  }
  if (!message || typeof message !== 'string' || message.length < 10) {
    errors.message = 'Please provide atleast 10 characters in message';
  }

  return errors;
};

export const extractContactUsFormValues = (
  formData: FormData,
): ContactUsMutationVariables => {
  const input: ContactUsMutationVariables['input'] = {email:formData.get('email') as string, message: formData.get('message') as string} ;
  return { input };
};
