import { useEffect, useState } from "react";
import { AsyncAPIService } from "../../utils/apiService";
import UserCoursesLayout from "./component/userCoursesLayout";
import { debounce } from "@material-ui/core";
import HomeLoaderComponent from "../../component/homeLoaderComponent/homeLoaderComponent";
import StyleSheets from "./style/myCourses.module.css";

const MyCourses = () => {

    const [numOfPage, setNumOfPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    const [data, setData] = useState();
    const [courses, setCourses] = useState([]);

    const [error, setError] = useState(false);
    const [pending, setPending] = useState(false);


    window.onscroll = debounce(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            loadMore();
        }
    }, 100);

    const loadMore = () => {
        console.log('end of scroll');
        if (numOfPage != lastPage) {
            let newPageNum = numOfPage;
            setNumOfPage(newPageNum++);
            getMyCourses();
        }
        else {
            console.log('else');
        }
    }

    const getMyCourses = () => {
        setPending(true);
        setError(false);
        AsyncAPIService(
            "/user/profile/my-courses?page=" + numOfPage,
            "GET",
            {
                onSuccess(response) {
                    setPending(false);
                    setError(false);
                    if (lastPage === 0) {
                        setLastPage(response.data.data.last_page);
                    }
                    setData(response.data.data);
                    setCourses(response.data.data.courses)
                },
                onFail(err) {
                    setPending(false);
                    setError(true);
                }
            },
            {
                // headers: {
                //     Authorization: "Bearer " + access_token,
                //     device_uuid: uid
                // }
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است"
                },
                useAccessToken: true,
                useDeviceUid: true
            }
        )
    }

    useEffect(() => {
        getMyCourses();
    }, []);

    return (
        <div>
            <div className="fixed-top">
                <div style={{ paddingTop: '15px', textAlign: 'center', width: '100%', height: '250px', backgroundColor: '#232a47', borderBottomRightRadius: '20px', borderBottomLeftRadius: '20px' }}>
                    <span style={{ marginRight: 'auto', color: 'white', fontFamily: 'IRANSans', textAlign: 'center' }}>دوره های من</span>
                    <br />
                    <img style={{ width: '250px', height: '200px', marginTop: '10px' }} className={StyleSheets.mycourseImg} />
                </div>
            </div>
            <br />
            {error ? <span className={StyleSheets.centerSpan} onClick={getMyCourses}>
                تلاش مجدد
                <img className={StyleSheets.moreChance} />
            </span>
                : null}
            {pending ? <HomeLoaderComponent />
                : null}
            {data ? <UserCoursesLayout courses={courses} /> : null}
        </div>
    );

}

export default MyCourses;