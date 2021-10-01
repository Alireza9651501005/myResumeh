import { useEffect, useState } from "react";
import { AsyncAPIService } from "../../utils/apiService";
import HomeLoaderComponent from "../../component/homeLoaderComponent/homeLoaderComponent";
import CourseViewItemComponent from "../../component/courseView/CourseViewItemComponent";
import getBrowserInfo from "../../component/browserInfo/BrowserInfo";
import { useSelector } from "react-redux";
import CourseDetailUserLogInComponent from "../courseDetailUserLogIn/courseDetailUserLogIn";
import CourseDetailUserLogOutComponent from "../courseDetailUserLogOut/courseDetailUserLogOut";
import StyleSheets from "./style/courseView.module.css";

const CourseViewComponent = (props) => {

    const [data, setData] = useState();
    const [pending, setPending] = useState(false);
    const [access, setAccess] = useState(false);
    const [idCourse, setId] = useState();
    const [from, setFrom] = useState();
    const [error, setError] = useState(false);

    const state = useSelector(state => state);
    const isLogIn = state.LogInReducer.isLogIn;

    const setIdBasedOnProps = () => {
        if (props.from != undefined) {
            setFrom(props.from);
        }
        if (isLogIn) {
            if (props.action != undefined) {
                setId(props.action.id);
                fetchCourseViewDataLogInUser(props.action.id);
            }
            else {
                setId(props.location.state.id);
                fetchCourseViewDataLogInUser(props.location.state.id);
            }
        }
        else {
            if (props.action != undefined) {
                setId(props.action.id);
                var browser = getBrowserInfo();
                fetchCourseViewData(props.action.id, browser.version, browser.name);
            }
            else {
                setId(props.id);
                var browser = getBrowserInfo();
                fetchCourseViewData(props.id, browser.version, browser.name);
            }
        }
    }

    const fetchCourseViewData = (id, os_version, device_brand) => {
        setPending(true);
        setError(false);
        AsyncAPIService(
            '/courses/' + id,
            "GET",
            {
                onSuccess(res) {
                    setPending(false);
                    setError(false);
                    console.log(res.data.data);
                    setAccess(res.data.data.access);
                    setData(res.data.data);
                },
                onFail(error) {
                    setPending(false);
                    setError(true);
                    // setErrorMessage(error.response.data.error);
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
                    device_uuid: ''
                }
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است",
                }
            }
        );
    }

    const fetchCourseViewDataLogInUser = (id) => {
        setPending(true);
        setError(false);
        AsyncAPIService(
            '/courses/' + id,
            "GET",
            {
                onSuccess(res) {
                    setPending(false);
                    setError(false);
                    console.log(res.data.data);
                    setAccess(res.data.data.access);
                    setData(res.data.data);
                },
                onFail(error) {
                    setPending(false);
                    setError(true);
                }
            },
            {
                // headers: {
                //     Authorization: "Bearer " + access_token,
                //     device_uuid: uId
                // }
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

    useEffect(() => {
        setIdBasedOnProps();
    }, []);

    return (
        <div>
            {pending ? <HomeLoaderComponent /> : null}
            {/* {errorMessage != "" ? <span className={StyleSheets.center} style={{ color: 'white', fontFamily: 'IRANSans', position: 'absolute', backgroundColor: 'red', padding: '10px', borderRadius: '10px' }}>{errorMessage}</span> : null} */}
            {error ? <span className={StyleSheets.centerSpan} onClick={setIdBasedOnProps}>
                تلاش مجدد
              <img className={StyleSheets.moreChance} />
            </span>
                : null}
            {data ?
                <div>
                    {/* if logout or login and has no access */}
                    {(!isLogIn || (isLogIn && !access)) && data ? <CourseViewItemComponent data={data} from={from} price_title={props.price_title} last_price={props.last_price} /> : null}
                    {/* if login or login and has access */}
                    {(isLogIn && access) && data ? <CourseDetailUserLogInComponent data={data} from={from} /> : null}
                </div>
                : null}
        </div>
    )


}

export default CourseViewComponent;