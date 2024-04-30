import React from 'react';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import Cookies from 'js-cookie';

import CookieConsent from 'react-cookie-consent';

function CookieBanner({ isAccepted, setIsAccepted, setIsDeclined }) {
  const handleAcceptCookies = () => {
    // Cookies.set('acceptsCookies', 'true', {
    //   expires: Number(process.env.NEXT_PUBLIC_COOKIE_EXPIRY),
    // });
    setIsAccepted(true);
  };

  const handleDeclineCookies = () => {
    // Cookies.set('acceptsCookies', 'false', {
    //   expires: Number(process.env.NEXT_PUBLIC_COOKIE_EXPIRY),
    // });
    setIsDeclined(true);
  };

  return (
    <CookieConsent
      containerClasses='popup-cookie-container padding-lr--l padding-b--l borderradius--xs'
      contentClasses='popup-cookie-preamble'
      buttonWrapperClasses='popup-cookie-buttons flex flex-reverse-row'
      cookieName='userConsent'
      enableDeclineButton={true}
      ButtonComponent={PrimaryButton}
      customButtonProps={{ title: 'Accept Essential Cookies' }}
      customDeclineButtonProps={{
        title: 'Decline Cookies',
        decline: true,
      }}
      style={{
        background: '#fff',
        color: 'inherit',
        position: 'fixed',
        left: '50%',
        marginBottom: '2rem',
        transform: 'translateX(-50%)',
      }}
      // onAccept={handleAcceptCookies}
      expires={30}
    >
      <h3>We use cookies</h3>
      <p>
        We use Google Analytics cookies to collect anonymized data about your activity on
        our website. This helps us to understand how our visitors use our site and to
        improve our services. These cookies do not store any personally identifiable
        information. By accepting these cookies, you allow us to gather this data.
      </p>
    </CookieConsent>
  );
  // <div
  //   className={`popup-cookie-container padding-tb--m padding-lr--l borderradius--xs ${
  //     isAccepted ? 'display-none' : ''
  //   }`}
  // >
  //   <h3>We use cookies</h3>
  //   <p className='popup-cookie-preamble'>
  //     We utilize essential cookies. They enable us to gather anonymized statistics about
  //     visitor usage patterns, which helps us to continually improve our website and
  //     serve you better. Please note that these cookies do not store any personally
  //     identifiable information.
  //   </p>
  //   <div className='popup-cookie-buttons flex '>
  //     <PrimaryButton onClick={handleAcceptCookies} title='Accept Essential Cookies' />
  //     <SecondaryButton title='Decline Cookies' onClick={handleDeclineCookies} />
  //   </div>
  // </div>
  // );
}

export default CookieBanner;
