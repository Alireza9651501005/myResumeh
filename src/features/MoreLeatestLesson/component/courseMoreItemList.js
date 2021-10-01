import StyleSheets from "./style/courseMoreItemList.module.css";
import { useHistory } from "react-router";

const CourseMoreItemListComponent = (props) => {
    const history = useHistory();

    const onClickHandler = (action, last_price, price_title) => {
        history.push("/actionResolver", { actionResult: action, last_price: last_price, price_title: price_title });
    }

    return (
        <div onClick={() => onClickHandler(props.el.action, props.el.last_price, props.el.price_title)} className={StyleSheets.listItem1} style={{ display: 'flex' }}>
            <div style={{ backgroundColor: props.el.color, borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}>
                <img style={{ top: '90%' }} src={props.el.image} className={StyleSheets.img} />
            </div>
            <div style={{ margin: '7px' }}>
                <div className={StyleSheets.headDiv}  >
                    <div style={{ display: 'inline' }}>
                        <p style={{ float: 'right', fontFamily: 'IRANSansFN-bold', fontSize: '12px', width: 'auto', maxWidth: '150px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{props.el.title}</p>
                    </div>

                    <div style={{ direction: 'ltr', position: 'absolute', left: '15px', display: 'inline' }}>
                        {props.el.last_price ? <div>
                            <span style={{ marginLeft: '8px' }} className={StyleSheets.line}>{props.el.last_price}</span>
                            {/* <br /> */}
                        </div> : null}
                        <p style={{ float: 'left', color: 'green' }}>{props.el.price_title}</p>
                    </div>
                </div>

                {/* {props.el.last_price ? null : <br />} */}

                <div style={{ width: '100%', bottom: '9px', marginTop: '20px', direction: 'rtl' }}>
                    <div style={{ display: 'inline', width: '30%' }}>
                        <img className={StyleSheets.levelIcon} />
                        <span style={{ marginLeft: '25px', marginRight: '5px' }}>{props.el.level}</span>
                    </div>
                    <div style={{ display: 'inline', width: '30%' }}>
                        <img className={StyleSheets.timeIcon} />
                        < span style={{ marginLeft: '25px', marginRight: '5px' }}>{props.el.total_hours}</span>
                    </div>
                    <div style={{ display: 'inline', width: '30%' }}>
                        <img className={StyleSheets.sessionIcon} />
                        <span style={{ marginLeft: '25px', marginRight: '5px' }}>{props.el.total_chapters} فصل</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CourseMoreItemListComponent;