import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dictionary from './pages/Dictionary';
import Dashboard from './pages/Dashboard';
import WordDetails from './pages/WordDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<AuthRoute type="protected" redirectTo="/login" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/dictionary/:word" element={<WordDetails />} />
          </Route>

          <Route element={<AuthRoute type="redirect" redirectTo="/" />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
