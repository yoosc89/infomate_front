import styles from './chatComponent.module.css';
import meterialIcon from '../common/meterialIcon.module.css';
import ChatRoomList from "./contents/ChatRoomList";
import {useState} from "react";
const ChatComponent = () => {

    const [toggle, setToggle] = useState('');

    const menuList = [
        // {menu: 'menu'},
        {menu: 'group'},
        {menu: 'forum', count: 1},
        {menu: 'chat', count: 10},
        {menu: 'settings'},
    ]

    const pageSwtich = (toggle) =>{
        switch (toggle) {
            case 'group': return <ChatRoomList />;
            case 'forum': return <ChatRoomList />;
            case 'caht': return <ChatRoomList />;
            case 'settings': return <ChatRoomList />;
            default: return <ChatRoomList />;
        }

    }

    return (
        <>
            <div className={styles.container}>
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
                            onClick={()=> setToggle('close_fullscreen')}
                        />
                    </div>
                </div>
                <div className={styles.contents}>
                    <ChatRoomList />
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