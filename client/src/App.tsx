import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './components/layouts/PublicLayout';
import AuthLayout from './components/layouts/AuthLayout';
import DashboardLayout from './components/layouts/DashboardLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Careers from './pages/public/Careers';
import Contact from './pages/public/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Candidate Pages
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import InternshipsList from './pages/candidate/InternshipsList';
import ApplyJob from './pages/candidate/ApplyJob';
import MyApplications from './pages/candidate/MyApplications';
import CandidateInterviews from './pages/candidate/CandidateInterviews';
import Quiz from './pages/candidate/Quiz';

// HR Pages
import HRDashboard from './pages/hr/HRDashboard';
import ManageVacancies from './pages/hr/ManageVacancies';
import ApplicantList from './pages/hr/ApplicantList';
import CVScreening from './pages/hr/CVScreening';
import InterviewSchedule from './pages/hr/InterviewSchedule';
import ManageEmployees from './pages/hr/ManageEmployees';
import AttendanceTracking from './pages/hr/AttendanceTracking';
import ProjectAssignment from './pages/hr/ProjectAssignment';
import ConductInterview from './pages/hr/ConductInterview';

// Employee Pages
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import MyTasks from './pages/employee/MyTasks';
import MyAttendance from './pages/employee/MyAttendance';
import MyPerformance from './pages/employee/MyPerformance';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import RoleManagement from './pages/admin/RoleManagement';
import SystemAnalytics from './pages/admin/SystemAnalytics';
import SystemConfiguration from './pages/admin/SystemConfiguration';
import SecurityPermissions from './pages/admin/SecurityPermissions';

// Shared Pages
import Notifications from './pages/shared/Notifications';
import Messages from './pages/shared/Messages';
import Calendar from './pages/shared/Calendar';
import ProfileSettings from './pages/shared/ProfileSettings';

// Error Pages
import NotFound from './pages/error/NotFound';
import Unauthorized from './pages/error/Unauthorized';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes wrapped with Navbar & Footer */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="auth/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Candidate Routes */}
        <Route path="/candidate" element={<DashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CandidateDashboard />} />
          <Route path="internships" element={<InternshipsList />} />
          <Route path="apply" element={<ApplyJob />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="interviews" element={<CandidateInterviews />} />
          <Route path="quiz" element={<Quiz />} />
        </Route>

        {/* HR Routes */}
        <Route path="/hr" element={<DashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<HRDashboard />} />
          <Route path="vacancies" element={<ManageVacancies />} />
          <Route path="applicants" element={<ApplicantList />} />
          <Route path="cv-screening" element={<CVScreening />} />
          <Route path="interviews" element={<InterviewSchedule />} />
          <Route path="conduct-interview" element={<ConductInterview />} />
          <Route path="employees" element={<ManageEmployees />} />
          <Route path="attendance" element={<AttendanceTracking />} />
          <Route path="projects" element={<ProjectAssignment />} />
        </Route>

        {/* Employee Routes */}
        <Route path="/employee" element={<DashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="tasks" element={<MyTasks />} />
          <Route path="attendance" element={<MyAttendance />} />
          <Route path="performance" element={<MyPerformance />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="roles" element={<RoleManagement />} />
          <Route path="analytics" element={<SystemAnalytics />} />
          <Route path="configuration" element={<SystemConfiguration />} />
          <Route path="security" element={<SecurityPermissions />} />
        </Route>

        {/* Shared Routes within Dashboard Layout */}
        <Route path="/shared" element={<DashboardLayout />}>
          <Route path="notifications" element={<Notifications />} />
          <Route path="messages" element={<Messages />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="profile" element={<ProfileSettings />} />
        </Route>

        {/* Error Routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
