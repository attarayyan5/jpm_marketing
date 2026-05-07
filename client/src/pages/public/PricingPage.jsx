import { useState, useEffect } from 'react';
import PricingCard from '../../components/PricingCard';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';

export default function PricingPage() {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/pricing').then(r => { setPricing(r.data.data || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <main className="pt-24 min-h-screen">
      <section className="section-container">
        <div className="gold-divider" />
        <h1 className="section-heading">Our <span className="text-gold-gradient">Pricing</span></h1>
        <p className="section-subheading">Transparent pricing for all our interior work services. Contact us for customized quotes.</p>
        <div className="glass-card p-4 mb-10 flex items-center justify-center gap-3 text-sm border-gold-500/20">
          <span style={{ color: 'var(--text-tertiary)' }}>Prices are estimates and may vary based on project specifications.</span>
          <a href="tel:9665715190" className="text-gold-500 font-medium flex items-center gap-1 hover:text-gold-400"><FaPhone className="text-xs" /> Call for exact quote</a>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton h-64 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricing.map((p, i) => <PricingCard key={p.id} pricing={p} index={i} featured={i === 0} />)}
          </div>
        )}
        {!loading && pricing.length === 0 && (
          <div className="text-center py-20"><p className="text-lg" style={{ color: 'var(--text-muted)' }}>Pricing information coming soon.</p></div>
        )}
      </section>
      <section className="section-container pt-0">
        <div className="glass-card p-8 text-center border-gold-500/20">
          <h3 className="text-2xl font-bold font-display mb-3" style={{ color: 'var(--text-heading)' }}>Need a Custom Quote?</h3>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: 'var(--text-tertiary)' }}>Every project is unique. Contact us with your requirements and we'll provide a detailed estimate.</p>
          <Link to="/contact" className="btn-gold">Request Custom Quote</Link>
        </div>
      </section>
    </main>
  );
}
