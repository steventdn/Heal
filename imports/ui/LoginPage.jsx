// LoginPage.jsx
import React from 'react';
import { LoginForm } from './LoginForm';
import RegistrationForm from './RegistrationForm.jsx';
import { LoginWithGithub } from './LoginWithGithub';

const LoginPage = () => {
  return (
    <div className="login-page">
      <LoginForm />
      <RegistrationForm />
      <LoginWithGithub />
    </div>
  );
};

export default LoginPage;
