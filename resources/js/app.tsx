import './bootstrap';
import '@/Styles/global.scss';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ConfigProvider, theme } from 'antd';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
});


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
                    <ApolloProvider client={client}>
                        <App {...props} />
                    </ApolloProvider>
                </ConfigProvider>
            </QueryClientProvider>
        );
    },
    progress: {
        //make gradient progress bar
        color: '#ff69b4',
    },

});