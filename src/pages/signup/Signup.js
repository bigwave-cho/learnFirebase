import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import styles from './Signup.module.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  //displayName은 파이어베이스와 약속된 state.
  const { error, isPending, signup } = useSignup();

  const handleData = (event) => {
    if (event.target.type === 'email') {
      setEmail(event.target.value);
    } else if (event.target.type === 'password') {
      setPassword(event.target.value);
    } else if (event.target.id === 'myNickName') {
      setDisplayName(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form className={styles.signup_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>회원가입</legend>
        <label htmlFor="myEmail">email :</label>
        <input
          type="email"
          id="myEmail"
          required
          value={email || ''}
          onChange={handleData}
        />

        <label htmlFor="myPassword">password :</label>
        <input
          type="password"
          id="myPassword"
          required
          value={password || ''}
          onChange={handleData}
          autoComplete="off"
        />
        <label htmlFor="myNickName">myNickName :</label>
        <input
          type="text"
          id="myNickName"
          required
          value={displayName || ''}
          onChange={handleData}
        />
        <button type="submit" className={styles.btn}>
          가입하기
        </button>
      </fieldset>
    </form>
  );
}
