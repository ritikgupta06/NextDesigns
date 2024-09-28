import { useState } from "react";
import axios from "axios";

export default function VerifyOTP() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/verify-otp", {
        email,
        otp,
      });
      setVerificationMessage(response.data.message); // Set success message
    } catch (error) {
      setVerificationMessage("Verification failed: " + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <div className="verify-container">
      <h1>Verify OTP</h1>
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
    </div>
  );
}
