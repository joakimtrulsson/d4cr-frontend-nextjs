import React, { useContext } from 'react';
import RootLayout from '../../app/layout';
import { AppContext } from '../_app';
import FeedbackForm from '../../themes/components/feedbackForm';
import ThankYouMessage from '../../themes/components/thankYouMessage'
import { fetchMainMenuData, fetchFooterMenuData } from '../../graphql'
export default function ContactUs(props) {
    const { submitted } = useContext(AppContext);

    return (
        <RootLayout navMenuData={props.navMenuData} footerMenuData={null} tabTitle={null} resolvedUrl={props.resolvedUrl} language="en_GB">
            <main className='site-content flex flex-column flex-align-center flex-justify-start'>
                <section className="">
                    <FeedbackForm />
                </section>

            </main>
        </RootLayout >
    );
}

export async function getServerSideProps({ resolvedUrl }) {
    try {

        const navMenuData = await fetchMainMenuData();
        const footerMenuData = await fetchFooterMenuData();
        return { props: { navMenuData, footerMenuData, resolvedUrl } };
    } catch (error) {
        console.error("(index.jsx) Error fetching data:", error);
        return { notFound: true };
    }
}