/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { toast } from 'react-toastify';

function SignInPhone() {
  const [phone, setPhone] = useState(null);
  const [otp, setOtp] = useState('');
  const [show, setShow] = useState(false);
  const [final, setfinal] = useState('');
  const [confirmResult, setConfirmResult] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    console.log('TESTTTS');
    window.recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: (response) => {
          console.log('Rspnse ', response);
        },
        'expired-callback': () => {
          console.log('Callback');
        },
      },
      auth,
    );
  }, []);

  const signin = () => {
    // if (phone === '' || phone.length < 10) return;
    const isValid = isValidPhoneNumber(phone);
    if (isValid) {
      console.log('Validate Phone ', isValid);
      const auth = getAuth();
      const appVerifier = window.recaptchaVerifier;
      console.log('testing', appVerifier);
      signInWithPhoneNumber(auth, phone, appVerifier)
        .then((confirmationResult) => {
          setShow(true);
          setConfirmResult(confirmationResult);
        })
        .catch((error) => {
          console.log('ERROR ', error);
        });
    } else {
      toast.error('Invalid phone number!');
    }
  };

  const confirmCode = () => {
    confirmResult
      .confirm(otp)
      .then((result) => {
        const { user } = result;
        navigate('/laveinte');
        console.log('User ', user);
      })
      .catch(() => {});
  };

  console.log('Final ', setfinal);
  console.log('Final ', final);
  console.log('Show ', show);
  console.log('Confirm Result ', confirmResult);
  console.log('PHONE NUMMBER ==> ', phone);

  return (
    <div className="signin_phone">
      {show ? (
        <div>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            placeholder="Enter OTP"
          />
          <button id="sign-in" type="submit" onClick={confirmCode} className="next_btn">
            Submit
          </button>
        </div>
      ) : (
        <>
          <div className="input_field">
            <PhoneInput
              defaultCountry="US"
              placeholder="Enter phone number"
              className="phone_input"
              value={phone}
              onChange={(e) => setPhone(e)}
            />
            {/* <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone Number" /> */}
          </div>
          <button id="sign-in-button" type="submit" onClick={signin} className="next_btn">
            Next
          </button>
        </>
      )}
    </div>
  );
}

export default SignInPhone;
