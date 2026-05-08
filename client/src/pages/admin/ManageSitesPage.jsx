import { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

export default function ManageSitesPage() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ client_name: '', location: '', description: '', completion_date: '' });
  const [imageFile, setImageFile] = useState(null);

  const fetchSites = () => { api.get('/admin/sites').then(r => { setSites(r.data.data || []); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { fetchSites(); }, []);

  const openAdd = () => { setEditing(null); setForm({ client_name: '', location: '', description: '', completion_date: '' }); setImageFile(null); setModal(true); };
  const openEdit = (s) => { setEditing(s); setForm({ client_name: s.client_name, location: s.location || '', description: s.description || '', completion_date: s.completion_date ? s.completion_date.split('T')[0] : '' }); setImageFile(null); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.client_name.trim()) { toast.error('Client name is required'); return; }
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append('image', imageFile);
    try {
      if (editing) { await api.put(`/admin/sites/${editing.id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Site updated'); }
      else { await api.post('/admin/sites', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Site added'); }
      setModal(false); fetchSites();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this site entry?')) return;
    try { await api.delete(`/admin/sites/${id}`); toast.success('Deleted'); fetchSites(); } catch { toast.error('Failed'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display" style={{ color: 'var(--text-heading)' }}>Manage Sites / Portfolio</h1>
        <button onClick={openAdd} className="btn-gold text-sm !px-4 !py-2"><FaPlus className="mr-2" />Add Site</button>
      </div>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead><tr><th>ID</th><th>Client</th><th>Location</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {sites.map(s => (
                <tr key={s.id}>
                  <td style={{ color: 'var(--text-muted)' }}>{s.id}</td>
                  <td className="font-medium" style={{ color: 'var(--text-primary)' }}>{s.client_name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{s.location}</td>
                  <td className="text-sm" style={{ color: 'var(--text-muted)' }}>{s.completion_date ? new Date(s.completion_date).toLocaleDateString('en-IN') : '—'}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(s)} className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center hover:bg-blue-500/20"><FaEdit className="text-xs" /></button>
                      <button onClick={() => handleDelete(s.id)} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20"><FaTrash className="text-xs" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {loading && <tr><td colSpan={5} className="text-center py-8" style={{ color: 'var(--text-muted)' }}>Loading...</td></tr>}
              {!loading && sites.length === 0 && <tr><td colSpan={5} className="text-center py-8" style={{ color: 'var(--text-muted)' }}>No sites</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setModal(false)}>
          <div className="glass-card w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold font-display" style={{ color: 'var(--text-heading)' }}>{editing ? 'Edit' : 'Add'} Site</h2>
              <button onClick={() => setModal(false)} className="hover:text-gold-500 transition-colors" style={{ color: 'var(--text-muted)' }}><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="form-label">Client Name *</label><input type="text" value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} className="form-input" /></div>
              <div><label className="form-label">Location</label><input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="form-input" /></div>
              <div><label className="form-label">Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="form-input min-h-[80px]" /></div>
              <div><label className="form-label">Completion Date</label><input type="date" value={form.completion_date} onChange={e => setForm({...form, completion_date: e.target.value})} className="form-input" /></div>
              <div><label className="form-label">Image</label><input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="form-input text-sm" /></div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="flex-1 px-4 py-2.5 rounded-lg transition-colors text-sm" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>Cancel</button>
                <button type="submit" className="flex-1 btn-gold text-sm !py-2.5">{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
