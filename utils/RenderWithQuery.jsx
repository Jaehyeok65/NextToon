import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const RenderWithQuery = ({ children }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // ✅ turns retries off
                retry: false,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
