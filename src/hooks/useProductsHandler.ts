
import { useCreateProduct, useFindAccountByEmail, useGetPaginatedProducts, useGetProductsByAccountId } from "@/api/graphql/resolvers";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface ILogin {
    sku: string,
    name: string;
}

const LoginSchema = Yup.object().shape({
    sku: Yup.string().required("¡Campo requerido!"),
    name: Yup.string().required("¡Campo requerido!"),
});

export const useProductsHandler = (currentPage: number) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const { email } = useParams<{ email: string }>()
    const [limit, setLimit] = useState(8);
    const [products, setProducts] = useState([]);
    const [accountEmail, setAccountEmail] = useState('');
    const [accountId, setAccountId] = useState(undefined);


    //Obtener email y id de cuenta

    const [getEmail] = useFindAccountByEmail();
    const onGetEmail = async (email: string) => {
        try {
            const { data } = await getEmail({ variables: { email } });
            if (data && data.accounts) {
                setAccountEmail(decodeURIComponent(email));
                setAccountId(data.accounts[0]._id);
            }
        } catch (error) {
            console.error("Error al obtener el email:", error);
        }
    }

    useEffect(() => {
        onGetEmail(decodeURIComponent(email));
    }, [email]);

    //Crear nuevo producto 

    const [createProduct] = useCreateProduct();

    const formik = useFormik<ILogin>({
        initialValues: { sku: "", name: "" },
        validationSchema: LoginSchema,
        onSubmit: async (values: ILogin) => {
            try {
                const { data } = await createProduct({ variables: { sku: values.sku, name: values.name, accountId } });
                console.log(data);

                if (data && data.createProducts) {
                    alert(`Producto *${values.name}* creado`);
                    setAccountCreated(!accountCreated);
                    window.location.reload();
                }
            }
            catch (error) {
                console.error("Error al crear producto:", error);
                alert(`No se pudo crear el producto: ${error}`);
            }
        }
    });


    //Obtener el numero de total de productos

    const [productsNumber, setProductsNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [getProductsByAccountId] = useGetProductsByAccountId();

    const onGetTotalProducts = async () => {

        try {

            const { data: data2 } = await getProductsByAccountId({ variables: { accountId } });
            if (data2 && data2.products) {
                setProductsNumber(data2.products.length);
            }
        }
        catch (error) {
            console.error("Error al obtener el email:", error);
        }
    }

    useEffect(() => {
        if (accountId !== undefined) {
            onGetTotalProducts();
            setTotalPages(Math.ceil(productsNumber / limit));
        }

    }, [productsNumber, accountId]);


    //Obtener paginación de productos

    const [getPaginatedProducts] = useGetPaginatedProducts();

    const onGetProducts = async () => {
        try {

            const { data: newProducts } = await getPaginatedProducts({ variables: { limit, page: currentPage, accountId } });

            if (newProducts && newProducts.products) {
                setProducts(newProducts.products);
            }

        } catch (error) {
            console.error("Error al obtener el email:", error);
        }
    }

    useEffect(() => {
        if (accountId !== undefined) {
            onGetProducts();
        }
    }, [currentPage, accountId]);


    return {
        accountId,
        setAccountCreated,
        onGetEmail,
        formik,
        accountEmail,
        products,
        totalPages
    }

}