import StyleSheets from "./style/publicProfileLayout.module.css";
//import "./style/profileLayout.module.css";
import "../../../component/circle/circleChart.css";
import { useEffect, useState } from "react";
import { AsyncAPIService } from "../../../utils/apiService";
import { useHistory } from "react-router";
import StarComponent from "../../../component/star/starComponent";
import { SpeakerNotes } from "@material-ui/icons";

const PublicProfileComponent = (props) => {

    var uid = localStorage.getItem("n-uuid");
    var access_token = localStorage.getItem("access_token");

    const username = props.username;

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

    const getUserCourses = () => {
        AsyncAPIService(
            "/users/" + username + "/public-profile/courses?page=1",
            "GET",
            {
                onSuccess(response) {
                    if (lastPage === 0) {
                        setLastPage(response.data.data.last_page);
                    }
                    setDataApi(response.data.data);
                    setCourses(response.data.data.courses);
                    console.log(response.data.data.courses[0].progress_percentage);
                    setStyleClass("c102 " + "p" + 50 + " small");
                },
                onFail(err) {
                    console.log("error", err.response);
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
        <div className={` ${StyleSheets.infoStyle}`} style={{ margin: '10px 10px 10px 10px',padding:'10px'}}>
            <p className="col-12 pt-2" style={{ textAlign: 'center', color: 'white', fontFamily: 'IRANSansFN-bold' }}>آکادمی ثروت آفرینان</p>
            <br />
            <div>
                <div className="row mt-4">
                    <div className="col-4"></div>
                    <div className="col-4 text-center">
                        <img style={{ width: '100px', height: '100px', borderRadius: '15px', borderStyle: 'solid', borderColor: '#7fb3c6' }} src={data.image} />
                    </div>
                    <div className="col-4"></div>
                </div>

                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10" style={{ marginTop: '20px', color: 'white', fontFamily: 'IRANSansFN', textAlign: 'center' }}>
                        <span>
                            {data.username}
                            <br />
                        تاریخ عضویت: {data.register_date}
                        </span>
                    </div>
                    <div className="col-1"></div>
                </div>


                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6" style={{ marginTop: '10px', color: 'white', fontFamily: 'IRANSansFN', textAlign: 'center' }}>
                        <span >{data.scores}</span>
                        <br />
                        <StarComponent  stars={data.stars} />
                    </div>
                    <div className="col-3"></div>
                </div>


                <div style={{ width: '100%', textAlign: 'center', marginTop: '20px', color: 'white', fontFamily: 'IRANSansFN', display: 'inline-block' }}>

                    <span style={{ display: 'inline-block', padding: '5px' }}>
                        {data.scientific_score}
                        <br />
                       علمی
                       </span>
                    <span className={StyleSheets.vl} style={{ display: 'inline-block', padding: '5px' }}>
                        {data.yearly_rank}
                        <br />
                        رتبه سالانه
                    </span>
                    <span className={StyleSheets.vl} style={{ display: 'inline-block', padding: '5px' }}>
                        {data.monthly_rank}
                        <br />
                            رتبه ماهانه
                    </span>

                    <span className={StyleSheets.vl} style={{ display: 'inline-block', padding: '5px' }}>
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
                        : null}
                </div>
            </div>
        </div >
    )
}

export default PublicProfileComponent;