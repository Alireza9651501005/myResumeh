import StyleSheets from "./style.module.css";

const Input = ({ spanTop, spanTitle, type, value, onChange, inputTop }) => {
    return (
        <div>
            <span className={StyleSheets.spanStyle} style={{ marginTop: spanTop }}>{spanTitle}</span>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={StyleSheets.inputStyle}
                style={{ marginTop: inputTop }}>

            </input>
        </div>
    )
}

export default Input;