import { useLazyQuery } from "@apollo/client";
import { GET_PAGINATED_PRODUCTS } from "../queries";


export const useGetPaginatedProducts = () => {
    return useLazyQuery(GET_PAGINATED_PRODUCTS);
};