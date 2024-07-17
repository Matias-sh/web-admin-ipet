export const producto = "/producto";

export const ProductoURL = {
    get: `${producto}/search`,
    getById: `${producto}/:id`,
    post: `${producto}`,
    patch: `${producto}/:id`,
    delete: `${producto}/:id`
};