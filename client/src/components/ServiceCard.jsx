import { FaTools } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export default function ServiceCard({ service, index = 0 }) {
  const { title, description, image_url } = service;
  const { isDark } = useTheme();

  const getServiceIcon = (title) => {
    return <FaTools className="text-gold-500" />;
  };

  return (
    <div
      className="group glass-card overflow-hidden hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
      id={`service-card-${service.id}`}
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden" style={{ backgroundColor: isDark ? '#303030' : '#f0ede6' }}>
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        {/* Fallback icon display */}
        <div
          className={`w-full h-full flex flex-col items-center justify-center ${image_url ? 'hidden' : 'flex'}`}
          style={{ background: isDark ? 'linear-gradient(to br, #303030, #1a1a1a)' : 'linear-gradient(to br, #f0ede6, #e8e4db)' }}
        >
          <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
            {getServiceIcon(title)}
          </div>
          <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Interior Service</span>
        </div>
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: isDark ? 'linear-gradient(to top, rgba(26,26,26,0.8), transparent, transparent)' : 'linear-gradient(to top, rgba(0,0,0,0.3), transparent, transparent)' }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-gold-500 transition-colors duration-300 font-display" style={{ color: 'var(--text-heading)' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--text-tertiary)' }}>
          {description || 'Professional interior work service delivered with expert craftsmanship and premium materials.'}
        </p>

        {/* Bottom accent */}
        <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-secondary)' }}>
          <span className="text-gold-500 text-xs font-medium uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
            Learn More
            <span className="w-4 h-px bg-gold-500 group-hover:w-8 transition-all duration-300" />
          </span>
        </div>
      </div>
    </div>
  );
}
