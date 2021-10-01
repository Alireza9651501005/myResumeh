import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import SplashComponent from './component/splashComponent'
import LoaderComponent from '../../component/loader/loaderComponent'
import RetryComponent from "../../component/retry/retryComponent";
import { AsyncAPIService, APIService, CONFIG, refreshTokenHandler } from "../../utils/apiService";
import getBrowserInfo from "../../component/browserInfo/BrowserInfo";
import { store } from "../../store/store";
import * as ActionType from "../../redux/login/action/LogInAction";
import StyleSheets from "./style/splash.module.css";
import CToastComponent from "../../component/CToast/CToastComponent";

function SplashScreen() {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    const [errorMessage, setErrorMessage] = useState("");

    var uuid = localStorage.getItem(CONFIG.device_uid.localStorage);
    var access_token = localStorage.getItem(CONFIG.accessToken.localStorageName);
    var refresh_token = localStorage.getItem(CONFIG.refreshToken.token.localStorageName);

    const getSplashDataWithId = (os_version, device_brand) => {
        setLoading(true);
        setError(false);
        APIService(
            "/app/startup",
            "POST",
            {
                onSuccess(response) {
                    setLoading(false);
                    setError(false);
                    setSuccess(response.data.data.update.message);
                    //if (uuid != null || uuid != undefined) {
                    if (response.data.data.device_uuid != undefined) {
                        localStorage.setItem(CONFIG.device_uid.localStorage, response.data.data.device_uuid);
                    }
                    //  }
                    if (response.data.data.logged_in) {
                        store.dispatch({ type: ActionType.USER_LOG_IN });
                    }
                },
                onFail(error) {
                    setError(true);
                    setLoading(false);
                    if (error.response != undefined) {
                        setErrorMessage(error.response.data.error);
                        setTimeout(() => {
                            setErrorMessage('');
                        }, 2000);
                        if (error.response.status === 401 || error.response.status === 403) {
                            // refreshToken(os_version, device_brand);
                            localStorage.removeItem(CONFIG.accessToken.localStorageName);
                            localStorage.removeItem("refresh_token");
                            retry(-1);
                        }
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
                //     device_uuid: uuid,
                // },
                body: {
                    app_version: '1.0.0'
                }
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است",
                },
                useDeviceUid: true,
                useAccessToken: true
            }
        );
    }

    const getSplashDataWithOutId = (os_version, device_brand) => {
        setLoading(true);
        setError(false);
        APIService(
            "/app/startup",
            "POST",
            {
                onSuccess(response) {
                    setLoading(false);
                    setError(false);
                    setSuccess(response.data.data.update.message);
                    // if (uuid != null || uuid != undefined) {
                    if (response.data.data.device_uuid != undefined) {
                        localStorage.setItem(CONFIG.device_uid.localStorage, response.data.data.device_uuid);
                    }
                    // }
                    if (response.data.data.logged_in) {
                        store.dispatch({ type: ActionType.USER_LOG_IN });
                    }
                },
                onFail(error) {
                    setError(true);
                    setLoading(false);
                    if (error.response != undefined) {
                        setErrorMessage(error.response.data.error);
                        setTimeout(() => {
                            setErrorMessage('');
                        }, 2000);
                        if (error.response.status === 401 || error.response.status === 403) {
                            localStorage.removeItem("access_token");
                            localStorage.removeItem("refresh_token");
                            retry(-1);
                            //refreshToken(os_version, device_brand);
                        }
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
                    //device_uuid: uuid,
                    os: 4,
                    os_version: os_version,
                    device_brand: device_brand
                },
                body: {
                    app_version: '1.0.0'
                }
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است",
                },
                useDeviceUid: false,
                useAccessToken: false
            }
        );
    }

    const refreshToken = (os_version, device_brand) => {
        setLoading(true);
        setError(false);
        AsyncAPIService(
            "/user/refresh-token",
            "POST",
            {
                onSuccess(response) {
                    setLoading(false);
                    setError(false);
                    console.log(response.data);
                },
                onFail(error) {
                    setLoading(false);
                    setError(true);
                    if (error.response != undefined) {
                        setErrorMessage(error.response.data.error);
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
                    os: 4,
                    device_uuid: uuid,
                    os_version: os_version,
                    device_brand: device_brand
                },
                body: {
                    access_token: 'Bearer ' + access_token,
                    refresh_token: 'Bearer ' + refresh_token
                }
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است",
                }
            }
        );
    }

    const retry = (status) => {
        var browser = getBrowserInfo();
        if (status === -1) {
            getSplashDataWithOutId(browser.version, browser.name);
        }
        else {
            if (access_token != null || access_token != undefined)
                getSplashDataWithId(browser.version, browser.name);
            else
                getSplashDataWithOutId(browser.version, browser.name);
        }
    }

    useEffect(() => {
        var browser = getBrowserInfo();
        if (access_token != null || access_token != undefined)
            getSplashDataWithId(browser.version, browser.name);
        else
            getSplashDataWithOutId(browser.version, browser.name);
    }, []);


    return (
        <div>
            <SplashComponent />
            {errorMessage != "" ? <CToastComponent message={errorMessage} type={0} /> : null}
            {success ? <Redirect to="/Home" /> : null}
            {error ? <img className={StyleSheets.retryImg} onClick={retry} /> : null}
            {loading ? <LoaderComponent /> : null}

        </div>
    );
}


export default SplashScreen;