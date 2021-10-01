import { useSelector } from 'react-redux'
import StyleSheets from './style/liveList.module.css';
import { store } from "../../store/store";
import { Link } from "react-router-dom";
import LiveItemListComponent from "./component/liveItemList";

function LiveCourseList(props) {
    const states = useSelector(state => state);
    const liveCourse = props.contents;
    const title = liveCourse.title;
    const items = liveCourse.items;

    return (
        <div>
            <span className={StyleSheets.h} style={{ padding: '20px 10px 20px 20px', float: 'right', fontSize: '15px', marginTop: '20px' }}>{title}</span>
            <Link className={`${StyleSheets.textColor} ${StyleSheets.h}`} style={{ padding: '20px 20px 20px 10px', float: 'left', marginTop: '20px' }}
                to={{
                    pathname: "/More",
                    state: { moreTitle: "moreLiveCourseList" }
                }}
            >{liveCourse.button_title}</Link>
            <br />
            <div className={StyleSheets.CoursesList}>

                {items.map((el, index) => {
                    return (
                        <div key={index}>
                            <LiveItemListComponent el={el} />
                        </div >
                    )
                })}
            </div>
        </div>
    );
}


export default LiveCourseList;