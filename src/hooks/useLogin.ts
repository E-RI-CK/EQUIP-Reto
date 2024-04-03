import { useFindAccountByEmail } from "@/api/graphql/resolvers/useFindAccountByEmail";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export const useLogin = () => {
    const router = useRouter();
    const [getEmail, { loading }] = useFindAccountByEmail();
    const [loadingPage, setLoadingPage] = useState(true);
    const [accountEmail, setAccountEmail] = useState<string | null>(null);

    useEffect(() => {
        if (!loadingPage) {
            router.push(`/session/home/${accountEmail}`, { scroll: false });
        }
        return () => {
            setLoadingPage(true);
        }
    }, [accountEmail, loadingPage, router]);

    return {
        getEmail,
        loading,
        setLoadingPage,
        setAccountEmail
    }

}