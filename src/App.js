import { Space } from 'antd'
import './App.css';
import AppFooter from './navigation/AppFooter';
import AppHeader from './navigation/AppHeader';
import SideMenu from './navigation/SideMenu';
import Signin from './pages/Signin'
import Home from "./pages/Home"
import Protected from './authentication/Protected';
import { Route, Routes } from 'react-router-dom';
import Account from './pages/Account'
import  {Dashboard} from './components/dashboard/pages/Dashboard';
import Applicant from './components/applicant/pages/Applicant';
import { InterviewerList } from './components/interviewerlist/pages/Interviewerlist';
import { ScheduleInterview } from './components/scheduleInterview/pages/ScheduleInterview';
import OfferLetterPage from './components/offerletter/pages/OfferLetterPage';
import AssessmentTest from './components/assessmentTest.js/pages/AssessmentTest';
import LetterTemplatePage from './components/lettertempletepage/pages/LetterTempletePage';

function App() {
  return (
  <>
    <div>
      <AppHeader />  
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
        </Routes>

      <Routes>
        <Route
        path='/account'
        element={
         <Account/>
        }/>
      </Routes>


      <Routes>
        <Route
        path='/dashboard'
        element={
          <Account>
            <Dashboard/>
          </Account>
        }/>
      </Routes>


      <Routes>
        <Route
        path='/applicant'
        element={
          <Account>
            <Applicant/>
          </Account>
        }/>
      </Routes>
      <Routes>
        <Route
        path='/interviewer'
        element={
          <Account>
            <InterviewerList/>
          </Account>
        }/>
      </Routes>
      <Routes>
        <Route
        path='/scheduleinterview'
        element={
          <Account>
            <ScheduleInterview/>
          </Account>
        }/>
      </Routes>
      <Routes>
        <Route
        path='/offerletter'
        element={
          <Account>
            <OfferLetterPage/>
          </Account>
        }/>
      </Routes>

      <Routes>
        <Route
        path='/assessmenttest'
        element={
          <Account>
            <AssessmentTest/>
          </Account>
        }/>
      </Routes>
      <Routes>
        <Route
        path='/lettertemplete'
        element={
          <Account>
            <LetterTemplatePage />
          </Account>
        }/>
      </Routes>
</div>

<AppFooter />
</>
);
}

export default App;
