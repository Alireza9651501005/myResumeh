import './App.css';
import SplashScreen from './features/splash/splashScreen';
import { Provider } from "react-redux";
import store from './store/store';
import { Route, Switch, BrowserRouter, Router } from "react-router-dom";
import HomeScreen from './features/home/homeScreen'
import NavBar from './features/nav/nav';
import MoreScreen from "./features/more/moreScreen";
import CoursesComponent from "./features/courses/Courses";
import ProfileComponent from "./features/profile/Profile";
import MessageComponent from "./features/message/Message";
import WalletComponent from "./features/wallet/Wallet";
import ActionResolver from "./actions/ActionResolver";
import LogInFormComponent from "./features/logInForm/logInForm";
import UserPassWordComponent from "./features/userPassWord/userPassWord";
import RegisterUserComponent from "./features/registerUser/registerUser";
import VerifySmsCodeComponent from "./features/verifySmsCode/verifySmsCode";
import CourseViewComponent from "./features/CourseView/courseView";
import CourseDetailUserLogInComponent from "./features/courseDetailUserLogIn/courseDetailUserLogIn";
import EditProfileComponent from "./features/editProfile/EditProfile";
import AccountSettingComponent from "./features/accountSetting/accountSetting";
import ChangePasswordComponent from "./features/changePassword/changePassword";
import LeaderBoardComponent from "./features/leaderBoard/leaderBoard";
import PublicProfileComponent from "./features/publicProfile/publicProfile";
import NetworkScoreComponent from "./features/networkScore/networkScore";
import ScienceScorePage from "./features/ScienceScorePage/ScienceScorePage";
import SingleLessonPage from "./features/singleLessonPage/SingleLessonPage";
import FullMessageComponent from "./features/message/component/FullMessageComponent";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        {/* <SplashScreen /> */}
        <Switch>
          <Route path="/Home" render={(props) => <HomeScreen {...props} />} />
          <Route path="/Nav" render={(props) => <NavBar {...props} />} />
          <Route path="/courses" component={CoursesComponent} />
          <Route path="/profile" component={ProfileComponent} />
          <Route path="/message" component={MessageComponent} />
          <Route path="/wallet" component={WalletComponent} />
          <Route path="/More" render={(props) => <MoreScreen {...props} />} />
          <Route path="/actionResolver" render={(props) => <ActionResolver {...props} />} />
          <Route path="/login" render={(props) => <LogInFormComponent {...props} />} />
          <Route path="/codePass" render={(props) => <UserPassWordComponent {...props} />} />
          <Route path="/register" render={(props) => <RegisterUserComponent {...props} />} />
          <Route path="/verifyCode" render={(props) => <VerifySmsCodeComponent {...props} />} />
          <Route path="/courseView" render={(props) => <CourseViewComponent {...props} />} />
          <Route path="/courseViewDetail" render={(props) => <CourseDetailUserLogInComponent {...props} />} />
          <Route path="/editProfile" component={EditProfileComponent} />
          <Route path="/accountSetting" component={AccountSettingComponent} />
          <Route path="/networking" component={NetworkScoreComponent} />
          <Route path="/changePass" component={ChangePasswordComponent} />
          <Route path="/scienceScorePage" component={ScienceScorePage} />
          <Route path="/singleLessonPage" render={(props) => <SingleLessonPage {...props} />} />
          <Route path="/leaderBoard" render={(props) => <LeaderBoardComponent {...props} />} />
          <Route path="/publicProfile" render={(props) => <PublicProfileComponent {...props} />} />
          <Route path="/fullMessageComponent" render={(props) => <FullMessageComponent {...props} />} />
          {/* <Route path="/:id/:name" component={MoreLeatestLessonComponent} /> */}
          <Route path="/" component={SplashScreen} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
