import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { CustomBasicModal } from "../../../common/components/modal/CustomBasicModal";
import { useModuleContext } from "../../../hooks/useModules";
import useQueryApi from "../../../hooks/useQueryApi";
import UseQueryMutation from "../../../hooks/useQueryMutation";
import { lang } from "../../../langs";
import { DashboardLayout } from "../../../layout/DashboardLayout";
import { PresentacionApi } from "../../../services/presentacion/presentacion.service";
import FormTypePresentacion from "./components/FormTypePresentacion";
import { TablePresentacion } from "./components/TablePresentacion";

const PresentacionType = () => {
    const { rowData, startToolbarTemplate, visible } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "presentacion",
        PresentacionApi.getPresentacionSearch
    );

    const deletePresentacion = UseQueryMutation({
        requestFn: PresentacionApi.deletePresentacion,
        options: {
            // Manejar error en la eliminación
            onError() {
                toast.error(t(lang.PresentacionType.messages.deletedError));
            },
            // Manejar éxito en la eliminación
            onSuccess: () => {
                refetch();
                toast.success(t(lang.PresentacionType.messages.deletedSuccess));
            },
        },
    });

    // Manejar la eliminación de la Presentacion
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
                await deletePresentacion.mutateAsync({ id });
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
                {t(lang.PresentacionType.title)}
            </div>
            <div className="card">
                <div className="grid">
                    <div className="col-12">
                        {startToolbarTemplate()}
                    </div>
                </div>
                <div>
                    <TablePresentacion
                        data={data ?? []}
                        isFetching={isFetching}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
            <CustomBasicModal title={rowData ? `${t(lang.PresentacionType.edit)}` : `${t(lang.PresentacionType.new)}`}>
                {visible && (<FormTypePresentacion refetch={refetch} />)}
            </CustomBasicModal>
        </DashboardLayout>
    );
};

export default PresentacionType;