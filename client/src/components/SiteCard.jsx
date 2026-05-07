import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export default function SiteCard({ site, index = 0 }) {
  const { client_name, location, description, image_url, completion_date } = site;
  const { isDark } = useTheme();
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' }) : '';

  return (
    <div
      className="group glass-card overflow-hidden hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
      id={`site-card-${site.id}`}
    >
      <div className="relative h-56 overflow-hidden" style={{ backgroundColor: isDark ? '#303030' : '#f0ede6' }}>
        {image_url ? (
          <img
            src={image_url}
            alt={client_name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
          />
        ) : null}
        <div
          className={`w-full h-full flex flex-col items-center justify-center ${image_url ? 'hidden' : 'flex'}`}
          style={{ background: isDark ? 'linear-gradient(to br, #303030, #1a1a1a)' : 'linear-gradient(to br, #f0ede6, #e8e4db)' }}
        >
          <div className="w-20 h-20 rounded-2xl bg-gold-500/10 flex items-center justify-center">
            <FaUser className="text-gold-500 text-2xl" />
          </div>
        </div>
        {completion_date && (
          <div
            className="absolute top-3 right-3 px-3 py-1.5 rounded-lg backdrop-blur-sm flex items-center gap-1.5"
            style={{
              backgroundColor: isDark ? 'rgba(13,13,13,0.8)' : 'rgba(255,255,255,0.9)',
              border: '1px solid var(--border-secondary)',
            }}
          >
            <FaCalendarAlt className="text-gold-500 text-[10px]" />
            <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{formatDate(completion_date)}</span>
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(to top, #1a1a1a, rgba(26,26,26,0.2), transparent)'
              : 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.1), transparent)',
          }}
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-1 font-display group-hover:text-gold-500 transition-colors" style={{ color: 'var(--text-heading)' }}>{client_name}</h3>
        {location && (
          <div className="flex items-center gap-1.5 text-gold-500 text-sm mb-3">
            <FaMapMarkerAlt className="text-xs" /><span>{location}</span>
          </div>
        )}
        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--text-tertiary)' }}>
          {description || 'Successfully completed interior work project.'}
        </p>
      </div>
    </div>
  );
}
