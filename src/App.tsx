import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { setupAxiosInterceptors } from './services/api';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const AxiosInterceptorSetup = () => {
  const { token } = useAuth();

  useEffect(() => {
    setupAxiosInterceptors(token);
  }, [token]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AxiosInterceptorSetup />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Login />} />
          
          {/* Rutas privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
          
          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
