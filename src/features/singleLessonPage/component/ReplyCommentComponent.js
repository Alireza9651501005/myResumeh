import StyleSheets from "./style/ReplyCommentComponent.module.css";
import StarComponent from "./StarComponent";
import { useState } from "react";
import { AsyncAPIService } from "../../../utils/apiService";
import CToastComponent from "../../../component/CToast/CToastComponent";

const ReplyCommentComponent = ({ reply, replyClick }) => {

    // console.log(reply);
    const [reaction, setReaction] = useState(reply.reaction);
    const [like, setLike] = useState(reply.likes);
    const [disLike, setDisLike] = useState(reply.dislikes);
    const [score, setScore] = useState(reply.score);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const likeReply = () => {
        if (reaction === "NONE") {
            setReaction("LIKE");
            setLike(like + 1);
            setScore(score + 2);

            AsyncAPIService(
                `/courses/chapters/lessons/comments/${reply.id}/reaction`,
                "POST",
                {
                    onSuccess(res) {
                        setMessage("نظر شما با موفقیت ثبت شد");
                        setError(false);
                        setTimeout(() => {
                            setMessage('');
                        }, 2000);
                    },
                    onFail(err) {
                        setMessage("در ثبت نظر شما مشکلی پیش آمده");
                        setError(true);
                        setTimeout(() => {
                            setMessage('');
                        }, 2000);
                        setReaction("NONE");
                        setLike(like - 1);
                        setScore(score - 2);
                    }
                },
                {
                    body: {
                        reaction: 'LIKE'
                    }
                },
                {
                    toast: {
                        fail: "مشکلی در ارتباط با سرور به وجود آمده است"
                    },
                    useAccessToken: true,
                    useDeviceUid: true
                }
            )
        }
    }

    const disLikeReply = () => {
        if (reaction === "NONE") {
            setReaction("DISLIKE");
            setDisLike(disLike + 1);
            setScore(score - 1);

            AsyncAPIService(
                `/courses/chapters/lessons/comments/${reply.id}/reaction`,
                "POST",
                {
                    onSuccess(res) {
                        setMessage("نظر شما با موفقیت ثبت شد");
                        setError(false);
                        setTimeout(() => {
                            setMessage('');
                        }, 2000);
                    },
                    onFail(err) {
                        setMessage("در ثبت نظر شما مشکلی پیش آمده");
                        setError(true);
                        setTimeout(() => {
                            setMessage('');
                        }, 2000);
                        setReaction("NONE");
                        setDisLike(disLike - 1);
                        setScore(score + 1);
                    }
                },
                {
                    body: {
                        reaction: 'DISLIKE'
                    }
                },
                {
                    toast: {
                        fail: "مشکلی در ارتباط با سرور به وجود آمده است"
                    },
                    useAccessToken: true,
                    useDeviceUid: true
                }
            )
        }
    }


    return (
        <div >
            {message ?
                error ?
                    <CToastComponent message={message} type={0} /> :
                    <CToastComponent message={message} type={1} /> :
                null}
            <div className='row mr-5 mt-3'>
                <div className='col-9 text-right'>

                    <div className="row pr-2 pl-2" style={{ direction: 'rtl' }}>
                        <span className={StyleSheets.spanreplybold}>{reply.user.username} </span>
                        <span className={StyleSheets.spanreply}>  {reply.content}  </span>
                    </div>

                </div>

                <div className='col-3 flex-column d-flex align-items-center'>
                    <img className={`rounded-circle`} src={reply.user.image} width="20px" height="20px" />
                    <StarComponent stars={reply.user.stars} />
                </div>

            </div>

            <div className="row mt-3 ">

                <div className='col-10 text-right'>
                    <div className='row'>
                        <div className='col-3  d-flex align-items-center justify-content-center'>
                            <img className={StyleSheets.reply} onClick={() => replyClick(reply.id,reply.user.username,"reply")}/>
                        </div>
                        <div className='col-3 d-flex align-items-center justify-content-center'>
                            <span className={StyleSheets.spanDown}>{disLike}</span>
                            <img onClick={disLikeReply} className={reaction === "DISLIKE" ? StyleSheets.disagreed : StyleSheets.disagree} />
                        </div>
                        <div className='col-3 d-flex align-items-center justify-content-center'>
                            <span className={StyleSheets.spanDown}>{score}</span>
                            <img className={StyleSheets.comment_score} />
                        </div>
                        <div className='col-3 d-flex align-items-center justify-content-center'>
                            <span className={StyleSheets.spanDown}>{like}</span>
                            <img onClick={likeReply} className={reaction === "LIKE" ? StyleSheets.agreed : StyleSheets.agree} />
                        </div>
                    </div>
                </div>
                <div className='col-2'></div>
            </div>
        </div>
    )

}

export default ReplyCommentComponent;