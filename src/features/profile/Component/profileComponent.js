import StyleSheets from "./style/profileLayout.module.css";
//import "./style/profileLayout.module.css";
import "../../../component/circle/circleChart.css";
import { useEffect, useState } from "react";
import { AsyncAPIService } from "../../../utils/apiService";
import { useHistory } from "react-router";
import StarComponent from "../../../component/star/starComponent";

const ProfileComponent = (props) => {

    var uid = localStorage.getItem("n-uuid");
    var access_token = localStorage.getItem("access_token");

    const history = useHistory();

    const [numOfPage, setNumOfPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [courses, setCourses] = useState([]);
    const [dataApi, setDataApi] = useState();

    const [styleClass, setStyleClass] = useState("c102 p20 small");
    const data = props.data.data;

    const courseClick = (action) => {
        history.push("/actionResolver", { actionResult: action, from: 'profile', last_price: "", price_title: "" });
    }

    const rank = (event) => {
        history.push("/leaderBoard", { rank: event });
    }

    const networking = () => {
        console.log("network");
        history.push("/networking");
    }

    const scienceScorePage = () => {
        history.push("/scienceScorePage");
    }

    const getUserCourses = () => {
        AsyncAPIService(
            "/user/profile/my-courses?page=" + numOfPage,
            "GET",
            {
                onSuccess(response) {
                    if (lastPage === 0) {
                        setLastPage(response.data.data.last_page);
                    }
                    setDataApi(response.data.data);
                    setCourses(response.data.data.courses);
                    setStyleClass("c102 " + "p" + 50 + " small");
                },
                onFail(err) {

                }
            },
            {
                headers: {
                    Authorization: "Bearer " + access_token,
                    device_uuid: uid
                }
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است"
                }
            }
        )
    }

    useEffect(() => {
        getUserCourses();
    }, []);

    return (
        <div className={StyleSheets.infoStyle} style={{ marginRight: '15px', marginLeft: '15px' }}>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 text-center">
                    <p style={{ color: 'white', fontFamily: 'IRANSansFN-bold', marginTop: '10px' }}>آکادمی ثروت آفرینان</p>
                </div>
                <div className="col-2"></div>
            </div>
            <br />
            <div style={{ marginTop: '10px' }}>
                <img style={{ width: '100px', height: '100px', float: 'right', borderRadius: '15px', borderStyle: 'solid', borderColor: '#7fb3c6' }} src={data.image} />
                <div style={{ padding: '10px', marginLeft: '30px', textAlign: 'center', width: '100px', height: '100px', float: 'left', color: 'white', fontFamily: 'IRANSansFN' }} >
                    <span >{data.scores}</span>
                    <br />
                    <StarComponent stars={data.stars} />
                    <span>امتیاز کلی</span>
                </div>
                <br />
                <div style={{ marginTop: '120px', color: '#abffff', fontFamily: 'IRANSansFN', textAlign: 'center' }}>
                    <span>
                        {data.username}
                        <br />
                        تاریخ عضویت: {data.register_date}
                    </span>
                </div>
                <br />
                <div style={{ width: '100%', textAlign: 'center', marginTop: '20px', color: 'white', fontFamily: 'IRANSansFN', display: 'inline-block' }}>

                    <span onClick={scienceScorePage} style={{ display: 'inline-block', padding: '5px' }}>
                        {data.scientific_score}
                        <br />
                        علمی
                    </span>
                    <span onClick={() => { rank('year') }} className={StyleSheets.vl} style={{ display: 'inline-block', padding: '5px' }}>
                        {data.yearly_rank}
                        <br />
                        رتبه سالانه
                    </span>
                    <span onClick={() => { rank('month') }} className={StyleSheets.vl} style={{ display: 'inline-block', padding: '5px' }}>
                        {data.monthly_rank}
                        <br />
                        رتبه ماهانه
                    </span>

                    <span onClick={networking} className={StyleSheets.vl} style={{ display: 'inline-block', padding: '5px' }}>
                        {data.network_score}
                        <br />
                        شبکه سازی
                    </span>
                </div>

                <br />
                <div style={{ width: '100%', textAlign: 'center', marginTop: '20px', color: 'white', fontFamily: 'IRANSansFN', display: 'inline-block' }}>
                    <span style={{ fontSize: '15px' }}>دوره های آموزشی</span>



                    {dataApi ?
                        <div className={StyleSheets.CoursesList} style={{ direction: 'rtl' }}>
                            {courses.map((el, index) => {
                                return (
                                    <div onClick={() => courseClick(el.action)} key={index} style={{ fontSize: '12px', paddingTop: '10px', height: 'auto', width: 'auto', minWidth: '140px', backgroundColor: 'white', borderRadius: '20px', fontFamily: 'IRANSansFN', color: '#200e32', textAlign: 'right', margin: '10px 0 0 15px', float: 'right' }}>
                                        <span style={{ padding: '20px' }}>{el.level}</span>
                                        <br />
                                        <div style={{ display: 'inline' }}>
                                            <span style={{ direction: 'rtl', float: 'right', marginRight: '20px', fontFamily: 'IRANSansFN-bold', fontSize: '12px', width: 'auto', maxWidth: '120px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{el.title}</span>
                                        </div>
                                        <br />

                                        <div style={{ marginTop: '5px', marginLeft: '35px' }} className={"c102 p" + el.progress_percentage + " small"}>
                                            <span style={{ fontSize: '15px', fontFamily: 'IRANSansFN', marginTop: '25px' }}>
                                                {el.progress_percentage + "%"}
                                            </span>
                                            <div className="slice">
                                                <div className="bar"></div>
                                                <div className="fill"></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <div style={{ direction: 'rtl', height: '150px' }}></div>}
                </div>
            </div>
        </div >
    )
}

export default ProfileComponent;