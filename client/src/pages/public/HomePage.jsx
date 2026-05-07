import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../../components/HeroBanner';
import ServiceCard from '../../components/ServiceCard';
import SiteCard from '../../components/SiteCard';
import api from '../../utils/api';
import { FaArrowRight, FaPhone, FaShieldAlt, FaStar, FaClock, FaCheckCircle } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [sites, setSites] = useState([]);
  const { isDark } = useTheme();

  useEffect(() => {
    api.get('/services').then(r => setServices(r.data.data?.slice(0, 6) || [])).catch(() => {});
    api.get('/sites').then(r => setSites(r.data.data?.slice(0, 3) || [])).catch(() => {});
  }, []);

  const whyUs = [
    { icon: FaStar, title: 'Premium Quality', desc: 'We use only the finest materials and latest techniques for lasting results.' },
    { icon: FaClock, title: 'On-Time Delivery', desc: 'Projects completed within agreed timelines without compromising quality.' },
    { icon: FaShieldAlt, title: 'Trusted Service', desc: 'Years of experience serving clients across Maharashtra with integrity.' },
    { icon: FaCheckCircle, title: 'Complete Solutions', desc: '11+ interior services under one roof for all your needs.' },
  ];

  return (
    <main>
      <HeroBanner />

      {/* Services Preview */}
      <section className="section-container" id="home-services">
        <div className="gold-divider" />
        <h2 className="section-heading">Our <span className="text-gold-gradient">Services</span></h2>
        <p className="section-subheading">Premium interior work solutions crafted with precision and excellence</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          {services.length === 0 && [1,2,3].map(i => <div key={i} className="skeleton h-72 rounded-xl" />)}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="btn-gold-outline group">View All Services <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" /></Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
        <div className="section-container" id="why-choose-us">
          <div className="gold-divider" />
          <h2 className="section-heading">Why Choose <span className="text-gold-gradient">JP Multiservices</span></h2>
          <p className="section-subheading">Experience, quality, and trust — the pillars of our service</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <div key={i} className="glass-card p-6 text-center hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-1 group">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500/20 transition-colors">
                  <item.icon className="text-gold-500 text-xl" />
                </div>
                <h3 className="font-semibold mb-2 font-display" style={{ color: 'var(--text-heading)' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      {sites.length > 0 && (
        <section className="section-container" id="home-portfolio">
          <div className="gold-divider" />
          <h2 className="section-heading">Our <span className="text-gold-gradient">Recent Work</span></h2>
          <p className="section-subheading">See the quality and craftsmanship in our completed projects</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((s, i) => <SiteCard key={s.id} site={s} index={i} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/portfolio" className="btn-gold-outline group">View Full Portfolio <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" /></Link>
          </div>
        </section>
      )}

      {/* Contact CTA Strip */}
      <section className="relative overflow-hidden" id="contact-strip">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\'/%3E%3Cpath d=\'M0 20h40M20 0v40\' stroke=\'%23000\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-dark-900 text-2xl md:text-3xl font-bold font-display">Ready to Transform Your Space?</h3>
            <p className="text-dark-800/80 mt-1">Call us today for a free consultation and quote.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:9665715190" className="inline-flex items-center gap-2 px-6 py-3 bg-dark-900 text-gold-500 rounded-lg font-semibold hover:bg-dark-800 transition-colors">
              <FaPhone /> 9665715190
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-dark-900/20 border-2 border-dark-900 text-dark-900 rounded-lg font-semibold hover:bg-dark-900 hover:text-gold-500 transition-colors">
              Get Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
