export type ProductoPatchDTO = Partial<ProductoPostDTO> & { id: number }

export interface ProductoPostDTO {
    nombre?: string;
    codigoBarras?: string;
    codigoInterno?: string;
    descripcion?: string;
    categoria?: number;
    marca?: number;
    presentacion?: number;
    stockRequest?: StockRequest[];
    precioRequest?: PrecioRequest[];
}

export interface PrecioRequest {
    id?: number;
    venta?: number;
    compra?: number;
}

export interface StockRequest {
    id?: number;
    stock?: number;
    stockMinimo?: number;
}

export interface ProductoDeleteDTO {
    id: number
}