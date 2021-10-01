import React, { useEffect, useState } from 'react';
import StyleSheets from "./style/navStyle.module.css";
import { useHistory } from 'react-router';

const NavBar = props => {
    let history = useHistory();

    const [homeLabel, setHomeLabel] = useState("");
    const [proLabel, setProLabel] = useState("پروفایل");
    const [walletLabel, setWalletLabel] = useState("اعتبار");
    const [coursesLabel, setCoursesLabel] = useState("دوره‌های من");
    const [messageLabel, setMessageLabel] = useState("پیام‌ها");

    console.log(props.itemSelected);

    const handleStatusBasedOnProps = () => {
        switch (props.itemSelected) {
            case "courses":
                setHomeLabel("خانه");
                setWalletLabel("اعتبار");
                setCoursesLabel("");
                setProLabel("پروفایل");
                setMessageLabel("پیام‌ها");
                break;
            case "course-view":
                if (props.from === "myCourse") {
                    setHomeLabel("خانه");
                    setWalletLabel("اعتبار");
                    setCoursesLabel("");
                    setProLabel("پروفایل");
                    setMessageLabel("پیام‌ها");
                }
                else if (props.from === "profile") {
                    setHomeLabel("خانه");
                    setWalletLabel("اعتبار");
                    setMessageLabel("پیام‌ها");
                    setProLabel("");
                    setCoursesLabel("دوره‌های من");
                }
                else {
                    setHomeLabel("");
                    setWalletLabel("اعتبار");
                    setMessageLabel("پیام‌ها");
                    setProLabel("پروفایل");
                    setCoursesLabel("دوره‌های من");
                }
                break;
            case "profile":
                setHomeLabel("خانه");
                setWalletLabel("اعتبار");
                setMessageLabel("پیام‌ها");
                setProLabel("");
                setCoursesLabel("دوره‌های من");
                break;
            case "home":
                setHomeLabel("");
                setWalletLabel("اعتبار");
                setMessageLabel("پیام‌ها");
                setProLabel("پروفایل");
                setCoursesLabel("دوره‌های من");
                break;
            case "wallet":
                setHomeLabel("خانه");
                setWalletLabel("");
                setMessageLabel("پیام‌ها");
                setProLabel("پروفایل");
                setCoursesLabel("دوره‌های من");
                break;
            case "message":
                setHomeLabel("خانه");
                setWalletLabel("اعتبار");
                setCoursesLabel("دوره‌های من");
                setProLabel("پروفایل");
                setMessageLabel("");
                break;
            case "more":
                setHomeLabel("");
                setWalletLabel("اعتبار");
                setMessageLabel("پیام‌ها");
                setProLabel("پروفایل");
                setCoursesLabel("دوره‌های من");
                break;
            default:
                setHomeLabel("");
                setWalletLabel("اعتبار");
                setMessageLabel("پیام‌ها");
                setProLabel("پروفایل");
                setCoursesLabel("دوره‌های من");
                break;
        }
    }

    useEffect(() => {
        console.log("useeFFECT");
        handleStatusBasedOnProps();
    }, []);



    const handleStatusBasedOnItemSelect = (event) => {
        if (document.getElementById('home').checked) {
            history.push("/Home");
            setHomeLabel("");
            setWalletLabel("اعتبار");
            setMessageLabel("پیام‌ها");
            setProLabel("پروفایل");
            setCoursesLabel("دوره‌های من");
        } else if (document.getElementById('wallet').checked) {
            history.push("/wallet");
            setHomeLabel("خانه");
            setWalletLabel("");
            setMessageLabel("پیام‌ها");
            setProLabel("پروفایل");
            setCoursesLabel("دوره‌های من");
        } else if (document.getElementById('courses').checked) {
            history.push("/courses");
            setHomeLabel("خانه");
            setWalletLabel("اعتبار");
            setCoursesLabel("");
            setProLabel("پروفایل");
            setMessageLabel("پیام‌ها");
        } else if (document.getElementById('profile').checked) {
            history.push("/profile");
            setHomeLabel("خانه");
            setWalletLabel("اعتبار");
            setMessageLabel("پیام‌ها");
            setProLabel("");
            setCoursesLabel("دوره‌های من");
        } else if (document.getElementById('message').checked) {
            history.push("/message");
            setHomeLabel("خانه");
            setWalletLabel("اعتبار");
            setCoursesLabel("دوره‌های من");
            setProLabel("پروفایل");
            setMessageLabel("");
        }
    }

    return (
        <div>
            {props.itemSelected === "courses" ?
                <div>
                    <div style={{ marginBottom: '80px', backgroundColor: '#E4E4EA' }}>
                        {props.children}
                    </div>

                    <footer>
                        <div >
                            <meta charSet="UTF-8" />
                            <title>Tab bar Animation CSS</title>
                            {/* <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n    label {\n      cursor: pointer;\n      display: flex;\n      z-index: 2;\n      width: 33%;\n      height: 66px;\n      position: relative;\n      align-items: center;\n      justify-content: center;\n    }\n\n    label>img {\n      position: absolute;\n      width: 25px;\n      top: 0;\n      bottom: 0;\n      margin: auto;\n      z-index: 3;\n      transition: 200ms 100ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n    label::before {\n      content: '';\n      position: absolute;\n    }\n\n    .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: 40%;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: 40%;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} /> */}
                            <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n       .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: 40%;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: 40%;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} />

                            <div>
                                <div className="fixed-bottom" style={{ height: '60px', margin: '45px 0px 5px 0px' }}>
                                    <div style={{ backgroundColor: '#232a47' }} className="phone">
                                        <input type="radio" name="s" id="profile" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="wallet" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="home" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="courses" className="input" onClick={handleStatusBasedOnItemSelect} defaultChecked="checked" />
                                        <input type="radio" name="s" id="message" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <label style={{ marginBottom: '10px' }} htmlFor="profile" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.profile} /><br /> <br /> <br /> {proLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="wallet" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.wallet} /><br />  <br /><br /> {walletLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="home" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.home} /><br />  <br /><br /> {homeLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="courses" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.courses} /><br /> <br /> <br />{coursesLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="message" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.message} /><br /> <br /> <br />{messageLabel}</label>
                                        <div className="circle" />
                                        <div className="phone_content" >
                                            <div className="phone_bottom" >
                                                <span className="indicator" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                :
                null}

            {props.itemSelected === "profile" ?
                <div>
                    <div style={{ marginBottom: '80px', backgroundColor: '#E4E4EA' }}>
                        {props.children}
                    </div>

                    <footer>
                        <div >
                            <meta charSet="UTF-8" />
                            <title>Tab bar Animation CSS</title>
                            <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n   .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: -80%;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: -80%;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} />
                            {/* <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n    label {\n      cursor: pointer;\n      display: flex;\n      z-index: 2;\n      width: 33%;\n      height: 66px;\n      position: relative;\n      align-items: center;\n      justify-content: center;\n    }\n\n    label>img {\n      position: absolute;\n      width: 25px;\n      top: 0;\n      bottom: 0;\n      margin: auto;\n      z-index: 3;\n      transition: 200ms 100ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n    label::before {\n      content: '';\n      position: absolute;\n    }\n\n    .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: -80%;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: -80%;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} /> */}
                            <div>
                                <div className="fixed-bottom" style={{ height: '60px', margin: '45px 0px 5px 0px' }}>
                                    <div style={{ backgroundColor: '#232a47' }} className="phone">
                                        <input type="radio" name="s" id="profile" className="input" onClick={handleStatusBasedOnItemSelect} defaultChecked="checked" />
                                        <input type="radio" name="s" id="wallet" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="home" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="courses" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="message" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <label style={{ marginBottom: '10px' }} htmlFor="profile" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.profile} /><br /> <br /> <br /> {proLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="wallet" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.wallet} /><br />  <br /><br /> {walletLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="home" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.home} /><br />  <br /><br /> {homeLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="courses" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.courses} /><br /> <br /> <br />{coursesLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="message" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.message} /><br /> <br /> <br />{messageLabel}</label>
                                        <div className="circle" />
                                        <div className="phone_content" >
                                            <div className="phone_bottom" >
                                                <span className="indicator" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                :
                null}

            {props.itemSelected === "home" ?
                <div>
                    <div style={{ marginBottom: '80px', backgroundColor: '#E4E4EA' }}>
                        {props.children}
                    </div>

                    <footer>
                        <div >
                            <meta charSet="UTF-8" />
                            <title>Tab bar Animation CSS</title>
                            {/* <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n    label {\n      cursor: pointer;\n      display: flex;\n      z-index: 2;\n      width: 33%;\n      height: 66px;\n      position: relative;\n      align-items: center;\n      justify-content: center;\n    }\n\n    label>img {\n      position: absolute;\n      width: 25px;\n      top: 0;\n      bottom: 0;\n      margin: auto;\n      z-index: 3;\n      transition: 200ms 100ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n    label::before {\n      content: '';\n      position: absolute;\n    }\n\n    .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: 0;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: 0;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} /> */}
                            <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n    .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: 0;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: 0;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} />
                            <div>
                                <div className="fixed-bottom" style={{ height: '60px', margin: '45px 0px 5px 0px' }}>
                                    <div style={{ backgroundColor: '#232a47' }} className="phone">
                                        <input type="radio" name="s" id="profile" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="wallet" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="home" className="input" onClick={handleStatusBasedOnItemSelect} defaultChecked="checked" />
                                        <input type="radio" name="s" id="courses" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="message" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <label style={{ marginBottom: '10px' }} htmlFor="profile" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.profile} /><br /> <br /> <br /> {proLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="wallet" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.wallet} /><br />  <br /><br /> {walletLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="home" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.home} /><br />  <br /><br /> {homeLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="courses" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.courses} /><br /> <br /> <br />{coursesLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="message" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.message} /><br /> <br /> <br />{messageLabel}</label>
                                        <div className="circle" />
                                        <div className="phone_content" >
                                            <div className="phone_bottom" >
                                                <span className="indicator" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                :
                null}

            {props.itemSelected === "wallet" ?
                <div>
                    <div style={{ marginBottom: '80px', backgroundColor: '#E4E4EA' }}>
                        {props.children}
                    </div>

                    <footer>
                        <div >
                            <meta charSet="UTF-8" />
                            <title>Tab bar Animation CSS</title>
                            {/* <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n    label {\n      cursor: pointer;\n      display: flex;\n      z-index: 2;\n      width: 33%;\n      height: 66px;\n      position: relative;\n      align-items: center;\n      justify-content: center;\n    }\n\n    label>img {\n      position: absolute;\n      width: 25px;\n      top: 0;\n      bottom: 0;\n      margin: auto;\n      z-index: 3;\n      transition: 200ms 100ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n    label::before {\n      content: '';\n      position: absolute;\n    }\n\n    .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: -40%;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: -40%;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} /> */}
                            <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n   .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: -40%;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: -40%;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} />
                            <div>
                                <div className="fixed-bottom" style={{ height: '60px', margin: '45px 0px 5px 0px' }}>
                                    <div style={{ backgroundColor: '#232a47' }} className="phone">
                                        <input type="radio" name="s" id="profile" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="wallet" className="input" onClick={handleStatusBasedOnItemSelect} defaultChecked="checked" />
                                        <input type="radio" name="s" id="home" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="courses" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="message" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <label style={{ marginBottom: '10px' }} htmlFor="profile" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.profile} /><br /> <br /> <br /> {proLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="wallet" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.wallet} /><br />  <br /><br /> {walletLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="home" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.home} /><br />  <br /><br /> {homeLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="courses" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.courses} /><br /> <br /> <br />{coursesLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="message" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.message} /><br /> <br /> <br />{messageLabel}</label>
                                        <div className="circle" />
                                        <div className="phone_content" >
                                            <div className="phone_bottom" >
                                                <span className="indicator" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                :
                null}


            {props.itemSelected === "message" ?
                <div>
                    <div style={{ marginBottom: '80px', backgroundColor: '#E4E4EA' }}>
                        {props.children}
                    </div>

                    <footer>
                        <div >
                            <meta charSet="UTF-8" />
                            <title>Tab bar Animation CSS</title>
                            {/* <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n    label {\n      cursor: pointer;\n      display: flex;\n      z-index: 2;\n      width: 33%;\n      height: 66px;\n      position: relative;\n      align-items: center;\n      justify-content: center;\n    }\n\n    label>img {\n      position: absolute;\n      width: 25px;\n      top: 0;\n      bottom: 0;\n      margin: auto;\n      z-index: 3;\n      transition: 200ms 100ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n    label::before {\n      content: '';\n      position: absolute;\n    }\n\n    .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: 80%;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: 80%;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} /> */}
                            <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n    .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: 80%;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: 80%;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} />
                            <div>
                                <div className="fixed-bottom" style={{ height: '60px', margin: '45px 0px 5px 0px' }}>
                                    <div style={{ backgroundColor: '#232a47' }} className="phone">
                                        <input type="radio" name="s" id="profile" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="wallet" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="home" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="courses" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="message" className="input" onClick={handleStatusBasedOnItemSelect} defaultChecked="checked" />
                                        <label style={{ marginBottom: '10px' }} htmlFor="profile" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.profile} /><br /> <br /> <br /> {proLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="wallet" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.wallet} /><br />  <br /><br /> {walletLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="home" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.home} /><br />  <br /><br /> {homeLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="courses" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.courses} /><br /> <br /> <br />{coursesLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="message" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.message} /><br /> <br /> <br />{messageLabel}</label>
                                        <div className="circle" />
                                        <div className="phone_content" >
                                            <div className="phone_bottom" >
                                                <span className="indicator" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                :
                null}

            {props.itemSelected === "more" ?
                <div>
                    <div style={{ marginBottom: '120px', backgroundColor: '#E4E4EA' }}>
                        {props.children}
                    </div>

                    <footer>
                        <div >
                            <meta charSet="UTF-8" />
                            <title>Tab bar Animation CSS</title>
                            {/* <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n    label {\n      cursor: pointer;\n      display: flex;\n      z-index: 2;\n      width: 33%;\n      height: 66px;\n      position: relative;\n      align-items: center;\n      justify-content: center;\n    }\n\n    label>img {\n      position: absolute;\n      width: 25px;\n      top: 0;\n      bottom: 0;\n      margin: auto;\n      z-index: 3;\n      transition: 200ms 100ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n    label::before {\n      content: '';\n      position: absolute;\n    }\n\n    .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: 0;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: 0;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} /> */}
                            <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n   .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: 0;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: 0;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} />
                            <div>
                                <div className="fixed-bottom" style={{ height: '60px', margin: '45px 0px 5px 0px' }}>
                                    <div style={{ backgroundColor: '#232a47' }} className="phone">
                                        <input type="radio" name="s" id="profile" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="wallet" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="home" className="input" onClick={handleStatusBasedOnItemSelect} defaultChecked="checked" />
                                        <input type="radio" name="s" id="courses" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="message" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <label style={{ marginBottom: '10px' }} htmlFor="profile" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.profile} /><br /> <br /> <br /> {proLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="wallet" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.wallet} /><br />  <br /><br /> {walletLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="home" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.home} /><br />  <br /><br /> {homeLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="courses" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.courses} /><br /> <br /> <br />{coursesLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="message" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.message} /><br /> <br /> <br />{messageLabel}</label>
                                        <div className="circle" />
                                        <div className="phone_content" >
                                            <div className="phone_bottom" >
                                                <span className="indicator" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                :
                null}

            {props.itemSelected === "course-view" && props.from !== "myCourse" && props.from !== 'profile' ?
                <div>
                    <div style={{ marginBottom: '80px', backgroundColor: '#E4E4EA' }}>
                        {props.children}
                    </div>

                    <footer>
                        <div >
                            <meta charSet="UTF-8" />
                            <title>Tab bar Animation CSS</title>
                            <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n   .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: 0;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: 0;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} />
                            <div>
                                <div className="fixed-bottom" style={{ height: '60px', margin: '45px 0px 5px 0px' }}>
                                    <div style={{ backgroundColor: '#232a47' }} className="phone">
                                        <input type="radio" name="s" id="profile" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="wallet" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="home" className="input" onClick={handleStatusBasedOnItemSelect} defaultChecked="checked" />
                                        <input type="radio" name="s" id="courses" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="message" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <label style={{ marginBottom: '10px' }} htmlFor="profile" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.profile} /><br /> <br /> <br /> {proLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="wallet" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.wallet} /><br />  <br /><br /> {walletLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="home" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.home} /><br />  <br /><br /> {homeLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="courses" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.courses} /><br /> <br /> <br />{coursesLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="message" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.message} /><br /> <br /> <br />{messageLabel}</label>
                                        <div className="circle" />
                                        <div className="phone_content" >
                                            <div className="phone_bottom" >
                                                <span className="indicator" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                :
                null}

            {props.itemSelected === "course-view" && props.from === "myCourse" ?
                <div>
                    <div style={{ marginBottom: '80px', backgroundColor: '#E4E4EA' }}>
                        {props.children}
                    </div>

                    <footer>
                        <div >
                            <meta charSet="UTF-8" />
                            <title>Tab bar Animation CSS</title>
                            <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n       .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: 40%;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: 40%;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} />

                            <div>
                                <div className="fixed-bottom" style={{ height: '60px', margin: '45px 0px 5px 0px' }}>
                                    <div style={{ backgroundColor: '#232a47' }} className="phone">
                                        <input type="radio" name="s" id="profile" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="wallet" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="home" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="courses" className="input" onClick={handleStatusBasedOnItemSelect} defaultChecked="checked" />
                                        <input type="radio" name="s" id="message" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <label style={{ marginBottom: '10px' }} htmlFor="profile" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.profile} /><br /> <br /> <br /> {proLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="wallet" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.wallet} /><br />  <br /><br /> {walletLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="home" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.home} /><br />  <br /><br /> {homeLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="courses" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.courses} /><br /> <br /> <br />{coursesLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="message" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.message} /><br /> <br /> <br />{messageLabel}</label>
                                        <div className="circle" />
                                        <div className="phone_content" >
                                            <div className="phone_bottom" >
                                                <span className="indicator" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                :
                null}

            {props.itemSelected === 'course-view' && props.from === 'profile' ?
                <div>
                    <div style={{ marginBottom: '80px', backgroundColor: '#E4E4EA' }}>
                        {props.children}
                    </div>

                    <footer>
                        <div >
                            <meta charSet="UTF-8" />
                            <title>Tab bar Animation CSS</title>
                            <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n   .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: -80%;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: -80%;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} />
                            {/* <style dangerouslySetInnerHTML={{ __html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n\n    }\n\n       .phone {\n      width: 100%;\n      height: 66px;\n   margin: auto ;\n      display: flex;\n      align-items: flex-end;\n      position: relative;\n      justify-content: center;\n    }\n\n    .phone_content {\n    width: 100%;\n       overflow: hidden;\n     position: absolute;\n    }\n\n    .phone_bottom {\n    width: 100%;\n      height: 66px;\n           display: flex;\n      justify-content: center;\n   }\n\n    .input {\n      display: none;\n    }\n\n    label {\n      cursor: pointer;\n      display: flex;\n      z-index: 2;\n      width: 33%;\n      height: 66px;\n      position: relative;\n      align-items: center;\n      justify-content: center;\n    }\n\n    label>img {\n      position: absolute;\n      width: 25px;\n      top: 0;\n      bottom: 0;\n      margin: auto;\n      z-index: 3;\n      transition: 200ms 100ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n    label::before {\n      content: '';\n      position: absolute;\n    }\n\n    .indicator {\n      width: 70px;\n      height: 93px;\n  background-color: #E4E4EA;\n           background-position: cover;\n      background-position: 0 10px;\n     border-radius: 90px;\n   position: absolute;\n      left: -80%;\n      top: -42px;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n    }\n\n  .circle {\n      position: absolute;\n      width: 60px;\n      height: 60px;\n      background: #232a47;\n      top: -15px;\n      z-index: 1;\n      border-radius: 50%;\n      left: -80%;\n      right: 0;\n      margin: auto;\n      transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);\n\n    }\n\n\t#profile:checked~[for=\"profile\"]>img {\n      top: -15px\n    }\n\n    #profile:checked~.circle,\n    #profile:checked~div div .indicator {\n      left: -80%;\n    }\n\t\t\n    #wallet:checked~[for=\"wallet\"]>img {\n      top: -15px\n    }\n\n    #wallet:checked~.circle,\n    #wallet:checked~div div .indicator {\n      left: -40%;\n    }\n\n\t#home:checked~[for=\"home\"]>img {\n      top: -15px\n    }\n\n    #home:checked~.circle,\n    #home:checked~div div .indicator {\n      left: 0;\n    }\n\n    #courses:checked~[for=\"courses\"]>img {\n      top: -15px\n    }\n\n    #courses:checked~.circle,\n    #courses:checked~div div .indicator {\n      left: 40%;\n    }\n\t\n\t #message:checked~[for=\"message\"]>img {\n      top: -15px\n    }\n\n    #message:checked~.circle,\n    #message:checked~div div .indicator {\n      left: 80%;\n    }\n\t\n  " }} /> */}
                            <div>
                                <div className="fixed-bottom" style={{ height: '60px', margin: '45px 0px 5px 0px' }}>
                                    <div style={{ backgroundColor: '#232a47' }} className="phone">
                                        <input type="radio" name="s" id="profile" className="input" onClick={handleStatusBasedOnItemSelect} defaultChecked="checked" />
                                        <input type="radio" name="s" id="wallet" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="home" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="courses" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <input type="radio" name="s" id="message" className="input" onClick={handleStatusBasedOnItemSelect} />
                                        <label style={{ marginBottom: '10px' }} htmlFor="profile" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.profile} /><br /> <br /> <br /> {proLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="wallet" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.wallet} /><br />  <br /><br /> {walletLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="home" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.home} /><br />  <br /><br /> {homeLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="courses" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.courses} /><br /> <br /> <br />{coursesLabel}</label>
                                        <label style={{ marginBottom: '10px' }} htmlFor="message" className={`${StyleSheets.font} ${StyleSheets.label}`}><img className={StyleSheets.message} /><br /> <br /> <br />{messageLabel}</label>
                                        <div className="circle" />
                                        <div className="phone_content" >
                                            <div className="phone_bottom" >
                                                <span className="indicator" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                : null}
        </div>
    )
}


export default NavBar;