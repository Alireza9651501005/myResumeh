import StyleSheets from "./style/NoMessageComponent.module.css";


const NoMessageComponent = () => {
    return (
        <div>
            <img className={`${StyleSheets.messageEmpty} ${StyleSheets.center}`} />
            <br />
            <span style={{ fontFamily: 'IRANSans' }} className={StyleSheets.centerSpan}>شما هم اکنون پیامی ندارید</span>
        </div>
    )
}

export default NoMessageComponent;