import React from 'react';
import RootLayout from '../../app/layout';

import ContactForm from '../../themes/components/contact-us-form';

export default function ContactUs() {
  return (
    <RootLayout tabTitle={null} language='en_GB'>
      <main className='site-content flex flex-column flex-align-center flex-justify-start'>
        <ContactForm />
      </main>
    </RootLayout>
  );
}
