import MetaHeader from '../components/MetaHeader/MetaHeader';
import '../styles/scss/app.scss';

export default function RootLayout({ children, tabTitle, resolvedUrl, language }) {
  return (
    <>
      <MetaHeader tabTitle={tabTitle} resolvedUrl={resolvedUrl} language={language} />
      <div className='site-container'>
        <div className='site-container__top'>
          {/* <NavBar data={navMenuData} /> */}
          <main>{children}</main>
        </div>
        {/* <Footer data={navMenuData} /> */}
      </div>
    </>
  );
}
