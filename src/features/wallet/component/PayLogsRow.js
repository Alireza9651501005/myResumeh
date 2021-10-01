import StyleSheets from "./style/PayLogsRow.module.css";

const PayLogsRow = ({ log, index }) => {

    return (
        <div className="row" className={index % 2 == 0 ? StyleSheets.mainblue : StyleSheets.maingray}>
            <div className="col-5">
                <span className={StyleSheets.text}>{log.description}</span>
            </div>
            <div className="col-3">
                <span className={StyleSheets.text}>{log.amount} {log.currency}</span>
            </div>
            <div className="col-1">
                <img src={log.icon} style={{ height: '20px', width: '20px' }} />
            </div>
            <div className="col-3">
                <span className={StyleSheets.text}>{log.date}</span>
            </div>
        </div>
    )

}

export default PayLogsRow;