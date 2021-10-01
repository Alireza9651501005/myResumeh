import { useEffect, useState } from 'react';
import HomeLoaderComponent from "../../component/homeLoaderComponent/homeLoaderComponent";
import HomeComponent from "./component/homeComponent";
import { AsyncAPIService, CONFIG } from "../../utils/apiService";
import NavBar from "../nav/nav";
import getBrowserInfo from "../../component/browserInfo/BrowserInfo";
import StyleSheets from "./style/home.module.css";
import CToastComponent from "../../component/CToast/CToastComponent";

function HomeScreen(props) {

    const [data, setData] = useState([]);
    const [contents, setContent] = useState([]);
    const [error, setError] = useState(false);
    const [pending, setPending] = useState(false);

    const [message, setMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const getMessage = () => {
        if (props.location.state != undefined) {
            setMessage(props.location.state.message);
            setTimeout(() => {
                setMessage("");
            }, 2000);
        }
    }

    const getHomeData = (os_version, device_brand) => {
        setPending(true);
        setError(false);
        AsyncAPIService(
            "/app/home",
            "GET",
            {
                onSuccess(res) {
                    setPending(false);
                    setError(false);
                    setData(res.data);
                    setContent(res.data.data.content_rows);
                },
                onFail(error) {
                    setPending(false);
                    setError(true);
                    // console.log(error.response);
                    // setErrorMessage(error.response.data.message.message);
                    // setTimeout(() => {
                    //     setErrorMessage('');
                    // }, 2000);
                }
            },
            {
                headers: {
                    client_secret: 'WtVEK|6le7uH1c%B+TEo54w!(x4hl2*s$UJ7$D+o|y0G2V1idUUX)7ol@$cc`znW,TnL@#cU8)AztB4s$NA!S*3wN,x*1oabqDUL',
                    os: 4,
                    os_version: os_version,
                    device_brand: device_brand,
                    // device_uuid: uuid
                }
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است",
                },
                useDeviceUid: true
            }
        );
    }

    const retry = () => {
        var browser = getBrowserInfo();
        getHomeData(browser.version, browser.name);
    }

    useEffect(() => {
        getMessage();
        var browser = getBrowserInfo();
        getHomeData(browser.version, browser.name);
    }, []);


    return (

        <NavBar itemSelected="home">
            <div style={{ background: '#E4E4EA', overflow: 'auto', minHeight: '100vh', minWidth: 'auto' }}>
                {message != "" ? <span className={`${StyleSheets.centerspanMsgStyle} ${StyleSheets.spanMsgStyle}`} style={{ backgroundColor: 'green' }}>{message}</span> : null}
                {/* <div style={{ background: '#E4E4EA'}}> */}
                {errorMessage != "" ? <CToastComponent message={errorMessage} type={0} /> : null}
                {error ?
                    <span className={StyleSheets.centerSpan} onClick={retry}>
                        تلاش مجدد
                        <img className={StyleSheets.moreChance} />
                    </span>
                    : null}
                {pending ? <HomeLoaderComponent /> : null}
                {data ? <HomeComponent contents={contents} /> : null}
                {console.log(contents)}
            </div>
        </NavBar>
    );
}

export default HomeScreen;