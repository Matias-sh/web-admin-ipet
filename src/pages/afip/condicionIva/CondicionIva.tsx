import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from 'react-hot-toast';
import { CustomBasicModal } from '../../../common/components/modal/CustomBasicModal';
import { useModuleContext } from '../../../hooks/useModules';
import useQueryApi from "../../../hooks/useQueryApi";
import UseQueryMutation from '../../../hooks/useQueryMutation';
import { lang } from '../../../langs';
import { DashboardLayout } from "../../../layout/DashboardLayout";
import { IvaApi } from "../../../services/afip/iva/iva.service";
import { TableIva } from "./components/TableIva";
import { condicionIvaApi } from '../../../services/afip/condicion/condiconiva.service';
import FormTypeIva from "../iva/components/FormTypeIva";
import FormCondicionIva from "./components/FormCondicionIva";
const CondicionIva = () => {
    const { rowData, startToolbarTemplate, visible } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "condicion_iva",
        condicionIvaApi.getcondicionIvaSearch
    )
    const deleteIva = UseQueryMutation({
        requestFn: condicionIvaApi.deletecondicionIva,
        options: {
            // Manejar error en la eliminación
            onError() {
                toast.error(t(lang.ConditionIva.messages.deletedError));
            },
            // Manejar éxito en la eliminación
            onSuccess: () => {
                refetch();
                toast.success(t(lang.ConditionIva.messages.deletedSuccess));
            },
        },
    });

    // Manejar la eliminación de la Condición
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
                await deleteIva.mutateAsync({ id });
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
                {t(lang.ConditionIva.title)}
            </div>
            <div className="card">
                <div className="grid">
                    <div className="col-12">
                        {startToolbarTemplate()}
                    </div>
                </div>
                <div>
                    <TableIva
                        data={data ?? []}
                        isFetching={isFetching}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
            <CustomBasicModal title={rowData ? `${t(lang.ConditionIva.edit)}` : `${t(lang.ConditionIva.new)}`} width="medium">
                {visible && (<FormCondicionIva refetch={refetch} />)}
            </CustomBasicModal>
        </DashboardLayout >

    )
}
export default CondicionIva