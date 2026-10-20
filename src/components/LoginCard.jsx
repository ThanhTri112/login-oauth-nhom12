import React, { useState } from 'react';
import { signInWithGoogle, signInWithGithub, isFirebaseConfigured } from '../firebase';

export default function LoginCard({ onLoginSuccess, onOpenGuide }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [demoMode, setDemoMode] = useState(!isFirebaseConfigured());

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setLoading(true);

    if (demoMode) {
      setTimeout(() => {
        setLoading(false);
        onLoginSuccess({
          uid: 'demo_google_' + Math.random().toString(36).substring(2, 9),
          displayName: 'Nguyễn Văn A (Demo Google)',
          email: 'demo.student@gmail.com',
          photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          provider: 'google',
          providerLabel: 'Google (Gmail)',
          isDemo: true
        });
      }, 600);
      return;
    }

    try {
      const user = await signInWithGoogle();
      setLoading(false);
      onLoginSuccess(user);
    } catch (err) {
      setLoading(false);
      if (err.message === 'NO_CONFIG') {
        setErrorMsg('Chưa cấu hình Firebase! Bạn có thể bật "Chế độ thử nghiệm" bên dưới hoặc bấm nút "Hướng dẫn & Cấu hình" ở trên.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Cửa sổ đăng nhập đã bị đóng trước khi hoàn tất.');
      } else {
        setErrorMsg(`Lỗi đăng nhập Google: ${err.message || 'Không xác định'}`);
      }
    }
  };

  const handleGithubLogin = async () => {
    setErrorMsg('');
    setLoading(true);

    if (demoMode) {
      setTimeout(() => {
        setLoading(false);
        onLoginSuccess({
          uid: 'demo_github_' + Math.random().toString(36).substring(2, 9),
          displayName: 'Trí Nguyễn (Demo GitHub)',
          email: 'tri.developer@github.com',
          photoURL: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
          provider: 'github',
          providerLabel: 'GitHub',
          isDemo: true
        });
      }, 600);
      return;
    }

    try {
      const user = await signInWithGithub();
      setLoading(false);
      onLoginSuccess(user);
    } catch (err) {
      setLoading(false);
      if (err.message === 'NO_CONFIG') {
        setErrorMsg('Chưa cấu hình Firebase! Bạn có thể bật "Chế độ thử nghiệm" bên dưới hoặc bấm nút "Hướng dẫn & Cấu hình" ở trên.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Cửa sổ đăng nhập đã bị đóng trước khi hoàn tất.');
      } else {
        setErrorMsg(`Lỗi đăng nhập GitHub: ${err.message || 'Không xác định'}`);
      }
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-title-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </span>
          Cổng Đăng Nhập
        </h2>
        
        <span className={`badge-status ${demoMode ? 'badge-mock' : 'badge-live'}`}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: demoMode ? '#f59e0b' : '#10b981' }}></span>
          {demoMode ? 'Chế độ Thử nghiệm' : 'Live Firebase OAuth'}
        </span>
      </div>

      <div className="mode-toggle-bar">
        <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          {demoMode ? 'Đang bật mô phỏng nhanh' : 'Đang kết nối Firebase OAuth thật'}
        </span>
        <button 
          className="btn-secondary" 
          style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
          onClick={() => setDemoMode(!demoMode)}
        >
          {demoMode ? 'Chuyển sang Live Auth' : 'Chuyển sang Thử nghiệm'}
        </button>
      </div>

      {errorMsg && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#fca5a5',
          padding: '0.75rem 1rem',
          borderRadius: '12px',
          fontSize: '0.85rem',
          marginBottom: '1.25rem',
          lineHeight: '1.4'
        }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <div className="auth-actions">
        {/* Nút Google */}
        <button 
          className="btn-oauth btn-google"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <svg className="oauth-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>{loading ? 'Đang kết nối...' : 'Đăng nhập với Google (Gmail)'}</span>
        </button>

        {/* Nút GitHub */}
        <button 
          className="btn-oauth btn-github"
          onClick={handleGithubLogin}
          disabled={loading}
        >
          <svg className="oauth-icon" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          <span>{loading ? 'Đang kết nối...' : 'Đăng nhập với GitHub'}</span>
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: 'auto' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          Hệ thống xác thực tiêu chuẩn OAuth 2.0 an toàn và bảo mật.
        </p>
      </div>
    </div>
  );
}
