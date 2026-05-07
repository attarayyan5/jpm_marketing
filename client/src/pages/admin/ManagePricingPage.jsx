import { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

export default function ManagePricingPage() {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ service_name: '', cost_estimate: '', details: '' });

  const fetchData = () => { api.get('/admin/pricing').then(r => { setPricing(r.data.data || []); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm({ service_name: '', cost_estimate: '', details: '' }); setModal(true); };
  const openEdit = (p) => { setEditing(p); setForm({ service_name: p.service_name, cost_estimate: p.cost_estimate, details: p.details || '' }); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.service_name.trim() || !form.cost_estimate.trim()) { toast.error('Service name and cost are required'); return; }
    try {
      if (editing) { await api.put(`/admin/pricing/${editing.id}`, form); toast.success('Updated'); }
      else { await api.post('/admin/pricing', form); toast.success('Created'); }
      setModal(false); fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this pricing entry?')) return;
    try { await api.delete(`/admin/pricing/${id}`); toast.success('Deleted'); fetchData(); } catch { toast.error('Failed'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white font-display">Manage Pricing</h1>
        <button onClick={openAdd} className="btn-gold text-sm !px-4 !py-2"><FaPlus className="mr-2" />Add Pricing</button>
      </div>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead><tr><th>ID</th><th>Service</th><th>Cost Estimate</th><th>Details</th><th>Actions</th></tr></thead>
            <tbody>
              {pricing.map(p => (
                <tr key={p.id}>
                  <td className="text-dark-400">{p.id}</td>
                  <td className="text-white font-medium">{p.service_name}</td>
                  <td className="text-gold-500 font-semibold">{p.cost_estimate}</td>
                  <td className="text-dark-300 max-w-[250px] truncate">{p.details}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center hover:bg-blue-500/20"><FaEdit className="text-xs" /></button>
                      <button onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20"><FaTrash className="text-xs" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {loading && <tr><td colSpan={5} className="text-center text-dark-400 py-8">Loading...</td></tr>}
              {!loading && pricing.length === 0 && <tr><td colSpan={5} className="text-center text-dark-400 py-8">No pricing entries</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setModal(false)}>
          <div className="glass-card w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white text-lg font-bold font-display">{editing ? 'Edit' : 'Add'} Pricing</h2>
              <button onClick={() => setModal(false)} className="text-dark-400 hover:text-white"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="form-label">Service Name *</label><input type="text" value={form.service_name} onChange={e => setForm({...form, service_name: e.target.value})} className="form-input" placeholder="e.g. Aluminum Windows" /></div>
              <div><label className="form-label">Cost Estimate *</label><input type="text" value={form.cost_estimate} onChange={e => setForm({...form, cost_estimate: e.target.value})} className="form-input" placeholder="e.g. ₹250 - ₹600/sq ft" /></div>
              <div><label className="form-label">Details</label><textarea value={form.details} onChange={e => setForm({...form, details: e.target.value})} className="form-input min-h-[100px]" placeholder="Pricing details and inclusions..." /></div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="flex-1 px-4 py-2.5 rounded-lg bg-dark-700 text-dark-200 hover:bg-dark-600 transition-colors text-sm">Cancel</button>
                <button type="submit" className="flex-1 btn-gold text-sm !py-2.5">{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
