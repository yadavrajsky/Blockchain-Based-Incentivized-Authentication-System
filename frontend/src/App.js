import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";
import "react-toastify/dist/ReactToastify.css";
import About from "./Components/About";
import ProtectedRoute from "./ProtectedRoute";
import RegisterForm from "./features/auth/RegisterForm";
import LoginForm from "./features/auth/LoginForm";
import CompanyRegisterForm from "./features/company/CompanyRegisterForm";
import NotFound from "./Components/NotFound";
import CompanyHomePage from "./features/company/CompanyHomePage";

function UserSection() {
  return (
    <>
      <Navbar />
      <div className="mt-10 pt-10 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<ProtectedRoute isAdmin={false} />}>
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

function CompanySection() {
  return (
    <Routes>
      <Route path="/" element={<CompanyHomePage />}>
        <Route path="/register" element={<CompanyRegisterForm />} />
      </Route>
    </Routes>
  );
}

export default function App() {
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
      <Router>
        <Routes>
          <Route path="/company/*" element={<CompanySection />} />
          <Route path="*" element={<UserSection />} />
        </Routes>
      </Router>
    </>
  );
}
