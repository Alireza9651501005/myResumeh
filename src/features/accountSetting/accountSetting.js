import StyleSheets from "./style/accountSetting.module.css";
import { AsyncAPIService, CONFIG } from "../../utils/apiService";
import { useHistory } from "react-router";
import { store } from "../../store/store";
import * as ActionType from "../../redux/login/action/LogInAction";
import { useState } from "react";
import HeaderComponent from "../../component/headerComponent";

const AccountSettingComponent = () => {

    const access_token = localStorage.getItem(CONFIG.accessToken.localStorageName);
    const uuid = localStorage.getItem(CONFIG.device_uid.localStorage);
    const [errorMessage, setErrorMessage] = useState("");

    const history = useHistory();

    const changePassword = () => {
        history.push("/changePass");
    }

    const changePhoneNumber = () => {
        history.push("/login", { changePhoneNumber: true });
    }

    const logout = () => {
        AsyncAPIService(
            "/user/profile/logout",
            "POST",
            {
                onSuccess(response) {
                    store.dispatch({ type: ActionType.USER_LOG_OUT });
                    history.push("/home", { message: response.data.message.message })
                    localStorage.removeItem(CONFIG.accessToken.localStorageName);
                    localStorage.removeItem("refresh_token");
                },
                onFail(err) {
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
                // }
            },
            {
                toast: {
                    fail: 'مشکلی در ارتباط با سرور پیش آمده'
                },
                useAccessToken: true,
                useDeviceUid: true
            }
        );
    }
    return (
        <div>
            {errorMessage != "" ? <span className={`${StyleSheets.center} ${StyleSheets.spanStyleError}`} style={{ backgroundColor: 'red', padding: '5px', borderRadius: '15px' }}>{errorMessage}</span> : null}
            <div>
                <div style={{ fontFamily: 'IRANSans', borderRadius: '25px' }} className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <h5 style={{ fontFamily: 'IRANSansFN-bold', textAlign: 'center', marginTop: '10px' }} id="exampleModalLongTitle">خروج از حساب کاربری</h5>
                            <div className="modal-body">
                                <h6 style={{ textAlign: 'center' }}>آیا از خروج از حساب کاربری خود اطمینان دارید؟</h6>
                            </div>
                            <div>
                                <button className={StyleSheets.btnStyle} style={{ float: 'right', backgroundColor: 'white', marginRight: '10px', color: '#2179ac' }} type="button" data-dismiss="modal" onClick={logout}>بله</button>

                                <button className={StyleSheets.btnStyle} style={{ float: 'left', marginLeft: '10px', border: 'none', backgroundColor: '#39c2fd', color: 'white' }} type="button" data-dismiss="modal">خیر</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: '#E4E4EA', height: 'auto', paddingBottom: '15px' }}>
                <HeaderComponent className="fixed-top" title="تنظیمات حساب" />


                <div style={{ float: 'right', paddingTop: '20px', paddingRight: '20px', paddingLeft: '20px' }}>
                    <p onClick={changePhoneNumber} style={{ float: 'right' }}>
                        <span className={StyleSheets.spanStyle}>تغییر شماره تلفن</span>
                        <img className={StyleSheets.phoneIcon} />
                    </p>
                    <br />
                    <br />
                    <p onClick={changePassword} style={{ float: 'right' }}>
                        <span className={StyleSheets.spanStyle}>تغییر رمز عبور</span>
                        <img className={StyleSheets.passIcon} />
                    </p>
                    <br />
                    <br />
                    <p style={{ float: 'right' }} data-toggle="modal" data-target="#exampleModalCenter">
                        <span className={StyleSheets.spanStyle}>خروج از حساب کاربری</span>
                        <img className={StyleSheets.exitIcon} />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AccountSettingComponent;