import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "../queries";



export const useCreateProduct = () => {
    return useMutation(CREATE_PRODUCT);
};