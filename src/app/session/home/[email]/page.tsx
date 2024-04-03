"use client";
import Image from "next/image";
import questionIcon from "@/assets/question.svg";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { useProductsHandler } from "@/hooks";
import { Table } from "./ui/Table";
import { CreateProductForm } from "./ui/CreateProductForm";

interface Props {
  searchParams: {
    page?: string
  }
}

const Home = ({ searchParams }: Props) => {

  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  //Custom Hook para gestionar los productos
  const { accountId, formik, accountEmail, products, totalPages } = useProductsHandler(currentPage);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <div className="flex flex-col border border-white">
        <p>El email del usuario es: <span className="text-blue-500 ml-3">{accountEmail}</span></p>
        <p>El ID del usuario es: <span className="text-blue-500 ml-3"> {accountId}</span> </p>
        <span className="flex gap-2 text-xs">
          <Image src={questionIcon} alt="question" width={18} height={18} />
          Colocar el email que fue tipeado en el Login y guardar el ID para
          usarlo en la creación de productos
        </span>
      </div>

      <div className="flex flex-col p-2 border border-white m-6">
        <span className="flex gap-2 text-xs">
          <Image src={questionIcon} alt="question" width={18} height={18} />
          Relacionar con mutación de creación de producto (vincular cuenta)
        </span>
        {/* Formulario para crear un producto */}
        <CreateProductForm formik={formik} />
      </div>

      <div className="flex flex-col p-2">
        <span className="flex gap-2 text-xs">
          <Image src={questionIcon} alt="question" width={18} height={18} />
          Relacionar con query de listado de productos (vincular cuenta)
        </span>
        {/* Tabla de Productos */}
        <Table products={products} />
      </div>
      {/* Paginación */}
      <Pagination totalPages={totalPages} />
    </main>
  );
};

export default Home;



