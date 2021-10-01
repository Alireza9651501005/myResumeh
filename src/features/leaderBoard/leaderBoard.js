import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState, useReducer } from "react";
import StyleSheets from "./style/leaderboard.module.css";
import { AsyncAPIService } from "../../utils/apiService";
import HomeLoaderComponent from "../../component/homeLoaderComponent/homeLoaderComponent";
import { debounce } from '@material-ui/core';
import StarComponent from "../../component/star/starComponent";
import { useHistory } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import HeaderComponent from "../../component/headerComponent";

const usersReducer = (currentUser, action) => {
    switch (action.type) {
        case 'ADD':
            return [...currentUser, action.user];
        case 'CLEAN':
            return [];
        default:
            return;
    }
}

const topUsersReducer = (topUsers, action) => {
    switch (action.type) {
        case 'ADD':
            return [...topUsers, action.topUser];
        case 'CLEAN':
            return [];
        default:
            return;
    }
}

const LeaderBoardComponent = (props) => {

    const [usersItem, userDispatch] = useReducer(usersReducer, []);
    const [topUserReducer, topUserReducerDispatch] = useReducer(topUsersReducer, []);

    const [monthSelect, setMonthSelect] = useState(false);
    const [yearSelect, setYearSelect] = useState(false);
    const [user, setUser] = useState();
    const [myUserTop, setMyUserTop] = useState(false);
    const [current_page, setCurrent_page] = useState(1);
    const [last_page, setLast_page] = useState(0);

    const [total, setTotal] = useState(0);

    const [errorMessage, setErrorMessage] = useState("");
    const [pending, setPending] = useState(false);

    const rank = props.location.state.rank;

    const history = useHistory();

    const loadMore = () => {
        console.log('end of scroll');
        if (current_page != last_page) {
            let newcurrent_page = current_page;
            let newPage = newcurrent_page + 1;
            setCurrent_page(current_page + 1);
            if (monthSelect) {
                getMonthlyRank(newPage, "monthly-rank");
            }
            else {
                getMonthlyRank(newPage, "yearly-rank");
            }
        }
        else {
            console.log('else', current_page, last_page);
        }
    }

    const getMonthlyRank = (page, yearOrmonth) => {
        setPending(true);
        AsyncAPIService(
            `/user/profile/${yearOrmonth}`,
            "GET",
            {
                onSuccess(response) {
                    setPending(false);
                    if (total === 0) {
                        setTotal(response.data.data.total);
                    }
                    setLast_page(response.data.data.last_page);
                    setUser(response.data.data.user);
                    for (let i = 0; i < response.data.data.users.length; i++) {
                        const rank = response.data.data.users[i].rank;
                        if (rank === 1 || rank === 2 || rank === 3) {
                            topUserReducerDispatch({ type: 'ADD', topUser: response.data.data.users[i] });
                            if (response.data.data.users[i].username === response.data.data.user.username) {
                                setMyUserTop(true);
                            }
                        }
                        else {
                            userDispatch({ type: 'ADD', user: response.data.data.users[i] });
                        }
                    }
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
            },
            {
                useAccessToken: true,
                useDeviceUid: true
            }
        )
    }


    const rankingClick = (event) => {
        setCurrent_page(1);
        userDispatch({ type: 'CLEAN' });
        topUserReducerDispatch({ type: 'CLEAN' });
        if (event === "year") {
            setYearSelect(true);
            setMonthSelect(false);
            getMonthlyRank(1, "yearly-rank");
        }
        else {
            setMonthSelect(true);
            setYearSelect(false);
            getMonthlyRank(1, "monthly-rank");
        }
    }

    const userPublickProfile = (id, username) => {
        history.push("/publicProfile", { id: id, username: username });
    }

    useEffect(() => {
        if (rank === "year") {
            setYearSelect(true);
            setMonthSelect(false);
            getMonthlyRank(1, "yearly-rank");
        }
        else {
            setMonthSelect(true);
            setYearSelect(false);
            getMonthlyRank(current_page, "monthly-rank");
        }
    }, [])

    return (
        <div className="container" style={{ backgroundColor: '#e4e4ea' }}>
            {errorMessage != "" ? <span className={StyleSheets.center} style={{ color: 'white', fontFamily: 'IRANSans', position: 'absolute', backgroundColor: 'red', padding: '2px', borderRadius: '25px' }}>{errorMessage}</span> : null}
            {pending ? <HomeLoaderComponent /> : null}


            <div className="fixed-top" style={{ backgroundColor: '#e4e4ea', color: 'white', fontFamily: 'IRANSansFN-bold', textAlign: 'center', marginBottom: '10px' }}>

                <div style={{ paddingBottom: '5vh', height: 'auto', maxHeight: '40vh', minHeight: '30vh', borderBottomRightRadius: '20px', borderBottomLeftRadius: '20px', backgroundColor: "#232a47", color: 'white', fontFamily: 'IRANSansFN-bold', textAlign: 'center' }}>
                    <HeaderComponent title="لیدر بورد" />
                    <div className="row" style={{ backgroundColor: "#232a47", color: 'white', fontFamily: 'IRANSansFN-bold', textAlign: 'center' }}>
                        <span onClick={() => rankingClick("year")} className="col-4" style={{ fontFamily: yearSelect ? 'IRANSansFN-bold' : 'IRANSans' }}>سالانه</span>
                        <span className="col-4 pt-3">
                        </span>
                        <span onClick={() => rankingClick("month")} className="col-4 " style={{ fontFamily: monthSelect ? 'IRANSansFN-bold' : 'IRANSans' }}>ماهانه</span>
                    </div>
                    {topUserReducer.length === 3
                        ?
                        <div className="row">
                            <div className="col-4 mt-5">
                                <img style={{ border: 'solid 3px #1792c7' }} className="rounded-circle" width="70px" height="70px" src={topUserReducer[1].image} onClick={() => userPublickProfile(topUserReducer[1].id, topUserReducer[1].username)} />
                                <br />
                                <span onClick={loadMore}>{topUserReducer[1].username}</span>
                                <br />
                                <span>{topUserReducer[1].scores}</span>
                            </div>
                            <div className="col-4 mt-3" >
                                <img style={{ border: 'solid 3px #1792c7' }} className="rounded-circle" width="70px" height="70px" src={topUserReducer[0].image} onClick={() => userPublickProfile(topUserReducer[0].id, topUserReducer[1].username)} />
                                <br />
                                <span>{topUserReducer[0].username}</span>
                                <br />
                                <span>{topUserReducer[0].scores}</span>
                            </div>
                            <div className="col-4 mt-5" >
                                <img style={{ border: 'solid 3px #1792c7' }} className="rounded-circle" width="70px" height="70px" src={topUserReducer[2].image} onClick={() => userPublickProfile(topUserReducer[2].id, topUserReducer[1].username)} />
                                <br />
                                <span>{topUserReducer[2].username}</span>
                                <br />
                                <span>{topUserReducer[2].scores}</span>
                            </div>
                        </div>
                        : null}
                </div>

                <div className="row" style={{ marginTop: '-50px', padding: '15px' }}>
                    <div className="col-5"></div>
                    <div className="col-2 float-center bg-light p-2" style={{ borderRadius: '15px' }}>
                        <img className={`${StyleSheets.reward} mr-2`} />
                        <br />
                        <span style={{ color: 'black' }}>هدایا</span>
                    </div>
                    <div className="col-5"></div>
                </div>
            </div>

            {/* <div className="row" style={{ marginTop: '45vh',marginBottom:'10vh', height: 'auto', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse', fontFamily: 'IRANSansFN-bold', color: '#1792c7', backgroundColor: '#e4e4ea' }}> */}
            <div className="row" style={user && !myUserTop ? { marginTop: '45vh', marginBottom: '10vh', height: 'auto', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse', fontFamily: 'IRANSansFN-bold', color: '#1792c7', backgroundColor: '#e4e4ea' } : { marginTop: '45vh', height: 'auto', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse', fontFamily: 'IRANSansFN-bold', color: '#1792c7', backgroundColor: '#e4e4ea' }}>
                <InfiniteScroll
                    dataLength={usersItem.length}
                    next={loadMore}
                    hasMore={true}
                    loader={<h4></h4>}
                    scrollableTarget="scrollableDiv"
                >
                    {usersItem.length > 0 ?
                        <div id="scrollableDiv">
                            {
                                usersItem.map((el, index) => {
                                    return (
                                        <div key={index} className="row mt-4">
                                            <div className="col-10 row ml-2" onClick={() => userPublickProfile(el.id, el.username)}>
                                                <div className="col-10 bg-light" style={{ borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}>
                                                    <span className="float-left mt-3">{el.scores}</span>
                                                    <span className="float-right text-right mt-3">{el.username}</span>
                                                </div>
                                                <div style={{ borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }} className="col-2 bg-light">
                                                    <img style={{ float: 'right', height: '50px', marginRight: '-25px', border: 'solid 2px #1792c7' }} width="50px" height="50px" className="rounded-circle" src={el.image} onClick={() => userPublickProfile(el.id)} />
                                                </div>
                                            </div>
                                            <span className="col-2 mt-3 text-center">{el.rank}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        : null}
                </InfiniteScroll>

            </div>



            {user && !myUserTop ?
                <div onClick={() => userPublickProfile(user.id, user.username)} className="fixed-bottom mb-2 row p-2 ml-2 mr-2" style={{ textAlign: 'center', backgroundColor: '#1f94c7', borderRadius: '15px', color: 'white', fontFamily: 'IRANSansFN-bold' }}>
                    <StarComponent className="col-4 mt-3 float-left" stars={user.stars} style={{ marginTop: '10px' }} />
                    <span className="float-left mt-3 col-2 text-center">{user.scores}</span>
                    <span className="float-right mt-3 col-3">{user.username}</span>
                    <img style={{ border: 'solid 1px #1792c7' }} width="50px" height="50px" className=" rounded-circle bg-light" src={user.image} />
                    <span className="col-2 mt-3 float-right text-right">{user.rank}</span>

                </div>
                : null}
        </div>
    )
}

export default LeaderBoardComponent;