import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaTachometerAlt, FaTools, FaMapMarkedAlt, FaTags, FaClipboardList, FaSignOutAlt, FaArrowLeft, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useState } from 'react';

const links = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: FaTachometerAlt },
  { name: 'Services', path: '/admin/services', icon: FaTools },
  { name: 'Sites', path: '/admin/sites', icon: FaMapMarkedAlt },
  { name: 'Pricing', path: '/admin/pricing', icon: FaTags },
  { name: 'Requests', path: '/admin/requests', icon: FaClipboardList },
];

export default function AdminSidebar() {
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const SidebarContent = () => (
    <>
      <div className="p-5" style={{ borderBottom: '1px solid var(--border-secondary)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gold-gradient flex items-center justify-center">
            <span className="text-dark-900 font-bold text-sm">JP</span>
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Admin Panel</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>JP Multiservices</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map(l => (
          <NavLink key={l.path} to={l.path} onClick={() => setOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? 'bg-gold-500/10 text-gold-500 border-l-2 border-gold-500' : ''}`}
            style={({ isActive }) => isActive ? {} : { color: 'var(--text-tertiary)' }}
          >
            <l.icon className="text-sm" />{l.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 space-y-1" style={{ borderTop: '1px solid var(--border-secondary)' }}>
        {/* Theme toggle in admin */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all text-gold-500 hover:bg-gold-500/10"
        >
          {isDark ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all" style={{ color: 'var(--text-tertiary)' }}>
          <FaArrowLeft className="text-sm" />Back to Site
        </NavLink>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
          <FaSignOutAlt className="text-sm" />Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-secondary)', color: 'var(--text-primary)' }}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>
      {/* Mobile overlay */}
      {open && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />}
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 flex flex-col z-40 transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: 'var(--bg-primary)', borderRight: '1px solid var(--border-secondary)' }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
