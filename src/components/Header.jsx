import React from 'react';

export default function Header({ onOpenGuide, isConfigured }) {
  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-badge">NHÓM 12</div>
        <div className="brand-text">
          <h1>Hệ Thống Đăng Nhập OAuth 2.0</h1>
          <p>Gmail (Google) &amp; GitHub Authentication</p>
        </div>
      </div>

      <div className="nav-actions">
        <button 
          className="btn-secondary"
          onClick={onOpenGuide}
          title="Xem hướng dẫn cấu hình & nộp bài"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>Hướng dẫn &amp; Nộp bài</span>
        </button>
      </div>
    </header>
  );
}
