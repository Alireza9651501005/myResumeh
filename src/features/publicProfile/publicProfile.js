import { AsyncAPIService } from "../../utils/apiService";
import StyleSheets from "./style/publicProfile.module.css";
import PublicProfileComponent from "./component/publicProfileComponent";
import { useEffect, useState } from "react";
import HomeLoaderComponent from "../../component/homeLoaderComponent/homeLoaderComponent";
import HeaderComponent from "../../component/headerComponent";

const PublicProfile = (props) => {

    const id = props.location.state.id;
    const username = props.location.state.username;

    const [data, setData] = useState();

    const [errorMessage, setErrorMessage] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(false);

    const getUserPublicProfile = (page) => {
        setPending(true);
        AsyncAPIService(
            "/users/" + id + "/public-profile",
            "GET",
            {
                onSuccess(response) {
                    setPending(false);
                    setData(response.data);
                },
                onFail(err) {
                    setPending(false);
                    if (err.response != undefined) {
                        setErrorMessage(err.response.data.message.message);
                        setTimeout(() => {
                            setErrorMessage('');
                        }, 2000);
                    }
                    else {
                        setErrorMessage('مشکلی در ارتباط با سرور به وجود آمده است');
                        setTimeout(() => {
                            setErrorMessage('');
                        }, 2000);
                    }
                }
            },
            {
                params: {
                    page: page
                },
                // headers: {
                //     Authorization: "Bearer " + access_token,
                //     device_uuid: uuid
                // }
            },
            {
                useAccessToken: true,
                useDeviceUid: true
            }
        )
    }

    useEffect(() => {
        getUserPublicProfile();
    }, [])

    return (
        <div style={{ backgroundColor: '#e4e4ea' }}>
            {errorMessage != "" ? <span className={StyleSheets.center} style={{ color: 'white', fontFamily: 'IRANSans', position: 'absolute', backgroundColor: 'red', padding: '2px', borderRadius: '25px' }}>{errorMessage}</span> : null}
            {pending ? <HomeLoaderComponent /> : null}
            {error ? <span className={StyleSheets.centerSpan} onClick={getUserPublicProfile}>
                تلاش مجدد
              <img className={StyleSheets.moreChance} />
            </span>
                : null}
            <HeaderComponent title="پروفایل عمومی" />
            {data ? <PublicProfileComponent data={data} username={username} /> : null}
        </div>
    )
}

export default PublicProfile;