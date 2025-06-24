import { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

const NotificationContext = createContext()

export const NotificationProvider = ({children}) => {
    return (
        <NotificationContext.Provider value={{toast}}>
            {children}
            <ToastContainer 
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </NotificationContext.Provider>
    )
}

export const useNotification = () =>{
    return useContext(NotificationContext)
}