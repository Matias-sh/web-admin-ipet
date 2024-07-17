

import { omitId, replaceParamId } from "../../utilities/replace-param.utils";
import { Axios, cancelTokenSource } from '../../config/api/axios.config';
import { MarcaURL } from "../url/marca.url";
import { MarcaDeleteDTO, MarcaPatchDTO, MarcaPostDTO } from "../../model/dtos/marca/marca.dto";


const url = MarcaURL;
class Marca {
    async getMarcaSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async getMarcaById(MarcaId: number) {
        return await Axios.get(replaceParamId(url.getById, MarcaId), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postMarca(req: MarcaPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        })
    }
    async patchMarca(req: MarcaPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id),  omitId(req), { cancelToken: cancelTokenSource.token, });
    }
    async deleteMarca(MarcaId: MarcaDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, MarcaId.id), { cancelToken: cancelTokenSource.token, });
    }
}

export const MarcaApi = new Marca();
