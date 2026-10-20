import React from 'react';
import { logOut } from '../firebase';

export default function UserProfile({ user, onLogout }) {
  const handleLogoutClick = async () => {
    try {
      await logOut();
    } catch (e) {
      console.warn('Lỗi khi logout Firebase:', e);
    }
    onLogout();
  };

  const isGoogle = user.provider === 'google';

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-title-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          Trạng Thái Đăng Nhập
        </h2>
        <span className="badge-status badge-live">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></span>
          Đã xác thực thành công
        </span>
      </div>

      <div className="user-profile">
        <div className="user-avatar-wrap">
          <img 
            src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=3b82f6&color=fff`} 
            alt={user.displayName} 
            className="user-avatar-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=3b82f6&color=fff`;
            }}
          />
          <div className="provider-pill" title={user.providerLabel}>
            {isGoogle ? (
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            ) : (
              <svg width="14" height="14" fill="#ffffff" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            )}
          </div>
        </div>

        <h3 className="user-display-name">{user.displayName}</h3>
        <p className="user-email">{user.email}</p>

        <div className="user-details-box">
          <div className="user-detail-row">
            <span style={{ color: 'var(--text-dim)' }}>Phương thức đăng nhập:</span>
            <span style={{ fontWeight: 600, color: isGoogle ? '#60a5fa' : '#cbd5e1' }}>
              {user.providerLabel}
            </span>
          </div>

          <div className="user-detail-row">
            <span style={{ color: 'var(--text-dim)' }}>Tài khoản UID:</span>
            <span style={{ fontFamily: 'monospace', color: '#94a3b8', fontSize: '0.8rem' }}>
              {user.uid.length > 20 ? user.uid.substring(0, 18) + '...' : user.uid}
            </span>
          </div>

          <div className="user-detail-row">
            <span style={{ color: 'var(--text-dim)' }}>Chế độ hệ thống:</span>
            <span style={{ color: user.isDemo ? '#f59e0b' : '#10b981', fontWeight: 600 }}>
              {user.isDemo ? 'Thử nghiệm mô phỏng' : 'OAuth 2.0 Trực tiếp'}
            </span>
          </div>
        </div>

        <button className="btn-logout" onClick={handleLogoutClick}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Đăng Xuất Khỏi Hệ Thống</span>
        </button>
      </div>
    </div>
  );
}
