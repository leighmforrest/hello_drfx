import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import api from "../apiClient"
import MainContainer from '../components/MainContainer';
import PasswordResetRequestForm from '../components/forms/PasswordResetRequestForm';
import { endpoints } from '../../settings';


const PasswordResetRequest = () => {
  const navigate = useNavigate()
  const handlePasswordResetRequest = async ({ email }) => {
    try {
      await api.post(endpoints.passwordReset,{email})
      toast.success("If your email exists, check your email for password reset details.")
      navigate("/login")
    } catch (error) {
      toast.error("Your password could not be reset. Please try again.")
    }
  }

  return (
    <MainContainer>
      <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center px-4">
        <div className="w-full px-2 sm:max-w-3xl sm:px:0">
          <PasswordResetRequestForm  onPasswordResetRequest={handlePasswordResetRequest}/>
        </div>
      </section>
    </MainContainer>
  );
};

export default PasswordResetRequest;
