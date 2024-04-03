import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_ACCOUNT_ID } from "../queries";



export const useGetProductsByAccountId = () => {
    return useLazyQuery(GET_PRODUCTS_BY_ACCOUNT_ID, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: "no-cache"
    });
};