export const CONDICION_IVA = "/condicion_iva";

export const Condicion_IvaURL = {
    get: `${CONDICION_IVA}/search`,
    getById: `${CONDICION_IVA}/:id`,
    post: `${CONDICION_IVA}`,
    patch: `${CONDICION_IVA}/:id`,
    delete: `${CONDICION_IVA}/:id`
};