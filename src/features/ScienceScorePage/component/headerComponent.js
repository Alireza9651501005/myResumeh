import StyleSheets from "./style/Header.module.css";
import { useHistory } from "react-router";

const HeaderComponent = ({ title }) => {

    const history = useHistory();

    const back = () => {
        history.goBack();
    }

    return (
        <div className='fixed-top' style={{ direction: 'rtl', height: "50px", paddingTop: '10px', backgroundColor: '#232a47', fontFamily: 'IRANSansFN', color: 'white', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
            <div className="text-center">
                <img onClick={back} className={`text-left ${StyleSheets.backBtn}`} />
                <span style={{ marginRight: '20px' }}>{title}</span>
            </div>
        </div>

    )
}

export default HeaderComponent;