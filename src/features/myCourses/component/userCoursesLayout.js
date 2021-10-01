import { useEffect, useState } from "react";
import StyleSheets from "./style/userCoursesLayout.module.css";
import MyCoursesLayout from "./myCoursesLayout";

const UserCoursesLayout = (props) => {

    const [lastCome, setLastCome] = useState(true);
    const [persents, setPersents] = useState(false);
    const [alphabet, setAlphabet] = useState(false);
    const [date, setDate] = useState(false);

    const handleStatusBasedOnItemSelect = (id) => {
        if (id == "date") {
            console.log("date");
            setDate(true);
            setAlphabet(false);
            setPersents(false);
            setLastCome(false);
        }
        else if (id == "alphabet") {
            console.log("alphabet");
            setDate(false);
            setAlphabet(true);
            setPersents(false);
            setLastCome(false);
        }
        else if (id == "persents") {
            console.log("persents");
            setDate(false);
            setAlphabet(false);
            setPersents(true);
            setLastCome(false);
        }
        else if (id == "lastcome") {
            console.log("lastcome");
            setDate(false);
            setAlphabet(false);
            setPersents(false);
            setLastCome(true);
        }
    }


    return (
        <div style={{marginTop:'230px'}} >
            {/* <div style={{ paddingTop: '15px', textAlign: 'center', width: '100%', height: '250px', backgroundColor: '#232a47', borderBottomRightRadius: '20px', borderBottomLeftRadius: '20px' }}>
                <span style={{ marginRight: 'auto', color: 'white', fontFamily: 'IRANSans', textAlign: 'center' }}>دوره های من</span>
                <br />
                <img style={{ width: '250px', height: '200px', marginTop: '10px' }} className={StyleSheets.mycourseImg} />
            </div> */}

            <div className={StyleSheets.main} style={{ padding: '15px', position: 'relative' }}>

                {date
                    ? <span style={{ position: 'absolute', right: '75%' }} className={StyleSheets.back} onClick={() => handleStatusBasedOnItemSelect("date")} >تاریخ خرید</span>
                    : <span style={{ position: 'absolute', right: '75%' }} className={StyleSheets.font} onClick={() => handleStatusBasedOnItemSelect("date")} >تاریخ خرید</span>}
                {alphabet
                    ? <span style={{ position: 'absolute', right: '60%' }} className={StyleSheets.back} onClick={() => handleStatusBasedOnItemSelect("alphabet")} >الفبا</span>
                    : <span style={{ position: 'absolute', right: '60%' }} className={StyleSheets.font} onClick={() => handleStatusBasedOnItemSelect("alphabet")} >الفبا</span>}
                {persents
                    ? <span style={{ position: 'absolute', right: '32%' }} className={StyleSheets.back} onClick={() => handleStatusBasedOnItemSelect("persents")} >درصد پیشرفت</span>
                    : <span style={{ position: 'absolute', right: '32%' }} className={StyleSheets.font} onClick={() => handleStatusBasedOnItemSelect("persents")} >درصد پیشرفت</span>}
                {lastCome
                    ? <span style={{ position: 'absolute', right: '5%' }} className={StyleSheets.back} onClick={() => handleStatusBasedOnItemSelect("lastcome")} >آخرین مراجعه</span>
                    : <span style={{ position: 'absolute', right: '5%' }} className={StyleSheets.font} onClick={() => handleStatusBasedOnItemSelect("lastcome")} >آخرین مراجعه</span>}
            </div>

            <div>
                {lastCome ?
                    <div>
                        {props.courses.map((el, index) => {
                            return (
                                <div key={index}>
                                    <MyCoursesLayout courses={el} />
                                </div>
                            )
                        })}

                    </div>
                    : null}
            </div>

        </div>
    )
}

export default UserCoursesLayout;