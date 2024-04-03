
interface Props {
    formik: any
}

export const CreateProductForm = ({ formik }: Props) => {
    return (
        <form className="flex gap-4" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col items-end">
                <div className="flex flex-col h-8">
                    {
                        formik.errors.sku
                            ? (
                                <span className="text-red-500 my-2">{formik.errors.sku}</span>
                            )
                            : (
                                <span className="text-green-500 my-2">✔</span>
                            )
                    }
                </div>
                <div className="flex gap-1">
                    <span>SKU:</span>
                    <input
                        type="text"
                        className="bg-gray-600"
                        name="sku"
                        value={formik.values.sku}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>
            <div className="flex flex-col items-end">
                <div className="flex flex-col h-8">
                    {
                        formik.errors.name
                            ? (
                                <span className="text-red-500 my-2">{formik.errors.name}</span>
                            )
                            : (
                                <span className="text-green-500 my-2">✔</span>
                            )
                    }
                </div>
                <div className="flex">
                    <span>PRODUCTO:</span>
                    <input
                        type="text"
                        className="bg-gray-600"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>
            <button
                type="submit"
                className="bg-white text-black px-3 py-1 rounded"
            >
                Agregar
            </button>
        </form>
    )
}
