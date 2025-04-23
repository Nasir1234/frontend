import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const OAuthRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOAuthUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          credentials: 'include',
        });

        const data = await response.json();

        if (data.user && data.token) {
          dispatch(loginSuccess(data));
          navigate('/');
        } else {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    fetchOAuthUser();
  }, [dispatch, navigate]);

  return <p className="text-center mt-10">Logging you in via Google...</p>;
};

export default OAuthRedirect;
