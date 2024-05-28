import React from 'react';
import { ContactUsForm } from '../../components/index.js';

export default function ContactUs() {
  return (
    <main className='site-content flex flex-column flex-align-center flex-justify-start'>
      <ContactUsForm />
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {
      tabTitle: 'Contact us',
    },
  };
}
