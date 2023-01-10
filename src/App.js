import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Nav from './components/Nav';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { isAuthReady, user } = useAuthContext();

  return (
    <div className="App">
      {isAuthReady ? (
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route
              path="/"
              element={
                user ? <Home /> : <Navigate replace={true} to="/login" />
              }
              // replace false 하면 사용자정보가 없어서 /login으로 리다이렉트했음에도 불구
              // 뒤로가기 눌렀을 때 Home으로 이동이 가능하게 되버림..
            />
            <Route
              path="/login"
              element={
                !user ? <Login /> : <Navigate replace={true} to="/"></Navigate>
              }
            />
            <Route
              path="/signup"
              element={
                !user ? <Signup /> : <Navigate replace={true} to="/"></Navigate>
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        'loading...'
      )}
    </div>
  );
}

export default App;
