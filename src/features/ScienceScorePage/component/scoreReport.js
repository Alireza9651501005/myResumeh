import StyleSheets from "./style/ScoreReport.module.css";
import { useHistory } from "react-router";

const ScoreReport = ({ content, index, total }) => {

    const history = useHistory();
    const onClick = () => {
        console.log(content.action);
        history.push("/actionResolver", { actionResult: content.action, id: content.action.id });
    }

    return (
        <div onClick={onClick} style={{ padding: '0px 40px ' }}>

            <div className={StyleSheets.container}>

                <div className={StyleSheets.verticalcenterright}>
                    <div style={{ backgroundColor: content.color }} className={StyleSheets.verticalcenterrightinner}>
                        <img className={StyleSheets.img} src={content.icon} style={{ width: '30px', height: '30px' }} />
                    </div>
                </div>

                <div className={StyleSheets.middlediv}>
                    <span style={{ color: content.color }} className={StyleSheets.textperpule}>{content.title}</span>

                    <div className={StyleSheets.textblack}>
                        <span style={{ marginTop: "5px" }}>{content.detail}</span>
                        <span style={{ marginTop: "5px", marginRight: '30px' }}>{content.date}</span>
                    </div>
                </div>

                <div className={StyleSheets.verticalcenterleft}>
                    <div style={{ backgroundColor: content.color }} className={StyleSheets.verticalcenterleftinner}>
                        <span className={StyleSheets.text}>{content.score}</span>
                    </div>
                </div>

            </div>
            {total - 1 !== index ? <div style={{ width: '100%' }}>
                <div className={StyleSheets.verticleLine}></div>
            </div>
                : null}

        </div>
    )
}

export default ScoreReport;