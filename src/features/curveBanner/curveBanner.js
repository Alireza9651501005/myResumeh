import { useHistory } from "react-router";
import StyleSheets from "./style/curveBanner.module.css";

function CurveBanner(props) {
    const item = props.items;
    const history = useHistory();

    const onClickHandler = (action) => {
        history.push("/actionResolver", { actionResult: action });
    }


    return (
        <div>
            {
                item.map((el, index) => {
                    return (
                        <img onClick={() => onClickHandler(el.action)} key={index} src={el.image} className={` ${StyleSheets.rcorners3} ${StyleSheets.margin}`} />
                    )
                })
            }
        </div>
    )
}

export default CurveBanner;