import LeatestCourseList from './list/leatestCourseList'
import LiveCourseList from "./liveList/liveCourseList";

const ItemList = ({ contents, itemLayout }) => {
    switch (itemLayout) {
        case 'course':
            return <LeatestCourseList contents={contents} />
            break;
        case 'live':
            return <LiveCourseList contents={contents} />
            break;
        default:
            return null;
    }
}

export default ItemList;