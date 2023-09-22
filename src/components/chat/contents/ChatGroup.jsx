import {useDispatch, useSelector} from "react-redux";
import {GET_PART_LIST} from "../../../modules/ScheduleMoudule";
import {createContext, useContext, useEffect, useState} from "react";
import {getParticipantList} from "../../../apis/DepartmentAPI";
import {LoadingSpiner} from "../../common/other/LoadingSpiner";
import meterialIcon from '../../common/meterialIcon.module.css';
import styles from './chatGroup.module.css'
import {registChatRooms} from "../../../apis/ChatAPICalls";

const GroupMenuContext = createContext({});

const ChatGroup = () => {

    const getMembers = useSelector(state => state.scheduleReducer[GET_PART_LIST])
    const dispatch = useDispatch();
    const [groupToggle ,setGroupToggle] = useState({});

    useEffect(()=>{
        dispatch(getParticipantList());
    },[])

    if(!getMembers) return <LoadingSpiner />
    console.log(getMembers.data)

    return (
        <div>
            <GroupMenuContext.Provider value={{groupToggle, setGroupToggle}}>
                {
                    getMembers.data.map(dept =>
                        <Groups
                            index={dept.deptCode}
                            deptCode={dept.deptCode}
                            deptName={dept.deptName}
                            members={dept.members}
                        />
                    )
                }
            </GroupMenuContext.Provider>
        </div>
    )
}

export default ChatGroup;

const Groups = ({deptCode, deptName, members}) => {

    const [memberView, setMemberView] = useState(true);
    const memberViewChangeHandler = () => {
        setMemberView(!memberView);
    }

    return (
        <div>
            <button className={styles.groupSubject} onClick={memberViewChangeHandler}>
                <div>
                    {deptName}
                </div>
                <div>
                    <span className={meterialIcon.meterialIcon}>
                        { memberView ? 'arrow_drop_down' : 'arrow_drop_up' }
                    </span>
                </div>
            </button>
            <div className={[styles.groupMember, memberView && styles.memberNoneView].join(' ')}>
                {members.map(member =>
                    <Member
                        index={member.memberCode}
                        memberCode={member.memberCode}
                        memberName={member.memberName}
                    />
                )}
            </div>
        </div>
    )
}

const Member = ({memberName, memberCode}) => {

    const {groupToggle ,setGroupToggle} = useContext(GroupMenuContext)
    const toggleChangeHandler = () => {
        setGroupToggle({memberCode: memberCode, toggle: true })
    }

    return (
        <div className={styles.member}>
            <button className={styles.memberContainer} onClick={toggleChangeHandler}>
                <div>
                    <img className={styles.memberProfile} src="/img/user.jpg" onError={(e)=> e.src='/img/user.jpg'}/>
                </div>
                <div>
                    {memberName}
                </div>
            </button>
            {
                groupToggle.memberCode === memberCode
                && groupToggle.toggle
                && <ChatGroupMenu memberCode={memberCode} />
            }
        </div>
    )
}

const ChatGroupMenu = ({memberCode}) => {

    const dispatch = useDispatch();

    const {groupToggle ,setGroupToggle} = useContext(GroupMenuContext)

    const menuClose = () => {
        setGroupToggle({});
    }

    const newChatRoom = () => {
        dispatch(registChatRooms({memberCode: memberCode}))
        menuClose();
    }

    const profileView = () => {
        menuClose();
    }
    return (
        <div className={styles.groupMenuContainer}>
            <button className={styles.menu} onClick={newChatRoom}>새 채팅방 생성</button>
            <button className={styles.menu} onClick={profileView}>프로필 보기</button>
            <button className={styles.menu} onClick={menuClose}>닫기</button>
        </div>

    )
}