import '../themes/sources/scss/app.scss'

export default function RootLayout({ children }) {
    return (
        <>
            { /* <MetaHeader title={props.pageData.title ? props.pageData.title : null} resolvedUrl={props.resolvedUrl} language="en" /> */ }

            { /* <NavBar data={null} /> */ }
            <main>{children}</main>
            {/* <Footer /> */}
        </>
    );
}
