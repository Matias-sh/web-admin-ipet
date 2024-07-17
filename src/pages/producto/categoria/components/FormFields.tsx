import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import FormCustomBottons from "../../../../common/components/forms/FormCustomBottons";
import { FormSelect } from "../../../../common/components/forms/FormSelect";
import { FormTextInput } from "../../../../common/components/forms/FormTextInput";
import useQueryApi from "../../../../hooks/useQueryApi";
import { lang } from "../../../../langs";
import { PresentacionPostDTO } from "../../../../model/dtos/presentacion/presentacion.dto";
import { IvaEntity } from "../../../../model/afip/iva/iva.entity";
import { IvaApi } from "../../../../services/afip/iva/iva.service";



const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<PresentacionPostDTO>()

    const { data, isLoading } = useQueryApi<{ data: IvaEntity[] }>("iva", IvaApi.getIvaSearch);
    const [ivaOption, setIvaOption] = useState<{ nombre: string; value: number; }[]>([]);

    useEffect(() => {
        if (data?.data) {
            const options = data.data.map(iva => ({
                nombre: iva.descripcion,
                value: iva.id
            }));
            setIvaOption(options);
        }
    }, [data]);


    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6  lg:col-4">
                    <FormTextInput label={t(lang.Category.form.name)} name={'nombre'}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <FormTextInput label={t(lang.Category.form.description)} name={'descripcion'}
                    />
                </div>
                <div className="col-12 md:col-6  lg:col-4">
                    <FormSelect
                        label="Iva"
                        name="iva"
                        options={ivaOption}
                        optionLabel="nombre"
                        loading={isLoading}

                    />

                </div>

            </div>
            <FormCustomBottons />


        </Form>
    )
}

export default FormFields