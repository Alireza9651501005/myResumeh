import StyleSheets from "./style/List.module.css";
import MoreScreen from "../../features/more/moreScreen";
import { Link } from "react-router-dom";
import { useState } from "react";
import store from "../../store/store";
import CourseItemListComponent from "./component/courseItemList";

function LeatestCourseList(props) {

    const leatestCourse = props.contents;
    const title = leatestCourse.title;
    const items = leatestCourse.items;

    return (
        <div style={{ direction: 'rtl' }}>
            <span className={StyleSheets.h} style={{ float: 'right', marginTop: '20px', padding: '20px 10px 20px 20px' }}>{title}</span>
            <Link className={`${StyleSheets.textColor} ${StyleSheets.h}`} style={{ padding: '20px 20px 20px 10px', float: 'left', marginTop: '20px' }}
                to={{
                    pathname: "/More",
                    state: { moreTitle: "moreLeatestCourseList" }
                }}
            >{leatestCourse.button_title}</Link>
            <br />
            
            <div  style={{marginLeft:'15px'}} className={StyleSheets.CoursesList}>
                <br />
                {items.map((el, index) => {
                    return (
                        <div key={index}>
                            <CourseItemListComponent el={el}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}


export default LeatestCourseList;