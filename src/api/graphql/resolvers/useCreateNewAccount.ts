import { useMutation } from "@apollo/client";
import { CREATE_NEW_ACCOUNT } from "../queries";



export const useCreateNewAccount = () => {
    return useMutation(CREATE_NEW_ACCOUNT);
};
