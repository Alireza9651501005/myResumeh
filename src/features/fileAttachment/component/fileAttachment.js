import axios from "axios";
import { useState } from "react";
import StyleSheets from "./style/fileAttachment.module.css";

const FileAttachmentComponent = (props) => {

    let percentCompleted = '0%';
    const [download, setDownload] = useState(true);
    const [cancel, setCancel] = useState(false);
    const [done, setDone] = useState(false);

    return (
        <div className={StyleSheets.listItem1} style={{ display: 'flex' }}>
            <div style={{ height: '100%', padding: '5px', backgroundColor: '#7FB3C6', borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}>
                <img style={{ marginRight: '2px' }} src={props.attachments.icon} className={StyleSheets.img} />
            </div>

            <div className={StyleSheets.headDiv} style={{ height: '100px' }}>
                <p style={{ float: 'right', fontFamily: 'IRANSans', fontSize: '12px', width: 'auto', maxWidth: '150px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{props.attachments.title}</p>
                <a href={props.attachments.url} style={{ float: 'left', fontFamily: 'IRANSans', fontSize: '12px' }} download >
                    <img className={StyleSheets.download} />
                </a>
            </div>
        </div>
    );

}

export default FileAttachmentComponent;