import { Form, Formik } from "formik"
import { t } from "i18next"
import { lang } from "../../../langs"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { FormTextInput } from "../../../common/components/forms/FormTextInput"
import { AuthHeader } from "./AuthHeader"
import axios from "axios"
import { useAppDispatch } from "../../../hooks/reduxHook"
import { setUserToken } from "../../../redux/slices/auth/autSlice"


export const AuthForm = () => {

    const dispatch = useAppDispatch();
    const initialValues = {
        userName: '',
        userPassword: ''
    };
    const handleSubmit = () => {
        const loadData = async () => {
            try {
                // Asegúrate de ajustar la ruta al lugar donde tu archivo está ubicado
                const response = await axios.get('/userResponse.json');
                console.log(response.data); // Aquí tienes tus datos
                dispatch(setUserToken(response.data));
            } catch (error) {
                console.error('Hubo un error al cargar los datos:', error);
            }
        };
        loadData();

    }


    return (
        <div className='w-full p-5' style={{ padding: 30 }}>
            <div className="flex flex-column justify-content-center flex-wrap w-full gap-2">
                <AuthHeader />
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}  >
                {() => (

                    <Form>
                        <div className="grid col-12 ">
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 ">
                                    <FormTextInput label={t(lang.login.form.usuario)} name={'userName'}
                                    />
                                </div>
                                <div className="field col-12">
                                    <FormTextInput type={'password'} label={t(lang.login.form.password)} name={'userPassword'}
                                    />
                                </div>
                            </div>
                            <div className="grid col-11 justify-content-end">
                                <div className="flex flex-column  flex-wrap justify-content-end">
                                    <Button type="submit" className='uppercase' label={t(lang.common.actions.enter)} />
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>


        </div>
    )

}