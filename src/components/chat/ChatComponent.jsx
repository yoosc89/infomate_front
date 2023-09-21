import styles from './chatComponent.module.css';
import meterialIcon from '../common/meterialIcon.module.css';
import ChatRoomList from "./contents/ChatRoomList";
import {useState} from "react";
import ChatGroup from "./contents/ChatGroup";
import ChatSettings from "./contents/ChatSettings";
const ChatComponent = ({view, onClick}) => {

    const [toggle, setToggle] = useState('');
    // const [isView,setIsView] = useState(true);

    const menuList = [
        // {menu: 'menu'},
        {menu: 'group'},
        {menu: 'forum', count: 1},
        {menu: 'chat', count: 10},
        {menu: 'settings'},
    ]

    const pageSwtich = (toggle) =>{
        switch (toggle) {
            case 'group': return <ChatGroup />;
            case 'forum': return <ChatRoomList />;
            case 'chat': return <ChatRoomList />;
            case 'settings': return <ChatSettings />;
            default: return <ChatRoomList />;
        }
    }

    return (
        <>
            <div className={[styles.container, view? styles.isView : styles.noneView].join(' ')}>
                <div className={styles.menubar}>
                    <div className={styles.menuBtn}>
                        {
                            menuList.map((item, index) =>
                                <ChatMenuItem
                                    index={index}
                                    text={item.menu}
                                    count={item?.count}
                                    onClick={()=> setToggle(item.menu)}
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
                    {pageSwtich(toggle)}
                </div>
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