import { useHistory } from "react-router";
import StyleSheets from "./style/singnOutLayout.module.css";

const SingnOutComponent = () => {

    const history = useHistory();

    const loginClick = () => {
        history.push("/login");
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ height: '240px', position: 'relative', width: '100%' }}>
                <img style={{ marginTop: '30px' }} className={StyleSheets.imgProfile} />
            </div>
            <br />

            <div style={{ position: 'relative' }}>
                <span style={{ fontFamily: 'IRANSans', marginTop: '50px', marginLeft: '10px', marginRight: '10px' }}>برای پیوستن به ما و استفاده از دوره های آموزشی ابتدا وارد شوید</span>
            </div>
            <br />
            <div style={{ width: '100%' }}  >
                <button onClick={loginClick} style={{ marginTop: '20px', border: 'none', backgroundColor: '#39c2fd', color: 'white', fontFamily: 'IRANSans', borderRadius: '15px', width: '100px', height: '40px' }}>ورود/ثبت نام</button>
            </div>
        </div>
    );
}

export default SingnOutComponent;