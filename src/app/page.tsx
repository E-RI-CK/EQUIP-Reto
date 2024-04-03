"use client";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import questionIcon from "@/assets/question.svg";
import config from "@/config/app";
import Link from "next/link";
import { useLogin } from "@/hooks";

interface ILogin {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("¡Correo inválido!").required("¡Campo requerido!"),
  password: Yup.string()
    .min(2, "¡Muy corto!")
    .max(50, "Muy largo!")
    .required("¡Campo requerido!"),
});

const Login = () => {

  //CustomHook useLogin 
  const { getEmail, loading, setLoadingPage, setAccountEmail } = useLogin();

  const formik = useFormik<ILogin>({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: async (values: ILogin) => {
      try {
        const { data } = await getEmail({ variables: { email: values.email } });
        if (data && data.accounts) {
          setLoadingPage(false);
          setAccountEmail(data.accounts[0].email);
        }
      } catch (error) {
        console.error("Error al obtener el email:", error);
        alert("No existe una cuenta con ese correo");
      }
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="rounded bg-black flex flex-col p-6">
        <div className="text-2xl">Login</div>

        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col h-8">
            {
              formik.errors.email && (
                <span className="text-red-500 my-2">{formik.errors.email}</span>
              )
            }
          </div>
          <div className="flex flex-col">
            <span className="my-1">Email:</span>
            <input
              className="bg-gray-500 my-2"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col h-8">
              {
                formik.errors.password && (
                  <span className="text-red-500 my-2">{formik.errors.password}</span>
                )

              }
            </div>
            <span className="my-1">Contraseña:</span>
            <input
              type="password"
              autoComplete="true"
              className="bg-gray-500 my-2"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex flex-col justify-around items-center py-2">
            <button
              className="underline text-blue-400 text-center"
              type="submit"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Ingresar"}
            </button>
            <Link
              href={"/new-account"}
              className="underline text-blue-400 text-center self-end">
              Crear cuenta
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

export default Login;


