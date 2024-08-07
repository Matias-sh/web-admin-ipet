import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import { Toaster } from 'react-hot-toast';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from "redux-persist/lib/integration/react";
import './common/styles/layout/layout.scss';
import { ModuleProvider } from './hooks/useModules';
import { PermisosProvider } from './hooks/usePermisos';
import './i18n';
import { persistor } from "./redux/store/store";
import { AppRouter } from './router/AppRouter';
import './themes/nova-accent/theme.css';
import { ConfirmDialog } from "primereact/confirmdialog";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Refecht cuando se cambia de pantalla
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
        retry: 2, // Reintentar fetches fallidos hasta 2 veces automáticamente
      },
    },
  })
  7
  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>

        <PersistGate persistor={persistor}>
          <PrimeReactProvider >
            <PermisosProvider>
              <ModuleProvider>
                <Toaster position="bottom-right" toastOptions={{
                  duration: 5000
                }} />
                <ConfirmDialog /> {/* Incluye el componente ConfirmDialog */}
                <AppRouter />
              </ModuleProvider>
            </PermisosProvider >
          </PrimeReactProvider>
        </PersistGate>
      </QueryClientProvider>
    </HashRouter>
  )
}

export default App
