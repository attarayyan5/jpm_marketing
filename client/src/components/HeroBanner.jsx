import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export default function HeroBanner() {
  const { isDark } = useTheme();

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ backgroundColor: isDark ? '#0d0d0d' : '#faf9f6' }}>
        {/* Decorative gold corner accents */}
        <div className="absolute top-0 right-0 w-72 h-72 opacity-20">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-gold-500/40 to-transparent" 
               style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
        </div>
        <div className="absolute bottom-0 left-0 w-72 h-72 opacity-20">
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-gold-500/40 to-transparent" 
               style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }} />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            opacity: isDark ? 0.03 : 0.06,
            backgroundImage: `linear-gradient(rgba(212,160,23,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-gold-500/30 rounded-full animate-float" />
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-gold-500/20 rounded-full animate-float animate-delay-200" />
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-gold-500/25 rounded-full animate-float animate-delay-400" />
        <div className="absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-gold-500/15 rounded-full animate-float animate-delay-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
            <span className="text-gold-500 text-sm font-medium tracking-wide">
              Premium Interior Work Services
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up leading-tight">
            Transform Your Space
            <br />
            <span className="text-gold-gradient">With JP Multiservices</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200 leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
            Expert craftsmanship in aluminum fabrication, modern ceiling designs, glass installations,
            and complete interior solutions for homes and businesses across Maharashtra.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
            <Link
              to="/contact"
              className="btn-gold text-base group"
              id="hero-cta-quote"
            >
              Request a Quote
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/portfolio"
              className="btn-gold-outline text-base group"
              id="hero-cta-portfolio"
            >
              <FaPlay className="mr-2 text-xs" />
              View Our Work
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-16 max-w-lg mx-auto animate-fade-in-up animate-delay-400" style={{ borderTop: '1px solid var(--border-secondary)' }}>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gold-gradient font-display">11+</p>
              <p className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Services</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gold-gradient font-display">100+</p>
              <p className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Projects</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gold-gradient font-display">5+</p>
              <p className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Years Exp.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: `linear-gradient(to top, var(--bg-primary), transparent)` }} />
    </section>
  );
}
