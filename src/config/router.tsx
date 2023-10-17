import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "../components/baseLayout";
import Home from "../pages/home";
import Users from "../pages/users";
import Plans from "../pages/plans";
import Specialties from "../pages/specialties";
import Notifications from "../pages/notifications";
import FAQ from "../pages/faq";
import Login from "../pages/login";
import UserDetail from "../pages/userDetail";
import SpecialtyDetail from "../pages/specialtyDetail";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<BaseLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/users" element={<Users />} />
          <Route path="/home/user/detail" element={<UserDetail />} />
          <Route path="/home/plans" element={<Plans />} />
          <Route path="/home/specialties" element={<Specialties />} />
          <Route path="/home/specialties/:id" element={<SpecialtyDetail />} />
          <Route path="/home/notifications" element={<Notifications />} />
          <Route path="/home/faq" element={<FAQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


{/* <Route path="/home/details/:id" element={<UserDetail />} />
<Route path="/home/users/:tipo" element={<UserDetail />} /> */}