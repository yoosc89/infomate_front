import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import NavStyle from './Nav.module.css';
import {CurrentTitleContext} from "../../context/CurrentTitleContext";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {MenuContext} from "../../context/MenuContext";
import {callLogoutAPI} from '../../apis/MemberAPICalls';
import {useDispatch} from 'react-redux';


function Navbar() {
    const { toggleTitle } = useContext(CurrentTitleContext);
    const { menuState } = useContext(MenuContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const memberDataString = localStorage.getItem("authToken");
    const memberData = JSON.parse(memberDataString);
    console.log("멤버데이터 : ", memberData);

    const [userInfo, setUserInfo ]= useState({});
    const [imageUrl, setImageUrl] = useState('');


    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');

        const authTokenJSON = window.localStorage.getItem("authToken");
        if(authTokenJSON) {
            const authToken = JSON.parse(authTokenJSON);

            window.localStorage.removeItem("authToken");
        }
        //로그아웃
        dispatch(callLogoutAPI());
        
        alert('로그아웃이 되어 로그인 화면으로 이동합니다.');
        navigate("/", { replace: true })
    }

    const handleImgError = (e) => {
        e.target.src = '/img/user.jpg';
    }

    useEffect(() => {
        if (memberData.profile) {
            setImageUrl(memberData.profile);
        }
    }, [memberData]);

    useEffect(() => {
        const storedTitle = localStorage.getItem('currentTitle') || 'Home';
        toggleTitle(storedTitle);

    }, []);


    return (
        <nav className={`${NavStyle.nav} ${menuState ? '' : NavStyle.close }`}>
            <div className={`${NavStyle.profile} ${menuState ? '' : NavStyle.close }`}>
                <a href="/myInfo">
                    <img className={NavStyle.profileImg} alt='profileImg' src={imageUrl} onError={handleImgError}/>
                </a>
                <div className={NavStyle.profileInfo}>
                    <p>{memberData?.deptName} 부서</p>
                    <p>{memberData?.memberName} {memberData?.rank}</p>
                </div>
            </div>
            <ul className=''>
                <li className='' onClick={()=>toggleTitle("Home")}>
                    <NavLink to="/main" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            home
                        </span>
                        <span>홈</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Board")}>
                    <NavLink to="/board/newpost" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            developer_board
                        </span>
                        <span>게시판</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Schedule")}>
                    <NavLink to="/calendar" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            calendar_today
                        </span>
                        <span>일정</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Approval")}>
                    <NavLink to="/approval" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            approval
                        </span>
                        <span>전자결재</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Work")}>
                    <NavLink to="/work" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            watch
                        </span>
                        <span>근태관리</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Mail")}>
                    <NavLink to="/mail" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            mail
                        </span>
                        <span>메일</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Group")}>
                    <NavLink to="/group" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            group
                        </span>
                        <span>조직도</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Address")}>

                    <NavLink to="/addressBook" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            library_books
                        </span>
                        <span>주소록</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Alarm")}>
                    <NavLink to="" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            notifications
                        </span>
                        <span>알림</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Chat")}>
                    <NavLink to="/chat" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            mode_comment
                        </span>
                        <span>채팅</span>
                    </NavLink>
                </li>
            </ul>
            <div className={NavStyle.logout}>
                <Link to={'/'} onClick={onClickLogoutHandler}>
                    로그아웃
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
