import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";
import { showToast } from "./Components/utils/showToast";
import 'react-toastify/dist/ReactToastify.css';
import About from "./Components/About";
import ProtectedRoute from "./ProtectedRoute";
import RegisterForm from "./features/auth/RegisterForm";
import LoginForm from "./features/auth/LoginForm";
import CompanyRegisterForm from "./features/company/CompanyRegisterForm";
import NotFound from "./Components/NotFound";

function UserSection() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <div className="container mt-10 pt-10 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<ProtectedRoute isAdmin={false} />} >
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Outlet /> */}
      </div>
      <Footer />
    </>
  );
}


function CompanySection() {
  return (
    <Routes>
      <Route path="/" element={null} >
        <Route path="/register" element={<CompanyRegisterForm />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>

        <Route path="/company/*" element={<CompanySection />} />
        <Route path="*" element={<UserSection />} />
      </Routes>
    </Router>
  );
}
