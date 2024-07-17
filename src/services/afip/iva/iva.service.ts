import { Axios, cancelTokenSource } from "../../../config/api/axios.config";
import { IvaDeleteDTO, IvaPatchDTO, IvaPostDTO } from "../../../model/dtos/iva/iva.dto";
import { omitId, replaceParamId } from "../../../utilities/replace-param.utils";
import { IvaURL } from "../../url/iva.url";

const url = IvaURL;
class Iva {
    async getIvaSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async getIvaById(IvaId: number) {
        return await Axios.get(replaceParamId(url.getById, IvaId), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postIva(req: IvaPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        })
    }
    async patchIva(req: IvaPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), { cancelToken: cancelTokenSource.token, });
    }
    async deleteIva(IvaId: IvaDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, IvaId.id), { cancelToken: cancelTokenSource.token, });
    }
}
export const IvaApi = new Iva();
