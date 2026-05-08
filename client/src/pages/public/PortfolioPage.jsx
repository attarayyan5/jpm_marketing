import { useState, useEffect } from 'react';
import SiteCard from '../../components/SiteCard';
import api from '../../utils/api';

export default function PortfolioPage() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/sites').then(r => { setSites(r.data.data || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <main className="pt-24 min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <section className="section-container">
        <div className="gold-divider" />
        <h1 className="section-heading">Sites <span className="text-gold-gradient">Visited</span></h1>
        <p className="section-subheading">Browse our portfolio of completed projects showcasing quality craftsmanship across Maharashtra.</p>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton h-80 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((s, i) => <SiteCard key={s.id} site={s} index={i} />)}
          </div>
        )}
        {!loading && sites.length === 0 && (
          <div className="text-center py-20"><p className="text-lg" style={{ color: 'var(--text-muted)' }}>No portfolio entries yet.</p></div>
        )}
      </section>
    </main>
  );
}
