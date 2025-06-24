import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '../apiClient';
import { endpoints } from '../../settings';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const AccountActivationPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { uid, token } = useParams();

  useEffect(() => {
    (async () => {
      try {
        await api.post(endpoints.activateAccount, { uid, token });
        toast.success('Your account has been confirmed.');
        navigate('/login');
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [uid, token, navigate]);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>Unable. Malfunction. Need input.</h1>;

  return null;
};

export default AccountActivationPage;
