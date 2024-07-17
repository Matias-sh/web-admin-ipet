import { useEffect, useState } from "react";
import useQueryApi from "../../../../hooks/useQueryApi";
import { CategoriaEntity } from "../../../../model/categoria/categoria.entity";
import { CategoriaApi } from "../../../../services/categoria/categoria.service";
import { MarcaEntity } from "../../../../model/marca/marca.entity";
import { MarcaApi } from "../../../../services/marca/marca.service";
import { PresentacionEntity } from "../../../../model/presentacion/presentacion.entity";
import { PresentacionApi } from "../../../../services/presentacion/presentacion.service";
import { FormSelect } from "../../../../common/components/forms/FormSelect";

const SectionSelect = () => {
    // Estado y llamada a la API para Categorias
    const { data: categoriaData, isLoading: isLoadingCategorias } = useQueryApi<{ data: CategoriaEntity[] }>("categoria", CategoriaApi.getCategoriaSearch);
    const [categoriaOptions, setCategoriaOptions] = useState<{ nombre: string; value: number; }[]>([]);

    useEffect(() => {
        if (categoriaData?.data) {
            const options = categoriaData.data.map(categoria => ({
                nombre: categoria.nombre,
                value: categoria.id
            }));
            setCategoriaOptions(options);
        }
    }, [categoriaData]);

    // Estado y llamada a la API para Marcas
    const { data: marcaData, isLoading: isLoadingMarcas } = useQueryApi<{ data: MarcaEntity[] }>("marca", MarcaApi.getMarcaSearch);
    const [marcaOptions, setMarcaOptions] = useState<{ nombre: string; value: number; }[]>([]);

    useEffect(() => {
        if (marcaData?.data) {
            const options = marcaData.data.map(marca => ({
                nombre: marca.nombre,
                value: marca.id
            }));
            setMarcaOptions(options);
        }
    }, [marcaData]);

    // Estado y llamada a la API para Presentaciones
    const { data: presentacionData, isLoading: isLoadingPresentaciones } = useQueryApi<{ data: PresentacionEntity[] }>("presentacion", PresentacionApi.getPresentacionSearch);
    const [presentacionOptions, setPresentacionOptions] = useState<{ nombre: string; value: number; }[]>([]);

    useEffect(() => {
        if (presentacionData?.data) {
            const options = presentacionData.data.map(presentacion => ({
                nombre: presentacion.nombre, 
                value: presentacion.id
            }));
            setPresentacionOptions(options);
        }
    }, [presentacionData]);

    return (
        <>
            <div className="col-12 md:col-4">
                <FormSelect
                    label="Categoria"
                    name="categoria"
                    options={categoriaOptions}
                    optionLabel="nombre"
                    loading={isLoadingCategorias}
                />
            </div>
            <div className="col-12 md:col-4">
                <FormSelect
                    label="Marca"
                    name="marca"
                    options={marcaOptions}
                    optionLabel="nombre"
                    loading={isLoadingMarcas}
                />
            </div>
            <div className="col-12 md:col-4">
                <FormSelect
                    label="Presentacion"
                    name="presentacion"
                    options={presentacionOptions}
                    optionLabel="nombre"
                    loading={isLoadingPresentaciones}
                />
            </div>
        </>
    );
}

export default SectionSelect;
