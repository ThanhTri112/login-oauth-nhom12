import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GroupInfo from './components/GroupInfo';
import LoginCard from './components/LoginCard';
import UserProfile from './components/UserProfile';
import ConfigModal from './components/ConfigModal';
import { auth, isFirebaseConfigured } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const configured = isFirebaseConfigured();

  useEffect(() => {
    // Tự động kiểm tra trạng thái đăng nhập Firebase nếu có cấu hình
    if (configured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const providerId = firebaseUser.providerData[0]?.providerId || '';
          const isGoogle = providerId.includes('google');
          setUser({
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName || 'Người dùng',
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            provider: isGoogle ? 'google' : 'github',
            providerLabel: isGoogle ? 'Google (Gmail)' : 'GitHub',
            isDemo: false
          });
        }
      });
      return () => unsubscribe();
    }
  }, [configured]);

  return (
    <div className="app-container">
      {/* Header */}
      <Header 
        onOpenGuide={() => setIsGuideOpen(true)} 
        isConfigured={configured} 
      />

      {/* Hero Header */}
      <section className="hero-section">
        <div className="hero-tag">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          Bài Tập Môn Học: OAuth 2.0 Single Sign-On
        </div>
        <h2 className="hero-title">Đăng Nhập Google &amp; GitHub</h2>
        <p className="hero-subtitle">
          Ứng dụng web xác thực phân quyền an toàn, hỗ trợ đăng nhập tức thì bằng tài khoản Gmail và GitHub dành cho bài tập Nhóm 12.
        </p>
      </section>

      {/* Main Grid: Group Info + Login / User Card */}
      <main className="main-grid">
        {/* Cột 1: Thông tin nhóm & thành viên */}
        <GroupInfo />

        {/* Cột 2: Cổng đăng nhập hoặc Hồ sơ người dùng */}
        {user ? (
          <UserProfile 
            user={user} 
            onLogout={() => setUser(null)} 
          />
        ) : (
          <LoginCard 
            onLoginSuccess={(loggedInUser) => setUser(loggedInUser)}
            onOpenGuide={() => setIsGuideOpen(true)}
          />
        )}
      </main>

      {/* Modal Hướng Dẫn & Cấu Hình */}
      <ConfigModal 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
      />

      {/* Footer */}
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} <strong>Nhóm 12</strong> &bull; Nguyễn Thanh Trí (DH52201632) &bull; Trương Lý Quốc Toàn (DH52201595)
        </p>
        <p style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          Xây dựng bằng React &amp; Firebase Authentication &bull; Đã sẵn sàng nộp link lên group
        </p>
      </footer>
    </div>
  );
}
