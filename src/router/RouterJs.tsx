import { ComponentType, lazy, LazyExoticComponent, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHook';
const AuthLogin = lazy(() => import('../pages/authentication/AuthLogin'));
const HomeAdmin = lazy(() => import('../pages/home/HomeAdmin'));
const Iva = lazy(() => import('../pages/afip/iva/IvaType'))
const Marca = lazy(() => import('../pages/producto/marca/MarcaType'));
const Presentacion = lazy(() => import('../pages/producto/presentacion/PresentacionType'));
const Categoria = lazy(() => import('../pages/producto/categoria/CategoriaType'));
const Producto = lazy(() => import('../pages/producto/producto/Producto'));
const CondicionIva = lazy(() => import('../pages/afip/condicionIva/CondicionIva'));


type ComponentsMap = Record<string, LazyExoticComponent<ComponentType<any>>>;
const componentsMap: ComponentsMap = {
    'AuthLogin': AuthLogin,
    'HomeAdmin': HomeAdmin,
    'Marca': Marca,
    'Presentacion': Presentacion,
    'Iva': Iva,
    'Categoria': Categoria,
    'Producto': Producto,
    'CondicionIva': CondicionIva,

};

export const RouterJs = () => {
    const { userModulos } = useAppSelector((state) => state.auth);

    const renderRoutes = (modulos: any) => {
        return modulos.map((modulo: any) => {
            if (modulo.items && modulo.items.length > 0) {
                return renderRoutes(modulo.items);
            }
            const Component = componentsMap[modulo.element];
            if (!Component) {
                console.warn(`No se econtro componente: ${modulo.element}`);
                return null;
            }
            return (
                <Route
                    key={modulo.path}
                    path={modulo.path}
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Component />
                        </Suspense>
                    }
                />
            );
        });
    };

    return (
        <div>
            <Routes>
                {renderRoutes(userModulos)}
            </Routes>
        </div>
    );
};