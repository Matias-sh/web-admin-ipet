import { t } from "i18next";
import CustomBasicTable from "../../../../common/components/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "../../../../common/components/table/basic-table/interfaces/custombasictable";
import { lang } from "../../../../langs";
import { PrecioEntity, ProductoEntity, StockEntity } from "../../../../model/producto/producto.entity";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableProducto = ({ data, isFetching, handleDelete }: Props) => {


    const categoriaBodyTemplate = (rowData: any) => {
        return <span>{rowData?.categoria?.nombre}</span>;
    };
    const marcaBodyTemplate = (rowData: any) => {
        return <span>{rowData?.marca?.nombre}</span>;
    };

    const presentacionBodyTemplate = (rowData: any) => {
        return <span>{rowData?.presentacion?.nombre}</span>;
    };

    const stockBodyTemplate = (rowData: ProductoEntity) => {
        if (!rowData.stock || rowData.stock.length === 0) {
            return <span>No Stock</span>;
        }

        return (
            <span>
                {rowData.stock.map((stock: StockEntity) => (
                    <div key={stock.id}>{stock.stock}</div>
                ))}
            </span>
        );
    };
    const stockMinBodyTemplate = (rowData: ProductoEntity) => {
        if (!rowData.stock || rowData.stock.length === 0) {
            return <span>No Stock</span>;
        }

        return (
            <span>
                {rowData.stock.map((stock: StockEntity) => (
                    <div key={stock.id}>{stock.stockMinimo}</div>
                ))}
            </span>
        );
    };

    const precioVentaBodyTemplate = (rowData: ProductoEntity) => {
        if (!rowData.precio || rowData.precio.length === 0) {
            return <span>No posee Precio de Venta</span>;
        }

        return (
            <span>
                {rowData.precio.map((precio: PrecioEntity) => (
                    <div key={precio.id}>$ {precio.venta}</div>
                ))}
            </span>
        );
    };
    const precioCompraBodyTemplate = (rowData: ProductoEntity) => {
        if (!rowData.precio || rowData.precio.length === 0) {
            return <span>No posee Precio de Compra</span>;
        }

        return (
            <span>
                {rowData.precio.map((precio: PrecioEntity) => (
                    <div key={precio.id}>$ {precio.compra}</div>
                ))}
            </span>
        );
    };
    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Nombre', sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
        { field: 'codigoInterno', header: 'Código Interno', sortable: true, filter: true, filterPlaceholder: 'Buscar Por nombre', dataType: 'text' },
        { field: 'codigoBarras', header: 'Código Barra', sortable: true, filter: true, filterPlaceholder: 'Buscar Por nombre', dataType: 'text' },
        { field: 'descripcion', header: 'Descripción', sortable: true, filter: true, filterPlaceholder: 'Buscar Por nombre', dataType: 'text' },
        { field: 'categoria', header: 'Categoria', body: categoriaBodyTemplate, sortable: true, filter: true, filterPlaceholder: 'Buscar Por Categoria', dataType: 'text' },
        { field: 'marca', header: 'Marca', body: marcaBodyTemplate, sortable: true, filter: true, filterPlaceholder: 'Buscar Por nombre', dataType: 'text' },
        { field: 'presentacion', header: 'Presentación', body: presentacionBodyTemplate, sortable: true, filter: true, filterPlaceholder: 'Buscar Por nombre', dataType: 'text' },
        { field: 'stockMin', header: 'Stock Minimo', body: stockMinBodyTemplate, sortable: true, filter: true, filterPlaceholder: 'Buscar Por nombre', dataType: 'text' },
        { field: 'stock', header: 'Stock Actual', body: stockBodyTemplate, sortable: true, filter: true, filterPlaceholder: 'Buscar Por nombre', dataType: 'text' },
        { field: 'compra', header: 'Precio de Compra', body: precioCompraBodyTemplate, sortable: true, filter: true, filterPlaceholder: 'Buscar Por nombre', dataType: 'text' },
        { field: 'venta', header: 'Precio de Venta', body: precioVentaBodyTemplate, sortable: true, filter: true, filterPlaceholder: 'Buscar Por ', dataType: 'text' },
    ]

    return (
        <>
            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.PresentacionType.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}

            />
        </>
    )
}
