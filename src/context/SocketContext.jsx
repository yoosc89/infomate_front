import {createContext, useState} from "react";
import Socket from "../components/common/Socket";

export const SocketContext = createContext({});

export const SocketProvider = ({children}) => {

    const client = Socket();

    return(
        <SocketContext.Provider value={client}>
            {children}
        </SocketContext.Provider>
    )
}