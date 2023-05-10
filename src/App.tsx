import React from 'react';
import Sidebar from './components/Sidebar';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Contact from './components/pages/Contact';
import Charts from './components/pages/Charts';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <Contact />,
  },
  {
    path: "/charts",
    element: <Charts />,
  },
]);


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div >
    
      
         <RouterProvider router={router} />

      
    </div>
    </QueryClientProvider>  
  );
}

export default App;



