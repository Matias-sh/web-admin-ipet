import { Axios, cancelTokenSource } from '../../config/api/axios.config';
import { ProductoDeleteDTO, ProductoPatchDTO, ProductoPostDTO } from '../../model/dtos/producto/producto.dto';
import { omitId, replaceParamId } from "../../utilities/replace-param.utils";
import { ProductoURL } from '../url/productos.utl';


const url = ProductoURL;

class Producto {
    async getProductoSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async getProductoById(ProductoId: number) {
        return await Axios.get(replaceParamId(url.getById, ProductoId), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postProducto(req: ProductoPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async patchProducto(req: ProductoPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async deleteProducto(ProductoId: ProductoDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, ProductoId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const ProductoApi = new Producto();