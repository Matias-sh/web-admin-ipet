import './components/style/layaout.css'
interface Props {
    fondo?: any;
    Form: any
}
export const AuthLayout = ({ Form }: Props) => {
    return (
        <div className='body-auth'>
            <div className="session">
                <div className="left-auth hidden lg:flex">
                </div>
                <div className="grid p-5 sm:h-full md:h-auto" >
                    {Form}
                </div>
            </div>
        </div>
    )
}
