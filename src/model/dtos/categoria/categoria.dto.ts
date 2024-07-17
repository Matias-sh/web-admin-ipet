export type CategoriaPatchDTO = Partial<CategoriaPostDTO> & { id: number }

export interface CategoriaPostDTO {
    nombre?: string,
    descripcion?: string,
    iva?: number | string,
}
export interface CategoriaDeleteDTO {
    id: number
}
