import NavBar from "../nav/nav";
import StyleSheets from "./style/profile.module.css";
import { useSelector } from "react-redux";
import { AsyncAPIService } from "../../utils/apiService";
import * as ActionType from "../../redux/login/action/LogInAction";
import { store } from "../../store/store";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import ProfileComponent from "./Component/profileComponent";
import HomeLoaderComponent from "../../component/homeLoaderComponent/homeLoaderComponent";
import MainHeader from "../../component/header/MainHeader";
import SingnOutComponent from "../../component/signoutComponent/SingnOutComponent";


const Profile = () => {

  const state = useSelector(state => state);
  const login = state.LogInReducer.isLogIn;
  const history = useHistory();

  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  const editProfile = () => {
    console.log("click");
    history.push("/editProfile");
  }

  const profileSetting = () => {
    history.push("/accountSetting");
  }

  const getUserInformation = () => {
    setPending(true);
    setError(false);
    AsyncAPIService(
      "/user/profile",
      "GET",
      {
        onSuccess(res) {
          setData(res.data);
          setError(false);
          setPending(false);
          console.log(res.data);
        },
        onFail(err) {
          setError(true);
          setPending(false);
        }
      },
      {
        // headers: {
        //   Authorization: "Bearer " + access_token,
        //   device_uuid: uuid
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
    if (login) {
      getUserInformation();
    }
  }, [])

  return (
    <NavBar itemSelected="profile">
      {
        login ?
          <div style={{ overflow: 'scroll', marginBottom: '80px' }}>
            <MainHeader title="پروفایل" />
            {error ? <span className={StyleSheets.centerSpan} onClick={getUserInformation}>
              تلاش مجدد
              <img className={StyleSheets.moreChance} />
            </span>
              : null}
            {pending ? <HomeLoaderComponent />
              : null}
            {data ?
              <div>
                <div style={{ width: '100%' }}>
                  <ProfileComponent data={data} />
                </div>
                <button style={{ fontSize: '13px', height: '40px', width: '130px', border: 'none', float: 'right', backgroundColor: 'white', marginRight: '15px', color: 'black', fontFamily: 'IRANSans', borderRadius: '10px', paddingRight: '10px', paddingLeft: '10px' }} onClick={editProfile}>
                  <span>ویرایش پروفایل</span>
                  <img className={StyleSheets.editIcon} />
                </button>

                <button style={{ fontSize: '13px', height: '40px', width: '130px', border: 'none', float: 'left', backgroundColor: 'white', marginLeft: '15px', color: 'black', fontFamily: 'IRANSans', borderRadius: '10px', paddingRight: '10px', paddingLeft: '10px' }} onClick={profileSetting}>
                  <span style={{ marginBottom: '10px' }}>تنظیمات حساب </span>
                  <img className={StyleSheets.settingIcon} />
                </button>
              </div>
              :
              null
            }
          </div>
          :
          <div>
            <div style={{ height: '50px', paddingTop: '10px', textAlign: 'center', backgroundColor: '#232a47', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
              <span style={{ marginRight: 'auto', color: 'white', fontFamily: 'IRANSans' }}>پروفایل</span>
              <br />
            </div>
            <SingnOutComponent />
          </div>
      }
    </NavBar>
  )
}

export default Profile;