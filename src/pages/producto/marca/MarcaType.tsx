import { t } from "i18next";
import { useModuleContext } from "../../../hooks/useModules";
import useQueryApi from "../../../hooks/useQueryApi";
import { lang } from "../../../langs";
import { DashboardLayout } from "../../../layout/DashboardLayout"
import { MarcaApi } from "../../../services/marca/marca.service";
import { TableMarca } from "./components/TableMarca";
import UseQueryMutation from "../../../hooks/useQueryMutation";
import toast from "react-hot-toast";
import { CustomBasicModal } from "../../../common/components/modal/CustomBasicModal";
import FormTypeMarca from "./components/FormTypeMarca";
import { confirmDialog } from "primereact/confirmdialog";


const MarcaType = () => {
    const { rowData, startToolbarTemplate, visible } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "marca",
        MarcaApi.getMarcaSearch
    )
    const deleteMarca = UseQueryMutation({
        requestFn: MarcaApi.deleteMarca,
        options: {
            // Manejar error en la eliminación
            onError() {
                toast.error(t(lang.MarcaType.messages.deletedError));
            },
            // Manejar éxito en la eliminación
            onSuccess: () => {
                refetch();
                toast.success(t(lang.MarcaType.messages.deletedSuccess));
            },
        },
    });

    // Manejar la eliminación de la Marca
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
                await deleteMarca.mutateAsync({ id });
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
                {t(lang.MarcaType.title)}
            </div>
            <div className="card">
                <div className="grid">
                    <div className="col-12">
                        {startToolbarTemplate()}
                    </div>
                </div>
                <div>
                    <TableMarca
                        data={data ?? []}
                        isFetching={isFetching}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
            <CustomBasicModal title={rowData ? `${t(lang.MarcaType.edit)}` : `${t(lang.MarcaType.new)}`} >
                {visible && (<FormTypeMarca refetch={refetch} />)}
            </CustomBasicModal>
        </DashboardLayout>
    )
}

export default MarcaType