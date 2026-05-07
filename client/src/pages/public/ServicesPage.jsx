import { useState, useEffect } from 'react';
import ServiceCard from '../../components/ServiceCard';
import api from '../../utils/api';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services').then(r => { setServices(r.data.data || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <main className="pt-24 min-h-screen">
      <section className="section-container">
        <div className="gold-divider" />
        <h1 className="section-heading">Our <span className="text-gold-gradient">Services</span></h1>
        <p className="section-subheading">Comprehensive interior work solutions — from aluminum fabrication to designer ceilings, we deliver excellence in every project.</p>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton h-72 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
        )}
        {!loading && services.length === 0 && (
          <div className="text-center py-20"><p className="text-lg" style={{ color: 'var(--text-muted)' }}>No services available at this time.</p></div>
        )}
      </section>
    </main>
  );
}
