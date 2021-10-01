import { AsyncAPIService, APIService } from "../../utils/apiService";
import NetworkScoreComponent from "./component/networkScoreComponent";
import Test from "../../layout/networkScore-layout/test";
import { useEffect, useState } from "react";
import StyleSheets from "./style/network.module.css";
import { useHistory } from "react-router";
import HomeLoaderComponent from "../../component/homeLoaderComponent/homeLoaderComponent";


const NetworkScore = () => {

    const [network_scores, setNetwork_scores] = useState([]);
    const [data, setData] = useState();
    const [error, setError] = useState(false);
    const [pending, setPending] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    const history = useHistory();

    const back = () => {
        history.goBack();
    }

    const descript = () => {
        setShowDescription(!showDescription);
    }

    const getNetworkScore = () => {
        setPending(true);
        AsyncAPIService(
            "/user/profile/network-report",
            "GET",
            {
                onSuccess(response) {
                    setError(false);
                    setPending(false);
                    setData(response.data.data);
                    setNetwork_scores(response.data.data.network_scores);
                    console.log("response.data.data", response.data.data);
                },
                onFail(error) {
                    setError(true);
                    setPending(false);
                }
            },
            {
                // headers: {
                //     Authorization: "Bearer " + access_token,
                //     device_uuid: uid
                // }
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است"
                },
                useAccessToken: true,
                useDeviceUid: true
            }
        )


    }
    useEffect(() => {
        getNetworkScore();
    }, []);

    return (
        <div className="container">
            {error ? <span className={StyleSheets.centerSpan} onClick={getNetworkScore}>
                تلاش مجدد
                <img className={StyleSheets.moreChance} />
            </span>
                : null}
            {pending ? <HomeLoaderComponent /> : null}

            <div className="row text-center" style={{ height: "50px", paddingTop: '10px', backgroundColor: '#232a47', fontFamily: 'IRANSansFN', color: 'white', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                <div onClick={back} className="col-3 text-left">
                    <img className={StyleSheets.backIcon} />
                </div>
                <div className="col-6">
                    <span>امتیاز شبکه سازی</span>
                </div>
                <div className="col-3"></div>
            </div>


            <div className="row mt-3" style={{ fontFamily: 'IRANSansFN', color: 'black' }}>
                <div className="col-11 text-right">
                    <span>
                        نحوه دریافت امتیاز شبکه سازی
                    </span>
                </div>
                <div className="col-1 text-left pl-1">
                    <img className={showDescription ? StyleSheets.arrowDown : StyleSheets.arrowTop} onClick={descript} />
                </div>
            </div>

            {showDescription
                ?
                <div className="row">
                    <text className="col-12" style={{ fontFamily: 'IRANSansFN', color: 'black', textAlign: 'right',marginTop:'10px' }}>
                        لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد.لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد
                        لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد.لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد
                        لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد.لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد
                        لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد.لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد
                        لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد.لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد
                        لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد.لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد
                    </text>
                </div>
                : null}

            <div className="row mt-4">
                <span className="text-center col-12" style={{ fontFamily: 'IRANSansFN', color: 'black' }}>
                    امتیاز شبکه سازی شما
                </span>
            </div>

            {network_scores.length > 0 ? <NetworkScoreComponent data={data} /> : null}
            {/* {network_scores.length > 0 ? <Test/> : null} */}
        </div >
    )
}

export default NetworkScore;