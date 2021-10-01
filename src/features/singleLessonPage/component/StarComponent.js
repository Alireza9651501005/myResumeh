import StyleSheets from "./style/StarComponent.module.css";

const StarComponent = ({stars}) => {

    const star = [];

    for (let i = 0; i < 5; i++) {
        if (i < stars) {
            // star.push(<span key={i} className={`${StyleSheets.rating} `}>☆</span>);
            star.push(<img className={StyleSheets.stargold} />);
        }
        else {
            // star.push(<span key={i} className={`${StyleSheets.rating}`}>☆</span>);
            star.push(<img className={StyleSheets.star} />);
        }
    }

    return (
        <div >{star}</div>
    )
}

export default StarComponent;