import { useNavigate } from 'react-router';
import api from '../apiClient';
import { toast } from 'react-toastify';
import RegisterForm from '../components/forms/RegisterForm';
import MainContainer from '../components/MainContainer';
import { endpoints } from '../../settings';

const RegisterPage = () => {
  const navigate = useNavigate();

  const submitHandler = async ({ email, password }, setError) => {
    try {
      await api.post(endpoints.register, { email, password });
      toast.success('You have successfully registered.');
      navigate('/login');
    } catch (error) {
      const responseErrors = error?.response?.data;

      if (responseErrors && Object.keys(responseErrors).length > 0) {
        for (const [field, message] of Object.entries(responseErrors)) {
          setError(field, { type: 'server', message });
        }
      } else {
        setError('root', {
          type: 'server',
          message: 'Registration failed. Please try again.',
        });
      }
    }
  };

  return (
    <MainContainer>
      <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center px-4">
        <div className="w-full px-2 sm:max-w-3xl sm:px:0">
          <RegisterForm onRegister={submitHandler} />
        </div>
      </section>
    </MainContainer>
  );
};

export default RegisterPage;
