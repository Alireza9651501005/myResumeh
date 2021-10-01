import StyleSheets from "./style/CToastComponent.module.css";

const CToastComponent = ({ message, type }) => {

    console.log(type);
    // 0=error
    // 1=success

    return (
        <div style={{textAlign:'center',width:'100%'}}>
            {type === 0 ?
                <span className={StyleSheets.center} style={{ color: 'white', fontFamily: 'IRANSans',  backgroundColor: 'red', padding: '2px', borderRadius: '25px' }}>{message}</span>
                :
                <span className={StyleSheets.center} style={{ color: 'white', fontFamily: 'IRANSans',  backgroundColor: 'green', padding: '2px', borderRadius: '25px' }}>{message}</span>}
        </div>
    )
}

export default CToastComponent;