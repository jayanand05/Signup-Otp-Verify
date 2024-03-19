import React, { useState, useRef } from "react";
import axios from "axios";
import MusicPage from "./MusicPage";

function OtpVerify({ phoneNumber, requestId }) {
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleDigitChange = (index, value) => {
    const updatedOtpDigits = [...otpDigits];
    updatedOtpDigits[index] = value;
    setOtpDigits(updatedOtpDigits);

    // Move focus to the next input field
    if (value !== "" && index < otpDigits.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyClick = () => {
    axios
      .post("https://dev.api.goongoonalo.com/v1/auth/verify_otp", {
        phoneNumber: "+919000000000",
        requestId: requestId, // Use the received request ID
        otp: otpDigits.join(""), // Join OTP digits into a string
      })
      .then((response) => {
        console.log("Verify", response.data);
        setVerificationStarted(true);
      })
      .catch((error) => {
        console.log("Verification failed", error.message);
      });
  };

  return (
    <div>
      {!verificationStarted ? (
        <div>
          <div className="flex justify-center text-3xl font-bold text-purple-900 mt-[290px] mr-[200px]">
            OTP Verification
          </div>
          <p className="ml-[510px]">
            We have sent an OTP to {phoneNumber}. Please enter the code received
            <br />
            to verify.
          </p>

          <div className="flex justify-center mt-5 ml-[65px]">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                className="border rounded-lg px-3 py-2 me-2 "
                style={{ width: "70px" }}
              />
            ))}
          </div>

          <button
            type="button"
            className="text-white bg-purple-900 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 ml-[605px] w-[300px] mt-[30px]"
            onClick={handleVerifyClick}
          >
            Verify
          </button>
          <div className="ml-[650px]">
            <a href="/" className="underline ml-[65px]">
              Resend OTP
            </a>
            <br />
            <a href="/" className="underline ml-[45px]">
              Use another number
            </a>
          </div>
        </div>
      ) : (
        <MusicPage />
      )}
    </div>
  );
}

export default OtpVerify;
