import { useState } from "react";
import { useEffect } from "react";
import StyleSheets from "./style/FullMessageComponent.module.css";
import { AsyncAPIService } from "../../../utils/apiService";
import HeaderComponent from "./headerComponent";
import CToastComponent from "../../../component/CToast/CToastComponent";
import HomeLoaderComponent from "../../../component/homeLoaderComponent/homeLoaderComponent";

const FullMessageComponent = (props) => {

    const [error, setError] = useState(false);
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("");
    const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

    const id = props.location.state.id;
    const title = props.location.state.title;

    const userFullMessage = () => {
        setPending(true);
        setError(false);
        AsyncAPIService(
            `/user/profile/my-messages/${id}`,
            "GET",
            {
                onSuccess(res) {
                    console.log(res.data);
                    setPending(false);
                    setError(false);
                    setMessage(res.data.data.message);

                }
                ,
                onFail(err) {
                    setPending(false);
                    setError(true);
                }
            },
            {
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است",
                },
                useAccessToken: true,
                useDeviceUid: true
            }
        )
    }

    const onDeleteClick = () => {
        setPending(true);
        setError(false);
        AsyncAPIService(
            `/user/profile/my-messages/${id}`,
            "DELETE",
            {
                onSuccess(res) {
                    console.log(res.data);
                    setPending(false);
                    setError(false);
                    setDeleteMessage(res.data.message.message);
                    setTimeout(() => {
                        setDeleteMessage('');
                    }, 2000);
                }
                ,
                onFail(err) {
                    setPending(false);
                    setError(true);
                    setDeleteErrorMessage(err.response.data.message.message);
                    setTimeout(() => {
                        setDeleteErrorMessage('');
                    }, 2000);
                }
            },
            {
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است",
                },
                useAccessToken: true,
                useDeviceUid: true
            }
        )
    }

    useEffect(() => {
        userFullMessage();
    }, [])


    return (
        <div>
            <HeaderComponent title={title} onDeleteClick={onDeleteClick} />
            {deleteMessage != "" ? <CToastComponent message={deleteMessage} type={1} /> : null}
            {deleteErrorMessage != "" ? <CToastComponent message={deleteErrorMessage} type={0} /> : null}
            {error ?
                <span className={StyleSheets.centerSpan} onClick={userFullMessage}>
                    تلاش مجدد
                    <img className={StyleSheets.moreChance} />
                </span>
                : null}
            {pending ? <HomeLoaderComponent /> : null}

            {message != "" ?
                <div>
                    <div className='row text-align-right' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', margin: '15px 25px' }}>

                        <div className="col-3">
                            <span className={StyleSheets.textleft}>
                                {message.date}
                            </span>
                            <span className={StyleSheets.textleft}>
                                {message.hour}
                            </span>
                        </div>

                        <div className="col-9">
                            <span className={StyleSheets.textright}>
                                {message.title}
                            </span>
                        </div>
                    </div>

                    <div className={StyleSheets.div} dangerouslySetInnerHTML={{ __html: message.description }} style={{ float: 'right', marginTop: '10px', fontFamily: 'IRANSansFN', textAlign: 'center', marginBottom: '80px' }}>
                    </div>

                </div>
                : null}
        </div>
    )

}

export default FullMessageComponent;