import gql from 'graphql-tag';
import {
    ContactUsMutation,
    ContactUsMutationVariables,
} from '~/generated/graphql';
import { QueryOptions, sdk, WithHeaders } from '~/graphqlWrapper';

export const contactUs = async (
  options: QueryOptions,
  variables: ContactUsMutationVariables,
): Promise<
  WithHeaders<ContactUsMutation['createContactUsSubscription']>
> => {
  return sdk.createContactUsSubscription(variables, options).then((res) => {
    return ({
    ...res.createContactUsSubscription,
    _headers: res._headers,
  })});
};

gql`
  mutation createContactUsSubscription($email: String, $message: String!) {
    createContactUsSubscription(email: $email, message: $message) {
      __typename
      ... on Success {
        success
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;
