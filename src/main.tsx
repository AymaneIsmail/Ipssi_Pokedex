import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from "./routes/Layout";
import '@/globals.css'
import { Index } from './routes/pokemon';
import { Show } from './routes/pokemon/show';
import {
  useQuery,
  QueryClient,
  MutationCache,
  onlineManager,
  useIsRestoring,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { toast } from 'sonner';

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1 * 60 * 1000,
      gcTime: 5 * 60 * 1000
    },
  },
})


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,

      },
      {
        path: "/:id",
        element: <Show />,
      },
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <RouterProvider router={router} />
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </PersistQueryClientProvider>
  </React.StrictMode>,
)
