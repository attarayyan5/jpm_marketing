export default function StatsCard({ icon: Icon, label, value, color = 'gold' }) {
  const colors = {
    gold: 'bg-gold-500/10 text-gold-500 border-gold-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };
  return (
    <div className="glass-card p-5 hover:border-gold-500/20 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
          <p className="text-3xl font-bold font-display" style={{ color: 'var(--text-heading)' }}>{value}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${colors[color]}`}>
          <Icon className="text-lg" />
        </div>
      </div>
    </div>
  );
}
