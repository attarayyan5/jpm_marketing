import { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';

export default function ManageServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', is_active: true });
  const [imageFile, setImageFile] = useState(null);

  const fetch = () => { api.get('/admin/services').then(r => { setServices(r.data.data || []); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setEditing(null); setForm({ title: '', description: '', is_active: true }); setImageFile(null); setModal(true); };
  const openEdit = (s) => { setEditing(s); setForm({ title: s.title, description: s.description || '', is_active: s.is_active }); setImageFile(null); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('is_active', form.is_active);
    if (imageFile) fd.append('image', imageFile);
    try {
      if (editing) { await api.put(`/admin/services/${editing.id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Service updated'); }
      else { await api.post('/admin/services', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Service created'); }
      setModal(false); fetch();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    try { await api.delete(`/admin/services/${id}`); toast.success('Deleted'); fetch(); } catch { toast.error('Failed'); }
  };

  const toggleActive = async (s) => {
    const fd = new FormData();
    fd.append('title', s.title);
    fd.append('is_active', !s.is_active);
    try { await api.put(`/admin/services/${s.id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }); fetch(); } catch { toast.error('Failed'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white font-display">Manage Services</h1>
        <button onClick={openAdd} className="btn-gold text-sm !px-4 !py-2"><FaPlus className="mr-2" />Add Service</button>
      </div>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead><tr><th>ID</th><th>Title</th><th>Description</th><th>Active</th><th>Actions</th></tr></thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id}>
                  <td className="text-dark-400">{s.id}</td>
                  <td className="text-white font-medium">{s.title}</td>
                  <td className="text-dark-300 max-w-[250px] truncate">{s.description}</td>
                  <td>
                    <button onClick={() => toggleActive(s)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${s.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {s.is_active ? <FaCheck /> : <FaTimes />}
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(s)} className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center hover:bg-blue-500/20"><FaEdit className="text-xs" /></button>
                      <button onClick={() => handleDelete(s.id)} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20"><FaTrash className="text-xs" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {loading && <tr><td colSpan={5} className="text-center text-dark-400 py-8">Loading...</td></tr>}
              {!loading && services.length === 0 && <tr><td colSpan={5} className="text-center text-dark-400 py-8">No services</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setModal(false)}>
          <div className="glass-card w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white text-lg font-bold font-display">{editing ? 'Edit' : 'Add'} Service</h2>
              <button onClick={() => setModal(false)} className="text-dark-400 hover:text-white"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="form-label">Title *</label><input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="form-input" /></div>
              <div><label className="form-label">Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="form-input min-h-[100px]" /></div>
              <div><label className="form-label">Image</label><input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="form-input text-sm" /></div>
              <div className="flex items-center gap-3"><input type="checkbox" id="active-check" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} className="w-4 h-4 accent-gold-500" /><label htmlFor="active-check" className="text-sm text-dark-200">Active</label></div>
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
