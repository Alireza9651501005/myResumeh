import StyleSheets from "./style/NoCommentComponent.module.css";

const NoCommentComponent = ({ noCommentClick }) => {

    return (
        <div style={{ overflow: 'hidden' }}>
            <div className={`row d-flex justify-content-center ${StyleSheets.margin}`}>
                <img className={StyleSheets.nocomment} />
            </div>
            <div className={`row d-flex justify-content-center ${StyleSheets.margin}`}>
                <span>تاکنون نظری ثبت نشده است </span>
                <span>!اولین نظر را شما ثبت کنید و امتیاز دریافت کنید</span>
            </div>
            <div className={`row d-flex justify-content-center ${StyleSheets.margin}`}>
                <button onClick={noCommentClick} className={StyleSheets.btn} >ثبت نظر</button>
            </div>
        </div>
    )
}

export default NoCommentComponent;