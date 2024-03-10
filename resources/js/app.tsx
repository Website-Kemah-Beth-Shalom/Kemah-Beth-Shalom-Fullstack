import './bootstrap';
import '@/Styles/global.scss';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ConfigProvider, theme } from 'antd';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const appName = import.meta.env.VITE_APP_NAME || 'Kemah Beth Shalom';

// for antd dark theme
const { darkAlgorithm } = theme;


// react query client
// Create a client
export const queryClient = new QueryClient()

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <QueryClientProvider client={queryClient}>
                <ToastContainer
                    position='bottom-right'
                />
                <ConfigProvider
                    theme={{
                        algorithm: darkAlgorithm,
                    }}
                    input={{
                        autoComplete: 'off',
                        style: {
                            color: 'black',
                        },
                    }}
                >
                    <App {...props} />
                </ConfigProvider>
            </QueryClientProvider>
        );
    },
    progress: {
        //make gradient progress bar
        color: '#ff69b4',
    },

});