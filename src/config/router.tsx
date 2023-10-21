import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "../components/baseLayout";
import Login from "../pages/login/login";
import Home from "../pages/home";
import Users from "../pages/user/users";
import UserDetail from "../pages/user/userDetail";
import Plans from "../pages/plans/plans";
import PlanDetail from "../pages/plans/planDetail";
import Specialties from "../pages/specialties/specialties";
import SpecialtyDetail from "../pages/specialties/specialtyDetail";
import Notifications from "../pages/notification/notifications";
import NotificationDetail from "../pages/notification/notificationDetail";
import FAQ from "../pages/faq/faq";
import FAQDetail from "../pages/faq/faqDetail";




export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<BaseLayout />}>
          <Route path="/home/" element={<Home />} />
          <Route path="/home/users" element={<Users />} />
          <Route path="/home/user/detail" element={<UserDetail />} />
          <Route path="/home/plans" element={<Plans />} />
          <Route path="/home/plans/:id" element={<PlanDetail />} />
          <Route path="/home/plans/new/:type" element={<PlanDetail />} />
          <Route path="/home/specialties" element={<Specialties />} />
          <Route path="/home/specialties/:id" element={<SpecialtyDetail />} />
          <Route path="/home/specialties/new" element={<SpecialtyDetail />} />
          <Route path="/home/notifications" element={<Notifications />} />
          <Route path="/home/notifications/:id" element={<NotificationDetail />} />
          <Route path="/home/notifications/new/:type" element={<NotificationDetail />} />
          <Route path="/home/faq" element={<FAQ />} />
          <Route path="/home/faq/:id" element={<FAQDetail />} />
          <Route path="/home/faq/new/:type" element={<FAQDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}