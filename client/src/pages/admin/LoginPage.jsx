import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) { navigate('/admin/dashboard', { replace: true }); return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);
    if (result.success) { toast.success('Welcome back!'); navigate('/admin/dashboard'); }
    else toast.error(result.message);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(212,160,23,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gold-gradient flex items-center justify-center mx-auto mb-4"><span className="text-dark-900 font-bold text-2xl font-display">JP</span></div>
          <h1 className="text-2xl font-bold text-white font-display">Admin Login</h1>
          <p className="text-dark-400 text-sm mt-1">JP Multiservices Management Portal</p>
        </div>
        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
          <div>
            <label className="form-label">Username</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400"><FaUser className="text-sm" /></div>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-input !pl-10" placeholder="Enter username" id="login-username" />
            </div>
          </div>
          <div>
            <label className="form-label">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400"><FaLock className="text-sm" /></div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-input !pl-10" placeholder="Enter password" id="login-password" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-gold w-full group" id="login-submit">
            {loading ? <span className="w-5 h-5 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" /> : <><FaSignInAlt className="mr-2" />Sign In</>}
          </button>
        </form>
      </div>
    </main>
  );
}
