import NavBar from '../components/navbar';
import Footer from '../components/footer';
import MetaHeader from '../components/meta-header';
import '../themes/sources/scss/app.scss'

export default function RootLayout({ children, navMenuData, footerMenuData, tabTitle, resolvedUrl, language }) {

    return (
        <>
            <MetaHeader tabTitle={tabTitle} resolvedUrl={resolvedUrl} language={language} />
            <div className='site-container'>
                <div className='site-container__top'>
                    <NavBar data={navMenuData} />
                    <main>{children}</main>
                </div>
                <Footer data={navMenuData} />
            </div>

        </>
    );
}
