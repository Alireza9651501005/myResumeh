import { useEffect, useState } from "react";
import { AsyncAPIService } from "../../utils/apiService";
import StyleSheets from "./style/statusCourses.module.css";
import "../../component/circle/circleChart.css";
import CourseLoaderComponent from "../courseLoaderComponent/courseLoaderComponent";
import CToastComponent from "../../component/CToast/CToastComponent";

const StatusCourseDetailsComponent = (props) => {

    const [data, setData] = useState();
    const [pending, setPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState('');

    const [styleClass, setStyleClass] = useState("c100 p0");



    const fetchCourseViewInfo = () => {
        setPending(true);
        setError(false);
        AsyncAPIService(
            "/courses/" + props.id + "/status",
            "GET",
            {
                onSuccess(res) {
                    setPending(false);
                    setError(false);
                    console.log(res.data.data);
                    setData(res.data.data);
                    setStyleClass("c100 " + "p" + res.data.data.progress_percentage);
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
        <div>
            {pending ? <CourseLoaderComponent /> : null}
            {errorMessage != "" ? <CToastComponent message={errorMessage} type={0} /> : null}
            {error ? <img className={StyleSheets.retryImg} onClick={retry} /> : null}

            {data ?
                <div className={StyleSheets.listItem1} style={{ marginBottom: '80px' }} >

                    <div style={{ height: '100px', width: '100%', padding: '10px', textAlign: 'center' }}>

                        <div style={{ width: '150px', float: 'right', fontFamily: 'IRANSansFN', fontSize: '12px', direction: 'rtl' }}>
                            <p style={{ backgroundColor: '#76b5e6', color: 'white', borderRadius: '20px', padding: '5px' }}>
                                شروع دوره
                                <br />
                                {data.course_start_time}
                            </p>
                        </div>

                        <div style={{ width: '150px', float: 'left', fontFamily: 'IRANSansFN', fontSize: '12px', direction: 'rtl' }}>
                            <p style={{ backgroundColor: '#76b5e6', color: 'white', borderRadius: '20px', padding: '5px' }}>
                                آخرین مراجعه
                                <br />
                                {data.course_last_activity_time}
                            </p>
                        </div>
                    </div>

                    <div >
                        <div className={styleClass} style={{ backgroundColor: '#76b5e6', fontSize: '160px' }}>
                            <span style={{ fontSize: '14px', padding: '25px' }}>
                                <span style={{ fontFamily: 'IRANSansFN-bold' }}> {data.progress_percentage + "%"}</span>
                                <hr style={{ height: '2px', margin: '4px', backgroundColor: '#76b5e6' }} />
                                <span style={{ fontFamily: 'IRANSansFN-bold' }}>  {data.user_done_lessons_count}/{data.course_lessons_count}</span>
                                <br />
                                <span style={{ fontSize: '10px' }}> دروس گذرانده شده</span>
                            </span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '10px', marginTop: '20px', width: '100%' }}>
                        <div style={{ width: '40%', float: 'right', fontFamily: 'IRANSansFN', fontSize: '12px', marginLeft: '10px' }}>
                            <span>{data.total_user_interactive_scores}/{data.total_course_interactive_scores}</span>

                            <div className={StyleSheets.myProgress}>
                                <div style={{ width: ((data.total_user_interactive_scores / data.total_course_interactive_scores) * 100) + '%', backgroundColor: '#2179ac' }} className={StyleSheets.myBar}></div>
                            </div>

                            <span style={{ textAlign: 'right' }}>امتیاز آموزش های تعاملی</span>
                        </div>

                        <br />
                        <br />
                        <br />
                        <br />

                        <div style={{ marginTop: '20px', width: '40%', float: 'right', fontFamily: 'IRANSansFN', fontSize: '12px', direction: 'rtl' }}>
                            <span >{data.total_user_video_scores}/{data.total_course_video_scores}</span>

                            <div className={StyleSheets.myProgress}>
                                <div style={{ width: ((data.total_user_video_scores / data.total_course_video_scores) * 100) + '%', backgroundColor: '#2179ac' }} className={StyleSheets.myBar}></div>
                            </div>

                            <span style={{ textAlign: 'right' }}>امتیاز فیلم های آموزشی</span>
                        </div>

                    </div>

                    <div style={{ padding: '10px', marginTop: '100px', width: '100%', fontFamily: 'IRANSansFN-bold', fontSize: '12px' }}>
                        <p style={{ textAlign: 'right' }}>آخرین درس مشاهده شده</p>
                        <p style={{ textAlign: 'center', backgroundColor: '#76b5e6', borderRadius: '20px', color: 'white', height: '40px', fontSize: '15px', padding: '8px' }}>{data.last_lesson.chapter_title}/{data.last_lesson.lesson_title}</p>
                    </div>

                    {data.exam.active ?
                        <div style={{ padding: '10px', width: '100%', fontFamily: 'IRANSansFN', fontSize: '12px' }}>
                            <span style={{ float: 'right', textAlign: 'center' }}>زمان آزمون شما فرا رسیده است</span>
                            <span style={{ float: 'left', textAlign: 'center', backgroundColor: '#0a8f7d', borderRadius: '20px', color: 'white', height: '40px', fontSize: '15px', padding: '5px' }}>شروع آزمون</span>
                        </div>
                        :
                        <div style={{ padding: '10px', width: '100%', fontFamily: 'IRANSansFN', fontSize: '12px' }}>
                            <span style={{ float: 'right', textAlign: 'center', width: '50%' }}>شما امتیاز لازم برای شرکت در آزمون را کسب نکرده اید</span>
                            <span style={{ float: 'left', textAlign: 'center', backgroundColor: '#95a29e', borderRadius: '10px', color: 'white', height: '40px', fontSize: '15px', padding: '8px' }}>شروع آزمون</span>
                        </div>}

                </div>
                : null}
        </div>
    )
}

export default StatusCourseDetailsComponent;