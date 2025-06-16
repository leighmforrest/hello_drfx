import React from 'react';
import { useParams } from 'react-router';

const PasswordResetConfirm = () => {
  const { uid, token } = useParams();

  return (
    <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center relative">
      <div className="bg-white dark:bg-blue-950 w-full min-h-[inherit] m-4 flex items-center justify-center rounded-2xl">
        <p>UID: {uid}</p>
        <p>TOKEN: {token}</p>
      </div>
    </section>
  );
};

export default PasswordResetConfirm;
