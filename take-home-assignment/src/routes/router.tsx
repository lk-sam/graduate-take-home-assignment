import {useEffect,useState}from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Registration from '../pages/Registration';
import LoginPage from '../pages/Login';
import UserProfile from '../pages/UserProfile';
export default function Router() {
    const [userId , setUserId] = useState <Number|null>(null);

    useEffect(() => {
      const user_id = localStorage.getItem('user_id');
       console.log(user_id);
      if (user_id) {

            setUserId(parseInt(user_id));
        }
        else {
            setUserId(null);
        }

    }, []);
  
    return (
      <>
        <Routes>
          <Route
            path="/"
            element={userId ? <UserProfile id={userId} /> : <Navigate to="/login" replace />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </>
    );
}