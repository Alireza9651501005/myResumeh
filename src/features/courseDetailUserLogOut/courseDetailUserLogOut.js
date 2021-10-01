import { useEffect, useState } from "react";
import { AsyncAPIService } from "../../utils/apiService";
import HomeLoaderComponent from "../../component/homeLoaderComponent/homeLoaderComponent";
import CourseViewItemComponent from "../../component/courseView/CourseViewItemComponent";
import getBrowserInfo from "../../component/browserInfo/BrowserInfo"; 
import StyleSheets from "./style/courseDetailUserLogOut.module.css";

const CourseDetailUserLogOutComponent = (props) => {

    const [data, setData] = useState();
    const [pending, setPending] = useState(false);

    const setIdBasedOnProps = () => {
        if (props.action != undefined) {
            var browser = getBrowserInfo();
            fetchCourseViewData(props.action.id, browser.version, browser.name);
        }
        else {
            var browser = getBrowserInfo();
            fetchCourseViewData(props.id, browser.version, browser.name);
        }
    }

    const fetchCourseViewData = (id, os_version, device_brand) => {
        setPending(true);
        AsyncAPIService(
            '/courses/' + id,
            "GET",
            {
                onSuccess(res) {
                    setPending(false);
                    console.log(res.data.data);
                    setData(res.data.data);
                },
                onFail(err) {
                    setPending(false);
                }
            },
            {
                headers: {
                    client_secret: 'WtVEK|6le7uH1c%B+TEo54w!(x4hl2*s$UJ7$D+o|y0G2V1idUUX)7ol@$cc`znW,TnL@#cU8)AztB4s$NA!S*3wN,x*1oabqDUL',
                    os: 4,
                    os_version: os_version,
                    device_brand: device_brand,
                    // device_uuid: ''
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

    useEffect(() => {
        setIdBasedOnProps();
    }, []);


    return (<div>
        {pending ? <HomeLoaderComponent /> : null}
        {data ? <CourseViewItemComponent data={data} price_title={props.price_title} last_price={props.last_price} /> : null}
    </div>)

}

export default CourseDetailUserLogOutComponent;