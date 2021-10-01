import StyleSheets from "./style/CommentComponent.module.css";
import StarComponent from "./StarComponent";
import ReplyCommentComponent from "./ReplyCommentComponent";
import { useEffect, useState } from "react";
import { AsyncAPIService } from "../../../utils/apiService";
import CToastComponent from "../../../component/CToast/CToastComponent";
import { useReducer } from "react";

const replyReducer = (reply, action) => {
    switch (action.type) {
        case 'ADD':
            return [...reply, action.reply];
        default:
            return;
    }
}

const CommentComponent = ({ comment, replyClick, commentGray, commentId }) => {

    // console.log("comment", comment);

    const [reply, replyDispatch] = useReducer(replyReducer, comment.children);
    const [reaction, setReaction] = useState(comment.reaction);
    const [like, setLike] = useState(comment.likes);
    const [disLike, setDisLike] = useState(comment.dislikes);
    const [score, setScore] = useState(comment.score);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);


    const likeComment = () => {
        if (reaction === "NONE") {
            setReaction("LIKE");
            setLike(like + 1);
            setScore(score + 2);

            AsyncAPIService(
                `/courses/chapters/lessons/comments/${comment.id}/reaction`,
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

    const disLikeComment = () => {
        if (reaction === "NONE") {
            setReaction("DISLIKE");
            setDisLike(disLike + 1);
            setScore(score - 1);

            AsyncAPIService(
                `/courses/chapters/lessons/comments/${comment.id}/reaction`,
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
        <>
            {message ?
                error ?
                    <CToastComponent message={message} type={0} /> :
                    <CToastComponent message={message} type={1} /> :
                null}
            {
                comment ?
                    <div className={(commentId === comment.id && commentGray) ? StyleSheets.containerGray : StyleSheets.containerWhite} >

                        <div className='row'>
                            <div className='col-9 text-right'>

                                <div className="row  pl-2" style={{ direction: 'rtl' }}>
                                    <span className={StyleSheets.spanreplybold}>{comment.user.username} </span>
                                    <span className={StyleSheets.spanreply}>  {comment.content}  </span>
                                </div>
                            </div>

                            <div className='col-3 flex-column d-flex align-items-center'>
                                <img className={`rounded-circle`} src={comment.user.image} width="30px" height="30px" />
                                <StarComponent stars={comment.user.stars} />
                            </div>

                        </div>

                        <div className="row ">

                            <div className='col-10 text-right'>
                                <div className='row'>
                                    <div className='col-3  d-flex align-items-center justify-content-center'>
                                        <img className={StyleSheets.reply} onClick={() => replyClick(comment.id, comment.user.username, "comment")} />
                                    </div>
                                    <div className='col-3 d-flex align-items-center justify-content-center'>
                                        <span className={StyleSheets.spanDown}>{disLike}</span>
                                        <img onClick={disLikeComment} className={reaction === "DISLIKE" ? StyleSheets.disagreed : StyleSheets.disagree} />
                                    </div>
                                    <div className='col-3 d-flex align-items-center justify-content-center'>
                                        <span className={StyleSheets.spanDown}>{score}</span>
                                        <img className={StyleSheets.comment_score} />
                                    </div>
                                    <div className='col-3 d-flex align-items-center justify-content-center'>
                                        <span className={StyleSheets.spanDown}>{like}</span>
                                        <img onClick={likeComment} className={reaction === "LIKE" ? StyleSheets.agreed : StyleSheets.agree} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-2'></div>
                        </div>

                        {
                            comment.children.length > 0 ?
                                <div>
                                    {comment.children.map((el, index) => {
                                        return (
                                            <ReplyCommentComponent reply={el} replyClick={replyClick} />
                                        )
                                    })}
                                </div>
                                : null
                        }
                    </div >
                    : null}
        </>
    )

}

export default CommentComponent;