import styles from './chatModal.module.css';
import meterialIcon from '../../components/common/meterialIcon.module.css';
import {useState} from "react";
import ChatComponent from "../../components/chat/ChatComponent";
const ChatModal = () => {

    const [view, setView] = useState(false);
    const [chat, setchat] = useState(false);

    const changeView = () => {
        setView(!view)
        setTimeout(()=>{
            setchat(!chat)
        },100)
    }

    return (
        <div className={styles.container}>
            {chat
            ? <ChatComponent view={view} onClick={changeView} />
            : <button
                className={[styles.toggle, !view ? styles.display : styles.noneDisplay].join(' ')}
                onClick={changeView}
            >
                <div className={meterialIcon.meterialIcon}>message</div>
            </button>
            }
        </div>
    )
}

export  default ChatModal;