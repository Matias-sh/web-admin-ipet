import { lang } from "../../../../langs"
import { t } from "i18next"
import * as Yup from "yup"
export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required(t(lang.Category.validation.nameIsRequired.toString())),
    descripcion: Yup.string().required(t(lang.Category.validation.nameIsRequired.toString())),
    iva: Yup.mixed().required(t(lang.Category.validation.ivaIsRequired.toString())),
})
