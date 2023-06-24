import { ToastContainer } from "react-toastify";

const ToastWrapper = ({ children }) => {
  const toastOptions = {
    position: "bottom-left",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    limit: 6,
  };

  return (
    <>
      <ToastContainer {...toastOptions} />
      {children}
    </>
  );
};
export default ToastWrapper;
