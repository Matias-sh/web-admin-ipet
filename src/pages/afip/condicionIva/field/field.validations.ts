import { lang } from "../../../../langs"
import { t } from "i18next"
import * as Yup from "yup"
export const fieldValidations = Yup.object().shape({
    descripcion: Yup.string().required(t(lang.ConditionIva.validation.descriptionIsRequired.toString())),
    nombre: Yup.string().required(t(lang.ConditionIva.validation.nameIsRequired.toString())),
})
