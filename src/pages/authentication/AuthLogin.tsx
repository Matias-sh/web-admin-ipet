import 'primeicons/primeicons.css';
import { AuthLayout } from "../../layout/AuthLayout";

import { AuthForm } from './components/AuthForm';
const AuthLogin = () => {
  return (
    <AuthLayout
      Form={<AuthForm />}
    />
  )
}

export default AuthLogin;


