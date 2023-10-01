import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "../components/baseLayout";
import Home from "../pages/home";
import Users from "../components/users";
import Plans from "../components/plans";
import Payments from "../components/payments";
import Specialties from "../components/specialties";
import Notifications from "../components/notifications";
import FAQ from "../components/faq";
import Login from "../pages/login";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/specialties" element={<Specialties />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
