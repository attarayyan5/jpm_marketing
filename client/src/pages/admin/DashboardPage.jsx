import { useState, useEffect } from 'react';
import api from '../../utils/api';
import StatsCard from '../../components/StatsCard';
import { FaTools, FaMapMarkedAlt, FaClipboardList, FaClock, FaCheckCircle, FaPhoneAlt, FaTags } from 'react-icons/fa';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    api.get('/admin/stats').then(r => setStats(r.data.data)).catch(() => {});
    api.get('/admin/requests').then(r => setRecentRequests((r.data.data || []).slice(0, 5))).catch(() => {});
  }, []);

  const statusBadge = (s) => {
    const cls = { Pending: 'badge-pending', Contacted: 'badge-contacted', Completed: 'badge-completed' };
    return <span className={cls[s] || 'badge-pending'}>{s}</span>;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-display mb-6" style={{ color: 'var(--text-heading)' }}>Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={FaTools} label="Total Services" value={stats?.totalServices ?? '—'} color="gold" />
        <StatsCard icon={FaMapMarkedAlt} label="Sites Visited" value={stats?.totalSites ?? '—'} color="blue" />
        <StatsCard icon={FaClipboardList} label="Total Requests" value={stats?.totalRequests ?? '—'} color="purple" />
        <StatsCard icon={FaClock} label="Pending" value={stats?.pendingRequests ?? '—'} color="red" />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="px-5 py-4 border-b border-dark-700 flex items-center justify-between">
          <h2 className="font-semibold" style={{ color: 'var(--text-heading)' }}>Recent Work Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Mobile</th><th>Work</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {recentRequests.map(r => (
                <tr key={r.id}>
                  <td className="font-medium" style={{ color: 'var(--text-primary)' }}>{r.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.mobile_no}</td>
                  <td className="max-w-[200px] truncate" style={{ color: 'var(--text-secondary)' }}>{r.the_work}</td>
                  <td>{statusBadge(r.status)}</td>
                  <td className="text-xs" style={{ color: 'var(--text-muted)' }}>{new Date(r.created_at).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
              {recentRequests.length === 0 && <tr><td colSpan={5} className="text-center py-8" style={{ color: 'var(--text-muted)' }}>No requests yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
