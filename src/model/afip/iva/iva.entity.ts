import { MetadataEntity } from "../../metadata.entity";

export interface IvaResponse {
    data: IvaEntity[];
    metadata: MetadataEntity;
}

export interface IvaEntity {
    id: number;
    descripcion: string;
    ivaPorcentaje: string;

}
