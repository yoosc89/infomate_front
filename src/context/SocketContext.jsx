import {createContext, useEffect, useState} from "react";
import Socket from "../components/common/Socket";
import {useDispatch, useSelector} from "react-redux";
import {GET_CHATROOM_LIST, GET_MESSAGE} from "../modules/ChatMoudule";
import {getChatRoomList} from "../apis/ChatAPICalls";
import {NotResultData} from "../pages/common/Error";

export const SocketContext = createContext({});

export const SocketProvider = ({children}) => {

    const chatRoomList = useSelector(state => state.chatReducer[GET_CHATROOM_LIST]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChatRoomList());
    }, []);

    if(!chatRoomList) return <NotResultData />

    const client = Socket({chatroomList: chatRoomList});

    return(
        <SocketContext.Provider value={client}>
            {children}
        </SocketContext.Provider>
    )
}