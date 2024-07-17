import { lang } from "../../../../langs"
import { t } from "i18next"
import * as Yup from "yup"
export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required(t(lang.MarcaType.validation.nameIsRequired.toString())),
})
