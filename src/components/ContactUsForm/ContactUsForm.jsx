import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimationLeft from '../../styles/assets/graphics/animation.gif';
import AnimationRight from '../../styles/assets/graphics/animation-2.gif';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactUsForm() {
  const recaptcha = React.useRef(null);
  const [reCAPTCHAError, setReCAPTCHAError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const initialFormData = {
    name: '',
    contactEmail: '',
    message: '',
    target: 'contactus',
  };
  const [data, setData] = useState(initialFormData);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const verifyCaptcha = async (captchaValue) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/validate-recaptcha`,
      {
        method: 'POST',
        body: JSON.stringify({ captchaValue }),
        headers: {
          'content-type': 'application/json',
        },
      }
    );

    const data = await res.json();

    return data.success;
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));

    // Check and remove the error message for the field if it exists.
    if (errorMessage.hasOwnProperty(name)) {
      setErrorMessage((prevMessages) => {
        const newMessages = { ...prevMessages };
        delete newMessages[name]; // Remove the key entirely
        return newMessages;
      });
    }
    setSubmissionError('');
    setSuccessMessage('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { name, contactEmail, message } = data;
    let errorMessages = {};
    if (!name.trim()) errorMessages.name = 'Name is required.';
    if (!contactEmail.trim() || !emailPattern.test(contactEmail))
      errorMessages.contactEmail = 'Valid email is required.';
    if (!message.trim()) errorMessages.message = 'Message is required.';
    if (Object.keys(errorMessages).length) {
      // Handle and display error messages
      setErrorMessage(errorMessages);
      const firstErrorKey = Object.keys(errorMessages)[0];
      document.getElementsByName(firstErrorKey)[0].focus();
      return;
    }

    const captchaValue = recaptcha.current?.getValue();

    if (!captchaValue) {
      setReCAPTCHAError(true);
    } else {
      const isCaptchaValid = await verifyCaptcha(captchaValue);

      if (isCaptchaValid) {
        setIsSubmitting(true);
        setReCAPTCHAError(false);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/email`,
            {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(data),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw error;
          }
          const result = await response.json();
          setSuccessMessage(
            'Message sent. We’ll get back to you within a couple of days.'
          );
          setData(initialFormData);
          setErrorMessage({});
        } catch (error) {
          if (error.errors) {
            setErrorMessage(error.errors);
          } else {
            setSubmissionError(
              'There was an issue submitting the form. Please try again later.'
            );
          }
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  }
  return (
    <div className='contact-us-form-container'>
      <Image src={AnimationLeft} alt='Animated GIF' className='left-absolute' />
      <div className='form-div'>
        <div className='title-text-div'>
          <h1>
            <span className='title-text heading-background'>Contact us</span>
          </h1>
          <p className='preamble'>
            Please fill out the following form and we’ll get in touch with you within a
            couple of days. If you want to join us, use{' '}
            <Link className='link' href=''>
              this form
            </Link>{' '}
            instead.
          </p>
        </div>
        <form className='form' onSubmit={handleSubmit} noValidate>
          <div className='name-email-div'>
            <div className='left'>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                value={data.name} // Bind input value to state
                onChange={handleChange}
                aria-required='true'
                aria-invalid={errorMessage.name ? 'true' : 'false'}
                aria-describedby='name-error'
              />
              {errorMessage.name ? (
                <p className='error'>{errorMessage.name}</p>
              ) : (
                <p className='error no-vis'>Not visible</p>
              )}
            </div>
            <div className='right'>
              <input
                name='contactEmail'
                id='email'
                placeholder='E-mail'
                type='email'
                className=''
                value={data.contactEmail} // Bind input value to state
                onChange={handleChange}
                aria-required='true'
                aria-invalid={errorMessage.contactEmail ? 'true' : 'false'}
                aria-describedby='email-error'
              />
              {errorMessage.contactEmail ? (
                <p className='error'>{errorMessage.contactEmail}</p>
              ) : (
                <p className='error no-vis'>Not visible</p>
              )}
            </div>
          </div>
          <div className='text-area-div'>
            <textarea
              name='message'
              id='message'
              placeholder='Message'
              className=''
              value={data.message} // Bind input value to state
              onChange={handleChange}
              aria-required='true'
              aria-invalid={errorMessage.message ? 'true' : 'false'}
              aria-describedby='message-error'
            />
            {errorMessage.message ? (
              <p className='message-error'>{errorMessage.message}</p>
            ) : (
              <p className='message-error no-vis'>Not visible</p>
            )}
          </div>

          {!isSubmitting ? (
            <PrimaryButton
              type='submit'
              title='SEND MESSAGE'
              disabled={Object.keys(errorMessage).length > 0}
            />
          ) : (
            <p>Sending..</p>
          )}

          {successMessage && (
            <p role='alert' className='success-message'>
              {successMessage}
            </p>
          )}

          <div className='recaptcha-div'>
            <ReCAPTCHA
              ref={recaptcha}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            />
          </div>
        </form>

        {submissionError && !successMessage ? (
          <p role='alert' className='submission-error'>
            {submissionError}
          </p>
        ) : null}
        {reCAPTCHAError && (
          <p className='verify-error'>Please verify that you are human</p>
        )}
      </div>
      <Image src={AnimationRight} alt='Animated GIF' className='right-absolute' />
    </div>
  );
}
