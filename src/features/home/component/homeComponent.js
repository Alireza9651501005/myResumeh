import StyleSheets from "./style/home.module.css";
import React, { useState } from 'react';
import ListItem from "../../listItem";
import BannerItem from "../../bannerItem";
import { useHistory } from "react-router";

function HomeComponent(props) {
    const contents = props.contents;
    const [headShow, setHeadShow] = useState(true);
    const history = useHistory();

    const changeHeadShow = () => {
        setHeadShow(!headShow);
    }

    const loginClick = () => {
        history.push("/login");
    }

    return (
        <div>
            {headShow ?
                <div className={`${StyleSheets.homeBanner} fixed-top`} style={{ height: '300px', paddingTop: '10px', textAlign: 'center', backgroundColor: '#232a47', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                    <span style={{ marginRight: 'auto', color: 'white', fontFamily: 'IRANSans' }}>دوره های آموزشی</span>
                    <br />
                    <div style={{ height: '240px', width: '100%' }}  >
                        <button onClick={loginClick} style={{ border: 'none', marginTop: '190px', backgroundColor: '#39c2fd', color: 'white', fontFamily: 'IRANSans', borderRadius: '15px', width: '100px', height: '40px' }}>ورود/ثبت نام</button>
                    </div>
                    <img className={StyleSheets.arrowUp} onClick={changeHeadShow} />
                </div>
                :
                <div className="fixed-top" style={{ height: '50px', paddingTop: '10px', textAlign: 'center', backgroundColor: '#232a47', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                    <span style={{ marginRight: 'auto', color: 'white', fontFamily: 'IRANSans' }}>آکادمی ثروت آفرینان</span>
                    <br />
                    <img className={StyleSheets.arrowDown} onClick={changeHeadShow} />
                </div>
            }
            <div style={{ marginTop: headShow ? '300px' : '50px' }}>
                {
                    contents.map((el, index) => {
                        if (el.type == "banner") {
                            return (
                                <BannerItem key={index} items={el.items} full={el.full} />
                            )
                        }
                        else if (el.type == "item-list") {
                            return (
                                <ListItem key={index} contents={el} itemLayout={el.item_layout} />
                            )
                        }
                    })
                }
            </div>
        </div >
    )
}

export default HomeComponent;