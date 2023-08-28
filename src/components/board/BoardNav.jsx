import React, {useContext, useState} from 'react';
import NavStyle from "../common/Nav.module.css";
import {MenuContext} from "../../context/MenuContext";
import Navlist from "../common/Navlist";
import {useModal} from "../../context/ModalContext";
function BoardNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);
    const {modalOpen , toggleModal } = useModal();

    return (
        <div className={`${NavStyle.sidemenu} ${menuState ? '': NavStyle.close}`}>
            <div className={NavStyle.sideTop}>
                <h2 className={NavStyle.title}>게시판</h2>
                <button className={NavStyle.new}>글쓰기</button>
            </div>
            <div className={NavStyle.sideList}>
              <Navlist title="공지 게시판" data={noticeLink}/><br/>
              <Navlist title="커뮤니티 게시판" data={boardLink}/><br/>
              <Navlist title="부서 게시판" data={deptLink}/><br/>
            </div>
        </div>
    );
}

export default BoardNav;

const noticeLink = [
  {text:'공지사항', link:'/board/notice'},
  {text:'월간 식단표', link:'/board/menu'},
]
const boardLink = [
  {text:'최근 게시글', link:'/board/newpost'},
  {text:'일반 게시판', link:'/board/common'},
  {text:'익명 게시판', link:'/board/anony'},
]
const deptLink = [
  {text:'부서 게시판', link:'/board/brddept'},
  {text:'보고사항', link:'/board/report'},
]