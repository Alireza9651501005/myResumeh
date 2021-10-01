import StyleSheets from "./style/star.module.css";

const StarComponent = (props) => {

    const star = [];

    for (let i = 0; i < 5; i++) {
        if (i < props.stars) {
            star.push(<span key={i} className={`fa fa-star ${StyleSheets.checked} `}></span>);
        }
        else {
            star.push(<span key={i} className={`fa fa-star`}></span>);
        }
    }

    return (
        <div style={{ marginTop: '15px' }}>{star}</div>
    )
}

export default StarComponent;