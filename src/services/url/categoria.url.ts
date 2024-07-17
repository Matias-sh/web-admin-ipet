export const CATEGORIA = "/categoria";

export const CategoriaURL = {
    get: `${CATEGORIA}/search`,
    getById: `${CATEGORIA}/:id`,
    post: `${CATEGORIA}`,
    patch: `${CATEGORIA}/:id`,
    delete: `${CATEGORIA}/:id`
};