import { Axios, cancelTokenSource } from "../../../config/api/axios.config";
import { CondicionIvaDeleteDTO, CondicionIvaPatchDTO, CondicionIvaPostDTO } from "../../../model/dtos/condicionIva/condicionIva.dto";
import { omitId, replaceParamId } from "../../../utilities/replace-param.utils";
import { Condicion_IvaURL } from "../../url/condicionIva.url";



const url = Condicion_IvaURL;
class condicionIva {
    async getcondicionIvaSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async getcondicionIvaById(condicionIvaId: number) {
        return await Axios.get(replaceParamId(url.getById, condicionIvaId), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postcondicionIva(req: CondicionIvaPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async patchcondicionIva(req: CondicionIvaPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async deletecondicionIva(condicionIvaId: CondicionIvaDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, condicionIvaId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const condicionIvaApi = new condicionIva();