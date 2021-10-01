import { createRef, useState } from "react";
import { useHistory } from "react-router";
import StyleSheets from "./style/userPassWord.module.css";
import store from "../../store/store";
import * as ActionType from "../../redux/login/action/LogInAction";
import { setUserData } from "../../redux/login/action/LogInActionFunction";
import { AsyncAPIService } from "../../utils/apiService";
import getBrowserInfo from "../../component/browserInfo/BrowserInfo";
import Button from "../../component/button";
import Input from "../../component/input";
import HeaderComponent from "../../component/headerComponent";
import CToastComponent from "../../component/CToast/CToastComponent";

const UserPassWordComponent = (props) => {
    let height = window.innerHeight;
    const [emptyNum, setEmptyNum] = useState(false);
    const [wrongNum, setWrongNum] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [pending, setPending] = useState(false);

    const phone_number = props.location.state.phone_number;

    const history = useHistory();

    const [password, setPassword] = useState("");

    const login = (os_version, device_brand) => {
        setPending(true);
        AsyncAPIService(
            "/user/login",
            "POST",
            {
                onSuccess(res) {
                    console.log(res.data);
                    setPending(false);
                    localStorage.setItem("access_token", res.data.data.access_token);
                    localStorage.setItem("refresh_token", res.data.data.refresh_token);

                    store.dispatch({ type: ActionType.USER_LOG_IN });
                    getUserInformation();
                    history.push("/home");
                }
                ,
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
                    client_secret: "WtVEK|6le7uH1c%B+TEo54w!(x4hl2*s$UJ7$D+o|y0G2V1idUUX)7ol@$cc`znW,TnL@#cU8)AztB4s$NA!S*3wN,x*1oabqDUL",
                    os: 1,
                    os_version: os_version,
                    device_brand: device_brand,
                    // device_uuid: uuid
                },
                body: {
                    phone_number: phone_number,
                    password: password
                }
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است",
                },
                useDeviceUid: true
            }
        )
    }

    const getUserInformation = () => {
        AsyncAPIService(
            "/user/profile",
            "GET",
            {
                onSuccess(res) {
                    console.log(res.data);
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

    const inputOnChange = (event) => {
        setPassword(event.target.value);
    }

    const loginClick = (event) => {
        if (password == "") {
            setEmptyNum(true);
            setTimeout(() => {
                setEmptyNum(false)
            }, 3000);
        }

        else {
            var browser = getBrowserInfo();
            login(browser.version, browser.name);
        }
    }

    return (
        <div className={StyleSheets.all}>
            <div style={{ width: '100%', float: 'right', textAlign: 'center', marginTop: '5px' }}>
                <HeaderComponent title="! خوش آمدی" />
                {emptyNum != "" ? <CToastComponent message="لطفا رمز عبور خود را وارد کنید" type={0} /> : null}
                {wrongNum != "" ? <CToastComponent message="رمز عبور وارد شده صحیح نمی باشد" type={0} /> : null}
                {errorMessage != "" ? <CToastComponent message={errorMessage} type={0} /> : null}

            </div>
            <div>
                <Input
                    spanTop="80px"
                    spanTitle="رمز عبور"
                    type="password"
                    value={password}
                    onChange={inputOnChange}
                    inputTop="110px"
                />
                <span style={{ color: '#39c2fd', fontFamily: 'IRANSans', marginTop: '160px', position: 'absolute', right: '15%' }}>رمز عبور خود را فراموش کرده اید؟</span>

                <Button
                    onClickFunction={loginClick}
                    pending={pending}
                    buttonText="ورود"
                    marginTop='190px' />

            </div>
            <div>
                <img style={{ width: '100%', position: 'absolute', bottom: '0' }} className={StyleSheets.login} />
            </div>
        </div>
    )
}

export default UserPassWordComponent;
