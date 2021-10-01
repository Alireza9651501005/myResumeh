import { createRef, useState } from "react";
import { useHistory } from "react-router";
import StyleSheets from "./style/refisterUser.module.css";
import { AsyncAPIService } from "../../utils/apiService";
import { store } from "../../store/store";
import * as ActionType from "../../redux/login/action/LogInAction";
import getBrowserInfo from "../../component/browserInfo/BrowserInfo";
import { setUserData } from "../../redux/login/action/LogInActionFunction";
import CToastComponent from "../../component/CToast/CToastComponent";


const RegisterUserComponent = (props) => {
    let height = window.innerHeight;
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [pending, setPending] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const phone_number = props.location.state.phone_number;
    const time_out = props.location.state.time_out;

    const min = time_out / 60;
    const sec = time_out % 60;

    const history = useHistory();

    const registerUser = (os_version, device_brand) => {
        setPending(true);
        AsyncAPIService(
            "/user/register",
            "POST",
            {
                onSuccess(res) {
                    setPending(false);
                    store.dispatch({ type: ActionType.USER_LOG_IN });
                    history.push("/home");
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
                headers: {
                    client_secret: 'WtVEK|6le7uH1c%B+TEo54w!(x4hl2*s$UJ7$D+o|y0G2V1idUUX)7ol@$cc`znW,TnL@#cU8)AztB4s$NA!S*3wN,x*1oabqDUL',
                    os: 4,
                    os_version: os_version,
                    device_brand: device_brand,
                    // device_uuid: ''
                },
                body: {
                    password: password,
                    phone_number: phone_number,
                    name: name,
                    username: userName
                }
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است",
                },
                useDeviceUid: false
            }
        );
    }

    const getUserInformation = () => {
        AsyncAPIService(
            "/user/profile",
            "GET",
            {
                onSuccess(res) {
                    store.dispatch(setUserData(res.data.data));
                },
                onFail(err) {
                }
            },
            {},
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است"
                },
                useAccessToken: true,
                useDeviceUid: true
            }
        )
    }

    const nameOnChange = (event) => {
        setName(event.target.value);
    }

    const userNameOnChange = (event) => {
        setUserName(event.target.value);
    }

    const passwordOnChange = (event) => {
        setPassword(event.target.value);
    }

    const verifyPasswordOnChange = (event) => {
        setVerifyPassword(event.target.value);
    }

    const continueClick = () => {
        if (name.length === 0 || userName.length === 0 || password.length === 0 || verifyPassword.length === 0) {
            setErrorMessage("تمام فیلدها را کامل کنید");
            setTimeout(() => {
                setErrorMessage("")
            }, 3000);
        }
        else if (password != verifyPassword) {
            setErrorMessage("رمز عبور و تکرار رمز عبور یکسان نیست");
            setTimeout(() => {
                setErrorMessage("")
            }, 3000);
        }
        else {
            var browser = getBrowserInfo();
            registerUser(browser.version, browser.name);
        }
    }

    return (
        <div className={StyleSheets.all}>
            <div style={{ width: '100%', float: 'right', textAlign: 'center', marginTop: '5px' }}>
                <span className={StyleSheets.center} style={{ color: 'white', fontFamily: 'IRANSans', position: 'absolute' }}>خوش آمدی</span>
                {errorMessage != "" ? <CToastComponent message={errorMessage} type={0} /> : null}
            </div>
            <div>
                <span className={StyleSheets.spanStyle} style={{ top: '15%' }}>نام و نام خانوادگی</span>
                <input
                    type="text"
                    value={name}
                    onChange={nameOnChange}
                    className={StyleSheets.inputStyle}
                    style={{ top: '20%', paddingRight: '10px', paddingLeft: '10px' }}>

                </input>

                <span className={StyleSheets.spanStyle} style={{ top: '28%' }}>نام مستعار</span>
                <input
                    type="text"
                    value={userName}
                    onChange={userNameOnChange}
                    className={StyleSheets.inputStyle}
                    style={{ outline: 'none', top: '33%', paddingRight: '10px', paddingLeft: '10px' }}>

                </input>

                <span className={StyleSheets.spanStyle} style={{ top: '41%' }}>رمز</span>
                <input
                    type="password"
                    value={password}
                    onChange={passwordOnChange}
                    className={StyleSheets.inputStyle}
                    style={{ top: '46%', paddingRight: '10px', paddingLeft: '10px' }}>

                </input>

                <span className={StyleSheets.spanStyle} style={{ top: '54%' }}>تکرار رمز</span>
                <input
                    type="password"
                    value={verifyPassword}
                    onChange={verifyPasswordOnChange}
                    className={StyleSheets.inputStyle}
                    style={{ top: '59%', paddingRight: '10px', paddingLeft: '10px' }}>

                </input>

                <button onClick={continueClick} style={{ position: 'absolute', top: '70%', border: 'none', backgroundColor: '#39c2fd', color: 'white', fontFamily: 'IRANSans', borderRadius: '15px', width: '70px', height: '40px', left: '10%' }}>
                    {!pending && <span>ادامه</span>}
                    {pending && (
                        <i
                            className={StyleSheets.loader}
                            style={{ marginRight: "5px" }}
                        />
                    )}
                </button>

                {/* <button onClick={continueClick} style={{ position: 'absolute', top: '70%', border: 'none', backgroundColor: '#39c2fd', color: 'white', fontFamily: 'IRANSans', borderRadius: '15px', width: '70px', height: '40px', left: '10%' }}>ادامه</button> */}
            </div>
            <div>
                <img style={{ width: '100%', position: 'absolute', bottom: '0' }} className={StyleSheets.login} />
            </div>
        </div>
    )
}

export default RegisterUserComponent;
