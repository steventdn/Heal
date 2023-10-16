// LoginRegisterForm.jsx
import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';

const LoginRegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    const user = Meteor.users.findOne({ username: username });

    if (user) {
      // If user exists, try logging in
      Meteor.loginWithPassword(username, password, (error) => {
        if (error) {
          console.error('Login failed:', error);
        } else {
          console.log('Login successful!');
        }
      });
    } else {
      // If user doesn't exist, create a new account
      Accounts.createUser(
        {
          username: username,
          password: password,
        },
        (error) => {
          if (error) {
            console.error('Account creation failed:', error);
          } else {
            console.log('Account created successfully!');
            // Log the user in after successful registration
            Meteor.loginWithPassword(username, password, (error) => {
              if (error) {
                console.error('Login failed:', error);
              } else {
                console.log('Login successful!');
              }
            });
          }
        }
      );
    }
  };

  return (
    <div id="login-register-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submitForm}>Register/Login</button>
    </div>
  );
};

export default LoginRegisterForm;
