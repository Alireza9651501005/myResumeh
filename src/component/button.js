import StyleSheets from "./style.module.css";

const Button = ({ onClickFunction, pending, buttonText, marginTop }) => {
    return (
        <button onClick={onClickFunction} style={{ marginTop: marginTop, marginLeft: '20px', border: 'none', backgroundColor: '#39c2fd', color: 'white', fontFamily: 'IRANSans', borderRadius: '15px', width: '70px', height: '40px', left: '10%' }}>
            {!pending && <span>{buttonText}</span>}
            {pending && (
                <i
                    className={StyleSheets.loader}
                    style={{ marginTop: "-15px" }}
                />
            )}
        </button>
    )
}

export default Button;