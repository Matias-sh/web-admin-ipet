import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { CustomBasicModal } from "../../../common/components/modal/CustomBasicModal";
import { useModuleContext } from "../../../hooks/useModules";
import useQueryApi from "../../../hooks/useQueryApi";
import UseQueryMutation from "../../../hooks/useQueryMutation";
import { lang } from "../../../langs";
import { DashboardLayout } from "../../../layout/DashboardLayout";
import { CategoriaApi } from "../../../services/categoria/categoria.service";
import { TableCategoria } from "./components/TableCategoria";
import FormCategoria from "./components/FormCategoria";


const Categoria = () => {
    const { rowData, startToolbarTemplate, visible } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "categoria",
        CategoriaApi.getCategoriaSearch
    );
    const deleteCategoria = UseQueryMutation({
        requestFn: CategoriaApi.deleteCategoria,
        options: {
            // Manejar error en la eliminación
            onError() {
                toast.error(t(lang.Category.messages.deletedError));
            },
            // Manejar éxito en la eliminación
            onSuccess: () => {
                refetch();
                toast.success(t(lang.Category.messages.deletedSuccess));
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
                await deleteCategoria.mutateAsync({ id });
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
                {t(lang.Category.title)}
            </div>
            <div className="card">
                <div className="grid">
                    <div className="col-12">
                        {startToolbarTemplate()}
                    </div>
                </div>
                <div>
                    <TableCategoria
                        data={data ?? []}
                        isFetching={isFetching}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
            <CustomBasicModal width="large" title={rowData ? `${t(lang.Category.edit)}` : `${t(lang.Category.new)}`}>
                {visible && (<FormCategoria refetch={refetch} />)}
            </CustomBasicModal>
        </DashboardLayout>
    );
};

export default Categoria;