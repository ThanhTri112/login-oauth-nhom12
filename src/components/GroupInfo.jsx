import React from 'react';

export default function GroupInfo() {
  const members = [
    {
      name: "Nguyễn Thanh Trí",
      mssv: "DH52201632",
      role: "Thành viên nhóm",
      initials: "NT",
      colorClass: ""
    },
    {
      name: "Trương Lý Quốc Toàn",
      mssv: "DH52201595",
      role: "Thành viên nhóm",
      initials: "TQ",
      colorClass: "alt"
    }
  ];

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-title-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </span>
          Thông Tin Nhóm Thực Hiện
        </h2>
        <span className="member-badge">2 Thành viên</span>
      </div>

      <div className="group-meta">
        <div className="group-meta-row">
          <span className="group-meta-label">Tên nhóm:</span>
          <span className="group-meta-value" style={{ color: '#60a5fa', fontWeight: 'bold' }}>Nhóm 12</span>
        </div>
        <div className="group-meta-row">
          <span className="group-meta-label">Đề tài bài tập:</span>
          <span className="group-meta-value">Website đăng nhập Gmail &amp; Mạng xã hội</span>
        </div>
        <div className="group-meta-row">
          <span className="group-meta-label">Mạng xã hội tích hợp:</span>
          <span className="group-meta-value">Google (Gmail) + GitHub OAuth</span>
        </div>
        <div className="group-meta-row">
          <span className="group-meta-label">Công nghệ xây dựng:</span>
          <span className="group-meta-value">React, Vite, Firebase OAuth SDK</span>
        </div>
      </div>

      <div className="members-list">
        {members.map((member, index) => (
          <div key={index} className="member-card">
            <div className={`member-avatar ${member.colorClass}`}>
              {member.initials}
            </div>
            <div className="member-info">
              <div className="member-name">{member.name}</div>
              <div className="member-mssv">MSSV: {member.mssv}</div>
            </div>
            <span className="member-badge">{member.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
