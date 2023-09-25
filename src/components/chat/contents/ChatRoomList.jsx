import styles from './chatRoomList.module.css';
import dayjs from "dayjs";
import {useContext, useEffect, useState} from "react";
import {LoadingSpiner} from "../../common/other/LoadingSpiner";
import {getChatRoomList} from "../../../apis/ChatAPICalls";
import {useDispatch, useSelector} from "react-redux";
import {GET_CHATROOM_LIST} from "../../../modules/ChatMoudule";
import {NotResultData} from "../../../pages/common/Error";
import {ChatContext} from "../ChatComponent";

const ChatRoomList = () =>{
    const chatList = useSelector(state => state.chatReducer[GET_CHATROOM_LIST]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChatRoomList());
    },[])

    if(!chatList) return <LoadingSpiner />
    if(chatList.length === 0 ) return <NotResultData />

    return (
        <div>
            {
                chatList.map(chat =>
                    <ChatRoomItem
                        index={chat.chatRoomCode}
                        chatRoomCode={chat.chatRoomCode}
                        chatRoomName={chat.chatRoomName}
                        recentMSG={chat.recentMSG}
                        createDate={chat.createDate}
                    />
                )
            }
        </div>
    )
}

const ChatRoomItem = ({chatRoomCode, chatRoomName,
                          recentMSG, createDate}) => {

    const {curSate , setCurState} = useContext(ChatContext);

    const recentDate = (createDate) => {
        const minuteDiff = dayjs().diff(createDate, 'minute')
        const date = dayjs(createDate).format("YY년 MM월 DD일");
        const view = (minuteDiff / 60) >= 1 ? Math.floor(minuteDiff / 60) + '시 전' : (minuteDiff % 60) + '분 전';
        const result = minuteDiff > 24 * 60 ? date : view
        return result;
    }

    const onClickHandler = () => {
        setCurState({mainMenu: 'chat', chatRoomCode: chatRoomCode, chatRoomName: chatRoomName});
    }


    return (
        <button className={styles.itemContainer} onClick={onClickHandler}>
            <div className={styles.itemSubject}>
                <div>
                    <span className={styles.itemSubjectText}>{chatRoomName}</span>
                </div>
                <div className={styles.date}>
                    <span>
                        {recentDate(createDate)}
                    </span>
                </div>
            </div>
            <div>
                <span>{recentMSG}</span>
            </div>
        </button>
    )
}

export default ChatRoomList;