import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { appAuth } from '../firebase/config';
//커스텀훅
export const useSignup = (email, password, displayName) => {
  //에러 정보 저장
  const [error, setError] = useState(null);
  //현재 서버 통신 상태 저장
  const [isPending, setIsPending] = useState(false);

  const signup = () => {
    setError(null); // 아직 에러 X
    setIsPending(true); // 통신 진행중

    // https://firebase.google.com/docs/auth/web/password-auth - firebase docs
    createUserWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        if (!user) {
          throw new Error('회원가입실패');
        }

        updateProfile(appAuth.currentUser, {
          displayName,
        })
          .then(() => {
            setError(null);
            setIsPending(false);
          })
          .catch((err) => {
            setError(err.message);
            setIsPending(false);
          });
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  return { error, isPending, signup };
};
