import { Formik } from "formik"
import { t } from "i18next"
import { useCallback, useEffect } from "react"
import toast from "react-hot-toast"
import { useModuleContext } from "../../../../hooks/useModules"
import UseQueryMutation from "../../../../hooks/useQueryMutation"
import { lang } from "../../../../langs"
import { CondicionIvaPatchDTO, CondicionIvaPostDTO } from "../../../../model/dtos/condicionIva/condicionIva.dto"
import { condicionIvaApi } from "../../../../services/afip/condicion/condiconiva.service"
import { fieldValidations } from "../field/field.validations"
import FormFields from "./FormFields"
interface Props {
    refetch: () => void;
}
const FormCondicionIva: React.FC<Props> = ({ refetch }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
    const postCondicionIva = UseQueryMutation({
        requestFn: condicionIvaApi.postcondicionIva,
        options: {
            onError: () => {
                toast.error(t(lang.ConditionIva.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.ConditionIva.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchCondicionIva = UseQueryMutation({
        requestFn: condicionIvaApi.patchcondicionIva,
        options: {
            onError: () => {
                toast.error(t(lang.ConditionIva.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.ConditionIva.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: CondicionIvaPostDTO) => {
            if (rowData) {
                const req: CondicionIvaPatchDTO = {
                    id: rowData.id,
                    ...values,
                };
                await patchCondicionIva.mutateAsync(req);
            } else {
                await postCondicionIva.mutateAsync(values);
            }
        },
        [rowData, patchCondicionIva, postCondicionIva]
    );
    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);


    const intialValues: CondicionIvaPostDTO = {
        descripcion: rowData?.descripcion ?? "",
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

export default FormCondicionIva