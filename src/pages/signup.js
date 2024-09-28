import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Import useRouter for redirection


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false); // For showing OTP modal
  const router = useRouter(); // Initialize router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    try {
      const response = await axios.post("http://localhost:3001/register", {
        email,
        password,
      });
      setMessage(response.data); // Set success message
      setShowOtpPopup(true); // Show OTP verification popup
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setMessage("Failed to send OTP.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        {message && <p className="message">{message}</p>}

        {/* OTP Verification Popup */}
        {showOtpPopup && (
          <OTPModal 
            email={email} 
            setShowOtpPopup={setShowOtpPopup} 
            onSuccess={() => router.push('/login')} // Redirect to login on success
          />
        )}
      </div>
    </div>
  );
}

function OTPModal({ email, setShowOtpPopup, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/verify-otp", {
        email,
        otp,
      });
      setVerificationMessage(response.data.message);
      if (response.data.success) {
        setShowOtpPopup(false); // Close modal on success
        onSuccess(); // Trigger the redirect to login page
      }
    } catch (error) {
      setVerificationMessage("Verification failed: " + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <div className="otp-modal">
      <div className="otp-modal-content">
        <h2>Verify OTP</h2>
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
        {verificationMessage && <p>{verificationMessage}</p>}
        <button onClick={() => setShowOtpPopup(false)} className="close-modal">Close</button>
      </div>
    </div>
  );
}
