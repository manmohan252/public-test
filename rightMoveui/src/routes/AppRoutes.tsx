import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Details from "../pages/Details/Details";
import CreateFlatPage from "../pages/Admin/CreateFlatPage/CreateFlatPage";
import AdminLogin from "../pages/Admin/AdminLoginPage/AdminLoginPage";
import ManageFlatPage from "../pages/Admin/ManageFlatPage/ManageFlatPage";
import About from "../pages/About/About";
import TreamOfUse from "../components/TreamOfUse/TreamOfUse";
import Services from "../pages/ServicePage/ServicePage";
import Contact from "../pages/ContactPage/ContactPage";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/terms" element={<TreamOfUse />} />
      
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected routes */}
        <Route
          path="/admin/create-flat"
          element={
            <ProtectedRoute>
              <CreateFlatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-flats"
          element={
            <ProtectedRoute>
              <ManageFlatPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;