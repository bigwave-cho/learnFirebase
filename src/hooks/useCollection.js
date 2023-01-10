//다이어리 리스트 데이터가져오기

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { appFirestore } from '../firebase/config';

// transaction : 콜렉션이름
// myQuery : 유저아이디 일치하는 것(배열)
export const useCollection = (transaction, myQuery) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let q;
    if (myQuery) {
      //query(collection(초기화한스토어, 콜렉션이름))
      // where : uid==user.uid인 것만 가져오기
      // orderBy : (정렬기준, 오름/내림차순)
      q = query(
        collection(appFirestore, transaction),
        where(...myQuery),
        orderBy('createdTime', 'desc')
      );
      // 위 처럼 쓰면 uid와 createTime 즉 2개 이상의 비교 쿼리를 사용하여 에러가 뜬다.
      // 에러가 띄우는 URL로 이동해보면 복합 색인 만들기가 뜸.(색인 만들기 클릭)
      // 생성 완료되면 차순 먹음.
    }

    // onSnapshot이 호출되면 데이터 받는 통로가 열린채로 유지됨
    // 친절히 onSnapshot함수의 반환값으로 통로를 닫을 수 있음.
    const unsubscribe = onSnapshot(
      myQuery ? q : collection(appFirestore, transaction),
      (snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        console.log(result);
        setDocuments(result);
        setError(null);
      },
      (error) => {
        setError(error.message);
      }
    );

    //cleanup 함수를 이용해서 자동으로 닫음.
    return unsubscribe;
  }, [collection]);

  return { documents, error };
};
