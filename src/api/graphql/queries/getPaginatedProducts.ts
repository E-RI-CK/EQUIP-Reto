import { gql } from "@apollo/client";

export const GET_PAGINATED_PRODUCTS = gql`
  query Products($limit: Int, $page: Int,$accountId: [String]) {
    products(limit: $limit, page: $page, filter: { accountIds: $accountId }) {
        _id
        name
        sku
    }
}
`;