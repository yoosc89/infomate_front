import styles from './chatSettings.module.css';
import meterialIcon from '../../common/meterialIcon.module.css';
import {useState} from "react";

const ChatSettings = () => {

    const localSetting = JSON.parse(localStorage.getItem("chatOption"))

    const setting = [
        {subject: '채팅', key: 'chat', options: [
            {text: '알림끄기', key: 'toast',chk: false},
            {text: '간단알림(내용표시X)', key: 'summary',chk: false},
            {text: '부서 채팅방 입력 잠금', key: 'lock',chk: false},
            ]
        },
        {subject: '그룹', key: 'groups', options: [
            {text: '내 부서만 표시', key: 'mydept', chk: false},
            {text: '부서편집', key: 'edit', chk: false},
            {text: '프로필사진표시', key: 'profile', chk: false},
            ]
        },
        {subject: '세팅', key: 'settings', options: [
            {text: '채팅창크기', key: 'size', chk: false},
            {text: '메뉴순서편집', key: 'menuOrder', chk: false},
            {text: '로그인시 채팅창 바로 띄우기', key: 'modal', chk: false},
            ]
        },
    ]


    const onChangeOptionHandler = (e) => {

    }

    return (
        <div>
            {
                setting.map(setting =>
                    <ChatSubject
                        text={setting.subject}
                        options={setting.options}
                    />
                )
            }
        </div>
    )
}

export default ChatSettings;

const ChatSubject = ({text, options}) => {

    const [optionView, setOptionView ] = useState(true);

    const optionViewChangeHandler = () => {
        setOptionView(!optionView)
    }

    return (
        <div>
            <button className={styles.subject} onClick={optionViewChangeHandler}>
                <div>
                    {text}
                </div>
                <div className={meterialIcon.meterialIcon}>
                    { optionView ? 'arrow_drop_down' : 'arrow_drop_up' }
                </div>
            </button>
            <div className={[optionView && styles.noneView].join(' ')}>
                {
                    options.map(option =>
                        <ChatItem
                            text={option.text}
                            chk={option.chk}
                        />
                    )
                }
            </div>
        </div>
    )
}

const ChatItem = ({text, chk, onChange}) => {
    return (
        <div className={styles.itemContainer}>
            <div>
                {text}
            </div>
            <div className={styles.chk}>
                <input className={styles.inputChk} type={"checkbox"} defaultChecked={chk} onChange={onChange} />
            </div>
        </div>
    )
}