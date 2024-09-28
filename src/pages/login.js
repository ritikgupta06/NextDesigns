import React from 'react';
import Link from 'next/link';

const Login = () => {
  return (
    <div className="login-container">
      <h2 className="title">Login</h2>
      <form className="login-form">
        <input type="email" placeholder="Email" className="input-field" required />
        <input type="password" placeholder="Password" className="input-field" required />
        <button type="submit" className="login-btn">Login</button>
        <p className="signup-link">
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
