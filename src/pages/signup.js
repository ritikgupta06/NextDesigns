import React from 'react';
import Link from 'next/link';


const Signup = () => {
  return (
    <div className="signup-container">
      <h2 className="title">Sign Up</h2>
      <form className="signup-form">
        <input type="email" placeholder="Email" className="input-field" required />
        <input type="password" placeholder="Create Password" className="input-field" required />
        <button type="submit" className="signup-btn">Sign Up</button>
        <p className="login-link">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
