import { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FaFilter, FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

export default function ManageRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const fetchData = () => {
    const params = {};
    if (filter !== 'all') params.status = filter;
    if (search) params.search = search;
    api.get('/admin/requests', { params }).then(r => { setRequests(r.data.data || []); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [filter, search]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/requests/${id}/status`, { status });
      toast.success(`Status updated to ${status}`);
      fetchData();
    } catch { toast.error('Failed to update status'); }
  };

  const statusBadge = (s) => {
    const cls = { Pending: 'badge-pending', Contacted: 'badge-contacted', Completed: 'badge-completed' };
    return <span className={cls[s] || 'badge-pending'}>{s}</span>;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-display mb-6" style={{ color: 'var(--text-heading)' }}>Work Requests</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="form-input !pl-10 text-sm" placeholder="Search requests..." />
        </div>
        <div className="flex items-center gap-2">
          <FaFilter className="text-sm" style={{ color: 'var(--text-muted)' }} />
          {['all', 'Pending', 'Contacted', 'Completed'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === s ? 'bg-gold-500/20 text-gold-500 border border-gold-500/30' : 'border hover:text-gold-500'}`}
              style={filter === s ? {} : { backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)', borderColor: 'var(--border-input)' }}>
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead><tr><th></th><th>Name</th><th>Mobile</th><th>Work</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {requests.map(r => (
                <>
                  <tr key={r.id} className="cursor-pointer" onClick={() => setExpanded(expanded === r.id ? null : r.id)}>
                    <td className="w-8" style={{ color: 'var(--text-muted)' }}>{expanded === r.id ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}</td>
                    <td className="font-medium" style={{ color: 'var(--text-primary)' }}>{r.name}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{r.mobile_no}</td>
                    <td className="max-w-[200px] truncate" style={{ color: 'var(--text-secondary)' }}>{r.the_work}</td>
                    <td>{statusBadge(r.status)}</td>
                    <td className="text-xs whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{new Date(r.created_at).toLocaleDateString('en-IN')}</td>
                    <td onClick={e => e.stopPropagation()}>
                      <select value={r.status} onChange={e => updateStatus(r.id, e.target.value)}
                        className="text-xs rounded-lg px-2 py-1.5 outline-none"
                        style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-input)' }}>
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                  {expanded === r.id && (
                    <tr key={`${r.id}-detail`}>
                      <td colSpan={7} style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: 'none' }}>
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div><span style={{ color: 'var(--text-muted)' }}>Email:</span> <span className="ml-2" style={{ color: 'var(--text-primary)' }}>{r.email || '—'}</span></div>
                          <div><span style={{ color: 'var(--text-muted)' }}>Mobile:</span> <span className="ml-2" style={{ color: 'var(--text-primary)' }}>{r.mobile_no}</span></div>
                          <div className="sm:col-span-2"><span style={{ color: 'var(--text-muted)' }}>Address:</span> <span className="ml-2" style={{ color: 'var(--text-primary)' }}>{r.address}</span></div>
                          {r.map_link && <div className="sm:col-span-2"><span style={{ color: 'var(--text-muted)' }}>Map:</span> <a href={r.map_link} target="_blank" rel="noopener noreferrer" className="text-gold-500 ml-2 hover:underline">{r.map_link}</a></div>}
                          <div className="sm:col-span-2"><span style={{ color: 'var(--text-muted)' }}>Work Description:</span><p className="mt-1 leading-relaxed" style={{ color: 'var(--text-primary)' }}>{r.the_work}</p></div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {loading && <tr><td colSpan={7} className="text-center py-8" style={{ color: 'var(--text-muted)' }}>Loading...</td></tr>}
              {!loading && requests.length === 0 && <tr><td colSpan={7} className="text-center py-8" style={{ color: 'var(--text-muted)' }}>No requests found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
