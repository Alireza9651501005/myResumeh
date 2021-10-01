import HeaderComponent from "../../component/headerComponent";
import { AsyncAPIService, CONFIG } from "../../utils/apiService";
import { useEffect, useState } from "react";
import HomeLoaderComponent from "../../component/homeLoaderComponent/homeLoaderComponent";
import StyleSheets from "./style/singleLessonPage.module.css";
import { colors } from "../../common/constans/theme";
import CommentComponent from "./component/CommentComponent";
import BottomCommentComponent from "./component/BottomCommentComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import CToastComponent from "../../component/CToast/CToastComponent";
import NoCommentComponent from "./component/NoCommentComponent";

const commentReducer = (comments, action) => {
    switch (action.type) {
        case 'ADD':
            return [...comments, action.comments];
        case 'REPLACE':
            return { comments: action.comments };
        default:
            return;
    }
}

const SingleLessonPage = (props) => {

    const [comments, commentsDispatch] = useReducer(commentReducer, []);

    const state = useSelector(state => state);

    var id;

    if (props.location != undefined) {
        id = props.location.state.id;
    } else {
        id = props.id;
    }


    const [load, setLoad] = useState(true);
    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");

    const [data, setData] = useState("");

    const [likes, setLikes] = useState(0);

    const [interactiveButtonTitle, setInteractiveButtonTitle] = useState("");
    const [interactiveScore, setInteractiveScore] = useState(0);
    const [interactiveUserScore, setInteractiveUserScore] = useState(0);
    const [interactiveSubscribe, setInteractiveSubscribe] = useState(0);

    const [videoButtonTitle, setVideoButtonTitle] = useState("");
    const [videoScore, setVideoScore] = useState(0);
    const [videoUserScore, setVideoUserScore] = useState(0);
    const [videoSubscribe, setVideoSubscribe] = useState(0);

    const [current_page, setCurrent_page] = useState(1);
    const [last_page, setLast_page] = useState(0);

    const [userLikeLesson, setUserLikeLesson] = useState(false);

    const [commentId, setCommentId] = useState(0);
    const [username, setUserName] = useState("");

    const [message, setMessage] = useState("");
    const [errorMsg, setErrorMsg] = useState(false);

    const [type, setType] = useState("");

    const [showAddComment, setShowAddComment] = useState(false);

    const [showNoComment, setShowNoComment] = useState(false);

    const [commentGray, setCommentGray] = useState(false);
    const [commentGrayId, setCommentGrayId] = useState(false);

    const loadMore = () => {
        if (last_page >= current_page) {
            if (current_page != last_page) {
                let newcurrent_page = current_page;
                let newPage = newcurrent_page + 1;
                setCurrent_page(current_page + 1);
                fetchComment(newPage);
            }
        }
    }

    const fetchInformation = () => {
        AsyncAPIService(
            `/courses/chapters/lessons/${id}`,
            "GET",
            {
                onSuccess(res) {
                    const data = res.data.data;
                    setData(data);

                    setLoad(false);
                    console.log(data);
                    setTitle(data.course.title);
                    setLikes(data.likes);

                    setInteractiveButtonTitle(data.interactive.button_title);
                    setVideoButtonTitle(data.video.button_title);

                    setInteractiveScore(data.interactive.score);
                    setVideoScore(data.video.score);

                    setInteractiveUserScore(data.interactive.user_score);
                    setVideoUserScore(data.video.user_score);

                    setInteractiveSubscribe(data.interactive.subscribers);
                    setVideoSubscribe(data.video.subscribers);

                    setUserLikeLesson(data.user_liked_lesson);

                    fetchComment(current_page);
                },
                onFail(err) {
                    console.log(err);
                    setLoad(false);
                    setError(true);
                }
            },
            {
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

    const fetchComment = (page) => {
        AsyncAPIService(
            `/courses/chapters/lessons/${id}/comments?page=${page}&limit=6`,
            "GET",
            {
                onSuccess(res) {
                    setLoad(false);
                    setError(false);
                    const data = res.data.data;
                    if (data.comments.length === 0) {
                        //setShowAddComment(false);
                        setShowNoComment(true);
                    } else {
                        //setShowAddComment(true);
                        setShowNoComment(false);
                    }
                    console.log(data);
                    for (let i = data.comments.length - 1; i >= 0; i--) {
                        commentsDispatch({ type: 'ADD', comments: data.comments[i] });
                    }
                    setLast_page(data.last_page);
                },
                onFail(err) {
                    console.log(err);
                    setShowNoComment(false);
                    setLoad(false);
                    setError(true);
                }
            },
            {
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

    const likeDisLikeLesson = () => {
        if (!userLikeLesson) {
            AsyncAPIService(
                `/courses/chapters/lessons/${id}/like`,
                "POST",
                {
                    onSuccess(res) {
                        setUserLikeLesson(true);
                        setLikes(likes + 1);
                    },
                    onFail(err) {

                    }
                },
                {
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
        else {
            AsyncAPIService(
                `/courses/chapters/lessons/${id}/like`,
                "DELETE",
                {
                    onSuccess(res) {
                        setUserLikeLesson(false);
                        setLikes(likes - 1);
                    },
                    onFail(err) {

                    }
                },
                {
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

    const addCommentApi = (cmt) => {
        AsyncAPIService(
            `/courses/chapters/lessons/${id}/comment`,
            "POST",
            {
                onSuccess(res) {
                    console.log(res.data);
                    if (type === "reply") {
                        var childId;
                        var commentId;

                        for (let index = 0; index < comments.length; index++) {
                            const element = comments[index];

                            for (let j = 0; j < element.children.length; j++) {
                                const elementChild = element.children[j];

                                if (elementChild.id === res.data.data.comment.parent_id) {
                                    childId = j;
                                    commentId = index;
                                    break;
                                }
                            }
                        }
                        comments[commentId].children.push(res.data.data.comment);
                    }
                    else {
                        var commentId;
                        for (let index = 0; index < comments.length; index++) {
                            const element = comments[index];

                            if (element.id === res.data.data.comment.parent_id) {
                                commentId = index;
                                break;
                            }

                        }
                        comments[commentId].children.push(res.data.data.comment);
                    }
                    setMessage("ثبت نظر با موفقیت انجام شد");
                    setErrorMsg(false);
                    setTimeout(() => {
                        setMessage('');
                    }, 2000);
                },
                onFail(err) {
                    setMessage("ثبت نظر با خطا مواجه شد");
                    setErrorMsg(true);
                    setTimeout(() => {
                        setMessage('');
                    }, 2000);
                }
            },
            {
                body: {
                    content: cmt,
                    parent_id: commentId
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

    const addLessonCommentApi = (cmt) => {
        AsyncAPIService(
            `/courses/chapters/lessons/${id}/comment`,
            "POST",
            {
                onSuccess(res) {
                    console.log(res.data);
                    const comment = {
                        children: [],
                        content: res.data.data.comment.content,
                        createdAt: res.data.data.comment.createdAt,
                        dislikes: res.data.data.comment.dislikes,
                        id: res.data.data.comment.id,
                        lessonId: res.data.data.comment.lessonId,
                        likes: res.data.data.comment.likes,
                        parent_id: res.data.data.comment.parent_id,
                        reaction: res.data.data.comment.reaction,
                        score: res.data.data.comment.score,
                        status: res.data.data.comment.status,
                        updatedAt: res.data.data.comment.updatedAt,
                        user: res.data.data.comment.user,
                        userId: res.data.data.comment.userId,
                    }
                    comments.unshift(comment);
                    // commentsDispatch({ type: 'ADD', comments: comment });
                    setMessage("ثبت نظر با موفقیت انجام شد");
                    setErrorMsg(false);
                    setTimeout(() => {
                        setMessage('');
                    }, 2000);
                },
                onFail(err) {
                    setMessage("ثبت نظر با خطا مواجه شد");
                    setErrorMsg(true);
                    setTimeout(() => {
                        setMessage('');
                    }, 2000);
                }
            },
            {
                body: {
                    content: cmt
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

    const replyClick = (commentId, username, type) => {
        setCommentId(commentId);
        setUserName(username);
        setType(type);
        setShowAddComment(true);
    }

    const commentColorGray = () => {
        if (type === "reply") {
            var childId;
            var commentIdParent;

            for (let index = 0; index < comments.length; index++) {
                const element = comments[index];

                for (let j = 0; j < element.children.length; j++) {
                    const elementChild = element.children[j];

                    if (elementChild.id === commentId) {
                        childId = j;
                        commentIdParent = elementChild.parent_id;
                        break;
                    }
                }
            }
            setCommentGrayId(commentIdParent);
        }
        else {
            setCommentGrayId(commentId);
        }

        setCommentGray(true);
        setTimeout(() => {
            setCommentGray(false);
        }, 500);
    }

    const addComment = (comment) => {

        if (commentId !== 0 && username != "") {
            if (comment != '') {
                commentColorGray();
                addCommentApi("@" + username + comment);
            }
            else {
                setMessage("لطفا نظر خود را وارد کنید");
                setErrorMsg(true);
                setTimeout(() => {
                    setMessage('');
                }, 2000);
            }
        }
        else {
            if (comment != '') {
                commentColorGray();
                addLessonCommentApi(username + comment);
            }
            else {
                setMessage("لطفا نظر خود را وارد کنید");
                setErrorMsg(true);
                setTimeout(() => {
                    setMessage('');
                }, 2000);
            }
        }
        setCommentId(0);
        setUserName("");
    }

    const noCommentClick = () => {
        setShowAddComment(true);
    }

    const commentClick = () => {
        setShowAddComment(true);
    }

    useEffect(() => {
        fetchInformation();
    }, []);

    return (
        <div style={{ overflow: 'auto', minHeight: '100vh' }}>

            {message ?
                errorMsg ?
                    <CToastComponent message={message} type={0} /> :
                    <CToastComponent message={message} type={1} /> :
                null}
            <div>
                <HeaderComponent title={title} />

                {error ? <span className={StyleSheets.centerSpan} onClick={fetchInformation}>
                    تلاش مجدد
                    <img className={StyleSheets.moreChance} />
                </span>
                    : null}

                {load ? <HomeLoaderComponent /> : null}

                {data ?
                    <div>
                        <div className="row mr-2 ml-2 mt-3 justify-content-center" style={{ height: '17vh' }}>

                            {/* left */}
                            <div className="col-5 mr-3 p-2" style={{ backgroundColor: colors.blue1, borderRadius: '20px' }}>
                                <div className='row d-flex justify-content-center align-items-center'>
                                    <img className={`${StyleSheets.interactive}`} />
                                </div>
                                <div className={`row mt-2 d-flex justify-content-center align-items-center ${StyleSheets.spanwhite}`}>
                                    <span>{interactiveButtonTitle}</span>
                                </div>
                                <div className={`row mt-2 ${StyleSheets.spanwhitenum}`}>
                                    <div className={`col-6  d-flex justify-content-center`}>
                                        <span className="mr-1">{interactiveSubscribe}</span>
                                        <img className={StyleSheets.view} />
                                    </div>
                                    <div className={`col-6`}>
                                        <span className="mr-1">{interactiveUserScore}/{interactiveScore}</span>
                                        <img className={StyleSheets.rate} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-5 ml-3 p-2" style={{ backgroundColor: colors.blue1, borderRadius: '20px' }}>
                                <div className='row mt-1 d-flex justify-content-center align-items-center'>
                                    <img className={`${StyleSheets.videoedu}`} />
                                </div>
                                <div className={`row mt-1 d-flex justify-content-center align-items-center ${StyleSheets.spanwhite}`}>
                                    <span>{videoButtonTitle}</span>
                                </div>
                                <div className={`row mt-2 ${StyleSheets.spanwhitenum}`}>
                                    <div className={`col-6  d-flex justify-content-center`}>
                                        <span className="mr-1">{videoSubscribe}</span>
                                        <img className={StyleSheets.view} />
                                    </div>
                                    <div className={`col-6`}>
                                        <span className="mr-1">{videoUserScore}/{videoScore}</span>
                                        <img className={StyleSheets.rate} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row  mr-2 ml-2 mt-5">
                            <div className="col-4">
                                <img onClick={likeDisLikeLesson} className={userLikeLesson ? StyleSheets.liked : StyleSheets.like} />
                                <span className={`mr-2 ml-1 ${StyleSheets.spanNum}`}>{likes}</span>
                                <img className={StyleSheets.comment} onClick={commentClick} />
                            </div>
                            <div className="col-8 text-right" style={{ direction: 'rtl' }}>
                                <span className={StyleSheets.span}>{title}</span>
                            </div>
                        </div>
                    </div>

                    : null}

            </div>

            <div style={{ height: 'auto', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
                <InfiniteScroll
                    dataLength={comments.length}
                    next={loadMore}
                    hasMore={true}
                    loader={<h4></h4>}
                    scrollableTarget="scrollableDiv"
                >
                    {comments.length > 0 ?
                        <div id="scrollableDiv" style={{ margin: '15px 15px 65px 15px' }}>
                            {comments.map((el, index) => {
                                return (
                                    <CommentComponent comment={el} replyClick={replyClick} commentGray={commentGray} commentId={commentGrayId} />
                                )
                            })}
                        </div>
                        : showNoComment ? <NoCommentComponent noCommentClick={noCommentClick} /> : null}
                </InfiniteScroll>
            </div>

            <div className="fixed-bottom">
                {showAddComment ? <BottomCommentComponent addComment={addComment} /> : null}

            </div>

        </div>
    );

}

export default SingleLessonPage;