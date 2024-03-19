import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import OtpVerify from "./OtpVerify";

function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signInStarted, setSignInStarted] = useState(false);
  const [requestId, setRequestId] = useState(""); // State to store request ID

  const handlePhoneNumberChange = (number) => {
    setPhoneNumber(number);
  };

  const handleSignInClick = () => {
    if (phoneNumber.trim() === "") {
      // Alert or handle the case where the phone number is not entered
      alert("Please enter your phone number.");
      return;
    }
    axios
      .post("https://dev.api.goongoonalo.com/v1/auth/login", {
        phoneNumber: "+919000000000",
      })
      .then((response) => {
        console.log("OTP sent:", response.data);
        setSignInStarted(true);
        setRequestId(response.data.requestId); // Set the received request ID
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        console.log("Error details:", error.response.data);
      });
  };
  return (
    <div>
      {!signInStarted ? (
        <div>
          <div className="flex justify-center text-3xl font-bold text-purple-900 mt-[290px] mr-[200px]">
            SignIn
          </div>
          <p className="ml-[575px]">
            Please enter your mobile number to login. We will send an OTP to
            verify
            <br />
            your number.
          </p>

          <PhoneInput
            country={"in"}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="ml-[680px] m-3"
            inputProps={{
              required: true,
            }}
          />

          <button
            type="button"
            className="text-white bg-purple-900 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 ml-[680px] w-[300px]"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        </div>
      ) : (
        <OtpVerify phoneNumber={phoneNumber} requestId={requestId} />
      )}
    </div>
  );
}

export default SignIn;
