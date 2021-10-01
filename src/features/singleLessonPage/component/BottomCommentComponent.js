import StyleSheets from "./style/BottomCommentComponent.module.css";
import { colors } from "../../../common/constans/theme";
import { useState } from "react";
import { useSelector } from "react-redux";

const BottomCommentComponent = ({ addComment }) => {

    const state = useSelector(state => state);

    const [comment, setComment] = useState('');

    const onChangeInput = (event) => {
        console.log(event.target.value);
        setComment(event.target.value);
    }

    const btnClick = () => {
        addComment(comment);
        setComment("");
    }


    return (
        <div style={{ direction: 'rtl', height: "50px", backgroundColor: '#232a47', fontFamily: 'IRANSansFN', color: 'white', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
            <div className="row">
                <div className="col-2  pt-2 d-flex align-items-center" >
                    <img className={`rounded-circle mr-4`} src={state.LogInReducer.userdata.image} width="30px" height="30px" />
                </div>
                <div className="col-8  pt-3 d-flex justify-content-start align-items-start">
                    <input placeholder="ثبت نظر ..." type="text" value={comment} onChange={onChangeInput} style={{ backgroundColor: '#232a47' }} className={StyleSheets.input} />
                </div>
                <div className="col-2  pt-3 d-flex justify-content-start align-items-center">
                    <span onClick={btnClick} style={{ color: colors.blue1 }} className={StyleSheets.spanblue}>ثبت</span>
                </div>
            </div>
        </div>

    )
}

export default BottomCommentComponent;