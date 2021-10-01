import ScoreReport from "./component/scoreReport";
import HeaderComponent from "./component/headerComponent";
import { AsyncAPIService, CONFIG } from "../../utils/apiService";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import StyleSheets from "./style/ScienceScore.module.css";


const scoreReducer = (scores, action) => {
    switch (action.type) {
        case 'ADD':
            return [...scores, action.scores];
        default:
            return;
    }
}

const ScienceScorePage = () => {

    const [scores, scoresDispatch] = useReducer(scoreReducer, []);

    const [current_page, setCurrent_page] = useState(1);
    const [last_page, setLast_page] = useState(0);
    const [total, setTotal] = useState(0);

    const [arrow, setArrow] = useState(false);

    const loadMore = () => {
        if (current_page != last_page) {
            let newcurrent_page = current_page;
            let newPage = newcurrent_page + 1;
            setCurrent_page(current_page + 1);
            getScienceScore(newPage);
        }
    }

    const getScienceScore = (page) => {
        AsyncAPIService(
            `/user/profile/score-report?page=${page}`,
            "GET",
            {
                onSuccess(res) {
                    console.log(res.data);
                    const data = res.data.data;
                    setLast_page(data.last_page);
                    setTotal(data.total);
                    for (let index = 0; index < data.content_rows.length; index++) {
                        const element = data.content_rows[index];
                        scoresDispatch({ type: 'ADD', scores: element });
                    }
                },
                onFail(err) {
                    console.log(err);
                }
            },
            {
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
        getScienceScore(1);
    }, [])

    const arrowClick = () => {
        setArrow(!arrow);
    }

    return (
        <div style={{ overflow: 'auto', minHeight: '100vh' }}>
            <HeaderComponent title="امتیاز علمی" />

            <div style={{ textAlign: 'right', marginTop: '70px', marginRight: '10px' }}>
                <span className={StyleSheets.spanbold}>نحوه دریافت امتیاز علمی</span>
                <img onClick={arrowClick} className={arrow ? StyleSheets.arrowUp : StyleSheets.arrowDown} />
            </div>

            {arrow ?
                <div style={{ textAlign: 'justify', direction: 'rtl', margin: '20px 10px' }}>
                    <span className={StyleSheets.span}>
                        سطح علمی دانش آموزان در آکادمی ثروت آفرینان بر اساس دو فاکتور
                        اصلی محاسبه می‌گردد،
                        شرکت در دوره‌های آموزشی و مشارکت در آموزش با دیگر کاربران.
                        از آنجایی که هر دوره آموزشییک امتیاز علمی دارد و به دو صورت
                        ویدیویی و اینترکتیو ارایه می‌گردد، کاربر بعد از پایان هر درس امتیاز
                        علمی ان درس را به نسبت امتیاز علمی تعیین شده برای دوره دریافت
                        می‌کند. ۴۰ درصد از امتیاز هر دوره مربوط به اموزش ویدیویی
                        و ۶۰ درصد مربوط به اموزش اینترکتیو است. قوانین حاکم بر این
                        بخش عبارتند از
                        دریافت درصدی از امتیاز علمی هر دوره پس از پایان مشاهده ویدیو
                        هر درس بر مبنای زمان درس
                        دریافت درصدی از امتیاز علمی هر دوره پس از پایان بخش اینترکتیو
                        هر درس بر مبنای زمان درس
                        دریافت امتیاز امتحان پایان دوره به صورت نسبی بر اساس تست‌های
                        درست – کاربر می‌تواند بینهایت بار در تست شرکت کند ولی تنها بار
                        اول امتیاز او محاسبه می‌گردد.
                        دریافت ۱ امتیاز مثبت بابت درج هر کامنت در صفحه لندینگ دروس
                        دریافت ۲ امتیاز مثبت بابت پاسخ دهی به هر کامنت در صفحه
                        لندینگ دروس
                        دریافت ۳ امتیاز مثبت بابت دریافت هر تاییدیه کامنت از سوی دیگر
                        کاربران
                        دریافت 3 امتیاز منفی بابت دریافت هر عدم تاییدیه کامنت از
                        سوی دیگر کاربران


                    </span>
                </div>
                : null}

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <span className={StyleSheets.spanbold}>تاریخچه امتیاز علمی شما</span>
            </div>

            <div style={{ marginTop: '30px', height: 'auto', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
                <InfiniteScroll
                    dataLength={scores.length}
                    next={loadMore}
                    hasMore={true}
                    loader={<h4></h4>}
                    scrollableTarget="scrollableDiv"
                >
                    {scores.length > 0 ?
                        <div id="scrollableDiv" style={{}}>
                            {scores.map((el, index) => {
                                return (
                                    <ScoreReport content={el} index={index} total={total} />
                                )
                            })}
                        </div>
                        :
                        <div style={{ marginTop: '20px', width: '100vh', display: 'table-cell', textAlign: 'center', marginTop: '20px' }}>
                            <img className={StyleSheets.noscore} />
                            <p className={StyleSheets.span}>!شما هنوز امتیازی کسب نکرده اید</p>
                        </div>
                    }
                </InfiniteScroll>
            </div>
        </div>
    )

}

export default ScienceScorePage;