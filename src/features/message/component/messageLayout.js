import { useHistory } from "react-router-dom";
import StyleSheets from "./style/messageLayout.module.css";

const MessageLayout = ({ message }) => {

    const history = useHistory();

    const onClick = () => {
        console.log(message.id);
        history.push("/fullMessageComponent", { id: message.id, title: message.title })
    }

    return (
        <div onClick={onClick} className='row text-align-right' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', padding: '15px 10px', borderRadius: '20px', backgroundColor: '#f5f5fa', margin: '15px 25px' }}>

            <div className="col-3">
                <span className={message.read ? StyleSheets.textleft : StyleSheets.textleftno}>
                    {message.date}
                </span>
                <span className={message.read ? StyleSheets.textleft : StyleSheets.textleftno}>
                    {message.hour}
                </span>
            </div>

            <div className="col-9">
                <span className={message.read ? StyleSheets.textright : StyleSheets.textrightno}>
                    {message.short_description}
                </span>
                <span className={message.read ? StyleSheets.textright : StyleSheets.textrightno}>
                    {message.title}
                </span>
            </div>
        </div>

    )
}

export default MessageLayout;