/*
document : 스토어 데이터 저장 단위
success: 통신 성패 여부
*/

import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useReducer } from 'react';
import { appFirestore, timestamp } from '../firebase/config';

const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case 'isPending':
      return { isPending: true, document: null, success: false, error: null };
    case 'addDoc':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'deleteDoc':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'error':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// firestore 데이터 모델(객체)
// collection > document > data
// 지정할 컬렉션을 인자(transaction)로 보냄
export const useFirestore = (transaction) => {
  //useReducer(리듀서함수, 초기값)
  const [response, dispatch] = useReducer(storeReducer, initState);

  // colRef : 콜렉션의 참조 요구(이 변수를 통해서 콜렉션 접근 가능)
  // 두가지 인자 (파이어베이스초기화객체, 콜렉션이름)
  // 만약 콜렉션이 만들지 않았다면 자동으로 생성해줌.
  const colRef = collection(appFirestore, transaction);
  //ex) collection(db, "cities")

  //컬렉션에 문서 추가.
  // 인자 : 객체
  const addDocument = async (doc) => {
    //addDocument 함수 실행시 실행중임을 나타냄
    dispatch({ type: 'isPending' });

    try {
      const createdTime = timestamp.fromDate(new Date());
      // doc을 전개하여 기존 doc 객체에 시간 프로퍼티가 추가될 수 있도록.
      const docRef = await addDoc(colRef, { ...doc, createdTime });
      console.log(docRef);

      dispatch({ type: 'addDoc', payload: docRef });
    } catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }
  };

  //컬렉션에서 문서 제거
  const deleteDocument = async (id) => {
    //addDocument 함수 실행시 실행중임을 나타냄
    dispatch({ type: 'isPending' });

    try {
      // collection의 데이터중 해당 id 데이터 삭제
      const docRef = await deleteDoc(doc(colRef, id));
      dispatch({ type: 'deleteDoc', payload: docRef });
    } catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }
  };

  return { addDocument, deleteDocument, response };
};
