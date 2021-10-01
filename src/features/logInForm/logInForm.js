import { createRef, useState } from "react";
import { useHistory } from "react-router";
import StyleSheets from "./style/logInFormComponent.module.css";
import { AsyncAPIService } from "../../utils/apiService";
import getBrowserInfo from "../../component/browserInfo/BrowserInfo";
import Button from "../../component/button";
import Input from "../../component/input";
import HeaderComponent from "../../component/headerComponent";
import CToastComponent from "../../component/CToast/CToastComponent";

const LogInFormComponent = (props) => {
    let height = window.innerHeight;

    const [emptyNum, setEmptyNum] = useState(false);
    const [wrongNum, setWrongNum] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [register, setRegister] = useState();
    const [unRegister, setUnRegister] = useState();
    const [pending, setPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    var changePhoneNumber = false;

    if (props.location.state != undefined) {
        changePhoneNumber = props.location.state.changePhoneNumber;
    }

    const history = useHistory();

    const checkPhoneNumber = (os_version, device_brand) => {
        setPending(true);
        AsyncAPIService(
            "/user/check",
            "POST",
            {
                onSuccess(res) {
                    setPending(false);
                    if (res.data.data.registered == true) {
                        history.push("/codePass", { phone_number: inputVal });
                    }
                    else {
                        history.push("/verifyCode", { type: "login", phone_number: inputVal, timeout: res.data.data.timeout })
                    }
                },
                onFail(error) {
                    setPending(false);
                    if (error.response != undefined) {
                        setErrorMessage(error.response.data.message.message);
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
                    phone_number: inputVal
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

    const chengePhoneNumber = () => {
        setPending(true);
        AsyncAPIService(
            "/user/profile/phone-number",
            "POST",
            {
                onSuccess(res) {
                    setPending(false);
                    history.push("/verifyCode", { type: "changePhoneNumber", phone_number: changePhoneNumber, timeout: res.data.data.timeout })
                },
                onFail(error) {
                    setPending(false);
                    if (error.response != undefined) {
                        setErrorMessage(error.response.data.message.message);
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
                    phone_number: inputVal
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

        else if (inputVal.length != 11) {
            setWrongNum(true);
            setTimeout(() => {
                setWrongNum(false)
            }, 3000);
        }

        else if (inputVal[0] != 0 || inputVal[1] != 9) {
            setWrongNum(true);
            setTimeout(() => {
                setWrongNum(false)
            }, 3000);
        }
        else {
            if (changePhoneNumber) {
                chengePhoneNumber();
            }
            else {
                var browser = getBrowserInfo();
                checkPhoneNumber(browser.version, browser.name);
            }
        }
    }

    return (
        <div className={StyleSheets.all}>
            <div style={{ backgroundColor: '#232a47', width: '100%', float: 'right', textAlign: 'center', marginTop: '5px' }}>

                {changePhoneNumber
                    ? <HeaderComponent title="تغییر شماره تلفن" />
                    : <HeaderComponent title="! خوش آمدی" />
                }

                {emptyNum != "" ? <CToastComponent message="لطفا شماره تلفن خود را وارد کنید" type={0} /> : null}
                {wrongNum != "" ? <CToastComponent message="شماره وارد شده صحیح نمی باشد" type={0} /> : null}
                {errorMessage != "" ? <CToastComponent message={errorMessage} type={0} /> : null}
            </div>
            <div>
                {/* <span style={{ color: 'white', fontFamily: 'IRANSans', position: 'absolute', top: '15%', right: '15%' }}>شماره تلفن</span>
                <input
                    type="number"
                    value={inputVal}
                    onChange={inputOnChange}
                    style={{ outline: 'none', fontFamily: 'IRANSansFN', direction: 'rtl', position: 'absolute', top: '20%', border: 'none', right: '15%', borderRadius: '15px', width: '70%', height: '40px', backgroundColor: 'white', paddingRight: '10px', paddingLeft: '10px' }}>

                </input> */}
                <Input
                    spanTop="80px"
                    spanTitle="شماره تلفن"
                    type="number"
                    value={inputVal}
                    onChange={inputOnChange}
                    inputTop="110px"
                />
                <Button
                    onClickFunction={continueClick}
                    pending={pending}
                    buttonText="ادامه"
                    marginTop='190px' />
                {/* <button onClick={continueClick} style={{ position: 'absolute', top: '30%', border: 'none', backgroundColor: '#39c2fd', color: 'white', fontFamily: 'IRANSans', borderRadius: '15px', width: '70px', height: '40px', left: '10%' }}>
                    {!pending && <span>ادامه</span>}
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

export default LogInFormComponent;
