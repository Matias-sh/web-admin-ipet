export type IvaPatchDTO = Partial<IvaPostDTO> & { id: number }

export interface IvaPostDTO {
    descripcion?: string
    ivaPorcentaje?: string
}
export interface IvaDeleteDTO {
    id: number
}
