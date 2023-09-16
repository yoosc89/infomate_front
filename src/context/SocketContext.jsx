import {createContext, useState} from "react";

export const SocketContext = createContext({});

export const SocketProvider = ({children}) => {
    const [data, setData] = useState({});

    return(
        <SocketContext.Provider value={{data, setData}}>
            {children}
        </SocketContext.Provider>
    )
}