import { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

export default function DiaryForm({ uid }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const { addDocument, response } = useFirestore('diary');

  const handleData = (event) => {
    if (event.target.id === 'title') {
      setTitle(event.target.value);
    } else if (event.target.id === 'txt') {
      setText(event.target.value);
    }
  };

  useEffect(() => {
    console.log(response);
    if (response.success === true) {
      setTitle('');
      setText('');
    }
  }, [response.success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, text);
    addDocument({ uid, title, text });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>일기 쓰기</legend>
          <label htmlFor="title">일기 제목 : </label>
          <input
            id="title"
            value={title || ''}
            type="text"
            required
            onChange={handleData}
          ></input>

          <label htmlFor="txt">일기 내용 : </label>
          <textarea
            id="txt"
            value={text || ''}
            type="text"
            required
            onChange={handleData}
          ></textarea>

          <button type="submit">저장하기</button>
        </fieldset>
      </form>
    </>
  );
}
