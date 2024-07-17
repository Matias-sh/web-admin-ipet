import { MetadataEntity } from "../metadata.entity";

export interface ActionsResponse {
    data: ProductoEntity[];
    metadata: MetadataEntity;
}

export interface ProductoEntity {
    id: number;
    nombre: string;
    codigoBarras: string;
    codigoInterno: string;
    descripcion: string;
    categoria: CategoriaEntity;
    marca: MarcaEntity;
    presentacion: PresentacionEntity;
    stock: StockEntity[];
    precio: PrecioEntity[];
}

export interface CategoriaEntity {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface MarcaEntity {
    id: number;
    nombre: string;
}

export interface PrecioEntity {
    id: number;
    venta: number;
    compra: number;
}

export interface PresentacionEntity {
    id: number;
    nombre: string;
    siglas: string;
}

export interface StockEntity {
    id: number;
    stock: number;
    stockMinimo: number;
}

