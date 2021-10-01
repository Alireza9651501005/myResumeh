import { createRef, useState } from "react";
import { useHistory } from "react-router";
import StyleSheets from "./style/verifySmsCode.module.css";
import { AsyncAPIService } from "../../utils/apiService";
import getBrowserInfo from "../../component/browserInfo/BrowserInfo";
import Button from "../../component/button";
import Input from "../../component/input";
import HeaderComponent from "../../component/headerComponent";
import CToastComponent from "../../component/CToast/CToastComponent";

const VerifySmsCodeComponent = (props) => {
    let height = window.innerHeight;
    const [emptyNum, setEmptyNum] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const [pending, setPending] = useState(false);

    const phone_number = props.location.state.phone_number;
    const time_out = props.location.state.time_out;

    const min = time_out / 60;
    const sec = time_out % 60;

    console.log(time_out);
    console.log(min + sec);

    const history = useHistory();

    const verifyCode = (os_version, device_brand) => {
        setPending(true);
        AsyncAPIService(
            "/user/verify",
            "POST",
            {
                onSuccess(res) {
                    setPending(false);
                    history.push("/register", { phone_number: phone_number });

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
                    os: 4,
                    os_version: os_version,
                    device_brand: device_brand,
                    // device_uuid: ''
                },
                body: {
                    phone_number: phone_number,
                    code: inputVal
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

    const verifyCodeChangephoneNumber = () => {
        setPending(true);
        AsyncAPIService(
            "/user/profile/phone-number/verification-code",
            "POST",
            {
                onSuccess(res) {
                    setPending(false);
                    console.log(res.data.message.message);
                    setMessage(res.data.message.message);
                    setTimeout(() => {
                        setMessage('');
                        history.goBack(3);
                    }, 2000);
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
                //     Authorization: "Bearer " + access_token,
                //     device_uuid: uuid
                // },
                body: {
                    phone_number: phone_number,
                    code: inputVal
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


    const inputOnChange = (event) => {
        setInputVal(event.target.value);
    }

    const continueClick = (event) => {
        if (inputVal == "") {
            setEmptyNum(true);
            setTimeout(() => {
                setEmptyNum(false)
            }, 3000);
        }
        else {
            if (props.location.state.type === 'changePhoneNumber') {
                verifyCodeChangephoneNumber();
            }
            else {
                var browser = getBrowserInfo();
                verifyCode(browser.version, browser.name);
            }
        }
    }

    return (
        <div className={StyleSheets.all}>
            <div style={{ width: '100%', float: 'right', textAlign: 'center', marginTop: '5px' }}>
                <HeaderComponent title="احراز هویت" />

                {emptyNum != "" ? <CToastComponent message="لطفا کد را وارد کنید" type={0} /> : null}
                {errorMessage != "" ? <CToastComponent message={errorMessage} type={0} /> : null}
                {message != "" ? <CToastComponent message={message} type={1} /> : null}

            </div>
            <div>
                <Input
                    spanTop="80px"
                    spanTitle="کد ارسال شده"
                    type="number"
                    value={inputVal}
                    onChange={inputOnChange}
                    inputTop="110px"
                />
                <Button
                    onClickFunction={continueClick}
                    pending={pending}
                    buttonText="ورود"
                    marginTop='190px' />
                {/* <span style={{ color: 'white', fontFamily: 'IRANSans', position: 'absolute', top: '15%', right: '15%' }}>کد ارسال شده</span>
                <input
                    type="number"
                    value={inputVal}
                    onChange={inputOnChange}
                    style={{ outline: 'none', fontFamily: 'IRANSansFN', direction: 'rtl', position: 'absolute', top: '20%', border: 'none', right: '15%', borderRadius: '15px', width: '70%', height: '40px', backgroundColor: 'white', paddingRight: '10px', paddingLeft: '10px' }}>

                </input>
                <button onClick={continueClick} style={{ position: 'absolute', top: '30%', border: 'none', backgroundColor: '#39c2fd', color: 'white', fontFamily: 'IRANSans', borderRadius: '15px', width: '70px', height: '40px', left: '10%' }}>
                    {!pending && <span>ورود</span>}
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

export default VerifySmsCodeComponent;
