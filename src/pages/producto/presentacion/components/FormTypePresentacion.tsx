import { Formik } from "formik"
import toast from "react-hot-toast"
import { useModuleContext } from "../../../../hooks/useModules"
import UseQueryMutation from "../../../../hooks/useQueryMutation"
import { PresentacionPatchDTO, PresentacionPostDTO } from "../../../../model/dtos/presentacion/presentacion.dto"
import { fieldValidations } from "../fields/field.validations"
import { t } from "i18next"
import { lang } from "../../../../langs"
import { PresentacionApi } from "../../../../services/presentacion/presentacion.service"
import FormFields from "./FormFields"
import { useCallback, useEffect } from "react"

interface FormTypeActionsProps {
    refetch: () => void;
}
const FormTypePresentacion: React.FC<FormTypeActionsProps> = ({ refetch }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
    const postPresentacion = UseQueryMutation({
        requestFn: PresentacionApi.postPresentacion,
        options: {
            onError: () => {
                toast.error(t(lang.PresentacionType.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.PresentacionType.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchPresentacion = UseQueryMutation({
        requestFn: PresentacionApi.patchPresentacion,
        options: {
            onError: () => {
                toast.error(t(lang.PresentacionType.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.PresentacionType.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: PresentacionPostDTO) => {
            if (rowData) {
                const req: PresentacionPatchDTO = {
                    id: rowData.id,
                    ...values,
                };
                await patchPresentacion.mutateAsync(req);
            } else {
                await postPresentacion.mutateAsync(values);
            }
        },
        [rowData, patchPresentacion, postPresentacion]
    );
    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);


    const intialValues: PresentacionPostDTO = {
        nombre: rowData?.nombre ?? "",
        siglas: rowData?.siglas ?? ""
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

export default FormTypePresentacion