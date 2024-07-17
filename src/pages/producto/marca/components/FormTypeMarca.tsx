import { Formik } from "formik"
import toast from "react-hot-toast"
import { fieldValidations } from "../fields/field.validations"
import { t } from "i18next"
import { useCallback, useEffect } from "react"
import { useModuleContext } from "../../../../hooks/useModules"
import UseQueryMutation from "../../../../hooks/useQueryMutation"
import { lang } from "../../../../langs"
import { MarcaPatchDTO, MarcaPostDTO } from "../../../../model/dtos/marca/marca.dto"
import FormFields from "./FormFields"
import { MarcaApi } from "../../../../services/marca/marca.service"

interface FormTypeActionsProps {
    refetch: () => void;
}
const FormTypeMarca: React.FC<FormTypeActionsProps> = ({ refetch }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postMarca = UseQueryMutation({
        requestFn: MarcaApi.postMarca,
        options: {
            onError: () => {
                toast.error(t(lang.MarcaType.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.MarcaType.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchMarca = UseQueryMutation({
        requestFn: MarcaApi.patchMarca,
        options: {
            onError: () => {
                toast.error(t(lang.MarcaType.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.MarcaType.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: MarcaPostDTO) => {
            if (rowData) {
                const req: MarcaPatchDTO = {
                    id: rowData.id,
                    ...values,
                };
                await patchMarca.mutateAsync(req);
            } else {
                await postMarca.mutateAsync(values);
            }
        },
        [rowData, patchMarca, postMarca]
    );
    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const intialValues: MarcaPostDTO = {
        nombre: rowData?.nombre ?? ""
    }


    return (
        <Formik
            initialValues={intialValues}
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

export default FormTypeMarca