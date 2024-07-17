import { Formik } from "formik"
import { t } from "i18next"
import toast from "react-hot-toast"
import { useModuleContext } from "../../../../hooks/useModules"
import UseQueryMutation from "../../../../hooks/useQueryMutation"
import { lang } from "../../../../langs"
import { CategoriaPatchDTO, CategoriaPostDTO } from "../../../../model/dtos/categoria/categoria.dto"
import { CategoriaApi } from "../../../../services/categoria/categoria.service"
import { fieldValidations } from "../field/field.validations"
import FormFields from "./FormFields"
import { useCallback, useEffect } from "react"
interface FormTypeActionsProps {
    refetch: () => void;
}
const FormCategoria: React.FC<FormTypeActionsProps> = ({ refetch }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
  
    const postCategoria = UseQueryMutation({
        requestFn: CategoriaApi.postCategoria,
        options: {
            onError: () => {
                toast.error(t(lang.Category.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.Category.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchCategoria = UseQueryMutation({
        requestFn: CategoriaApi.patchCategoria,
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
        async (values: CategoriaPostDTO) => {
            if (rowData) {
                const req: CategoriaPatchDTO = {
                    id: rowData.id,
                    ...values,
                };
                await patchCategoria.mutateAsync(req);
            } else {
                await postCategoria.mutateAsync(values);
            }
        },
        [rowData, patchCategoria, postCategoria]
    );
    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);


    const initialValues: CategoriaPostDTO = {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
        iva: rowData?.iva.id ?? "",
    }
   
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={fieldValidations}
            onSubmit={(values, { setSubmitting }) => {
                onSave(values)
                setSubmitting(false)
            }}
        >
            <>
                <FormFields />
            </>
        </Formik>
    )
}

export default FormCategoria