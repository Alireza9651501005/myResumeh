import { useEffect, useState } from "react";
import StyleSheets from "./style/courseDetailUserLogIn.module.css";
import Chapters from "../chapters/Chapters";
import InfoCourseDetailsComponent from "../infoCoursedetail/InfoCourseDetails";
import NavBar from "../../features/nav/nav";
import FileAttachment from "../fileAttachment/fileAttachment";
import StatusCourseDetailsComponent from "../statusCoursedetail/statusCourseDetails";
import { AsyncAPIService } from "../../utils/apiService";
import CourseHeader from "../../component/courseHeader";

const CourseDetailUserLogInComponent = (props) => {

    const [chaptersLabel, setChaptersLabel] = useState("درس‌ها");
    const [infoLabel, setInfoLabel] = useState("معرفی");
    const [statusLabel, setStatusLabel] = useState("وضعیت دوره");
    const [filesLabel, setFilesLabel] = useState("فایل‌ها");
    const [data, setData] = useState();
    var access_token = localStorage.getItem('access_token');
    var uId = localStorage.getItem('n-uuid');

    const [chaptersSelect, setChaptersSelect] = useState(true);
    const [infoSelect, setInfoSelect] = useState(false);
    const [statusSelect, setStatusSelect] = useState(false);
    const [filesSelect, setFilesSelect] = useState(false);


    const handleStatusBasedOnItemSelect = (name) => {
        if (name === "chapters") {
            setChaptersSelect(true);
            setInfoSelect(false);
            setStatusSelect(false);
            setFilesSelect(false);
        }
        else if (name === "files") {
            setChaptersSelect(false);
            setInfoSelect(false);
            setStatusSelect(false);
            setFilesSelect(true);
        }
        else if (name === "info") {
            setChaptersSelect(false);
            setInfoSelect(true);
            setStatusSelect(false);
            setFilesSelect(false);
        }
        else if (name === "status") {
            setChaptersSelect(false);
            setInfoSelect(false);
            setStatusSelect(true);
            setFilesSelect(false);
        }
    }

    return (
        <NavBar style={{ marginBottom: '80px' }} itemSelected="course-view" from={props.from}>
            <div style={{ backgroundColor: '#E4E4EA' }}>
                <div className="fixed-top">
                    <CourseHeader title={props.data.title} backgroundColor={props.data.image[0].color} />
                    <div style={{ paddingTop: '15px', textAlign: 'center', width: '100%', height: '250px', backgroundColor: props.data.image[0].color, borderBottomRightRadius: '20px', borderBottomLeftRadius: '20px' }}>
                        <img style={{ width: '90%', height: '90%', marginTop: '10px' }} src={props.data.image[0].image} />
                    </div>

                    <div className={StyleSheets.radiostyle} style={{ backgroundColor: '#E4E4EA' }}>
                        <label onClick={() => handleStatusBasedOnItemSelect("status")} style={{ marginBottom: '10px' }} htmlFor="status" className={`${StyleSheets.font} ${StyleSheets.label} `}>
                            <span style={{ marginBottom: '15px' }}>{statusLabel}</span>
                            <img className={StyleSheets.status} />
                            <br />
                            {statusSelect ? <p style={{ backgroundColor: props.data.image[0].color, position: 'absolute', top: '110%' }} className={StyleSheets.underLine}></p> : null}
                        </label>

                        <label onClick={() => handleStatusBasedOnItemSelect("info")} style={{ marginBottom: '10px' }} htmlFor="info" className={`${StyleSheets.font} ${StyleSheets.label}`}>
                            <span style={{ marginBottom: '15px' }}>{infoLabel}</span>
                            <img className={StyleSheets.info} />
                            <br />
                            {infoSelect ? <p style={{ backgroundColor: props.data.image[0].color, position: 'absolute', top: '110%' }} className={StyleSheets.underLine}></p> : null}
                        </label>

                        <label onClick={() => handleStatusBasedOnItemSelect("files")} style={{ marginBottom: '10px' }} htmlFor="files" className={`${StyleSheets.font} ${StyleSheets.label}`}>
                            <span style={{ marginBottom: '15px' }}>{filesLabel}</span>
                            <img className={StyleSheets.files} />
                            <br />
                            {filesSelect ? <p style={{ backgroundColor: props.data.image[0].color, position: 'absolute', top: '110%' }} className={StyleSheets.underLine}></p> : null}
                        </label>

                        <label onClick={() => handleStatusBasedOnItemSelect("chapters")} style={{ marginBottom: '10px' }} htmlFor="chapters" className={`${StyleSheets.font} ${StyleSheets.label}`}>
                            <span style={{ marginBottom: '15px' }}>{chaptersLabel}</span>
                            <img className={StyleSheets.chapters} />
                            <br />
                            {chaptersSelect ? <p style={{ backgroundColor: props.data.image[0].color, position: 'absolute', top: '110%' }} className={StyleSheets.underLine}></p> : null}
                        </label>
                    </div>
                </div>
                <br />
                <div  style={{ marginTop: '360px' }}>
                    {chaptersSelect ? <Chapters id={props.data.id} /> : null}
                    {filesSelect ? <FileAttachment id={props.data.id} /> : null}
                    {infoSelect ? <InfoCourseDetailsComponent id={props.data.id} /> : null}
                    {statusSelect ? <StatusCourseDetailsComponent id={props.data.id} /> : null}
                </div>
            </div>
        </NavBar>
    )

}

export default CourseDetailUserLogInComponent;