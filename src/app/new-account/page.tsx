"use client";
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import * as Yup from "yup";
import questionIcon from '@/assets/question.svg';
import config from '@/config/app';
import { useRouter } from 'next/navigation';
import { useCreateNewAccount } from '@/api/graphql/resolvers';


interface ILogin {
    name: string,
    email: string;
}

const LoginSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email("¡Correo inválido!").required("¡Campo requerido!"),
});

export default function SignIn() {
    const router = useRouter();
    const [createEmail, { loading }] = useCreateNewAccount();
    const formik = useFormik<ILogin>({
        initialValues: { name: "", email: "" },
        validationSchema: LoginSchema,
        onSubmit: async (values: ILogin) => {
            try {
                const { data } = await createEmail({ variables: { name: values.name, email: values.email } });
                console.log(data);

                if (data && data.createAccount) {
                    alert("Cuenta Creada");
                    router.replace('/');
                }
            }
            catch (error) {
                console.error("Error al obtener el email:", error);
                alert(`No se pudo crear la cuenta: ${error}`);
            }
        }
    });

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
            <div className="rounded bg-black flex flex-col p-6">
                <div className="text-2xl">Sign In</div>

                <form className="flex flex-col" onSubmit={formik.handleSubmit}>
                    {
                        formik.errors.name && (
                            <span className="text-red-500 my-2">{formik.errors.name}</span>
                        )
                    }
                    <div className="flex flex-col">
                        <span className="my-1">Name:</span>
                        <input
                            className="bg-gray-500 my-1"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {
                        formik.errors.email && (
                            <span className="text-red-500 my-2">{formik.errors.email}</span>
                        )
                    }
                    <div className="flex flex-col">
                        <span className="my-1">Email:</span>
                        <input
                            className="bg-gray-500 my-1"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="flex flex-col justify-around items-center py-2">
                        <button
                            className="underline text-blue-400 text-center"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Cargando..." : "Crear Cuenta"}
                        </button>
                        <Link
                            href={"/"}
                            className="underline text-blue-400 text-center self-end">
                            Login
                        </Link>
                    </div>
                    <div className="flex py-2">
                        <span className="flex gap-2 text-xs">
                            <Image src={questionIcon} alt="question" width={18} height={18} />
                            Usar la query de listado de Cuentas para filtrar por correo
                        </span>
                    </div>
                </form>
                <span className="text-white">{config.apiUrl}</span>
            </div>
        </main>
    );

};