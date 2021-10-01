import StyleSheets from "./style.module.css";
import { useHistory } from "react-router";
import { useEffect } from "react";

const MoreHeader = ({ title, inputOnChange, inputValue }) => {

    const history = useHistory();

    const back = () => {
        history.goBack();
    }

    const changeInputValue=(event)=>{
        inputOnChange(event);
    }

    return (
        <div  className="fixed-top" style={{ width: '100%', backgroundColor: '#232a47', position: 'relative', height: '100px', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
            <img onClick={back} className={`text-left ${StyleSheets.backBtn}`} style={{ top: '15%', position: 'absolute' }} />
            <p style={{ color: 'white', fontFamily: 'IRANSansFN', left: '38%', top: '15%', position: 'absolute' }}>{title}</p>
            <br />
            <div style={{ backgroundColor: 'white', width: 'auto', minWidth: '100px', height: '30px', position: 'absolute', right: '10%', left: '10%', bottom: '15%', borderRadius: '20px' }}>
                <input type="text" onChange={changeInputValue} id="fname" value={inputValue} style={{ outline: 'none', fontFamily: 'IRANSansFN', direction: 'rtl', width: 'auto', width: '85%', position: 'absolute', height: '100%', border: 'none', borderRadius: '20px' }} />
                <label htmlFor="fname" className={StyleSheets.searchIcon}></label>
            </div>
        </div>
    )
}

export default MoreHeader;