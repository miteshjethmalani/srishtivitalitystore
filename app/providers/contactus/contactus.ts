import gql from 'graphql-tag';
import {
    ContactUsMutation,
    ContactUsMutationVariables,
  RegisterCustomerAccountMutation,
  RegisterCustomerAccountMutationVariables,
} from '~/generated/graphql';
import { QueryOptions, sdk, WithHeaders } from '~/graphqlWrapper';

export const contactUsQC = async (
  options: QueryOptions,
  variables: ContactUsMutationVariables,
): Promise<
  WithHeaders<ContactUsMutation['contactUs']>
> => {
  return sdk.contactUs(variables, options).then((res) => ({
    ...res.contactUs,
    _headers: res._headers,
  }));
};

gql`
  mutation contactUs($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
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
