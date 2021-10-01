import StyleSheets from "./style/liveitemlist.module.css";


const LiveItemListComponent = (props) => {
    return (
        <div style={{ width: "200px", height: '300px', margintop: '1px', marginRight: '15px', marginBottom: '15px' }}>
                            <img src={props.el.image} className=" d-block" style={{ height: '230px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', width: '200px' }} />
                            <div className="p-2" style={{ backgroundColor: "white", borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                                <span style={{ marginRight: '15px' }} className={` ${StyleSheets.txtFont} d-block`}>{props.el.date}</span>
                                <br />
                                <span style={{ marginRight: '15px' }} className={` ${StyleSheets.txtFont} d-block`}>{props.el.title}</span>
                            </div>
                        </div >
    );
}

export default LiveItemListComponent;