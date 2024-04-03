import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_ACCOUNT_ID = gql`
  query getProductsByAccountId($accountId: [String]) {
    products(filter: { accountIds: $accountId }, limit: 999) {
        _id
        name
        sku
    }
}
`;