import React, { useState } from 'react';
import Link from 'next/link';
import PrimaryButton from './buttons/primary-button';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ShareForm() {
  const recaptcha = React.useRef(null);
  const [reCAPTCHAError, setReCAPTCHAError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  //styling mobile first kolla varför verify you are human inte försvinner
  const initialFormData = {
    name: '',
    contactEmail: '',
    linkedIn: '',
    message: '',
    usingD4CRGuideAndPrinciples: false,
    logoFeaturedOnWebpage: false,
    target: 'shareyourstory',
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
    const { name, type, value, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setData((prevData) => ({ ...prevData, [name]: inputValue }));

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

    const { name, contactEmail, linkedIn, message } = data;
    let errorMessages = {};
    let messageErrorMessage =
      'Please write a couple of sentences of how the D4CR Guide has been utilised in your operation.';
    if (!name.trim()) errorMessages.name = 'Name is required.';
    if (!contactEmail.trim() || !emailPattern.test(contactEmail))
      errorMessages.contactEmail = 'Valid email is required.';
    if (!linkedIn.trim())
      errorMessages.linkedIn =
        'Please paste the URL to your company/initiative/institution’s profile.';
    if (!message.trim()) errorMessages.message = messageErrorMessage;

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
    <div className='popup-form-container'>
      <div className='form-div'>
        <h3>Tell us your story</h3>
        <p className='preamble'>
          Would you like to share your story and inspire others? We’d love to hear about
          it.
        </p>

        <form onSubmit={handleSubmit} noValidate>
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
                aria-invalid={errorMessage?.name ? 'true' : 'false'}
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
          <div className='linkedin'>
            <input
              name='linkedIn'
              id='linkedIn'
              placeholder='LinkedIn'
              type='text'
              className=''
              value={data.linkedIn || ''} // Bind input value to state
              onChange={handleChange}
              aria-required='true'
              aria-invalid={errorMessage.linkedIn ? 'true' : 'false'}
              aria-describedby='linkedIn-error'
            />
            {errorMessage.linkedIn ? (
              <p className='error'>{errorMessage.linkedIn}</p>
            ) : (
              <p className='error no-vis'>Not visible</p>
            )}
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
          <div className='check-boxes'>
            <div className='div-top'>
              <input
                type='checkbox'
                id='usingD4CRGuideAndPrinciples'
                name='usingD4CRGuideAndPrinciples'
                checked={data.usingD4CRGuideAndPrinciples || false}
                onChange={handleChange}
              />
              <label htmlFor='usingD4CRGuideAndPrinciples'>
                We, as a company/initiative/educational institution, are using the D4CR
                Guide and principles.
              </label>
            </div>
            <div className='div-bottom'>
              <input
                type='checkbox'
                id='logoFeaturedOnWebpage'
                name='logoFeaturedOnWebpage'
                checked={data.logoFeaturedOnWebpage || false}
                onChange={handleChange}
              />
              <label htmlFor='logoFeaturedOnWebpage'>
                I’d like my logo to be featured on the D4CR’s webpage.
              </label>
            </div>
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

          <div className='recaptcha-div'>
            <ReCAPTCHA
              ref={recaptcha}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            />
          </div>
        </form>
        {successMessage && (
          <p role='alert' className='success-message'>
            {successMessage}
          </p>
        )}
        {submissionError && !successMessage ? (
          <p role='alert' className='submission-error'>
            {submissionError}
          </p>
        ) : null}
        {reCAPTCHAError && (
          <p className='verify-error'>Please verify that you are human</p>
        )}
      </div>
    </div>
  );
}
