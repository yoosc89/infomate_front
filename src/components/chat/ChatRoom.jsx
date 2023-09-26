import styles from './chatRoom.module.css';
import {useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_MESSAGE} from "../../modules/ChatMoudule";
import {LoadingSpiner} from "../common/other/LoadingSpiner";
import {getChatRoomDetail} from "../../apis/ChatAPICalls";
import meterialIcon from '../../components/common/meterialIcon.module.css';
import dayjs from "dayjs";
import {ChatContext} from "./ChatComponent";
import {NotResultData} from "../../pages/common/Error";
import {SocketContext} from "../../context/SocketContext";


const ChatRoom = () => {

    const {curState, setCurState} = useContext(ChatContext);
    console.log(curState)

    return (
        <div className={styles.chatRoomContainer}>
            <div>
                <Header chatRoomName={curState?.chatRoomName} />
            </div>
            <div>
                <Body chatRoomCode={curState?.chatRoomCode} />
            </div>
            <div>
                <Input />
            </div>
        </div>
    )
}

export default ChatRoom;

const Header = ({chatRoomName}) => {

    const {curState, setCurState} = useContext(ChatContext);

    const onClickHandler = () => {
        setCurState({mainMenu: 'list'});
    }

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerText}>
                {chatRoomName}
            </div>
            <div className={styles.sticky}>
                <button
                    className={[meterialIcon.meterialIcon, styles.stickyBtn].join(' ')}
                    onClick={onClickHandler}
                >
                    arrow_back_ios
                </button>
            </div>
        </div>
    )
}

const Body = ({chatRoomCode}) => {

    const client = useContext(SocketContext);
    const dispatch = useDispatch();

    const memberCode = JSON.parse(localStorage.getItem("authToken")).memberCode;

    const data = useSelector(state => state.chatReducer[GET_MESSAGE]);

    const endRef = useRef(null);

    useEffect(() => {
        if(!(data?.length > 0))
            dispatch(getChatRoomDetail({chatRoomCode: chatRoomCode}))
                .then(()=>{
                    endRef.current.scrollIntoView({ behavior: 'smooth'});
                });
        return () =>
            dispatch(dispatch => {
                dispatch({type: GET_MESSAGE, payload: []});
            })

    }, []);

    useEffect(()=>{
        if(data?.length > 0)
            endRef.current.scrollIntoView({ behavior: 'smooth'});
    },[data])

    if(!data) return <NotResultData />

    if(data.length === 0) return <NotResultData />

    return (
        <div className={styles.bodyContainer}>
            {data.map(message => (
                <Message
                    message={message.message}
                    sender={message.sender}
                    createDate={dayjs(message.createDate).format('HH:mm:ss')}
                    isMe={message.sender === memberCode}
                />
            ))}
            <div ref={endRef}></div>
        </div>
    )
}

const Message = ({sender, message, createDate, isMe}) => {
    return (
        <div className={[styles.messageGrid, styles.messageContainerCol2].join(' ')}>
            <div>
                {isMe || <img className={styles.memberProfile} src="/img/user.jpg" onError={(e)=> e.src='/img/user.jpg'}/>}
            </div>
            <div className={[isMe ? styles.messageRight : styles.messageLeft].join(' ')}>
                <div>
                    <pre className={styles.message}>
                        {message}
                    </pre>
                    <div className={styles.messageDate}>
                        {createDate}
                    </div>
                </div>

            </div>
        </div>

    )
}

const Input = () => {
    const textArea = useRef();

    const {curState, setCurState} = useContext(ChatContext);
    const [message, setMessage] = useState({});
    const memberCode = JSON.parse(localStorage.getItem("authToken")).memberCode;

    const client = useContext(SocketContext);
    useEffect(() => {
        setMessage({...message, sender: memberCode})
    }, []);

    const onChange = e => {
        setMessage({...message, [e.target.name]: e.target.value});
        textArea.current.style.height = '30px';
        textArea.current.style.height = textArea.current.scrollHeight + 'px';
    }

    const onSubmit = () => {
        sendMessage({receiver: curState.chatRoomCode, message: message})
    }

    const sendMessage = ({receiver, message}) => {
        message['chatRoomNo'] = receiver;
        message['createDate'] = dayjs().format('YYYY-MM-DDTHH:mm:ss');

        client.current.publish({
            destination: `/pub/chat/${receiver}`,
            body: JSON.stringify(message)
        });

        setMessage({...message, message: ''});

    }

    return (
        <div className={styles.inputContainer}>
            <textarea
                ref={textArea}
                className={styles.input}
                name={'message'}
                rows={1}
                value={message.message}
                onChange={onChange} />
            <button className={styles.submitBtn} onClick={onSubmit}>
                <span className={meterialIcon.meterialIcon} style={{letterSpacing: 0}}>arrow_upward</span>
            </button>
        </div>
    )
}