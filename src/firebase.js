import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';

// Cấu hình Firebase mặc định lấy từ .env hoặc localStorage
const getSavedConfig = () => {
  try {
    const local = localStorage.getItem('nhom12_firebase_config');
    if (local) {
      return JSON.parse(local);
    }
  } catch (e) {
    console.error('Lỗi đọc config từ localStorage:', e);
  }

  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
  };
};

export const currentFirebaseConfig = getSavedConfig();

// Kiểm tra xem Firebase đã có API key hợp lệ chưa
export const isFirebaseConfigured = () => {
  return Boolean(
    currentFirebaseConfig.apiKey && 
    currentFirebaseConfig.apiKey !== "YOUR_API_KEY" &&
    currentFirebaseConfig.authDomain
  );
};

// Khởi tạo app an toàn
let app;
let auth;
let googleProvider;
let githubProvider;

try {
  if (isFirebaseConfigured()) {
    app = getApps().length > 0 ? getApp() : initializeApp(currentFirebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    
    githubProvider = new GithubAuthProvider();
    githubProvider.addScope('read:user');
    githubProvider.addScope('user:email');
  }
} catch (error) {
  console.warn("Chưa khởi tạo Firebase SDK thật hoặc cấu hình chưa hợp lệ:", error);
}

export { auth, googleProvider, githubProvider };

// Hàm đăng nhập Google
export const signInWithGoogle = async () => {
  if (!isFirebaseConfigured() || !auth) {
    throw new Error("NO_CONFIG");
  }
  const result = await signInWithPopup(auth, googleProvider);
  return {
    uid: result.user.uid,
    displayName: result.user.displayName || "Người dùng Google",
    email: result.user.email,
    photoURL: result.user.photoURL,
    provider: "google",
    providerLabel: "Google (Gmail)"
  };
};

// Hàm đăng nhập GitHub
export const signInWithGithub = async () => {
  if (!isFirebaseConfigured() || !auth) {
    throw new Error("NO_CONFIG");
  }
  const result = await signInWithPopup(auth, githubProvider);
  return {
    uid: result.user.uid,
    displayName: result.user.displayName || result.user.reloadUserInfo?.screenName || "Người dùng GitHub",
    email: result.user.email || "Email riêng tư (GitHub)",
    photoURL: result.user.photoURL,
    provider: "github",
    providerLabel: "GitHub"
  };
};

// Hàm đăng xuất
export const logOut = async () => {
  if (auth) {
    await firebaseSignOut(auth);
  }
};
