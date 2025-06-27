import { toast } from 'react-toastify';
import { endpoints } from '../../settings';

import api from '../apiClient';
import { useNavigate } from 'react-router';
import MainContainer from '../components/MainContainer';
import PasswordChangeForm from '../components/forms/PasswordChangeForm';

const PasswordChangePage = () => {
  const navigate = useNavigate();

  const handlePasswordChange = async ({ new_password, current_password }) => {
    try {
      await api.post(endpoints.passwordChange, {
        new_password,
        current_password,
      });
      toast.success('Password successfully changed');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Your password could not be changed.');
    }
  };
  return (
    <MainContainer>
      <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center px-4">
        <div className="w-full px-2 sm:max-w-3xl sm:px:0">
          <PasswordChangeForm onPasswordChange={handlePasswordChange} />
        </div>
      </section>
    </MainContainer>
  );
};

export default PasswordChangePage;
