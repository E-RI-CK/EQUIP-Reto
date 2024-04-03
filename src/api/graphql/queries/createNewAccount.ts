import { gql } from "@apollo/client";

export const CREATE_NEW_ACCOUNT = gql`
  mutation CreateAccount($name: String!, $email: String!) {
    createAccount(input:{name: $name, email: $email}) {
      _id
      name
      email
    }
  }
`;
