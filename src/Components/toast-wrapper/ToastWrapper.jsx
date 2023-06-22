import { ToastContainer } from "react-toastify";

const ToastWrapper = ({ children }) => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  };

  return (
    <>
      <ToastContainer {...toastOptions} />
      {children}
    </>
  );
};
export default ToastWrapper;
