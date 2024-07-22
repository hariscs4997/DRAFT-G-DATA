import React from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast() {
  return (
    <ToastContainer
      position="top-right"
      limit={1}
      autoClose={1500}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      transition={Bounce}
      theme="colored"
    />
  );
}

export default Toast;
