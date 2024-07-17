

import { omitId, replaceParamId } from "../../utilities/replace-param.utils";
import { Axios, cancelTokenSource } from '../../config/api/axios.config';
import { PresentacionURL } from "../url/presentacion.url";
import { PresentacionDeleteDTO, PresentacionPatchDTO, PresentacionPostDTO } from "../../model/dtos/presentacion/presentacion.dto";


const url = PresentacionURL;
class Presentacion {
    async getPresentacionSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async getPresentacionById(PresentacionId: number) {
        return await Axios.get(replaceParamId(url.getById, PresentacionId), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postPresentacion(req: PresentacionPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        })
    }
    async patchPresentacion(req: PresentacionPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id),  omitId(req), { cancelToken: cancelTokenSource.token, });
    }
    async deletePresentacion(PresentacionId: PresentacionDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, PresentacionId.id), { cancelToken: cancelTokenSource.token, });
    }
}

export const PresentacionApi = new Presentacion();
