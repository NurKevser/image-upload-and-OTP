import { useState } from "react";
import { OTPInput } from "../Email/OtpInput";
import { Container, Button, Badge } from "reactstrap";
import { LuCheckCircle } from "react-icons/lu";

const Email = () => {
  const [otp, setOtp] = useState("");
  const onChange = (value) => {
    setOtp(value);
  };

  const onSubmit = async () => {
    try {
      // validation control with backend
      console.log("Submit Success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className=" d-flex flex-column justify-content-center  align-items-center text-center ">
      <div className="text-light mb-5">
        <LuCheckCircle size="70" />
        <h1 className=" my-5">Ready to create the future?</h1>
        <p>
          Your verification code has been sent to your mail address. Please
          enter the code:
        </p>
      </div>
      <div className=" d-flex flex-column justify-content-center  align-items-center text-center ">
        <OTPInput value={otp} valueLength={4} onChange={onChange} />
        <Button
          color="light"
          className="my-4 rounded-pill w-25"
          onClick={() => onSubmit()}
        >
          Verify
        </Button>
        <div className="text-light">
          Didn't receive the OTP code?
          <a
            className="link-light link-offset-2 link-underline link-underline-opacity-0"
            href="#"
          >
            Resend code
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Email;
