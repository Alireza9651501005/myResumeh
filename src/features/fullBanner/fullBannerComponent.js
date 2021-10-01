import { useHistory } from "react-router";
import StyleSheets from "./style/fullBanner.module.css";

function FullBannerComponent(props) {
    const item = props.items;
    const history = useHistory();

    console.log();

    const onClickHandler = (action) => {
        history.push("/actionResolver", { actionResult: action });
    }

    return (
        <div>
            {
                item.map((el, index) => {
                    return (
                        <img onClick={() => onClickHandler(el.action)} key={index} src={el.image} className={StyleSheets.style} style={{ height: 'auto', backgroundColor: el.color, width: '100%' }} />
                    )
                })
            }
        </div>
    )

}

export default FullBannerComponent;