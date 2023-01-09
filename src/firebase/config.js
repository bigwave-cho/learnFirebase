import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
// REACT-scripts의 dotevv 모듈 덕분에
// 중요 설정 값들을 안전하게 관리 가능.(환경변수)
// .env  설정 후에 .gitignore에 추가해줘야 한다.

// Initialize Firebase(초기화)
const app = initializeApp(firebaseConfig);
const appAuth = getAuth();
const appFirestore = getFirestore(app);

export { appAuth, appFirestore };
/*

  */
