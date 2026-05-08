import WorkRequestForm from '../../components/WorkRequestForm';
import { FaPhone, FaMapMarkerAlt, FaClock, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

export default function ContactPage() {
  const { isDark } = useTheme();

  const contactInfo = [
    { icon: FaPhone, label: 'Phone', value: '9665715190', link: 'tel:9665715190', sub: 'Contact: Pashu Pathan' },
    { icon: FaMapMarkerAlt, label: 'Address', value: 'Nagapur Fata, Shendurwada', sub: 'Tal. Gangapur, Dist. Aurangabad, Maharashtra' },
    { icon: FaClock, label: 'Working Hours', value: 'Mon - Sat: 9AM - 7PM', sub: 'Sunday: By appointment' },
  ];

  return (
    <main className="pt-24 min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <section className="section-container">
        <div className="gold-divider" />
        <h1 className="section-heading">Contact <span className="text-gold-gradient">Us</span></h1>
        <p className="section-subheading">Get in touch for a free consultation. Fill out the form and we'll respond within 24 hours.</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item, i) => (
              <div key={i} className="glass-card p-5 flex items-start gap-4 hover:border-gold-500/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-gold-500 text-lg" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                  {item.link ? (
                    <a href={item.link} className="font-semibold hover:text-gold-500 transition-colors" style={{ color: 'var(--text-primary)' }}>{item.value}</a>
                  ) : (
                    <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                  )}
                  <p className="text-sm mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{item.sub}</p>
                </div>
              </div>
            ))}

            {/* Map embed */}
            <div className="glass-card overflow-hidden h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.0!2d75.0!3d19.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU0JzAwLjAiTiA3NcKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%" height="100%"
                style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg)' : 'none' }}
                allowFullScreen loading="lazy" title="JP Multiservices Location"
              />
            </div>
          </div>

          {/* Work Request Form */}
          <div className="lg:col-span-3">
            <div className="glass-card p-6 md:p-8">
              <h2 className="text-xl font-bold font-display mb-1" style={{ color: 'var(--text-heading)' }}>Request Work</h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Fill in the details below and we'll get back to you with a quote.</p>
              <WorkRequestForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
