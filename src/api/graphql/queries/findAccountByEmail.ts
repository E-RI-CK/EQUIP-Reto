import { gql } from "@apollo/client";

export const FIND_ACCOUNT_BY_EMAIL = gql`
  query findAccountByEmail($email:[String!]) {
    accounts(filter:{emails:$email}){
      _id
      email
    }
  }
`;
