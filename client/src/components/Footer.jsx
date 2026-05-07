import { Link } from 'react-router-dom';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaArrowUp, FaHardHat } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact Us', path: '/contact' },
];

const services = [
  'Aluminum Windows',
  'Aluminum Partition',
  'Curtain Wall',
  'Fall Ceiling',
  'PVC Ceiling',
  'Glass Work',
];

export default function Footer() {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: isDark ? '#0d0d0d' : '#1a1a1a', borderTop: '1px solid rgba(212,160,23,0.1)' }}>
      {/* Gold accent line */}
      <div className="h-1 bg-gold-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center">
                <span className="text-dark-900 font-bold text-lg font-display">JP</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  JP <span className="text-gold-500">Multiservices</span>
                </h3>
              </div>
            </div>
            <p className="text-dark-300 text-sm leading-relaxed mb-6">
              Premium interior work services specializing in aluminum fabrication, ceiling designs,
              glass work, and complete interior solutions for residential and commercial spaces.
            </p>
            <div className="flex items-center gap-2 text-gold-500">
              <FaHardHat />
              <span className="text-sm font-medium">All Interior Work Available</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-dark-300 hover:text-gold-500 transition-colors duration-300 text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-500/50" />
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin/login"
                  className="text-dark-400 hover:text-dark-300 transition-colors duration-300 text-xs flex items-center gap-2 mt-4"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-dark-300 hover:text-gold-500 transition-colors duration-300 text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-500/50" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaPhone className="text-gold-500 text-xs" />
                </div>
                <div>
                  <p className="text-dark-400 text-xs uppercase tracking-wider">Contact Person</p>
                  <p className="text-white text-sm font-medium">Pashu Pathan</p>
                  <a href="tel:9665715190" className="text-gold-500 text-sm hover:text-gold-400 transition-colors">
                    9665715190
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-gold-500 text-xs" />
                </div>
                <div>
                  <p className="text-dark-400 text-xs uppercase tracking-wider">Address</p>
                  <p className="text-dark-200 text-sm leading-relaxed">
                    Nagapur Fata, Shendurwada<br />
                    Tal. Gangapur, Dist. Aurangabad<br />
                    Maharashtra
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} JP Multiservices. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-dark-400 hover:text-gold-500 transition-colors duration-300 text-sm"
            id="scroll-to-top"
          >
            <FaArrowUp className="text-xs" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
