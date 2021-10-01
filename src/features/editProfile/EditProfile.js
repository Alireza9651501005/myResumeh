import StyleSheets from "./style/editProfile.module.css";
import { AsyncAPIService } from "../../utils/apiService";
import { useEffect, useState } from "react";
import HomeLoaderComponent from "../../component/homeLoaderComponent/homeLoaderComponent";
import { DateTimeInput, DateTimeInputSimple, DateInput, DateInputSimple } from "react-hichestan-datetimepicker";
import { useHistory } from "react-router";
import HeaderComponent from "../../component/headerComponent";
import CToastComponent from "../../component/CToast/CToastComponent";

const EditProfileComponent = () => {

    const history = useHistory();

    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [changeProImg, setChangeProImg] = useState(false);
    const [error, setError] = useState(false);
    const [pending, setPending] = useState(false);

    const [data, setData] = useState("");
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [certificate, setCertificate] = useState("دکتری");
    const [birthDate, setBirthDate] = useState("");
    const [birthPlace, setBirthPlace] = useState("");
    const [gender, setGender] = useState("");
    const [workplaceSite, setWorkplaceSite] = useState("");
    const [workPosition, setWorkPosition] = useState("");
    const [personalResume, setPersonalResume] = useState("");
    const [instagramLink, setInstagramLink] = useState("");
    const [telegramLink, setTelegramLink] = useState("");
    const [linkedInLink, setLinkedInLink] = useState("");

    const imageOnChange = (e) => {
        setChangeProImg(true);

        let files = e.target.files;
        if (files && files[0]) {

            var FR = new FileReader();

            FR.addEventListener("load", function (e) {
                document.getElementById("img").src = e.target.result;
                console.log(e.target.result);
                setImage(e.target.result);
            });

            FR.readAsDataURL(files[0]);
        }
    }


    const nameOnChange = (event) => {
        setName(event.target.value);
    }

    const usernameOnChange = (event) => {
        setUsername(event.target.value);
    }

    const emailOnChange = (event) => {
        setEmail(event.target.value);
    }

    const certificateOnChange = (event) => {
        console.log(event.target.value);
        setCertificate(event.target.value);
    }

    const workPositionOnChange = (event) => {
        setWorkPosition(event.target.value);
    }

    const birthPlaceOnChange = (event) => {
        setBirthPlace(event.target.value);
    }

    const birthDateOnChange = (event) => {
        setBirthDate(event.target.value);
    }

    const personalResumeOnChange = (event) => {
        setPersonalResume(event.target.value);
    }

    const getPersonalInfo = () => {
        setPending(true);
        setError(false);
        AsyncAPIService(
            "/user/profile/optional-info",
            "GET",
            {
                onSuccess(response) {
                    setPending(false);
                    setError(false);
                    setData(response.data.data);
                    setImage(response.data.data.image);
                    setName(response.data.data.name);
                    setUsername(response.data.data.username);
                    setEmail(response.data.data.email);
                    setCertificate(response.data.data.certificate);
                    setBirthDate(response.data.data.birth_date);
                    setBirthPlace(response.data.data.birth_place);
                    setGender(response.data.data.gender);
                    setWorkplaceSite(response.data.data.workplace_site);
                    setWorkPosition(response.data.data.work_position);
                    setPersonalResume(response.data.data.personal_resume);
                    setInstagramLink(response.data.data.instagram_link);
                    setTelegramLink(response.data.data.telegram_link);
                    setLinkedInLink(response.data.data.linkedIn_link);
                },
                onFail(error) {
                    setPending(false);
                    setError(true);
                }
            },
            {
                // headers: {
                //     Authorization: 'Bearer ' + access_token,
                //     device_uuid: uuid
                // }
            },
            {
                toast: {
                    fail: 'مشکلی در ارتباط با سرور پیش آمده'
                },
                useAccessToken: true,
                useDeviceUid: true
            }
        )
    }

    const editPersonalInfo = () => {
        setPending(true);
        AsyncAPIService(
            "/user/profile/optional-info",
            "POST",
            {
                onSuccess(response) {
                    if (changeProImg) {
                        updateProfileImage();
                    }
                    setPending(false);
                    setMessage(response.data.message.message);
                    setType(response.data.message.type);
                    setTimeout(() => {
                        setMessage('');
                    }, 2000);
                },
                onFail(error) {
                    setPending(false);
                    setMessage(error.response.data.message.message);
                    setType(error.response.data.message.type);
                    setTimeout(() => {
                        setMessage('');
                    }, 2000);
                }
            },
            {
                // headers: {
                //     Authorization: 'Bearer ' + access_token,
                //     device_uuid: uuid
                // },
                body: {
                    image: image,
                    name: name,
                    username: username,
                    email: email,
                    certificate: certificate,
                    birth_date: birthDate,
                    birth_place: birthPlace,
                    work_position: workPosition,
                    personal_resume: personalResume
                }
            },
            {
                toast: {
                    fail: 'مشکلی در ارتباط با سرور پیش آمده'
                },
                useAccessToken: true,
                useDeviceUid: true
            }
        );
    }

    const updateProfileImage = () => {
        AsyncAPIService(
            "/user/profile/image",
            "POST",
            {
                onSuccess(response) {
                    setPending(false);
                    setMessage(response.data.message.message);
                    setType(response.data.message.type);
                    setTimeout(() => {
                        setMessage('');
                    }, 2000);
                },
                onFail(error) {
                    setPending(false);
                    setMessage(error.response.data.message.message);
                    setType(error.response.data.message.type);
                    setTimeout(() => {
                        setMessage('');
                    }, 2000);
                }
            },
            {
                // headers: {
                //     Authorization: 'Bearer ' + access_token,
                //     device_uuid: uuid
                // },
                body: {
                    file: image
                }
            },
            {
                toast: {
                    fail: 'مشکلی در ارتباط با سرور پیش آمده'
                },
                useAccessToken: true,
                useDeviceUid: true
            }
        );
    }

    const back = () => {
        history.goBack();
    }

    useEffect(() => {
        getPersonalInfo();
    }, [])

    return (
        <div style={{ backgroundColor: '#E4E4EA', height: 'auto', paddingBottom: '15px' }}>
            <HeaderComponent className="fixed-top"
                title="ویرایش پروفایل" />

            {message != "" ? type === "error" ? <CToastComponent message={message} type={0} /> : <CToastComponent message={message} type={1} /> : null}

            {error ? <span className={StyleSheets.centerSpan} onClick={getPersonalInfo}>
                تلاش مجدد
                <img className={StyleSheets.moreChance} />
            </span>
                : null}
            {pending ? <HomeLoaderComponent />
                : null}

            {
                data ?
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ width: '100px', display: 'block', margin: 'auto' }}>
                            <img id="img" className={StyleSheets.centerImg} src={image} />

                            <input
                                id="fileinput"
                                type="file"
                                onChange={imageOnChange}
                                style={{ visibility: 'hidden' }}
                            />
                            <label htmlFor="fileinput" className={StyleSheets.centerCameraBtn} />
                        </div>
                        <br />

                        <div style={{ paddingBottom: '15px' }}>


                            <span className={StyleSheets.spanStyle} style={{ top: '190px' }}>نام و نام خانوادگی</span>
                            <input
                                id="inputFile"
                                type="text"
                                value={name}
                                onChange={nameOnChange}
                                className={StyleSheets.inputStyle}
                                style={{ top: '220px' }}>
                            </input>

                            <span className={StyleSheets.spanStyle} style={{ top: '270px' }}>ایمیل</span>
                            <input
                                type="email"
                                value={email}
                                onChange={emailOnChange}
                                className={StyleSheets.inputStyle}
                                style={{ top: '300px' }}>

                            </input>

                            <span className={StyleSheets.spanStyle} style={{ top: '350px' }}>نام مستعار</span>
                            <input
                                type="text"
                                value={username}
                                onChange={usernameOnChange}
                                className={StyleSheets.inputStyle}
                                style={{ top: '380px' }}>

                            </input>

                            <span className={StyleSheets.spanStyle} style={{ top: '430px' }}>تحصیلات</span>
                            <select
                                onChange={certificateOnChange}
                                value={certificate}
                                className={StyleSheets.inputStyle}
                                style={{ top: '460px', padding: '5px' }}>
                                <option>دکتری</option>
                                <option>کارشناسی ارشد</option>
                                <option>کارشناسی</option>
                                <option>کاردانی</option>
                                <option>دیپلم</option>
                            </select>

                            <span className={StyleSheets.spanStyle} style={{ top: '510px' }}>سمت شغلی</span>
                            <input
                                type="text"
                                value={workPosition}
                                onChange={workPositionOnChange}
                                className={StyleSheets.inputStyle}
                                style={{ top: '540px' }}>

                            </input>

                            <div style={{ width: '100%' }}>
                                <div style={{ float: 'right' }}>
                                    <span className={StyleSheets.spanStyle} style={{ top: '590px' }}>تاریخ تولد</span>
                                    <DateInputSimple
                                        value={birthDate}
                                        onChange={birthDateOnChange}
                                        className={StyleSheets.inputStyleInlineRight}
                                        style={{ top: '620px', textAlign: 'center' }}>

                                    </DateInputSimple>
                                </div>

                                <div style={{ float: 'left' }}>
                                    <span className={StyleSheets.spanStyleLeft} style={{ top: '590px' }}>شهر</span>
                                    <input
                                        type="text"
                                        value={birthPlace}
                                        onChange={birthPlaceOnChange}
                                        className={StyleSheets.inputStyleInlineLeft}
                                        style={{ top: '620px' }}>

                                    </input>
                                </div>
                            </div>

                            <span className={StyleSheets.spanStyle} style={{ top: '670px' }}>رزومه شغلی</span>
                            <textarea
                                value={personalResume}
                                onChange={personalResumeOnChange}
                                rows="10"
                                className={StyleSheets.inputStyle}
                                style={{ top: '700px', height: '80px' }}>

                            </textarea>

                            <button onClick={editPersonalInfo} style={{ position: 'absolute', top: '800px', bottom: '15px', border: 'none', backgroundColor: '#39c2fd', color: 'white', fontFamily: 'IRANSans', borderRadius: '15px', width: '70px', height: '40px', left: '40px' }}>تایید</button>
                            <br />
                        </div>
                    </div>
                    : null
            }
        </div >
    )
}

export default EditProfileComponent;