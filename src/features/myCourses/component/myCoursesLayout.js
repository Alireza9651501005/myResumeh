import { useHistory } from "react-router";
import StyleSheets from "./style/myCoursesLayout.module.css";


const MyCoursesLayout = (props) => {

    const history = useHistory();

    const onClickHandler = () => {
        console.log("type", props.courses.action);
        history.push("/actionResolver", { actionResult: props.courses.action, from: 'myCourse', last_price: "", price_title: "" });
    }

    console.log(props.courses);

    return (
        <div className="row" onClick={onClickHandler} className={StyleSheets.listItem1} style={{ display: 'flex' }}>
            <div className="col-3 d-flex justify-content-center align-items-center" style={{ backgroundColor: props.courses.color, borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}>
                <img src={props.courses.image} className={StyleSheets.img} />
            </div>
           
            <div className="col-9" style={{ padding: '15px' }}>

                <div className={StyleSheets.headDiv}  >
                    <div>
                        <p style={{ float: 'right', fontFamily: 'IRANSansFN-bold', fontSize: '12px', width: 'auto', maxWidth: '150px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{props.courses.title}</p>
                        <br />
                    </div>
                    <div>
                    </div>
                </div>
                
                <div className={StyleSheets.headDiv1}  >
                    <div>
                        <p style={{ float: 'right', fontFamily: 'IRANSans', fontSize: '12px', width: 'auto', maxWidth: '150px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>پیشرفت دوره</p>
                        <p style={{ float: 'left', fontFamily: 'IRANSansFN', fontSize: '12px' }}>{props.courses.progress_percentage}%</p>
                    </div>
                    <div>
                    </div>
                </div>

                <div className={StyleSheets.myProgress}>
                    <div style={{ fontFamily: 'IRANSansFN', width: props.courses.progress_percentage + '%', backgroundColor: props.courses.color }} className={StyleSheets.myBar}></div>
                </div>

                <div className={StyleSheets.headDiv} style={{ bottom: '1px', direction: 'rtl' }}>
                    <div style={{ float: 'right' }}>
                        <img className={StyleSheets.eyeIcon} />
                        <span style={{}}>{props.courses.course_last_activity_time}</span>
                    </div>

                    <div style={{ float: 'left' }}>
                        <img className={StyleSheets.basketIcon} />
                        <span style={{ }}>{props.courses.course_start_time}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyCoursesLayout;