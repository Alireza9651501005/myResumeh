import { Component, useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../nav/nav";
import SingnOutComponent from "../../component/signoutComponent/SingnOutComponent";
import { AsyncAPIService } from "../../utils/apiService";
import MainHeader from "../../component/header/MainHeader";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PayLogsRow from "./component/PayLogsRow";
import StyleSheets from "./style/Wallet.module.css";

const WalletComponent = () => {

  const state = useSelector(state => state);
  const login = state.LogInReducer.isLogIn;
  const [numOfPage, setNumOfPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [payment_logs, setpayment_logs] = useState();
  const [name, setName] = useState();
  const [currency, setCurrency] = useState();
  const [amount, setAmount] = useState();

  const loadMore = () => {
    console.log('end of scroll');
    if (numOfPage != lastPage) {
      let newPageNum = numOfPage;
      setNumOfPage(newPageNum++);
      payReport(newPageNum);
    }
  }

  const walletInfo = () => {
    // setPending(true);
    // setError(false);
    AsyncAPIService(
      "/user/profile/wallet-info",
      "GET",
      {
        onSuccess(res) {
          setName(res.data.data.name);
          setCurrency(res.data.data.currency);
          setAmount(res.data.data.amount);
        }
        ,
        onFail(err) {

        }
      },
      {

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

  const payReport = (page) => {
    // setPending(true);
    // setError(false);
    AsyncAPIService(
      `/user/profile/payment-report?page=${page}`,
      "GET",
      {
        onSuccess(res) {
          if (lastPage === 0) {
            setLastPage(res.data.data.last_page);
          }
          setpayment_logs(res.data.data.payment_logs);
          console.log(res.data);
        }
        ,
        onFail(err) {

        }
      },
      {
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
      walletInfo();
      payReport(1);
    }
  }, [])


  return (
    <NavBar itemSelected="wallet">
      <MainHeader title="اعتبار" />
      {
        login ?
          <div>

            <div style={{ textAlign: 'right', margin: '10px 20px' }}>
              <span className={StyleSheets.textup}>کیف پول شما</span>
            </div>

            <div style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
              <div className={StyleSheets.creedit}>

                <div className={` ${StyleSheets.creeditmain}`}>
                  <div className={`col-6 ${StyleSheets.left}`}>
                    <img className={StyleSheets.card} />
                  </div>
                  <div className={`col-6 ${StyleSheets.right}`}>
                    <img className={StyleSheets.logo} />
                  </div>
                </div>

                <div className={` ${StyleSheets.creeditmain}`}>
                  <div className='col-6'>
                    <span className={`${StyleSheets.creedittext} ${StyleSheets.left}`}>{amount}</span>
                    <span className={`${StyleSheets.creeditcurrency} ${StyleSheets.left}`}>{currency}</span>
                  </div>
                  <div className='col-6'>
                    <span className={`${StyleSheets.creedittext} ${StyleSheets.right}`}>{name}</span>
                  </div>
                </div>

                <div className={` ${StyleSheets.creeditmain}`} style={{marginTop:'15px'}}>
                  <div className='col-3'>
                    <span className={StyleSheets.creedittext}>2365</span>
                  </div>
                  <div className='col-3'>
                    <span className={StyleSheets.creedittext} >8963</span>
                  </div>
                  <div className='col-3'>
                    <span className={StyleSheets.creedittext}>4565</span>
                  </div>
                  <div className='col-3'>
                    <span className={StyleSheets.creedittext} >0236</span>
                  </div>
                </div>

              </div>
            </div>

            <div style={{ textAlign: 'right', margin: '10px 20px' }}>
              <span className={StyleSheets.textup}>تراکنش ها</span>
            </div>


            <div className={` ${StyleSheets.main}`}>
              <div className='col-5'>
                <span className={StyleSheets.text}>بابت</span>
              </div>
              <div className='col-4'>
                <span className={StyleSheets.text} >مبلغ (تومان)</span>
              </div>
              <div className='col-3'>
                <span className={StyleSheets.text}>تاریخ</span>
              </div>
            </div>

            {payment_logs ?
              <div style={{ marginTop: '10px', height: 'auto', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
                <InfiniteScroll
                  dataLength={payment_logs.length}
                  next={loadMore}
                  hasMore={true}
                  loader={<h4></h4>}
                  scrollableTarget="scrollableDiv"
                >
                  {payment_logs.length > 0 ?
                    <div id="scrollableDiv" style={{}}>
                      {payment_logs.map((el, index) => {
                        return (
                          <PayLogsRow log={el} index={index} />
                        )
                      })}
                    </div>
                    :
                    null
                  }
                </InfiniteScroll>
              </div>
              : null}

          </div>
          :
          <div>
            <div style={{ height: '50px', paddingTop: '10px', textAlign: 'center', backgroundColor: '#232a47', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
              <span style={{ marginRight: 'auto', color: 'white', fontFamily: 'IRANSans' }}>اعتبار</span>
              <br />
            </div>
            <SingnOutComponent />
          </div>
      }
    </NavBar>
  )
}
export default WalletComponent;