import { Formik } from "formik"
import { t } from "i18next"
import toast from "react-hot-toast"
import { useModuleContext } from "../../../../hooks/useModules"
import UseQueryMutation from "../../../../hooks/useQueryMutation"
import { lang } from "../../../../langs"
import { IvaPatchDTO, IvaPostDTO } from "../../../../model/dtos/iva/iva.dto"
import { fieldValidations } from "../fields/field.validations"
import FormFields from "./FormFields"
import { useCallback, useEffect } from "react"
import { IvaApi } from "../../../../services/afip/iva/iva.service"

interface FormTypeActionsProps {
    refetch: () => void;
}
const FormTypeIva: React.FC<FormTypeActionsProps> = ({ refetch }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
    const postTypeIva = UseQueryMutation({
        requestFn: IvaApi.postIva,
        options: {
            onError: () => {
                toast.error(t(lang.IvaType.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.IvaType.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchTypeIva = UseQueryMutation({
        requestFn: IvaApi.patchIva,
        options: {
            onError: () => {
                toast.error(t(lang.IvaType.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.IvaType.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: IvaPostDTO) => {
            if (rowData) {
                const req: IvaPatchDTO = {
                    id: rowData.id,
                    ...values,
                };
                await patchTypeIva.mutateAsync(req);
            } else {
                await postTypeIva.mutateAsync(values);
            }
        },
        [rowData, patchTypeIva, postTypeIva]
    );
    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);


    const intialValues: IvaPostDTO = {
        ivaPorcentaje: rowData?.ivaPorcentaje ?? "",
        descripcion: rowData?.descripcion ?? "",
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

export default FormTypeIva