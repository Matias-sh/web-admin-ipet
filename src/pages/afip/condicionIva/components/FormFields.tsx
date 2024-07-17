import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import FormCustomBottons from "../../../../common/components/forms/FormCustomBottons";
import { FormTextInput } from "../../../../common/components/forms/FormTextInput";
import { lang } from "../../../../langs";
import { IvaPostDTO } from "../../../../model/dtos/iva/iva.dto";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<IvaPostDTO>()
    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid">
                <div className="field col-12 md:col-6">
                    <FormTextInput label={t(lang.ConditionIva.form.name)} name={'nombre'}
                    />
                </div>
                <div className="field col-12 md:col-6">
                    <FormTextInput label={t(lang.ConditionIva.form.description)} name={'descripcion'}
                    />
                </div>
            </div>
            <FormCustomBottons />


        </Form>
    )
}

export default FormFields