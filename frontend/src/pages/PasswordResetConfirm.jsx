import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';

import api from '../apiClient';
import MainContainer from '../components/MainContainer';
import PasswordResetConfirmForm from '../components/forms/PasswordResetConfirmForm';
import { endpoints } from '../../settings';

const PasswordResetConfirm = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams();

  const handlePasswordResetConfirm = async ({ new_password }) => {
    console.log({ new_password, uid, token });
    try {
      await api.post(endpoints.passwordResetConfirm, {
        new_password,
        uid,
        token,
      });
      toast.success('Password successfully changed. You may log in.');
      navigate('/login');
    } catch (error) {
      console.log(error)
      toast.error('Your password could not be changed.');
    }
  };

  return (
    <MainContainer>
      <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center px-4">
        <div className="w-full px-2 sm:max-w-3xl sm:px:0">
          <PasswordResetConfirmForm
            onPasswordResetConfirm={handlePasswordResetConfirm}
          />
        </div>
      </section>
    </MainContainer>
  );
};

export default PasswordResetConfirm;
