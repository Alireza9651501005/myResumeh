import StyleSheets from "./style/Header.module.css";
import { useHistory } from "react-router";

const HeaderComponent = ({ title ,onDeleteClick}) => {

    const history = useHistory();

    const back = () => {
        history.goBack();
    }


    return (
        <div style={{ direction: 'rtl', height: "50px", paddingTop: '10px', backgroundColor: '#232a47', fontFamily: 'IRANSansFN', color: 'white', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
            <div className="text-center">
                <img onClick={back} className={`text-left ${StyleSheets.backBtn}`} />
                <span style={{}}>{title}</span>
                <img onClick={onDeleteClick} className={`text-right ${StyleSheets.deleteBtn}`} />
            </div>
        </div>

    )
}

export default HeaderComponent;