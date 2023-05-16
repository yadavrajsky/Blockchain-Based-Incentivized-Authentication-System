import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer, toast } from 'react-toastify';
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

function App() {
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
      {/* Same as */}
      <ToastContainer />
      <Router>
        <Navbar />
        <div className="container mt-10 pt-10 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<ProtectedRoute isAdmin={false} />} >
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/about" element={<About />} />
          </Routes>
        </div>


        <Footer />
      </Router>
    </>
  );
}

export default App;
