import { Formik } from "formik"
import { t } from "i18next"
import { useCallback, useEffect } from "react"
import toast from "react-hot-toast"
import { useModuleContext } from "../../../../hooks/useModules"
import UseQueryMutation from "../../../../hooks/useQueryMutation"
import { lang } from "../../../../langs"
import FormFields from "./FormFields"
import { ProductoApi } from "../../../../services/producto/producto.service"
import { ProductoPatchDTO, ProductoPostDTO } from "../../../../model/dtos/producto/producto.dto"
interface FormTypeActionsProps {
    refetch: () => void;
}
const FormProducto: React.FC<FormTypeActionsProps> = ({ refetch }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postProducto = UseQueryMutation({
        requestFn: ProductoApi.postProducto,
        options: {
            onError: () => {
                toast.error(t(lang.Product.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.Product.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchProducto = UseQueryMutation({
        requestFn: ProductoApi.patchProducto,
        options: {
            onError: () => {
                toast.error(t(lang.Category.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.Category.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: ProductoPostDTO) => {
            if (rowData) {
                const req: ProductoPatchDTO = {
                    id: rowData.id,
                    ...values,
                };
                console.log('datos editar', req)
                await patchProducto.mutateAsync(req);
            } else {
                await postProducto.mutateAsync(values);
            }
        },
        [rowData, patchProducto, postProducto]
    );
    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);


    const initialValues: ProductoPostDTO = {
        nombre: rowData?.nombre ?? '',
        descripcion: rowData?.descripcion ?? '',
        codigoBarras: rowData?.codigoBarras ?? '',
        codigoInterno: rowData?.codigoInterno ?? '',
        categoria: rowData?.categoria?.id ?? null,
        marca: rowData?.marca?.id ?? null,
        presentacion: rowData?.presentacion?.id ?? null,
        stockRequest: rowData?.stock?.[0] ?? { stock: 0, stockMinimo: 0, producto: 0 },
        precioRequest: rowData?.precio?.[0] ?? { venta: 0, compra: 0, producto: 0 }
    }

    return (
        <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                // Construir el objeto ProductoPostDTO correctamente
                const postData: any = {
                    ...values,
                    stockRequest: {
                        ...values.stockRequest

                    },
                    precioRequest: {
                        ...values.precioRequest
                    }
                };
                console.log(postData);
                onSave(postData);
                setSubmitting(false);
            }}
        >
            <>
                <FormFields />
            </>
        </Formik>
    )
}

export default FormProducto