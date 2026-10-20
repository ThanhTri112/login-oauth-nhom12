import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut
} from 'firebase/auth';

// Cấu hình Firebase chính thức của Nhóm 12
export const defaultFirebaseConfig = {
  apiKey: "AIzaSyDff1Cbx6EU63Hs-g-9KG5A-nLS8golsXc",
  authDomain: "nhom12-oauth.firebaseapp.com",
  projectId: "nhom12-oauth",
  storageBucket: "nhom12-oauth.firebasestorage.app",
  messagingSenderId: "1042088859186",
  appId: "1:1042088859186:web:4e158f2ef4c020d72a4e2b",
  measurementId: "G-JT10B16RR5"
};

const getSavedConfig = () => {
  try {
    const local = localStorage.getItem('nhom12_firebase_config');
    if (local) {
      return JSON.parse(local);
    }
  } catch (e) {
    console.error('Lỗi đọc config từ localStorage:', e);
  }
  return defaultFirebaseConfig;
};

export const currentFirebaseConfig = getSavedConfig();

export const isFirebaseConfigured = () => {
  return Boolean(
    currentFirebaseConfig.apiKey && 
    currentFirebaseConfig.apiKey !== "YOUR_API_KEY" &&
    currentFirebaseConfig.authDomain
  );
};

// Khởi tạo app Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(currentFirebaseConfig);
const auth = getAuth(app);

// Provider Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Provider GitHub
const githubProvider = new GithubAuthProvider();
githubProvider.addScope('read:user');
githubProvider.addScope('user:email');

export { auth, googleProvider, githubProvider };

// Hàm đăng nhập Google thật
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return {
    uid: result.user.uid,
    displayName: result.user.displayName || "Người dùng Google",
    email: result.user.email,
    photoURL: result.user.photoURL,
    provider: "google",
    providerLabel: "Google (Gmail)",
    isDemo: false
  };
};

// Hàm đăng nhập GitHub thật
export const signInWithGithub = async () => {
  const result = await signInWithPopup(auth, githubProvider);
  return {
    uid: result.user.uid,
    displayName: result.user.displayName || result.user.reloadUserInfo?.screenName || "Người dùng GitHub",
    email: result.user.email || "Email riêng tư (GitHub)",
    photoURL: result.user.photoURL,
    provider: "github",
    providerLabel: "GitHub",
    isDemo: false
  };
};

// Hàm đăng xuất
export const logOut = async () => {
  if (auth) {
    await firebaseSignOut(auth);
  }
};
