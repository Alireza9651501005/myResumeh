import StyleSheets from "./style.module.css";
import { useHistory } from "react-router";

const CourseHeader = ({ title, backgroundColor }) => {

    const history = useHistory();

    const back = () => {
        history.goBack();
    }

    return (
        <div style={{ direction: 'rtl', height: "50px", paddingTop: '10px', backgroundColor: backgroundColor, fontFamily: 'IRANSansFN', color: 'white' }}>
            <div className="text-center">
                <img onClick={back} className={`text-left ${StyleSheets.backBtn}`} />
                <span style={{ marginRight: '20px' }}>{title}</span>
            </div>
        </div>

    )
}

export default CourseHeader;