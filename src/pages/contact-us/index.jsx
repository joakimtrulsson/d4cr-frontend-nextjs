import React from 'react';
import { ContactUsForm } from '../../components/index.js';
import { CONTACT_US_PREAMBLE, initializeApollo } from '../../graphql/index.js';

export default function ContactUs(props) {
  const contactUsPreamble = props.data[0].contactUsPreamble.document;

  return (
    <main className='site-content flex flex-column flex-align-center flex-justify-start'>
      <ContactUsForm preamble={contactUsPreamble} />
    </main>
  );
}

export async function getStaticProps() {
  try {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query({
      query: CONTACT_US_PREAMBLE,
    });

    return {
      props: {
        data: data?.formEmails,
        tabTitle: 'Contact us',
      },
      revalidate: Number(process.env.NEXT_PUBLIC_STATIC_REVALIDATE),
    };
  } catch (error) {
    console.error('(index.jsx) Error fetching data:', error);
    return { notFound: true };
  }
}
