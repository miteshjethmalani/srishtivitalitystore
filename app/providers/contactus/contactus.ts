import gql from 'graphql-tag';
import {
    CreateContactUsSubscriptionMutation,
    CreateContactUsSubscriptionMutationVariables,
} from '~/generated/graphql';
import { QueryOptions, sdk, WithHeaders } from '~/graphqlWrapper';

export const contactUs = async (
  options: QueryOptions,
  variables: CreateContactUsSubscriptionMutationVariables,
): Promise<
  WithHeaders<CreateContactUsSubscriptionMutation['createContactUsSubscription']>
> => {
  return sdk.createContactUsSubscription(variables, options).then((res) => {
    return ({
    ...res.createContactUsSubscription,
    _headers: res._headers,
  })});
};

gql`
    mutation createContactUsSubscription($input: CreateContactUsInput!) {
      createContactUsSubscription(input : $input) {
    __typename
  }
}`
    