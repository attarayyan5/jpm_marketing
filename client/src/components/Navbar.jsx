import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaPhone, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'shadow-lg border-b'
          : 'bg-transparent'
      }`}
      style={{
        backgroundColor: scrolled ? (isDark ? 'rgba(13,13,13,0.95)' : 'rgba(255,255,255,0.95)') : 'transparent',
        borderColor: scrolled ? 'var(--border-primary)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" id="navbar-logo">
            <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-dark-900 font-bold text-lg font-display">JP</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-wide leading-tight" style={{ color: 'var(--text-primary)' }}>
                JP <span className="text-gold-500">Multiservices</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase hidden sm:block" style={{ color: 'var(--text-muted)' }}>
                Interior Excellence
              </span>
            </div>
          </Link>

          <NavLink
            to="/admin/login"
            className="text-dark-900 font-medium text-xs flex items-center gap-2 mt-2 px-3 py-2 bg-gold-500 hover:bg-gold-600 rounded-lg transition-all duration-300"
          >
            Admin Login
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                id={`nav-${link.name.toLowerCase()}`}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-gold-500'
                    : 'hover:text-gold-500'
                }`}
                style={{ color: isActive(link.path) ? undefined : 'var(--text-secondary)' }}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gold-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + Theme Toggle + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: isDark ? 'rgba(212,160,23,0.1)' : 'rgba(212,160,23,0.1)',
                border: '1px solid rgba(212,160,23,0.2)',
              }}
              id="theme-toggle"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <FaSun className="text-gold-400 text-sm transition-transform duration-300" />
              ) : (
                <FaMoon className="text-gold-600 text-sm transition-transform duration-300" />
              )}
            </button>

            <a
              href="tel:9665715190"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-500 hover:bg-gold-500/20 transition-all duration-300 text-sm"
              id="navbar-phone"
            >
              <FaPhone className="text-xs" />
              <span>9665715190</span>
            </a>
            <Link
              to="/contact"
              className="hidden lg:inline-flex btn-gold text-sm !px-5 !py-2"
              id="navbar-cta"
            >
              Get Quote
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg transition-all"
              style={{ color: 'var(--text-secondary)' }}
              id="navbar-toggle"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className="px-4 py-4 space-y-1 border-t"
          style={{
            backgroundColor: isDark ? 'rgba(26,26,26,0.97)' : 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            borderColor: 'var(--border-secondary)',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              id={`mobile-nav-${link.name.toLowerCase()}`}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive(link.path)
                  ? 'bg-gold-500/10 text-gold-500 border-l-2 border-gold-500'
                  : ''
              }`}
              style={{ color: isActive(link.path) ? undefined : 'var(--text-secondary)' }}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium w-full transition-all duration-300 bg-gold-500/10 text-gold-500 mt-2"
          >
            {isDark ? <FaSun className="text-xs" /> : <FaMoon className="text-xs" />}
            {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>

          <a
            href="tel:9665715190"
            className="flex items-center gap-2 px-4 py-3 mt-2 rounded-lg bg-gold-500/10 text-gold-500 text-sm font-medium"
          >
            <FaPhone className="text-xs" />
            Call: 9665715190
          </a>
        </div>
      </div>
    </nav>
  );
}
