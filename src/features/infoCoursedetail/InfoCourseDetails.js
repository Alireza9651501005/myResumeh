import { useEffect, useState } from "react";
import { AsyncAPIService } from "../../utils/apiService";
import StyleSheets from "./style/infoCourses.module.css";
import CourseLoaderComponent from "../courseLoaderComponent/courseLoaderComponent";
import CToastComponent from "../../component/CToast/CToastComponent";

const InfoCourseDetailsComponent = (props) => {

    const [data, setData] = useState();
    const [pending, setPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState('');


    const fetchCourseViewInfo = () => {
        setPending(true);
        setError(false);
        AsyncAPIService(
            '/courses/' + props.id,
            "GET",
            {
                onSuccess(res) {
                    setPending(false);
                    setError(false);
                    setData(res.data.data);
                },
                onFail(error) {
                    setError(true);
                    setPending(false);
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

    const retry = () => {
        fetchCourseViewInfo();
    }

    useEffect(() => {
        fetchCourseViewInfo();
    }, []);

    return (

        <div style={{ fontFamily: 'IRANSans', padding: '20px', textAlign: 'justify', direction: 'rtl' }}>
            {pending ? <CourseLoaderComponent /> : null}
            {errorMessage != "" ? <CToastComponent message={errorMessage} type={0} /> : null}
            {error ? <img className={StyleSheets.retryImg} onClick={retry} /> : null}

            {data ?
                <div className={StyleSheets.div} dangerouslySetInnerHTML={{ __html: data.description }} style={{ float: 'right', marginTop: '10px', fontFamily: 'IRANSansFN', textAlign: 'center', marginBottom: '80px' }}>
                </div>
                : null}
        </div>
    )
}

export default InfoCourseDetailsComponent;