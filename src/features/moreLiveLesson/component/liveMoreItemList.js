import StyleSheets from "./style/liveMoreItemList.module.css";

const LiveMoreItemListComponent = (props) => {
    return (
        <div className={StyleSheets.listItem1} style={{ display: 'flex' }}>
            <img style={{ borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }} src={props.el.image} className={StyleSheets.img} />
            <div style={{ margin: '10px' }}>
                <div className={StyleSheets.headDiv} >
                    <div>
                        <p style={{ float: 'right', fontFamily: 'IRANSansFN-bold', fontSize: '12px' }}>{props.el.title}</p>
                    </div>

                </div>

                {props.el.last_price ? null : <br />}

                <div style={{ marginBottom: '0px', marginLeft: '10px', marginRight: '10px', direction: 'rtl', float: 'right' }}>
                    <img className={StyleSheets.timeIcon} />
                    <span style={{ marginLeft: '15px', marginRight: '5px' }}>{props.el.duration}</span>
                </div>
            </div>
        </div>
    )
}

export default LiveMoreItemListComponent;