import StyleSheets from "./style/chapters.module.css";
import { useHistory } from "react-router";

const ChaptersComponent = (props) => {
    const lessons = props.lessons;
    const history = useHistory();

    const onClickHandler = (id) => {
        console.log("click");
        history.push("/singleLessonPage", { id: id });
    }

    return (
        <div>
            {lessons ?
                <div>
                    {
                        lessons.map((el, index) => {
                            return (
                                <div onClick={() => onClickHandler(el.id)} className={StyleSheets.listItem1} style={{ display: 'flex' }}>

                                    <div style={{ backgroundColor: '#7FB3C6' }} className={StyleSheets.myProgress}></div>

                                    <div style={{ margin: '10px' }} className={StyleSheets.headDiv}>
                                        <p style={{ float: 'right', fontFamily: 'IRANSans', fontSize: '15px', width: 'auto', maxWidth: '150px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{el.title}</p>
                                    </div>

                                    <div className={StyleSheets.outer} style={{ fontSize: '11px', top: '40px', position: 'absolute', direction: 'rtl', float: 'right', width: '90%' }}>

                                        <div className={StyleSheets.middle}>
                                            <div className={StyleSheets.inner}>
                                                <img className={StyleSheets.status} />
                                                <span >{el.user_score}/{el.lesson_score}</span>
                                            </div>

                                            <div className={StyleSheets.inner}>
                                                <img className={StyleSheets.likes} />
                                                <span>{el.likes}</span>
                                            </div>

                                            <div className={StyleSheets.inner}>
                                                <img className={StyleSheets.comments} />
                                                <span >{el.total_comments}</span>
                                            </div>

                                            <div className={StyleSheets.inner}>
                                                <img className={StyleSheets.time} />
                                                <span >{el.total_hours}</span>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
                : null}
        </div>
    )
}

export default ChaptersComponent;