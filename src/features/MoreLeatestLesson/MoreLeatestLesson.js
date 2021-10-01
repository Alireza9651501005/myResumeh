import React, { Component, useEffect, useState } from 'react';
import StyleSheets from "./style/MoreLeatestLesson.module.css";
import HomeLoaderComponent from "../../component/homeLoaderComponent/homeLoaderComponent";
import { AsyncAPIService } from "../../utils/apiService";
import { store } from "../../store/store";
import { debounce } from '@material-ui/core';
import CourseMoreItemListComponent from "./component/courseMoreItemList";
import getBrowserInfo from "../../component/browserInfo/BrowserInfo";
import MoreHeader from "../../component/moreHeader";

function MoreLeatestLessonComponent(props) {

    const [numOfPage, setNumOfPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    const [data, setData] = useState([]);
    const [contentRows, setContentRows] = useState([]);
    const [mainList, setMainList] = useState([]);
    const [error, setError] = useState(false);
    const [pending, setPending] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const inputOnChange = (event) => {
        setInputValue(event.target.value);
        console.log(event.target.value);
    }

    const handleSubmited = () => {
        console.log("submit");
    }

    const loadMore = () => {
        console.log('end of scroll');
        if (numOfPage != lastPage) {
            let newPageNum = numOfPage;
            setNumOfPage(newPageNum++);
            getLatestCourse();
        }
        else {
            console.log('else');
        }
    }

    window.onscroll = debounce(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            loadMore();
        }
    }, 100);

    const getLatestCourse = (os_version, device_brand) => {
        setPending(true);
        setError(false);
        AsyncAPIService(
            "/app/latest-course?page=" + numOfPage,
            "GET",
            {
                onSuccess(res) {
                    if (lastPage === 0) {
                        setLastPage(res.data.data.last_page);
                    }
                    setPending(false);
                    setError(false);
                    setData(res.data);
                    let newContentRow = contentRows.concat(res.data.data.content_rows);
                    setContentRows(newContentRow);
                    setMainList(newContentRow);
                    console.log(res.data);
                    // console.log(res.data.data.content_rows);
                },
                onFail() {
                    setPending(false);
                    setError(true);
                }
            },
            {
                headers: {
                    client_secret: 'WtVEK|6le7uH1c%B+TEo54w!(x4hl2*s$UJ7$D+o|y0G2V1idUUX)7ol@$cc`znW,TnL@#cU8)AztB4s$NA!S*3wN,x*1oabqDUL',
                    os: 4,
                    os_version: os_version,
                    device_brand: device_brand,
                    // device_uuid: ''
                }
            },
            {
                toast: {
                    fail: "مشکلی در ارتباط با سرور به وجود آمده است",
                },
                useDeviceUid: false
            }
        );
    }

    const retry = () => {
        var browser = getBrowserInfo();
        getLatestCourse(browser.version, browser.name);
    }

    useEffect(() => {
        var browser = getBrowserInfo();
        getLatestCourse(browser.version, browser.name);
    }
        , []);

    return (
        <div className={StyleSheets.MoreLeatestLessonComponent}>

            <MoreHeader
                title="دوره های آموزشی"
                inputOnChange={inputOnChange}
                inputValue={inputValue}
            />
            {pending ? <HomeLoaderComponent /> : null}

            {error ? <span className={StyleSheets.centerSpan} onClick={retry}>
                تلاش مجدد
              <img className={StyleSheets.moreChance} />
            </span>
                : null}

            {data ?
                <div style={{ marginBottom: '120px' }}>
                    {contentRows.map((el, index) => {
                        return (
                            <div key={index}>
                                <CourseMoreItemListComponent el={el} />
                            </div>
                        )
                    })}

                </div>
                : null}
        </div>
    );
}

export default MoreLeatestLessonComponent;