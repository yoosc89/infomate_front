import React from "react";
import mainCSS from '../../components/common/main.module.css';
import PostingCSS from './Posting.module.css';
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from "react-quill";

import{
    callPostPostAPI
} from '../../apis/BoardAPICalls'

function Posting() {

    // 디스패치.. 근데 밑에 두 개는 왜 있는지 모르겠음
    const dispatch = useDispatch();
    const params = useParams();
    const post = useSelector(state => state.postReducer);


    // form 데이터 ==========================
    const [form, setForm] = useState({
        postCode: 0,
        postTitle: '',
        postDate: '',
        postContents: '',
        boardCategory: 0, 
        boardCode: '',
        // memberName: ''
        memberCode: 0

    });

    /* form 데이터 세팅 */   
     const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    /* form 데이터 */
    const postPostHandler = () => {
        console.log('postPostHandler');

        const formData = new FormData();

        formData.append("postCode", form.postCode);
        formData.append("postTitle", form.postTitle);
        formData.append("postDate", form.postDate);
        formData.append("postContents", form.postContents);
        formData.append("boardCategory", form.boardCategory);
        formData.append("boardCode", form.boardCode);
        formData.append("memberCode", form.memberCode);
        // append : 필드와 값을 추가하는 메서드 (필드, 값);


        dispatch(callPostPostAPI({
            form: formData
        }));

        alert('게시판 목록으로 이동합니다.');
        navigate('/board/common', { replace:true});
        window.location.reload();

        
    }


    //=====================================



    //
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();
    const navigate = useNavigate();
    // 

    // 작성폼에 들어갈 폰트 옵션
    const toolbarOptions = [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link', "image", "video"]
      ]; 
 
      const quillRef = useRef(null);
    //   

    return (
        <>
    
        <div className={mainCSS.maintitle}>
        <h2>새 글 작성</h2>
        </div>
        
            <div>
                <select id="category" className={PostingCSS.category}>
                    <option value="" >게시판을 선택해주세요</option>
                    <option value="일반게시판" className={PostingCSS.drdown}>일반게시판</option>
                    <option value="익명게시판" className={PostingCSS.drdown}>익명게시판</option>
                    <option value="부서게시판" className={PostingCSS.drdown}>부서게시판</option>
                    <option value="보고사항" className={PostingCSS.drdown}>보고사항</option>
                </select>
            </div>


        {/* 작성 폼 */}

        <input 
        className={PostingCSS.title} 
        placeholder="제목을 입력해주세요."
        name='postTitle'>
            
        </input>
        <div className={PostingCSS.postmargin}>
            <ReactQuill
            name='postContents'
            placeholder="내용을 입력해주세요."
            ref={quillRef}
                    modules={{
                        toolbar: toolbarOptions
                        
                    }}
                    theme="snow"
                    />
            
        </div>
        {/*  */}

        {/*  */}

    <div className={PostingCSS.postside}>
        <button onClick={() => navigate(-1)}>
            <div className={PostingCSS.postpost}>
            작성취소
            </div>
        </button>
        <button onClick={postPostHandler}>
            <div className={PostingCSS.postpost}>
            작성완료
            </div>
        </button>
    </div>
        {/*  */}
        
        
        </>
    )
}

export default Posting;