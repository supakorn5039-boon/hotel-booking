import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastifyContainer = () => (
   <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="light"
      className="!p-0"
      toastClassName={() => 'relative flex p-0 min-h-0 rounded-md overflow-hidden bg-transparent shadow-md w-auto'}
      style={{ width: '600px', minWidth: '600px' }}
   />
);
