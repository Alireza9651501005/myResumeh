import StyleSheets from "./style/coursesViewLayout.module.css";
import NavBar from "../../features/nav/nav";
import { AsyncAPIService } from "../../utils/apiService";
import { useHistory } from "react-router";
import CourseHeader from "../courseHeader";

const CourseViewItemComponent = (props) => {

    var uuid = localStorage.getItem("n-uuid");
    var access_token = localStorage.getItem("access_token");
    const history = useHistory();

    const addToLibrary = () => {
        AsyncAPIService(
            "/user/profile/library",
            "POST",
            {
                onSuccess(response) {
                    history.push("/courseView", { id: props.data.id });
                },
                onFail(error) {
                }
            },
            {
                headers: {
                    Authorization: 'Bearer ' + access_token,
                    device_uuid: uuid,

                },
                body: {
                    course_id: props.data.id
                }
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است",
                }
            }
        );
    }

    return (
        <NavBar style={{ marginBottom: '80px' }} itemSelected="course-view" from={props.from}>
            <div className="fixed-top">
                <CourseHeader title={props.data.title} backgroundColor={props.data.image[0].color} />
                <div style={{ paddingTop: '15px', textAlign: 'center', width: '100%', height: '250px', backgroundColor: props.data.image[0].color, borderBottomRightRadius: '20px', borderBottomLeftRadius: '20px' }}>
                    <img style={{ width: '250px', height: '200px', }} src={props.data.image[0].image} />
                </div>
            </div>
            <div style={{marginTop:'300px'}}>
                <div style={{ position: 'relative', width: '100%', direction: 'rtl', float: 'right', marginTop: '15px', fontFamily: 'IRANSansFN' }}>
                    <img style={{ right: '10%', position: 'absolute' }} className={StyleSheets.timeIcon} />
                    <span style={{ right: '15%', position: 'absolute' }} >{props.data.total_hours}</span>
                    <img style={{ right: '40%', position: 'absolute' }} className={StyleSheets.timeIcon} />
                    <span style={{ right: '45%', position: 'absolute' }} >{props.data.engagement} نفر</span>
                    <span className={StyleSheets.line} style={{ right: '80%', position: 'absolute', marginLeft: '30px' }} >{props.last_price}</span>
                </div>

                <div style={{ position: 'relative', width: '100%', direction: 'rtl', float: 'right', marginTop: '40px', fontFamily: 'IRANSansFN' }}>
                    <img style={{ right: '10%', position: 'absolute' }} className={StyleSheets.levelIcon} />
                    <span style={{ right: '15%', position: 'absolute' }} >{props.data.level}</span>
                    <img style={{ right: '40%', position: 'absolute' }} className={StyleSheets.sessionIcon} />
                    <span style={{ right: '45%', position: 'absolute' }} >{props.data.total_chapters} فصل</span>
                    <span style={{ right: '80%', position: 'absolute', color: 'green', marginLeft: '30px' }} >{props.price_title}</span>
                </div>

                <div style={{ width: '100%', padding: '25px', float: 'right', marginTop: '30px', fontFamily: 'IRANSansFN', textAlign: 'center', marginBottom: '15px' }}>
                    <span >{props.data.short_description}</span>
                </div>

                <div style={{ position: 'relative', width: '100%', float: 'right', textAlign: 'center' }}>
                    <button onClick={addToLibrary} className={StyleSheets.center} style={{ height: '35px', borderRadius: '10px', backgroundColor: 'green', color: 'white', fontFamily: 'IRANSansFN', padding: '5px' }}>{props.data.main_button.title}</button>
                </div>

                <div className={StyleSheets.div} dangerouslySetInnerHTML={{ __html: props.data.description }} style={{ float: 'right', marginTop: '30px', fontFamily: 'IRANSansFN', textAlign: 'center', marginBottom: '80px' }}>
                    {/* <span>{props.data.description}</span> */}
                </div>
            </div>

        </NavBar>
    )
}

export default CourseViewItemComponent;