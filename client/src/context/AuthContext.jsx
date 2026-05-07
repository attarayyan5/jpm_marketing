import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore auth state from localStorage
    const savedToken = localStorage.getItem('jp_admin_token');
    const savedAdmin = localStorage.getItem('jp_admin_user');
    if (savedToken && savedAdmin) {
      setToken(savedToken);
      setAdmin(JSON.parse(savedAdmin));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api.post('/admin/login', { username, password });
      const { token: newToken, admin: adminData } = res.data;
      setToken(newToken);
      setAdmin(adminData);
      localStorage.setItem('jp_admin_token', newToken);
      localStorage.setItem('jp_admin_user', JSON.stringify(adminData));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('jp_admin_token');
    localStorage.removeItem('jp_admin_user');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ admin, token, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
