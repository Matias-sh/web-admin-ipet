import { t } from "i18next";
import { ICustomColumnItem } from "../../../../common/components/table/basic-table/interfaces/custombasictable";
import CustomBasicTable from "../../../../common/components/table/basic-table/CustomBasicTable";
import { lang } from "../../../../langs";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableCategoria = ({ data, isFetching, handleDelete }: Props) => {
    const ivaBodyTemplate = (rowData: any) => {
        return <span>{rowData.iva.descripcion} - {rowData.iva.ivaPorcentaje}%</span>;
    };

    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Nombre', sortable: true, filter: true, filterPlaceholder: 'Buscar por nombre', dataType: 'text' },
        { field: 'descripcion', header: 'Descripción', sortable: true, filter: true, filterPlaceholder: 'Buscar por descripción', dataType: 'text' },
        { field: 'iva', header: 'Iva', body: ivaBodyTemplate, sortable: true, filter: true, filterPlaceholder: 'Buscar por iva', dataType: 'text' },
    ];

    return (
        <>
            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.Category.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}
            />
        </>
    );
};