import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminSidebar from './components/AdminSidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import HomePage from './pages/public/HomePage';
import ServicesPage from './pages/public/ServicesPage';
import PortfolioPage from './pages/public/PortfolioPage';
import PricingPage from './pages/public/PricingPage';
import ContactPage from './pages/public/ContactPage';

// Admin pages
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ManageServicesPage from './pages/admin/ManageServicesPage';
import ManageSitesPage from './pages/admin/ManageSitesPage';
import ManagePricingPage from './pages/admin/ManagePricingPage';
import ManageRequestsPage from './pages/admin/ManageRequestsPage';

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-dark-900">
      <AdminSidebar />
      <div className="lg:ml-64 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><HomePage /><Footer /></>} />
        <Route path="/services" element={<><ServicesPage /><Footer /></>} />
        <Route path="/portfolio" element={<><PortfolioPage /><Footer /></>} />
        <Route path="/pricing" element={<><PricingPage /><Footer /></>} />
        <Route path="/contact" element={<><ContactPage /><Footer /></>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><DashboardPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><AdminLayout><ManageServicesPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/sites" element={<ProtectedRoute><AdminLayout><ManageSitesPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/pricing" element={<ProtectedRoute><AdminLayout><ManagePricingPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/requests" element={<ProtectedRoute><AdminLayout><ManageRequestsPage /></AdminLayout></ProtectedRoute>} />
      </Routes>
    </>
  );
}
