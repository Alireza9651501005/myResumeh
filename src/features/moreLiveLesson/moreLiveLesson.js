import React, { Component, useEffect, useState } from 'react';
import StyleSheets from "./style/MoreLiveLesson.module.css";
import HomeLoaderComponent from "../../component/homeLoaderComponent/homeLoaderComponent";
import { AsyncAPIService } from "../../utils/apiService";
import LiveMoreItemListComponent from "./component/liveMoreItemList";
import getBrowserInfo from "../../component/browserInfo/BrowserInfo";
import MoreHeader from "../../component/moreHeader";

const MoreLiveLesson = () => {
    const [data, setData] = useState([]);
    const [contentRows, setContentRows] = useState([]);
    const [error, setError] = useState(false);
    const [pending, setPending] = useState(false);

    const [inputValue, setInputValue] = useState("");

    const inputOnChange = (event) => {
        setInputValue(event.target.value);
    }

    const getLatestCourse = (os_version, device_brand) => {
        setPending(true);
        AsyncAPIService(
            "/app/instagram-lives?page=1",
            "GET",
            {
                onSuccess(res) {
                    setPending(false);
                    setData(res.data);
                    setContentRows(res.data.data.content_rows);
                    console.log(res.data.data.content_rows);
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


    useEffect(() => {
        var browser = getBrowserInfo();
        getLatestCourse(browser.version, browser.name);

    }
        , []);

    return (
        <div>
            <MoreHeader
                title="دوره های آموزشی"
                onChange={inputOnChange}
                value={inputValue}
            />
            {pending ? <HomeLoaderComponent /> : null}
            {data ?
                <div className={StyleSheets.MoreLeatestLessonComponent} style={{}}>
                    {contentRows.map((el, index) => {
                        return (
                            <div key={index}>
                                <LiveMoreItemListComponent el={el} />
                            </div>
                        )
                    })}

                </div>
                : null}
        </div>
    );
}

export default MoreLiveLesson;