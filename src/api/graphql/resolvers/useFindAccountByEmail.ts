import { useLazyQuery } from "@apollo/client";
import { FIND_ACCOUNT_BY_EMAIL } from "../queries";


export const useFindAccountByEmail = () => {
  return useLazyQuery(FIND_ACCOUNT_BY_EMAIL);
};
