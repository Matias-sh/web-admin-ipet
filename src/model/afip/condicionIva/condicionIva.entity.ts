import { MetadataEntity } from "../../metadata.entity";

export interface CondicionIvaResponse {
    data: CondicionIvaEntity[];
    metadata: MetadataEntity;
}
export interface CondicionIvaEntity {
    id: number;
    nombre?: string;
    descripcion?: string;
}
