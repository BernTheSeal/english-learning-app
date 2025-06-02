import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AppLayout from "./components/AppLayout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route element={<AuthRoute type="protected" redirectTo="/login" />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          <Route element={<AuthRoute type="redirect" redirectTo="/" />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
