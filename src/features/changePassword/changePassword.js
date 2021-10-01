import { createRef, useState } from "react";
import { useHistory } from "react-router";
import StyleSheets from "./style/changePassword.module.css";
import { AsyncAPIService, CONFIG } from "../../utils/apiService";
import { store } from "../../store/store";
import * as ActionType from "../../redux/login/action/LogInAction";
import HeaderComponent from "../../component/headerComponent";
import Button from "../../component/button";
import Input from "../../component/input";
import CToastComponent from "../../component/CToast/CToastComponent";


const ChangePasswordComponent = (props) => {

    const [pending, setPending] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [verifyNewPassword, setVerifyNewPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("error");

    const history = useHistory();

    const changePassword = () => {
        setPending(true);
        AsyncAPIService(
            "/user/profile/change-password",
            "POST",
            {
                onSuccess(res) {
                    setPending(false);
                    if (res.data.message.type === "success") {
                        store.dispatch({ type: ActionType.USER_LOG_OUT });
                        history.push("/home", { message: res.data.message.message })
                    }
                    else if (res.data.message.type === "error") {
                        setType(res.data.message.type);
                        setMessage(res.data.message.message);
                        setTimeout(() => {
                            setErrorMessage('');
                        }, 2000);
                    }

                },
                onFail(err) {
                    setPending(false);
                    if (err.response != undefined) {
                        setErrorMessage(err.response.data.message.message);
                        setTimeout(() => {
                            setErrorMessage('');
                        }, 2000);
                    }
                    else {
                        setErrorMessage('مشکلی در ارتباط با سرور به وجود آمده است');
                        setTimeout(() => {
                            setErrorMessage('');
                        }, 2000);
                    }
                }
            },
            {
                // headers: {
                //     Authorization: 'Bearer ' + access_token,
                //     device_uuid: uuid
                // },
                body: {
                    password: oldPassword,
                    new_password: newPassword
                }
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است",
                },
                useAccessToken: true,
                useDeviceUid: true
            }
        );
    }


    const oldPasswordOnChange = (event) => {
        setOldPassword(event.target.value);
    }

    const newPasswordOnChange = (event) => {
        setNewPassword(event.target.value);
    }


    const verifyNewPasswordOnChange = (event) => {
        setVerifyNewPassword(event.target.value);
    }

    const continueClick = (event) => {
        if (oldPassword.length === 0 || newPassword.length === 0 || verifyNewPassword.length === 0) {
            setErrorMessage("تمام فیلدها را کامل کنید");
            setTimeout(() => {
                setErrorMessage("")
            }, 3000);
        }
        else if (newPassword != verifyNewPassword) {
            setErrorMessage("رمز عبور و تکرار رمز عبور یکسان نیست");
            setTimeout(() => {
                setErrorMessage("")
            }, 3000);
        }
        else {
            changePassword();
        }
    }

    return (
        <div className={StyleSheets.all}>
            <div style={{ width: '100%', float: 'right', textAlign: 'center', marginTop: '5px' }}>
                <HeaderComponent title="تغییر رمز عبور" />
                {/* {errorMessage != "" ? <span className={`${StyleSheets.center} ${StyleSheets.spanStyle}`} style={{ backgroundColor: type === "error" ? 'red' : 'green', padding: '5px', borderRadius: '15px' }}>{errorMessage}</span> : null} */}
                {errorMessage != "" ? <CToastComponent message={errorMessage} type={0} /> : null}
                {message != "" ? <CToastComponent message={message} type={1} /> : null}

            </div>
            <div>
                {/* <span className={StyleSheets.spanStyle} style={{ top: '60px' }}>رمز عبور فعلی</span>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={oldPasswordOnChange}
                    className={StyleSheets.inputStyle}
                    style={{ top: '90px' }}>

                </input> */}

                <Input
                    spanTop="80px"
                    spanTitle="رمز عبور فعلی"
                    type="password"
                    value={oldPassword}
                    onChange={oldPasswordOnChange}
                    inputTop="110px"
                />

                <Input
                    spanTop="160px"
                    spanTitle="رمز عبور جدید"
                    type="password"
                    value={newPassword}
                    onChange={newPasswordOnChange}
                    inputTop="190px"
                />

                <Input
                    spanTop="240px"
                    spanTitle="تکرار رمز عبور جدید"
                    type="password"
                    value={verifyNewPassword}
                    onChange={verifyNewPasswordOnChange}
                    inputTop="270px"
                />

                {/* <span className={StyleSheets.spanStyle} style={{ top: '28%' }}>رمز عبور جدید</span>
                <input
                    type="password"
                    value={newPassword}
                    onChange={newPasswordOnChange}
                    className={StyleSheets.inputStyle}
                    style={{ top: '33%' }}>

                </input>

                <span className={StyleSheets.spanStyle} style={{ top: '41%' }}>تکرار رمز عبور جدید</span>
                <input
                    type="password"
                    value={verifyNewPassword}
                    onChange={verifyNewPasswordOnChange}
                    className={StyleSheets.inputStyle}
                    style={{ top: '45%' }}>

                </input> */}

                <Button
                    onClickFunction={continueClick}
                    pending={pending}
                    buttonText="تایید"
                    marginTop='320px' />
                {/* <button onClick={continueClick} style={{ position: 'absolute', top: '54%', border: 'none', backgroundColor: '#39c2fd', color: 'white', fontFamily: 'IRANSans', borderRadius: '15px', width: '70px', height: '40px', left: '10%' }}>
                    {!pending && <span>تایید</span>}
                    {pending && (
                        <i
                            className={StyleSheets.loader}
                            style={{ marginRight: "5px" }}
                        />
                    )}
                </button> */}
            </div>
            <div>
                <img style={{ width: '100%', position: 'absolute', bottom: '0' }} className={StyleSheets.login} />
            </div>
        </div>
    )
}

export default ChangePasswordComponent;
