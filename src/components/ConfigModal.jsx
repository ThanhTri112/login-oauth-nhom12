import React, { useState } from 'react';
import { currentFirebaseConfig, isFirebaseConfigured } from '../firebase';

export default function ConfigModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(currentFirebaseConfig, null, 2)
  );
  const [saveStatus, setSaveStatus] = useState('');

  const handleSaveConfig = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!parsed.apiKey || parsed.apiKey === "YOUR_API_KEY") {
        setSaveStatus('⚠️ Vui lòng điền apiKey hợp lệ!');
        return;
      }
      localStorage.setItem('nhom12_firebase_config', JSON.stringify(parsed));
      setSaveStatus('✅ Đã lưu cấu hình thành công! Đang tải lại...');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {
      setSaveStatus('❌ Định dạng JSON không hợp lệ! Vui lòng kiểm tra lại dấu ngoặc và dấu phẩy.');
    }
  };

  const handleResetConfig = () => {
    localStorage.removeItem('nhom12_firebase_config');
    setSaveStatus('🔄 Đã xóa cấu hình riêng. Đang tải lại...');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Hướng Dẫn &amp; Cấu Hình Nộp Bài
          </h3>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.75rem' }}>
            📌 4 Bước Để Hoàn Thiện &amp; Nộp Bài Lên Group
          </h4>

          <div className="step-item">
            <div className="step-num">1</div>
            <div className="step-body">
              <h4>Tạo dự án Firebase (Miễn phí)</h4>
              <p>Truy cập <strong>console.firebase.google.com</strong>, tạo project mới. Vào <strong>Authentication &rarr; Sign-in method</strong>, chọn <strong>Google</strong> và bật <strong>Enable</strong>.</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-num">2</div>
            <div className="step-body">
              <h4>Kích hoạt GitHub OAuth (Chỉ 1 phút)</h4>
              <p>Trong Firebase Authentication &rarr; Sign-in method, chọn <strong>GitHub</strong>. Sau đó vào <a href="https://github.com/settings/developers" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>github.com/settings/developers</a> tạo <strong>OAuth App</strong>, dán <em>Callback URL</em> từ Firebase vào, rồi copy <strong>Client ID</strong> &amp; <strong>Client Secret</strong> ngược lại Firebase.</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-num">3</div>
            <div className="step-body">
              <h4>Dán Firebase Config vào ô bên dưới</h4>
              <p>Vào Firebase <strong>Project Settings &rarr; Your apps &rarr; Web app (&lt;/&gt;)</strong>, copy object <code>firebaseConfig</code> dán vào khung dưới:</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-num">4</div>
            <div className="step-body">
              <h4>Deploy lấy Link nộp bài cho thầy Hùng</h4>
              <p>Đẩy code lên GitHub cá nhân, sau đó kết nối vào <a href="https://vercel.com" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>vercel.com</a> bấm <strong>Deploy</strong> (hoàn toàn miễn phí, chỉ 30 giây). Copy link <code>https://your-project.vercel.app</code> nộp vào group lớp!</p>
            </div>
          </div>
        </div>

        {/* Cấu hình nhanh trực tiếp */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Dán Config Firebase JSON trực tiếp:</span>
            <span style={{ fontSize: '0.75rem', color: isFirebaseConfigured() ? '#34d399' : '#f59e0b' }}>
              {isFirebaseConfigured() ? '● Đã có Config' : '○ Chưa có Config'}
            </span>
          </div>

          <textarea 
            className="config-textarea"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={`{\n  "apiKey": "AIzaSy...",\n  "authDomain": "your-app.firebaseapp.com",\n  "projectId": "your-app",\n  "storageBucket": "your-app.appspot.com",\n  "messagingSenderId": "...",\n  "appId": "..."\n}`}
          />

          {saveStatus && (
            <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#93c5fd' }}>
              {saveStatus}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
            <button className="btn-secondary" onClick={handleResetConfig}>
              Xóa Cấu Hình Đã Lưu
            </button>
            <button 
              className="btn-secondary" 
              style={{ background: '#2563eb', color: '#fff', borderColor: '#3b82f6' }}
              onClick={handleSaveConfig}
            >
              Lưu &amp; Kích Hoạt Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
