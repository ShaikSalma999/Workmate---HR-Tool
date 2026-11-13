import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import PhoneFrame from './components/PhoneFrame'
import TabLayout from './components/TabLayout'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { DataProvider } from './hooks/useData'

import Onboarding from './screens/Onboarding'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import ForgotPassword from './screens/ForgotPassword'
import Home from './screens/Home'
import Attendance from './screens/Attendance'
import ClockInArea from './screens/ClockInArea'
import SelfieClockIn from './screens/SelfieClockIn'
import Tasks from './screens/Tasks'
import TaskDetail from './screens/TaskDetail'
import TaskCreate from './screens/TaskCreate'
import BurnoutStats from './screens/BurnoutStats'
import Expense from './screens/Expense'
import ExpenseSubmit from './screens/ExpenseSubmit'
import Leave from './screens/Leave'
import LeaveSubmit from './screens/LeaveSubmit'
import Messages from './screens/Messages'
import Chat from './screens/Chat'
import Notifications from './screens/Notifications'
import Profile from './screens/Profile'
import PersonalData from './screens/PersonalData'
import OfficeAssets from './screens/OfficeAssets'
import Payroll from './screens/Payroll'
import PayrollDetail from './screens/PayrollDetail'
import ChangePassword from './screens/ChangePassword'

const tabRoots = ['/home', '/attendance', '/tasks', '/expense', '/leave']
const fullScreen = ['/attendance/clock-in-area', '/attendance/selfie', '/tasks/new', '/tasks/burnout', '/expense/new', '/leave/new']

function transitionKey(pathname) {
  if (fullScreen.includes(pathname)) return pathname
  if (tabRoots.includes(pathname) || /^\/tasks\/[^/]+$/.test(pathname)) return 'tabs'
  return pathname
}

function Landing() {
  const { user } = useAuth()
  return <Navigate to={user ? '/home' : '/onboarding'} replace />
}

function ProtectedLayout() {
  const { user } = useAuth()
  return user ? <Outlet /> : <Navigate to="/sign-in" replace />
}

function DataScope({ children }) {
  const { user } = useAuth()
  return <DataProvider userId={user?.id ?? null}>{children}</DataProvider>
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <div key={transitionKey(location.pathname)} className="relative flex min-h-0 flex-1 animate-page-in flex-col">
      <Routes location={location}>
        <Route path="/" element={<Landing />} />

        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedLayout />}>
            <Route element={<TabLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/leave" element={<Leave />} />
          </Route>

          <Route path="/attendance/clock-in-area" element={<ClockInArea />} />
          <Route path="/attendance/selfie" element={<SelfieClockIn />} />
          <Route path="/tasks/new" element={<TaskCreate />} />
          <Route path="/tasks/burnout" element={<BurnoutStats />} />
          <Route path="/expense/new" element={<ExpenseSubmit />} />
          <Route path="/leave/new" element={<LeaveSubmit />} />

          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:id" element={<Chat />} />
          <Route path="/notifications" element={<Notifications />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/personal" element={<PersonalData />} />
          <Route path="/profile/assets" element={<OfficeAssets />} />
          <Route path="/profile/payroll" element={<Payroll />} />
          <Route path="/profile/payroll/:id" element={<PayrollDetail />} />
          <Route path="/profile/password" element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<Landing />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <PhoneFrame>
        <DataScope>
          <AnimatedRoutes />
        </DataScope>
      </PhoneFrame>
    </AuthProvider>
  )
}
