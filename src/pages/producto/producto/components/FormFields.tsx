import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { Tag } from "primereact/tag";
import { FC } from "react";
import FormCustomBottons from "../../../../common/components/forms/FormCustomBottons";
import { FormTextInput } from "../../../../common/components/forms/FormTextInput";
import { FormTextInputIcon } from "../../../../common/components/forms/FormTextInputIcon";
import { lang } from "../../../../langs";
import { ProductoPostDTO } from "../../../../model/dtos/producto/producto.dto"; // Ajusta la ruta según tu estructura de carpetas
import SectionSelect from "./SectionSelect";
import { useModuleContext } from "../../../../hooks/useModules";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<ProductoPostDTO>();
    const { rowData } = useModuleContext();
    console.log('data en editar', rowData)
    return (
        <Form onSubmit={handleSubmit}>
            <div className="col-12 mt-3 mb-3 sm:text-center md:text-left">
                <Tag icon="pi pi-info-circle" severity="info" value="Datos del Producto"></Tag>
            </div>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6">
                    <FormTextInputIcon label={t(lang.Product.form.codigoBarras)} name="codigoBarras" icon="pi pi-barcode" />
                </div>
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.Product.form.codigoInterno)} name="codigoInterno" />
                </div>
            </div>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.Product.form.name)} name="nombre" />
                </div>
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.Product.form.description)} name="descripcion" />
                </div>
            </div>
            <div className="p-fluid formgrid grid mb-3">
                <SectionSelect />
            </div>
            <div className="col-12 mt-3 mb-3 sm:text-center md:text-left">
                <Tag icon="pi pi-info-circle" severity="info" value="Inventario Del Producto"></Tag>
            </div>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.Product.form.stock)} name="stockRequest.stock" />
                </div>
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.Product.form.stockmin)} name="stockRequest.stockMinimo" />
                </div>
            </div>
            <div className="col-12 mt-3 mb-3 sm:text-center md:text-left">
                <Tag icon="pi pi-info-circle" severity="info" value="Datos de venta del Producto"></Tag>
            </div>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.Product.form.compra)} name="precioRequest.compra" />
                </div>
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.Product.form.venta)} name="precioRequest.venta" />
                </div>
            </div>
            <FormCustomBottons />
        </Form>
    );
};

export default FormFields;
