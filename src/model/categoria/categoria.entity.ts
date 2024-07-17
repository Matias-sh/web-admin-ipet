import { MetadataEntity } from "../metadata.entity";

export interface CategoriaResponse {
    data: CategoriaEntity[];
    metadata: MetadataEntity;
}


export interface CategoriaEntity {
    id:          number;
    nombre:      string;
    descripcion: string;
    iva:         Iva;
}

export interface Iva {
    id:            number;
    descripcion:   string;
    ivaPorcentaje: string;
}

