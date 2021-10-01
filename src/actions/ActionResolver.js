import SingleLessonPage from "../features/singleLessonPage/SingleLessonPage";
import * as ActionType from '../common/constans/variables';
import CourseViewComponent from "../features/CourseView/courseView";
import NavBar from "../features/nav/nav";

const ActionResolver = (props) => {

    switch (props.location.state.actionResult.type) {
        case ActionType.courseView:
            return (
                <CourseViewComponent action={props.location.state.actionResult} from={props.location.state.from} price_title={props.location.state.price_title} last_price={props.location.state.last_price} />
            )
        case ActionType.lessonView:
            return (
                <SingleLessonPage id={props.location.state.id} />
            )
    }
}

export default ActionResolver;