import styles from './Home.module.css';
import DiaryForm from './DiaryForm';
import DiaryList from './DiaryList';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

export default function Home() {
  const { user } = useAuthContext();
  // useCollection의 인자는 컬렉션의 이름!
  const { documents, error } = useCollection('diary', ['uid', '==', user.uid]);

  return (
    <div className={styles.cont}>
      <aside className={styles.side_menu}>
        <DiaryForm uid={user.uid}></DiaryForm>
      </aside>
      <ul className={styles.content_list}>
        {error && <strong>{error}</strong>}
        {documents && <DiaryList diaries={documents}></DiaryList>}
      </ul>
    </div>
  );
}
