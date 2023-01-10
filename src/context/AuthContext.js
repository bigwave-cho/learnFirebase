import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useReducer } from 'react';
import { appAuth } from '../firebase/config';

// context api 사용하기

// context 객체 생성
const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload };
    // state에는 기존 user 프로퍼티가 있고
    // action.payload가 들어오면 기존 user의 값을 덮어쓰게 됨.
    case 'logout':
      return { ...state, user: null };
    // 기존의 user정보를 null로 덮어 없애면
    // 유저정보가 없어져 로그아웃 상태가 됨.
    case 'isAuthReady':
      return { ...state, user: action.payload, isAuthReady: true };
    default:
      return state;
  }
};

// context 구독 위한 컴포넌트의 묶음 범위 설정
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false,
  });
  // const [관리할값, dispatch함수] = useReducer(리듀서함수, 관리값 초기화)

  // useReducer는 useState의 대체함수이며 string이나 number는 useState가 편하지만
  // 객체 등의 데이터는 useReducer를 권장

  //dispatch({type: 'login', payload: user})
  // authReudcer 호출
  // 전달하는 인자 action, action에는 type과 전달할 데이터 payload를 프로퍼티로 가짐.

  console.log('user state:', state); //{user: UserImpl} 토크노 있고 정보도 있고..

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, (user) => {
      // onAuth...에 사용자 정보를 넣으면 확인후 그 유저의 상태를 user로 받아오고
      // user를 dispatch에 실어보내면 reducer함수가 실행
      dispatch({ type: 'isAuthReady', payload: user });
    });
    //구독취소
    return unsubscribe();
  }, []);

  // state가 추가될 것을 대비해 spread operator...
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
//AuthContextProvider로 index.js의 APP 컴포를 감싸면 됨.
