import styles from './chatComponent.module.css';
import meterialIcon from '../common/meterialIcon.module.css';
import ChatRoomList from "./contents/ChatRoomList";
import {createContext, useState} from "react";
import ChatGroup from "./contents/ChatGroup";
import ChatSettings from "./contents/ChatSettings";
import ChatRoom from "./ChatRoom";

export const ChatContext = createContext({});

const ChatComponent = ({view, onClick}) => {

    const [curState, setCurState] = useState({});


    const menuList = [
        // {menu: 'menu'},
        {menu: 'group'},
        {menu: 'list', count: 1},
        {menu: 'chat', count: 10},
        {menu: 'settings'},
    ]

    const pageSwtich = (toggle) =>{
        switch (toggle) {
            case 'group': return <ChatGroup />;
            case 'list': return <ChatRoomList />;
            case 'chat': return <ChatRoom />;
            case 'settings': return <ChatSettings />;
            default: return <ChatRoomList />;
        }
    }



    return (
        <>
            <div className={[styles.container, view? styles.isView : styles.noneView].join(' ')}>
                <ChatContext.Provider value={{curState, setCurState}}>
                    <div className={styles.menubar}>
                        <div className={styles.menuBtn}>
                            {
                                menuList.map((item, index) =>
                                    <ChatMenuItem
                                        index={index}
                                        text={item.menu}
                                        count={item?.count}
                                        onClick={()=> setCurState({...curState, mainMenu: item.menu})}
                                    />
                                )
                            }
                        </div>
                        <div className={styles.menuClose}>
                            <ChatMenuItem
                                text={'close_fullscreen'}
                                onClick={onClick}
                            />
                        </div>
                    </div>
                    <div className={styles.contents}>
                        {pageSwtich(curState.mainMenu)}
                    </div>
                </ChatContext.Provider>
            </div>
        </>
    )
}
export default ChatComponent;

export const ChatMenuItem = ({text, count, onClick}) => {
    return (
        <div className={styles.menuItem}>
            <button onClick={onClick}>
                {
                    count
                    && <div className={styles.notiCount}>
                            <div>
                                <span>1</span>
                            </div>
                        </div>
                }
                <span className={meterialIcon.meterialIcon}>{text}</span>
            </button>
        </div>
    )
}