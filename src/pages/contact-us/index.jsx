import React from 'react';
import RootLayout from '../../app/layout';

import ContactUsForm from '../../components/ContactUsForm/ContactUsForm.jsx';

export default function ContactUs() {
  return (
    <RootLayout tabTitle={null} language='en_GB'>
      <main className='site-content flex flex-column flex-align-center flex-justify-start'>
        <ContactUsForm />
      </main>
    </RootLayout>
  );
}
