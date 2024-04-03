import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
mutation CreateProducts ($name: String!, $sku: String, $accountId: ID!){
    createProducts(input: { products: { name: $name, sku: $sku, accountId: $accountId } }) {
        _id
        name
        sku
    }
}
`;