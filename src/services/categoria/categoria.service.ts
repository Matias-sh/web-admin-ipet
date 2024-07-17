import { Axios, cancelTokenSource } from '../../config/api/axios.config';
import { CategoriaDeleteDTO, CategoriaPatchDTO, CategoriaPostDTO } from '../../model/dtos/categoria/categoria.dto';

import { omitId, replaceParamId } from '../../utilities/replace-param.utils';
import { CategoriaURL } from '../url/categoria.url';


const url = CategoriaURL;
class Categoria {
    async getCategoriaSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async getCategoriaById(CategoriaId: number) {
        return await Axios.get(replaceParamId(url.getById, CategoriaId), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postCategoria(req: CategoriaPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async patchCategoria(req: CategoriaPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async deleteCategoria(CategoriaId: CategoriaDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, CategoriaId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const CategoriaApi = new Categoria();