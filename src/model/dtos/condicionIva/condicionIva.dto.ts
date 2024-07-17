export type CondicionIvaPatchDTO = Partial<CondicionIvaPostDTO> & { id: number }

export interface CondicionIvaPostDTO {
    nombre?: string | null,
    descripcion?: string | null
}
export interface CondicionIvaDeleteDTO {
    id: number
}
