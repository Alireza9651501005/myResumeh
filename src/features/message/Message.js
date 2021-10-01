
import NavBar from "../../features/nav/nav";
import SingnOutComponent from "../../component/signoutComponent/SingnOutComponent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AsyncAPIService } from "../../utils/apiService";
import { debounce } from "@material-ui/core";
import MessageLayout from "./component/messageLayout";
import NoMessageComponent from "./component/NoMessageComponent";
import StyleSheets from "./style/message.module.css";
import HomeLoaderComponent from "../../component/homeLoaderComponent/homeLoaderComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import MainHeader from "../../component/header/MainHeader";

const MessageComponent = () => {

  const state = useSelector(state => state);
  const login = state.LogInReducer.isLogIn;
  const [data, setData] = useState();
  const [message, setMessage] = useState([]);
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  const [numOfPage, setNumOfPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);


  const loadMore = () => {
    console.log('end of scroll');
    if (numOfPage != lastPage) {
      let newPageNum = numOfPage;
      setNumOfPage(newPageNum++);
      userMessage();
    }
    else {
      console.log('else');
    }
  }

  const userMessage = () => {
    setPending(true);
    setError(false);
    AsyncAPIService(
      "/user/profile/my-messages?page=" + numOfPage,
      "GET",
      {
        onSuccess(res) {
          if (lastPage === 0) {
            setLastPage(res.data.data.last_page);
          }
          console.log(res.data);
          setPending(false);
          setError(false);
          setData(res.data.data);
          setMessage(res.data.data.messages);
        }
        ,
        onFail(err) {
          setPending(false);
          setError(true);
        }
      },
      {
        // headers: {
        //   Authorization: 'Bearer ' + access_token,
        //   device_uuid: uuid
        // }
      },
      {
        toast: {
          fail: "مشکلی در ارتباط با سرور به وجود آمده است",
        },
        useAccessToken: true,
        useDeviceUid: true
      }
    )
  }

  useEffect(() => {
    if (login) {
      userMessage();
    }
  }, [])

  return (
    <NavBar itemSelected="message">
      <MainHeader title="پیام ها" />
      {
        login ?
          <div>
            {error ? <span className={StyleSheets.centerSpan} onClick={userMessage}>
              تلاش مجدد
              <img className={StyleSheets.moreChance} />
            </span>
              : null}
            {pending ? <HomeLoaderComponent />
              : null}


            {/* {data ? <MessageLayout message={message} /> : null} */}

            <div style={{ marginTop: '30px', height: 'auto', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
              <InfiniteScroll
                dataLength={message.length}
                next={loadMore}
                hasMore={true}
                loader={<h4></h4>}
                scrollableTarget="scrollableDiv"
              >
                {message.length > 0 ?
                  <div id="scrollableDiv" style={{}}>
                    {message.map((el, index) => {
                      return (
                        <MessageLayout message={el} />
                      )
                    })}
                  </div>
                  :
                  <NoMessageComponent />
                }
              </InfiniteScroll>
            </div>

          </div>
          :
          <div>
            <SingnOutComponent />
          </div>
      }
    </NavBar>
  )
}

export default MessageComponent;