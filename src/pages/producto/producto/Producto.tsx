import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { CustomBasicModal } from "../../../common/components/modal/CustomBasicModal";
import { useModuleContext } from "../../../hooks/useModules";
import useQueryApi from "../../../hooks/useQueryApi";
import UseQueryMutation from "../../../hooks/useQueryMutation";
import { lang } from "../../../langs";
import { DashboardLayout } from "../../../layout/DashboardLayout";
import { ProductoApi } from "../../../services/producto/producto.service";
import { TableProducto } from "./components/TableProduto";
import FormProducto from "./components/FormProducto";





const Producto = () => {
    const { rowData, startToolbarTemplate, visible } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "producto",
        ProductoApi.getProductoSearch
    );
    const deleteProducto = UseQueryMutation({
        requestFn: ProductoApi.deleteProducto,
        options: {
            // Manejar error en la eliminación
            onError() {
                toast.error(t(lang.Product.messages.deletedError));
            },
            // Manejar éxito en la eliminación
            onSuccess: () => {
                refetch();
                toast.success(t(lang.Product.messages.deletedSuccess));
            },
        },
    });

    // Manejar la eliminación de la categoria
    const handleDelete = (id: number) => {
        // Mostrar diálogo de confirmación
        confirmDialog({
            message: t(lang.common.labels.deleteMessage),
            header: t(lang.common.labels.deleteMessageTitle),
            icon: 'pi pi-exclamation-triangle text-yellow-500',
            acceptClassName: 'p-button-danger',
            acceptLabel: t(lang.common.actions.confirm),
            rejectLabel: t(lang.common.actions.cancel),
            // Acción a realizar en caso de confirmación
            accept: async () => {
                await deleteProducto.mutateAsync({ id });
            },
            // Acción a realizar en caso de rechazo
            reject: () => {
                // Maneja la cancelación si es necesario
            },
        });
    };


    return (
        <DashboardLayout>
            <div className='text-3xl mt-2 mb-2'>
                {t(lang.Product.title)}
            </div>
            <div className="card">
                <div className="grid">
                    <div className="col-12">
                        {startToolbarTemplate()}
                    </div>
                </div>
                <div>
                    <TableProducto
                        data={data ?? []}
                        isFetching={isFetching}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
            <CustomBasicModal width="large" title={rowData ? `${t(lang.Product.edit)}` : `${t(lang.Product.new)}`}>
                {visible && (<FormProducto refetch={refetch} />)}
            </CustomBasicModal>
        </DashboardLayout>
    );
};

export default Producto;