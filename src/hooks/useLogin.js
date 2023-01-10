import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { appAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
//커스텀훅
export const useLogin = () => {
  //에러 정보 저장
  const [error, setError] = useState(null);
  //현재 서버 통신 상태 저장
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  // state와 dispatch중 dispatch만 가져와서

  const login = (email, password) => {
    setError(null); // 아직 에러가 없으니 null 입니다.
    setIsPending(true); // 통신중이므로 true입니다.

    signInWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: 'login', payload: user });
        setError(null);
        setIsPending(false);

        if (!user) {
          throw new Error('로그인에 실패했습니다.');
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  return { error, isPending, login };
};
