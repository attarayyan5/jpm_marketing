import { FaCheck } from 'react-icons/fa';

export default function PricingCard({ pricing, index = 0, featured = false }) {
  const { service_name, cost_estimate, details } = pricing;
  return (
    <div
      className={`glass-card p-6 hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-1 relative ${featured ? 'border-gold-500/40 shadow-lg shadow-gold-500/10' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
      id={`pricing-card-${pricing.id}`}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold-gradient rounded-full text-dark-900 text-xs font-bold uppercase tracking-wider">
          Popular
        </div>
      )}
      <h3 className="font-semibold text-lg font-display mb-2" style={{ color: 'var(--text-heading)' }}>{service_name}</h3>
      <div className="mb-4">
        <span className="text-gold-gradient text-2xl font-bold font-display">{cost_estimate}</span>
      </div>
      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-tertiary)' }}>{details}</p>
      <div className="space-y-2 mb-6">
        {['Quality Materials', 'Expert Installation', 'Warranty Included'].map(f => (
          <div key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <FaCheck className="text-gold-500 text-xs flex-shrink-0" /><span>{f}</span>
          </div>
        ))}
      </div>
      <a href="/contact" className="block text-center btn-gold-outline w-full !py-2.5 text-sm">Get Quote</a>
    </div>
  );
}
