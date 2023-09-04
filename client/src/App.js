import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RouterProvider from 'components/routerProvider';

function App() {
  return (
    <>
      <RouterProvider />
      <ToastContainer />
    </>
  );
}

export default App;
