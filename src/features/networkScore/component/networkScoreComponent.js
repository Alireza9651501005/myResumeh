import StyleSheets from "./style/networkScoreComponent.module.css";

const NetworkScoreComponent = (props) => {

    const network_scores = props.data.network_scores;

    return (
        <div className={`${StyleSheets.all} container mt-5`} style={{ justifyContent: 'center' }}>

            <div className={`row text-center mt-3`}>
                {/* <div className={`col-11 row ${StyleSheets.wrap}`} style={{ }}> */}
                <div className={`col-11 row flex align-items-center justify-content-center  ${StyleSheets.wrap}`} style={{ direction: 'ltr' }}>
                    {network_scores.map((el, index) => {
                        return (
                            <div className="col-3 d-flex align-items-center justify-content-center ">
                                {index === 0 ? null :
                                        <div className="d-flex pr-0 align-items-center justify-content-center mb-5" style={{ marginRight: '-4px', marginLeft: '-15px', borderTopLeftRadius: '50px', borderTopRightRadius: '50px', borderBottom: 'solid 4px black', height: '25px', width: '50px', backgroundColor: 'transparent', border: 'solid 4px #1792c7' }}>
                                        </div>
                                }
                                <div className="" >
                                    <div className="d-flex pr-0 align-items-center justify-content-center mt-3" style={{ borderBottomLeftRadius: '90px', borderBottomRightRadius: '90px', borderTop: 'solid 4px black', height: '45px', width: '90px', backgroundColor: 'transparent', border: 'solid 4px #1792c7' }}>
                                        <div className="d-flex mb-5 align-items-center justify-content-center" style={{ borderRadius: '50%', height: '65px', width: '70px', backgroundColor: '#f5f5fa', border: 'solid 4px #1792c7' }}>
                                            <span style={{ marginTop: '5px', fontSize: '15px', fontFamily: 'IRANSansFN', color: '#1792c7' }}>
                                                40
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="col-1 mt-2">
                    <img className={StyleSheets.point} />
                </div>
            </div>

            <div className="row text-center mt-3">
                <div className="col-11 row" style={{ direction: 'rtl' }}>
                    {network_scores.map((el, index) => {
                        return (
                            <div className="p-1 col-3" style={index === 0 ? { backgroundColor: '#1f7aaa' } : index === 1 ? { backgroundColor: '#5588a3' } : index === 2 ? { backgroundColor: '#639db7' } : { backgroundColor: '#79bcd3' }}>
                                <span style={{ fontSize: '15px', fontFamily: 'IRANSansFN', color: 'white' }} className="text-center">
                                    {el.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
                <div className="col-1 mt-2">
                    <img className={StyleSheets.level} />
                </div>
            </div>


            <div className="row text-center mt-3">
                <div className="col-11 row" style={{ direction: 'rtl' }}>
                    {network_scores.map((el, index) => {
                        return (
                            <div className={`p-1 col-3`} >
                                <div>
                                    <span className={StyleSheets.underline} style={{ borderBottom: '1px solid #d2d2d2', paddingBottom: '2px', fontSize: '15px', fontFamily: 'IRANSansFN', color: '#1f94c7' }}>
                                        {el.persons} نفر
                                    </span>
                                </div>
                                <div className={StyleSheets.bottom}></div>
                            </div>
                        )
                    })}
                </div>
                <div className="col-1 mt-2">
                    <img className={StyleSheets.people} />
                </div>
            </div>

            <div className='row mt-4' style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div className={`${StyleSheets.child} col-12 d-flex align-items-center justify-content-center`} >
                    <div className="d-flex align-items-center justify-content-center" style={{ textAlign: 'center', borderRadius: '50%', width: '70px', height: '70px', backgroundColor: '#f5f5fa', border: 'solid 6px #1792c7' }}>
                        <text style={{ fontSize: '15px', fontFamily: 'IRANSansFN', color: '#1792c7', textAlign: 'center' }}>
                            {props.data.total_network_score}
                        </text>
                    </div>
                </div>
            </div>

            <div className='row mt-4'>
                <div className={`${StyleSheets.child} col-12 d-flex align-items-center justify-content-center`} >
                    <text style={{ fontSize: '15px', fontFamily: 'IRANSansFN', color: '#1792c7', textAlign: 'center' }}>
                        مجموع امتیازات شما
                    </text>
                </div>
            </div>

            <div className='row mt-4'>
                <div className={`${StyleSheets.child} col-12 d-flex align-items-center justify-content-center`} >
                    <text style={{ fontSize: '15px', fontFamily: 'IRANSansFN', color: '#39c2fd', textAlign: 'center' }}>
                        معرفی اپلیکیشن به دیگران
                    </text>
                    <img className={`${StyleSheets.people} ml-2`} />
                </div>
            </div>

        </div >
    )
}

export default NetworkScoreComponent;