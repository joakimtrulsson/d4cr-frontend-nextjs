
import React, { useContext, useState } from 'react';
import { AppContext } from '../../pages/_app';

export default function ThankYouMessage() {
    const { setSubmitted } = useContext(AppContext);

    function handleClick() {
      setSubmitted(false);
    }
  return (
    <div className="">
      <div className="">
        
      </div>
      <div className="">
        <div className="">
          <h1 className="">You, win... Perfect!</h1>
          <p className="">Thanks for filling out this form</p>
          <div className="">
            <button onClick={handleClick} className="">
              Submit new feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}