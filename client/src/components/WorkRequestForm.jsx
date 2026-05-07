import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLink, FaTools, FaPaperPlane } from 'react-icons/fa';

export default function WorkRequestForm() {
  const [form, setForm] = useState({ name: '', email: '', mobile_no: '', address: '', map_link: '', the_work: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name is required (min 2 chars)';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.mobile_no.trim() || !/^[6-9]\d{9}$/.test(form.mobile_no.trim())) e.mobile_no = 'Enter valid 10-digit Indian mobile number';
    if (!form.address.trim() || form.address.trim().length < 5) e.address = 'Address is required (min 5 chars)';
    if (form.map_link && !/^https?:\/\/.+/.test(form.map_link)) e.map_link = 'Enter a valid URL';
    if (!form.the_work.trim() || form.the_work.trim().length < 10) e.the_work = 'Describe the work needed (min 10 chars)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post('/requests', form);
      toast.success('Request submitted! We will contact you soon.');
      setForm({ name: '', email: '', mobile_no: '', address: '', map_link: '', the_work: '' });
      setErrors({});
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Failed to submit';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" id="work-request-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="form-label" htmlFor="field-name">Name <span className="text-red-400">*</span></label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><FaUser className="text-sm" /></div>
            <input id="field-name" type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} className="form-input !pl-10" placeholder="Your full name" />
          </div>
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>
        {/* Email */}
        <div>
          <label className="form-label" htmlFor="field-email">Email</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><FaEnvelope className="text-sm" /></div>
            <input id="field-email" type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} className="form-input !pl-10" placeholder="your@email.com" />
          </div>
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Mobile */}
        <div>
          <label className="form-label" htmlFor="field-mobile_no">Mobile No <span className="text-red-400">*</span></label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><FaPhone className="text-sm" /></div>
            <input id="field-mobile_no" type="text" value={form.mobile_no} onChange={e => handleChange('mobile_no', e.target.value)} className="form-input !pl-10" placeholder="9876543210" maxLength={10} />
          </div>
          {errors.mobile_no && <p className="form-error">{errors.mobile_no}</p>}
        </div>
        {/* Map Link */}
        <div>
          <label className="form-label" htmlFor="field-map_link">Map Link</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><FaLink className="text-sm" /></div>
            <input id="field-map_link" type="text" value={form.map_link} onChange={e => handleChange('map_link', e.target.value)} className="form-input !pl-10" placeholder="https://maps.google.com/..." />
          </div>
          {errors.map_link && <p className="form-error">{errors.map_link}</p>}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="form-label" htmlFor="field-address">Address <span className="text-red-400">*</span></label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><FaMapMarkerAlt className="text-sm" /></div>
          <input id="field-address" type="text" value={form.address} onChange={e => handleChange('address', e.target.value)} className="form-input !pl-10" placeholder="Your complete address" />
        </div>
        {errors.address && <p className="form-error">{errors.address}</p>}
      </div>

      {/* The Work */}
      <div>
        <label className="form-label" htmlFor="field-the_work">The Work <span className="text-red-400">*</span></label>
        <div className="relative">
          <div className="absolute left-3 top-3" style={{ color: 'var(--text-muted)' }}><FaTools className="text-sm" /></div>
          <textarea id="field-the_work" value={form.the_work} onChange={e => handleChange('the_work', e.target.value)} className="form-input !pl-10 min-h-[120px] resize-y" placeholder="Describe the work you need done..." rows={4} />
        </div>
        {errors.the_work && <p className="form-error">{errors.the_work}</p>}
      </div>

      <button type="submit" disabled={loading} className="btn-gold w-full text-base group" id="submit-request-btn">
        {loading ? <><span className="w-5 h-5 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin mr-2" />Submitting...</> : <><FaPaperPlane className="mr-2 group-hover:translate-x-1 transition-transform" />Submit Work Request</>}
      </button>
    </form>
  );
}
