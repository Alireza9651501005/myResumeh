/*import { useHistory } from "react-router";
import StyleSheets from "./style/coursesitemlist.module.css";

const CourseItemListComponent = (props) => {

    const history = useHistory();

    const onClickHandler = (action, last_price, price_title) => {
        history.push("/actionResolver", { actionResult: action, last_price: last_price, price_title: price_title });
    }

    return (
        <div onClick={() => onClickHandler(props.el.action, props.el.last_price, props.el.price_title)} className={StyleSheets.margin} style={{ width: "200px", height: '300px', marginTop: '1px', marginBottom: '15px', marginRight: '15px' }}>
            <div className={`card-img-top`} style={{ background: props.el.color, padding: '15px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
                <img src={props.el.image} style={{ height: '150px', width: '100%' }} />
                <br />
                <span className={`${StyleSheets.txtList} ${StyleSheets.txtFont}`}>{props.el.level}</span>
                <br />
                <span className={`${StyleSheets.txtList} ${StyleSheets.txtFont_bold}`}>{props.el.title}</span>
                <br />
                <span style={{ width: '170px' }} className={`${StyleSheets.txtList} ${StyleSheets.txtFont}`}>{props.el.short_description}</span>
                <br />
            </div>

            <div style={{ backgroundColor: 'white', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                <div style={{ padding: '3px' }}>
                    <div className={`card-title ${StyleSheets.div}`} style={{ direction: 'ltr', marginRight: '15px' }}>
                        <span className={StyleSheets.txtFont}>{props.el.total_hours}</span>
                        <img className={StyleSheets.timeIcon} />
                    </div>
                    <div>
                        {props.el.last_price ? <span style={{ marginLeft: '15px' }} className={`${StyleSheets.line} ${StyleSheets.textColor} ${StyleSheets.txtFont}`}>{props.el.last_price}</span> : null}

                    </div>
                    <br />
                    {props.el.last_price ? null : <br />}
                    <div className={`card-text ${StyleSheets.div}`} style={{ direction: 'ltr', marginRight: '15px' }}>
                        <span className={StyleSheets.txtFont}>{props.el.level}</span>
                        <img className={StyleSheets.levelIcon} />
                    </div>
                    <div>
                        <span style={{ marginLeft: '15px' }} className={`${StyleSheets.textColor} ${StyleSheets.txtFont}`}>{props.el.price_title}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseItemListComponent;*/

import { useHistory } from "react-router";
import StyleSheets from "./style/coursesitemlist.module.css";

const CourseItemListComponent = (props) => {

    const history = useHistory();

    const onClickHandler = (action, last_price, price_title) => {
        history.push("/actionResolver", { actionResult: action, last_price: last_price, price_title: price_title });
    }

    return (
        <div onClick={() => onClickHandler(props.el.action, props.el.last_price, props.el.price_title)} className={StyleSheets.margin} style={{ width: "200px", height: '300px', marginTop: '1px', marginBottom: '15px', marginRight: '15px' }}>
            <div style={{ background: props.el.color, borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
                <img src={props.el.image} style={{ height: '150px', width: '100%', objectFit: 'fill', marginBottom: '',borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }} />
                <br />
                <div style={{ padding: '15px' }}>
                    <span className={`${StyleSheets.txtList} ${StyleSheets.txtFont}`}>{props.el.level}</span>
                    <br />
                    <span style={{ width: '138px' }} className={`${StyleSheets.txtList} ${StyleSheets.txtFont_bold}`}>{props.el.title}</span>
                    <br />
                    <span style={{ width: '170px' }} className={`${StyleSheets.txtList} ${StyleSheets.txtFont}`}>{props.el.short_description}</span>
                    <br />
                </div>

            </div>

            <div style={{ backgroundColor: 'white', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                <div style={{ padding: '3px' }}>
                    <div className={StyleSheets.div} style={{ direction: 'ltr', marginRight: '15px' }}>
                        <span className={StyleSheets.txtFont}>{props.el.total_hours}</span>
                        <img className={StyleSheets.timeIcon} />
                    </div>
                    <div>
                        {props.el.last_price ? <span style={{ marginLeft: '15px' }} className={`${StyleSheets.line} ${StyleSheets.textColor} ${StyleSheets.txtFont}`}>{props.el.last_price}</span> : null}

                    </div>
                    <br />
                    {props.el.last_price ? null : <br />}
                    <div className={StyleSheets.div} style={{ direction: 'ltr', marginRight: '15px' }}>
                        <span className={StyleSheets.txtFont}>{props.el.level}</span>
                        <img className={StyleSheets.levelIcon} />
                    </div>
                    <div>
                        <span style={{ marginLeft: '15px' }} className={`${StyleSheets.textColor} ${StyleSheets.txtFont}`}>{props.el.price_title}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseItemListComponent;